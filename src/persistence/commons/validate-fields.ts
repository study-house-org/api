import { errors } from "@/components";
import {
  getObjectConfigFromObjectType,
  getObjectTypeFromId,
  getStructConfigFromObjectTypeOrStructName,
  ObjectConfig,
  ObjectField,
  objects,
  StructConfig,
} from "@/graph";
import { FIXED_OBJECT_FIELDS } from "@/graph/common";
import { GraphObject, ObjectType } from "@/graph/objects/types";
import { Context } from "@/tracing";
import { valueSets } from "@/value-sets";
import joi from "joi";
import { PersistenceDriver } from "..";

export enum ValidationErrorReason {
  Required = "required",
  Unique = "unique",
  BadDataType = "bad_data_type",
}

export interface ValidationError {
  fieldName: string;
  reason: ValidationErrorReason;
}

async function validateFieldType(
  ctx: Context,
  data: GraphObject,
  fieldName: string,
  fieldConfig: ObjectField
): Promise<boolean> {
  let error: any = null;

  const fieldValue = data[fieldName] as any;

  try {
    switch (fieldConfig.type) {
      case "json":
        // If it passed request parsing, then this is a valid value
        break;
      case "array:string":
        error = joi.array().items(joi.string()).validate(fieldValue).error;
        break;
      case "array:number":
        error = joi.array().items(joi.number()).validate(fieldValue).error;
        break;
      case "counter":
        if (typeof fieldValue === "number") {
          break;
        } else {
          const modifier = fieldValue[0];
          const value = fieldValue.slice(1);

          error = !(
            ["+", "-", "="].includes(modifier) &&
            Number.parseInt(value, 0) !== NaN
          );
        }
        break;
      case "array:boolean":
        error = joi.array().items(joi.boolean()).validate(fieldValue).error;
        break;
      case "array:date":
        if (!Array.isArray(fieldValue)) {
          error = true;
          break;
        }

        error = fieldValue
          .map((value: string) => new Date(value).toString() === "Invalid Date")
          .includes(true);
        break;
      case "array:value-set":
        if (!Array.isArray(fieldValue)) {
          error = true;
          break;
        }

        if (fieldConfig.valueSet) {
          const valueSet = valueSets.getValueSet(fieldConfig.valueSet);

          error = fieldValue.every((value: string) =>
            valueSet.every((item) => item.code !== value)
          );
        }
        break;
      case "array:struct":
        if (!Array.isArray(fieldValue)) {
          error = true;
          break;
        }

        if (fieldConfig.struct) {
          // No need to set `error`, this will throw an error on its own
          // it's just a proxy for recursion
          await Promise.all(
            fieldValue.map((value) =>
              dryValidation(ctx, fieldConfig.struct as string, value)
            )
          );
        }
        break;
      case "array:object-id":
        if (!Array.isArray(fieldValue)) {
          error = true;
          break;
        }

        const failedValues = await Promise.all(
          fieldValue.map(async (value) => {
            try {
              const objectType = await getObjectTypeFromId(ctx, value);

              if (!fieldConfig.objectTypes?.includes(objectType)) {
                return true;
              }
            } catch {
              return true;
            }

            return false;
          })
        );

        error = failedValues.some((value) => value === true);
        break;
      case "string":
        if (fieldConfig.schema === "email") {
          error = joi.string().email().validate(fieldValue).error;

          break;
        }
        error = joi.string().validate(fieldValue).error;
        break;
      case "number":
        error = joi.number().validate(fieldValue).error;
        break;
      case "boolean":
        error = joi.boolean().validate(fieldValue).error;
        break;
      case "date":
        error = new Date(fieldValue).toString() == "Invalid Date";
        break;
      case "value-set":
        if (fieldConfig.valueSet) {
          const valueSet = valueSets.getValueSet(fieldConfig.valueSet);

          error = valueSet.every((item) => item.code !== fieldValue);
        }
        break;
      case "struct":
        if (fieldConfig.struct) {
          // No need to set `error`, this will throw an error on its own
          // it's just a proxy for recursion
          await dryValidation(ctx, fieldConfig.struct, fieldValue);
        }
        break;

      case "object-id":
        try {
          const objectType = await getObjectTypeFromId(ctx, fieldValue);

          if (!fieldConfig.objectTypes?.includes(objectType)) {
            error = true;
          }
        } catch {
          error = true;
        }
        break;
    }
  } catch (_error) {
    ctx.log.warn("Failed to validate field", {
      data,
      fieldConfig,
      fieldName,
      fieldValue,
      error: _error,
    });
    error = true;
  }

  if (error) {
    ctx.log.warn("Validation failed", { data, fieldName, fieldValue, error });
  }

  return error ? true : false;
}

