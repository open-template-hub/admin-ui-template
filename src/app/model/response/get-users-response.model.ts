export interface GetUsersResponseModel {
  users: GetUsersUserResponseModel[];
  meta: GetUsersMetaModel;
}

export interface GetUsersUserResponseModel {
  username: string;
  email: string;
  external_user_email: string;
  verified: string;
  role: string;
  twofactorenabled: boolean;
  phonenumber: string;
  social_login_key: string;
}

export interface GetUsersMetaModel {
  offset: number;
  limit: number;
  count: number;
}
