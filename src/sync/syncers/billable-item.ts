import { persistence, wrapper } from "@/components";
import {
  AcademicYear,
  BillableItem,
  BillableItemIndexMapping,
} from "@/graph/objects/types";
import { QueueEvent } from "@/queue";
import { IndexName } from "@/sync/mapping";
import { SyncOperation, SyncOperationMethod } from "@/sync/types";
import { Context } from "@/tracing";
import { universalDeleteGenerator } from "../commons/universal-delete-generator";
import _ from "lodash";
import {
  billableItemMaxDate,
  billableItemMinDate,
} from "@/graph/util/billable-item";

const INDEX_NAME: IndexName = "billable_item";

const universalGenerator = wrapper(
  { name: "universalGenerator", file: __filename },
  async (
    ctx: Context,
    method: SyncOperationMethod,
    object: BillableItem
  ): Promise<SyncOperation[]> => {
    const { name, academic_year, type, price, time_table, updated_at } = object;

    const { space } = await persistence.getObject<AcademicYear>(
      ctx,
      academic_year
    );

    const min_date = billableItemMinDate(time_table);
    const max_date = billableItemMaxDate(time_table);

    const has_no_date = !min_date && !max_date;

    return [
      {
        method,
        index: INDEX_NAME,
        id: object.id,
        data: {
          name,
          academic_year,
          type,
          price,
          has_no_date,
          space,
          min_date,
          max_date,
          updated_at,
        },
      },
    ];
  }
);

export const onPost = wrapper(
  { name: "onPost", file: __filename },
  async (
    ctx: Context,
    event: QueueEvent<BillableItem>
  ): Promise<SyncOperation<BillableItemIndexMapping>[]> => {
    ctx.register(event);

    if (!event.current) {
      return [];
    }

    return universalGenerator(ctx, "create", event.current);
  }
);

export const onPatch = wrapper(
  { name: "onPatch", file: __filename },
  async (
    ctx: Context,
    event: QueueEvent<BillableItem>
  ): Promise<SyncOperation<BillableItemIndexMapping>[]> => {
    ctx.register(event);

    if (!event.current) {
      return [];
    }

    return universalGenerator(ctx, "create", event.current);
  }
);

export const onDelete = wrapper(
  { name: "onDelete", file: __filename },
  async (
    ctx: Context,
    event: QueueEvent<BillableItem>
  ): Promise<SyncOperation<BillableItemIndexMapping>[]> => {
    ctx.register(event);

    if (!event.previous) {
      return [];
    }

    return universalDeleteGenerator(INDEX_NAME, event.previous);
  }
);
