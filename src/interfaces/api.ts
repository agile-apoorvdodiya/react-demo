import { IUser } from "./user";

export interface IRootState {
  api: IAPIState;
  auth: IAuthState;
  common: ICommonState;
  socket: ISocketState;
  user: IUserState;
  form: IFormState
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
  snackBar: any;
}

export interface ISocketState {
  status: boolean;
}

export interface IUserState {
  userList: any[];
  userDetails: any;
  success: any;
}

export interface IFormState {
  formList: any[];
  formDetails: any;
  success: any;
}
