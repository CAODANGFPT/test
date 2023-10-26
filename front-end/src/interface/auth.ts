export interface IRegister {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
export interface IPassword {
  password: string;
  confirmPassword: string;
}
export interface ILogin {
  user: TUser;
  email: string;
  password: string;
}
type TUser = {
  email: string;
  name: string;
  role_id: number;
};

export interface IUser{
  id: number;
  email: string;
  name: string;
  password: string;
  role_id: number;
}

export interface IToken{
  accessToken: string;
  user: IUser
}
export interface IReset{
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface IEmail {
  email: string;
}

export interface IRoleUser {
  id: number;
  role_id: number;
}
