export interface IUser {
	token: string;
	_id: string;
	email: string;
	admin: boolean;
	name: string;
}
export interface IUserLogin {
  email?: string;
  password?: string;
}