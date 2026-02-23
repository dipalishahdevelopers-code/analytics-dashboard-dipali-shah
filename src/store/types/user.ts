export interface IUserState {
  token?: string;
  iUserId?: number;
  vEmail?: string;
  vPassword?: string;
  vFullName?: string;
  vRole?: string;
}

export interface ILoginResponseState {
  success?: boolean;
  status?: string;
  code?: string;
  message?: string;
  data?: {
    accessToken: string;
    user: IUserState;
  };
}

export interface IUserResponseState {
  status?: string;
  code?: string;
  message?: string;
  data?: IUserState | IUserState[];
  total?: number;
}

export interface IAuthState {
  users: null | IUserState[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortDir: "asc" | "desc";
  vRole: string | null;
  user: null | IUserState;
  loading: boolean;
  error: null | unknown | string;
}
