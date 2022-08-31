import * as user from "./user";
import { GraphObject, ObjectFieldValue } from "@/graph/objects/types";
import { Context } from "@/tracing";

export type PreLogicHandler = (
  ctx: Context,
  previous: GraphObject,
  payload: { [key: string]: ObjectFieldValue },
) => Promise<void>;

export default {
  "PATCH user": user.onPatch,
} as { [key: string]: PreLogicHandler };