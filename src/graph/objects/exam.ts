import { ObjectConfig } from "@/graph";
import { SpacePermissionsViewVirtuals } from "@/graph/common";

export default {
  code: "12",
  cacheLevel: "external",
  deletedBy: ["virtual:space_admin"],
  views: {
    _default: {
      GET: ["virtual:space_admin"],
      POST: ["virtual:space_admin"],
      PATCH: ["virtual:space_admin"],
    },
    system_controlled: {
      GET: ["virtual:space_admin"],
      POST: [],
      PATCH: [],
    },
  },
  deepDeletion: [
    {
      index: "exam_log",
      property: "exam",
    },
  ],
  virtuals: {
    views: SpacePermissionsViewVirtuals,
  },
  fields: {
    name: {
      type: "string",
      required: true,
    },
    academic_year: {
      type: "object-id",
      objectTypes: ["academic_year"],
      required: true,
    },
    max_grade: {
      type: "number",
    },
    time_table: {
      type: "array:struct",
      struct: "exam-time-table",
    },
    grade_groups: {
      type: "array:struct",
      struct: "exam-grade-group",
    },
    grade_group_counter: {
      type: "counter",
    },
    stats: {
      type: "object-id",
      objectTypes: ["exam_stats"],
      view: "system_controlled",
      deepDelete: true,
    },
  },
  edges: {
    trails: {
      objectTypes: ["exam_trail"],
      view: "system_controlled",
      deepDelete: "object",
    },
  },
} as ObjectConfig;
