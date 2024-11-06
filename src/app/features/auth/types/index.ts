export interface CurrentUser {
  id: string;
  email: string;
  name: string;
}

export interface TokensResponseInterface {
  accessToken: string;
  refreshToken: string;
}

export interface LoginInputInterface {
  email: string;
  password: string;
}

export interface RegisterInputInterface extends LoginInputInterface {
  name: string;
  passwordConfirmation: string;
}
