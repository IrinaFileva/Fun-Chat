export interface DataRequestUser {
  id: string | null;
  type: UserType;
  payload: {
    user: {
      login: string;
      password: string;
    };
  } | null;
}

export interface DataResponseUser {
  id: string;
  type: UserType;
  payload: {
    user?: User;
    users?: User[];
    error?: string;
  };
}

export enum UserType {
  UserLogin = 'USER_LOGIN',
  UserLogout = 'USER_LOGOUT',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  UserActive = 'USER_ACTIVE',
  UserInactive = 'USER_INACTIVE',
  Error = 'ERROR',
}

export interface User {
  login: string;
  isLogined: boolean;
}
