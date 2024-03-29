export const metricsHistogram = [
  {
    name: "dynamo_get_object_duration",
    help: "Duration of get requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_get_object_error_duration",
    help: "Duration of get requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_create_object_duration",
    help: "Duration of create object requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_create_object_error_duration",
    help: "Duration of create object requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_create_unique_duration",
    help: "Duration of create unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "retries"],
  },
  {
    name: "dynamo_create_unique_error_duration",
    help: "Duration of create unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "dynamo_check_unique_duration",
    help: "Duration of check unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "retries"],
  },
  {
    name: "dynamo_check_unique_error_duration",
    help: "Duration of check unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "dynamo_remove_unique_duration",
    help: "Duration of remove unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "retries"],
  },
  {
    name: "dynamo_remove_unique_error_duration",
    help: "Duration of remove unique requests to dynamo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "dynamo_set_counter_duration",
    help: "Duration of set counter requests to dynamo",
    labelNames: ["objectType", "fieldName", "retries"],
  },
  {
    name: "dynamo_set_counter_error_duration",
    help: "Duration of set counter requests to dynamo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "dynamo_get_counter_duration",
    help: "Duration of get counter requests to dynamo",
    labelNames: ["objectType", "fieldName", "retries"],
  },
  {
    name: "dynamo_get_counter_error_duration",
    help: "Duration of get counter requests to dynamo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "dynamo_update_object_duration",
    help: "Duration of update object requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_update_object_error_duration",
    help: "Duration of update object requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_replace_object_duration",
    help: "Duration of replace object requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_replace_object_error_duration",
    help: "Duration of replace object requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_delete_object_duration",
    help: "Duration of delete object requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_delete_object_error_duration",
    help: "Duration of delete object requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_query_objects_duration",
    help: "Duration of query requests to dynamo",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "dynamo_query_objects_error_duration",
    help: "Duration of query requests to dynamo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "dynamo_create_edge_duration",
    help: "Duration of create edge requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "retries"],
  },
  {
    name: "dynamo_create_edge_error_duration",
    help: "Duration of create edge requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "dynamo_delete_edge_duration",
    help: "Duration of delete edge requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "retries"],
  },
  {
    name: "dynamo_delete_edge_error_duration",
    help: "Duration of delete edge requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "dynamo_get_edges_duration",
    help: "Duration of get edges requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "retries"],
  },
  {
    name: "dynamo_get_edges_error_duration",
    help: "Duration of get edges requests to dynamo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "dynamo_get_reverse_edges_duration",
    help: "Duration of get reverse edges requests to dynamo",
    labelNames: ["dstObjectType", "edgeName", "retries"],
  },
  {
    name: "dynamo_get_reverse_edges_error_duration",
    help: "Duration of get reverse edges requests to dynamo",
    labelNames: ["dstObjectType", "edgeName", "error"],
  },
  {
    name: "mongo_get_object_duration",
    help: "Duration of get requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_get_object_error_duration",
    help: "Duration of get requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_create_object_duration",
    help: "Duration of create object requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_create_object_error_duration",
    help: "Duration of create object requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_create_unique_duration",
    help: "Duration of create unique requests to mongo",
    labelNames: ["objectType", "fieldName"],
  },
  {
    name: "mongo_create_unique_error_duration",
    help: "Duration of create unique requests to mongo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "mongo_check_unique_duration",
    help: "Duration of check unique requests to mongo",
    labelNames: ["objectType", "fieldName"],
  },
  {
    name: "mongo_check_unique_error_duration",
    help: "Duration of check unique requests to mongo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "mongo_remove_unique_duration",
    help: "Duration of remove unique requests to mongo",
    labelNames: ["objectType", "fieldName"],
  },
  {
    name: "mongo_remove_unique_error_duration",
    help: "Duration of remove unique requests to mongo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "mongo_set_counter_duration",
    help: "Duration of set counter requests to mongo",
    labelNames: ["objectType", "fieldName"],
  },
  {
    name: "mongo_set_counter_error_duration",
    help: "Duration of set counter requests to mongo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "mongo_get_counter_duration",
    help: "Duration of get counter requests to mongo",
    labelNames: ["objectType", "fieldName"],
  },
  {
    name: "mongo_get_counter_error_duration",
    help: "Duration of get counter requests to mongo",
    labelNames: ["objectType", "fieldName", "error"],
  },
  {
    name: "mongo_update_object_duration",
    help: "Duration of update object requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_update_object_error_duration",
    help: "Duration of update object requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_replace_object_duration",
    help: "Duration of replace object requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_replace_object_error_duration",
    help: "Duration of replace object requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_delete_object_duration",
    help: "Duration of delete object requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_delete_object_error_duration",
    help: "Duration of delete object requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_query_objects_duration",
    help: "Duration of query requests to mongo",
    labelNames: ["objectType"],
  },
  {
    name: "mongo_query_objects_error_duration",
    help: "Duration of query requests to mongo",
    labelNames: ["objectType", "error"],
  },
  {
    name: "mongo_create_edge_duration",
    help: "Duration of create edge requests to mongo",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "mongo_create_edge_error_duration",
    help: "Duration of create edge requests to mongo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "mongo_delete_edge_duration",
    help: "Duration of delete edge requests to mongo",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "mongo_delete_edge_error_duration",
    help: "Duration of delete edge requests to mongo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "mongo_get_edges_duration",
    help: "Duration of get edges requests to mongo",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "mongo_get_edges_error_duration",
    help: "Duration of get edges requests to mongo",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "mongo_get_reverse_edges_duration",
    help: "Duration of get reverse edges requests to mongo",
    labelNames: ["dstObjectType", "edgeName"],
  },
  {
    name: "mongo_get_reverse_edges_error_duration",
    help: "Duration of get reverse edges requests to mongo",
    labelNames: ["dstObjectType", "edgeName", "error"],
  },
  {
    name: "persistence_get_object_duration",
    help: "Duration of get requests to persistence",
    labelNames: ["objectType", "retries"],
  },
  {
    name: "persistence_get_object_error_duration",
    help: "Duration of get requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_create_object_duration",
    help: "Duration of create object requests to persistence",
    labelNames: ["objectType"],
  },
  {
    name: "persistence_create_object_error_duration",
    help: "Duration of create object requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_update_object_duration",
    help: "Duration of update object requests to persistence",
    labelNames: ["objectType"],
  },
  {
    name: "persistence_update_object_error_duration",
    help: "Duration of update object requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_replace_object_duration",
    help: "Duration of replace object requests to persistence",
    labelNames: ["objectType"],
  },
  {
    name: "persistence_replace_object_error_duration",
    help: "Duration of replace object requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_delete_object_duration",
    help: "Duration of delete object requests to persistence",
    labelNames: ["objectType"],
  },
  {
    name: "persistence_delete_object_error_duration",
    help: "Duration of delete object requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_query_objects_duration",
    help: "Duration of query requests to persistence",
    labelNames: ["objectType"],
  },
  {
    name: "persistence_query_objects_error_duration",
    help: "Duration of query requests to persistence",
    labelNames: ["objectType", "error"],
  },
  {
    name: "persistence_create_edge_duration",
    help: "Duration of create edge requests to persistence",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "persistence_create_edge_error_duration",
    help: "Duration of create edge requests to persistence",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "persistence_delete_edge_duration",
    help: "Duration of delete edge requests to persistence",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "persistence_delete_edge_error_duration",
    help: "Duration of delete edge requests to persistence",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "persistence_get_edges_duration",
    help: "Duration of get edges requests to persistence",
    labelNames: ["srcObjectType", "edgeName"],
  },
  {
    name: "persistence_get_edges_error_duration",
    help: "Duration of get edges requests to persistence",
    labelNames: ["srcObjectType", "edgeName", "error"],
  },
  {
    name: "persistence_get_reverse_edges_duration",
    help: "Duration of get reverse edges requests to persistence",
    labelNames: ["dstObjectType", "edgeName"],
  },
  {
    name: "persistence_get_reverse_edges_error_duration",
    help: "Duration of get reverse edges requests to persistence",
    labelNames: ["dstObjectType", "edgeName", "error"],
  },
  {
    name: "redis_get_requests_duration",
    help: "Total duration of redis get requests",
    labelNames: ["result"],
  },
  {
    name: "redis_get_errors_duration",
    help: "Total duration of redis get requests errors",
    labelNames: ["error"],
  },
  {
    name: "redis_mget_requests_duration",
    help: "Total duration of redis mget requests",
    labelNames: ["hits", "misses"],
  },
  {
    name: "redis_mget_errors_duration",
    help: "Total duration of redis mget requests errors",
    labelNames: ["error"],
  },
  {
    name: "redis_requests_duration",
    help: "Total duration of redis requests",
    labelNames: ["method"],
  },
  {
    name: "redis_errors_duration",
    help: "Total duration of redis requests errors",
    labelNames: ["method", "error"],
  },
  {
    name: "login_requests_duration",
    help: "Total duration of login requests",
    labelNames: ["provider"],
  },
  {
    name: "login_errors_duration",
    help: "Total duration of login requests errors",
    labelNames: ["provider", "error"],
  },
  {
    name: "signup_requests_duration",
    help: "Total duration of signup requests",
    labelNames: ["provider"],
  },
  {
    name: "signup_errors_duration",
    help: "Total duration of signup requests errors",
    labelNames: ["provider", "error"],
  },
] as const;

export type HistogramName = typeof metricsHistogram[number]["name"];
