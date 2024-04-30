export interface DataRequest {
  id: string | null;
  type: RequestType;
  payload: PayloadRequest | null;
}

export interface PayloadRequest {
  user?: User;
  message?: Message;
}

export interface DataResponse {
  id: string;
  type: RequestType;
  payload: PayloadResponse;
}

export interface PayloadResponse {
  user?: User;
  users?: User[];
  error?: string;
  message?: Message;
  messages?: Message[];
}

export enum RequestType {
  UserLogin = 'USER_LOGIN',
  UserLogout = 'USER_LOGOUT',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  UserActive = 'USER_ACTIVE',
  UserInactive = 'USER_INACTIVE',
  Error = 'ERROR',
  Send = 'MSG_SEND',
  FromUser = 'MSG_FROM_USER',
  Deliver = 'MSG_DELIVER',
  Read = 'MSG_READ',
  Delete = 'MSG_DELETE',
  Edit = 'MSG_EDIT',
}

export interface User {
  login: string;
  isLogined?: boolean;
  password?: string;
}

export interface Message {
  id?: string;
  from?: string;
  to?: string;
  text?: string;
  datetime?: number;
  status?: StatusMessage;
}

export interface StatusMessage {
  isDelivered?: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}