async function validateField(
  ctx: Context,
  data: GraphObject,
  fieldName: string,
  fieldConfig: ObjectField
): Promise<ValidationError | false> {
  // Validate required property
  if (fieldConfig.required && !data[fieldName]) {
    return { fieldName, reason: ValidationErrorReason.Required };
  }

  if (!data[fieldName]) {
    return false;
  }

  const fieldValidationError = await validateFieldType(
    ctx,
    data,
    fieldName,
    fieldConfig
  );

  if (fieldValidationError) {
    return { fieldName, reason: ValidationErrorReason.BadDataType };
  }

  return false;
}

async function dryValidateField(
  ctx: Context,
  structConfig: StructConfig,
  data: GraphObject,
  fieldName: string
): Promise<void> {
  ctx.log.info("Validating field", { fieldName, fieldValue: data[fieldName] });

  if (FIXED_OBJECT_FIELDS.includes(fieldName)) {
    return;
  }

  const fieldConfig =
    structConfig.fields[fieldName] || structConfig.fields._any;

  if (!fieldConfig) {
    return errors.createError(ctx, "ValidationErrorFieldNotFound", {
      fieldName,
    });
  }

  const fieldValidationResult = await validateField(
    ctx,
    data,
    fieldName,
    fieldConfig
  );

  if (fieldValidationResult) {
    const { fieldName, reason } = fieldValidationResult;

    const { type, schema, struct, valueSet } = structConfig.fields[fieldName];

    let friendlyFieldType: string = type;

    if (schema) {
      friendlyFieldType = `${type}<${schema}>`;
    }

    if (struct) {
      friendlyFieldType = `${type}<${struct}>`;
    }

    if (valueSet) {
      friendlyFieldType = `${type}<${valueSet}>`;
    }

    switch (reason) {
      case ValidationErrorReason.Required:
        return errors.createError(ctx, "ValidationErrorRequiredField", {
          fieldName,
          fieldType: friendlyFieldType,
        });
      case ValidationErrorReason.BadDataType:
        return errors.createError(ctx, "ValidationErrorBadDataType", {
          fieldName,
          fieldType: friendlyFieldType,
        });
    }
  }
}

export async function dryValidation(
  ctx: Context,
  objectTypeOrStructName: ObjectType | string,
  data: GraphObject,
  partial = false
): Promise<void> {
  const structConfig = await getStructConfigFromObjectTypeOrStructName(
    ctx,
    objectTypeOrStructName
  );

  if (partial) {
    for (const fieldName of Object.keys(data)) {
      await dryValidateField(ctx, structConfig, data, fieldName);
    }
  } else {
    for (const fieldName of new Set([
      ...Object.keys(data),
      ...Object.keys(structConfig.fields),
    ]).values()) {
      await dryValidateField(ctx, structConfig, data, fieldName);
    }
  }
}

export async function uniqueValidation(
  ctx: Context,
  objectType: ObjectType,
  previous: Partial<GraphObject> | null,
  current: Partial<GraphObject> | null,
  persistenceDriver: PersistenceDriver,
  method: "create" | "update" | "delete"
): Promise<void> {
  const objectConfig = objects[objectType];

  const uniqueFieldNames = Object.keys(objectConfig.fields).filter(
    (fieldName) =>
      objectConfig.fields[fieldName].unique &&
      ((!previous && current && current[fieldName]) ||
        (previous && previous[fieldName] && !current) ||
        (previous && current && previous[fieldName] !== current[fieldName]))
  );

  // Only check all the unique fields first
  for (const fieldName of uniqueFieldNames) {
    if (!current || !current[fieldName]) {
      continue;
    }

    switch (method) {
      case "create":
      case "update":
        const isUnique = await persistenceDriver.checkUnique(
          ctx,
          objectType,
          fieldName,
          current[fieldName] as string
        );

        if (!isUnique) {
          return errors.createError(ctx, "ValidationErrorUniqueField", {
            fieldName,
          });
        }
        break;
    }
  }

  // All new fields are checked and correct, create new uniques and remove old ones
  for (const fieldName of uniqueFieldNames) {
    if (!current || !current[fieldName]) {
      continue;
    }

    switch (method) {
      case "update":
        // Remove old value before update if it exists
        if (previous && previous[fieldName]) {
          await persistenceDriver.removeUnique(
            ctx,
            objectType,
            fieldName,
            previous[fieldName] as string
          );
        }
      // Do not break and create the new unique value
      case "create":
        if (current && current[fieldName]) {
          await persistenceDriver.addUnique(
            ctx,
            objectType,
            fieldName,
            current[fieldName] as string
          );
        }
        break;
      case "delete":
        if (previous && previous[fieldName]) {
          await persistenceDriver.removeUnique(
            ctx,
            objectType,
            fieldName,
            previous[fieldName] as string
          );
        }
        break;
    }
  }
}
