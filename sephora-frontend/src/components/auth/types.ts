export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGIN_GOOGLE_USER = "AUTH_LOGIN_GOOGLE_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER",
  }
  
  export interface IUser {
    id: string;
    userName: string;
    email: string;
    profilePicture: string;
    registrationDate: Date;
    phoneNumber: string;
    roles: string[];
  }

  export interface IGoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
    exp: number;
  }
  
  export interface IUserEdit {
    userName: string;
    email: string;
    phoneNumber: string;
    profilePicture: File | null;
  }
  
  export interface IAuthUser {
    isAuth: boolean;
    isGoogle: boolean;
    user?: IUser;
  }
export interface IRegister {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    phoneNumber: string;
    password: string;
    passwordConfirmation: string;
    profilePicture: File | null;
  }
  
  export interface ILogin {
    email: string;
    password: string;
  }
  
  export interface ILoginResult {
    gtoken: string;
  }
