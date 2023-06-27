import { IUser } from "./user";

export interface IRootState {
  api: IAPIState;
  auth: IAuthState;
  common: ICommonState;
  socket: ISocketState;
}

export interface IAPIState {
  isLoading: boolean;
  response: any; // TODO Create interface as per your project
  error: any; // TODO Create interface as per your project
}

export interface IAuthState {
  isLoggedIn: boolean;
  user: IUser;
  token: string;
}

export interface ICommonState {
  isDarkMode: boolean;
}

export interface ISocketState {
  status: boolean;
}
