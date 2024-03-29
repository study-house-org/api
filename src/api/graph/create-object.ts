import { APIEndpoint, APIRequest, APIResponse } from "@/api/types";
import { apiWrapper, persistence } from "@/components";
import { checkIfObjectTypeExists } from "@/graph";
import { GraphObject, ObjectType } from "@/graph/objects/types";
import { Context } from "@/tracing";
import { verifyObjectACL } from "../common";

export const createObjectEndpoint: APIEndpoint = apiWrapper(
  {
    name: "createObject",
    file: __filename,
  },
  async (ctx: Context, req: APIRequest, res: APIResponse) => {
    if (!req.session || !req.user) {
      return;
    }

    const { body } = req;

    const objectType = body.object_type as ObjectType;

    await checkIfObjectTypeExists(ctx, objectType);

    const aclCache = {};

    await verifyObjectACL(ctx, {
      author: req.user,
      method: "POST",
      aclMode: "hard",
      objectType,
      singleFieldStrategy: "error",
      roles: req.session.roles,
      aclCache,
      object: body,
    });

    const object = await persistence.createObject<GraphObject>(ctx, req.body, {
      author: req.user.id,
    });

    const strippedObject = await verifyObjectACL(ctx, {
      author: req.user,
      method: "GET",
      aclMode: "hard",
      objectType,
      singleFieldStrategy: "strip",
      roles: req.session.roles,
      aclCache,
      object,
    });

    res.json(strippedObject);
  }
);
