export type ObjectId = string;

export type ObjectType =
  | "user"
  | "session"
  | "system_user"
  | "space"
  | "notification"
  | "user_status"
  | "tutor_role";

export type ObjectFieldValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | Date
  | ObjectId
  | GraphObject
  | Object
  | HumanName
  | PaymentMethod
  | ContactPoint
  | HumanName[]
  | PaymentMethod[]
  | ContactPoint[];

export type AppLocale = "ar" | "en";

export type UserRole = TutorRole;

export interface IEdge {
  src: string;
  edgeName: string;
  dst: string;
}

export interface GraphObject {
  id: ObjectId;
  object_type: ObjectType;
  [key: string]: ObjectFieldValue;
}

export interface UserIndexMapping {
  name: string;
  email: string;
  email_text: string;
  phone: string;
  phone_text: string;
  updated_at: string;
}

export interface NotificationIndexMapping {
  user: string;
  type: string;
  role: string;
  updated_at: string;
}

export type ValueSet =
  | "ContactPointType"
  | "NamePrefix"
  | "NotificationCriticalityLevel"
  | "NotificationType"
  | "PaymentMethodType"
  | "UserGender"
  | "UserStatus";

export type ContactPointTypeVS = "phone" | "email" | "telegram";

export type NamePrefixVS =
  | "mister"
  | "monsieur"
  | "herr"
  | "dr"
  | "tt"
  | "prof";

export type NotificationCriticalityLevelVS = "critical" | "warning" | "info";

export type NotificationTypeVS =
  | "verify_email"
  | "verify_phone"
  | "complete_tutor_profile"
  | "tutor_get_started";

export type PaymentMethodTypeVS = "vodafone_cash";

export type UserGenderVS = "male" | "female" | "unknown";

export type UserStatusVS = "created";

export interface HumanName {
  prefix: NamePrefixVS;
  first_name: string;
  middle_name: string;
  last_name: string;
  locale: string;
}

export interface PaymentMethod {
  type: PaymentMethodTypeVS;
  value: string;
}

export interface ContactPoint {
  type: ContactPointTypeVS;
  value: string;
}

export interface User extends GraphObject {
  object_type: "user";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: HumanName[];
  email: string;
  email_verified: boolean;
  phone: string;
  phone_verified: boolean;
  status: UserStatusVS;
  last_read_notification: string;
  system_user: string;
}

export interface Session extends GraphObject {
  object_type: "session";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token: string;
  user: string;
  roles: string[];
  expiresAt: string;
}

export interface SystemUser extends GraphObject {
  object_type: "system_user";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  hash: string;
}

export interface Space extends GraphObject {
  object_type: "space";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  owner: string;
}

export interface Notification extends GraphObject {
  object_type: "notification";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  type: NotificationTypeVS;
  data: { [key: string]: ObjectFieldValue };
  icon: string;
  user: string;
  role: string;
  alert: boolean;
  level: NotificationCriticalityLevelVS;
}

export interface UserStatus extends GraphObject {
  object_type: "user_status";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  status: UserStatusVS;
  set_at: string;
  set_by: string;
  user: string;
}

export interface TutorRole extends GraphObject {
  object_type: "tutor_role";
  created_at: string;
  updated_at: string;
  deleted_at: string;
  payment_methods: PaymentMethod[];
  user: string;
  last_read_notification: string;
  contacts: ContactPoint[];
  space: string;
}
