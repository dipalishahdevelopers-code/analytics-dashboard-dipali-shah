export { type IUserState } from "./user";
import { IUserState } from "./user";

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

export interface IAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: null | unknown | string;
  vRole: string | null;
  user: null | IUserState;
}
