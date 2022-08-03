import { ObjectConfig } from "@/graph";

export default {
  code: "Z1",
  cacheLevel: "external",
  views: {
    _default: {
      GET: ["public"],
      POST: [],
      PATCH: ["virtual:owner"],
    },
    system: {
      GET: ["virtual:owner"],
      POST: [],
      PATCH: [],
    },
    private: {
      GET: ["virtual:owner"],
      POST: [],
      PATCH: ["virtual:owner"],
    },
  },
  virtuals: {
    views: {
      owner: {
        pre: ["all"],
        execute: () => false,
      },
    },
  },
  fields: {
    email: {
      type: "string",
    },
    email_verified: {
      type: "boolean",
    },
    status: {
      type: "value-set",
      valueSet: "user-status",
    },
    last_read_notification: {
      type: "date",
    },
  },
  edges: {
    roles: {
      objectTypes: ["tutor_role"],
    },
    statuses: {
      objectTypes: ["user_status"],
    },
  },
} as ObjectConfig;