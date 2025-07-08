export interface User {
  name?: string;
  email?: string;
  firebaseUid?: string;
  address?: string;
  phoneNumber?: string;
}

export interface LoginCredentials {
  email: string;
  idToken: string;
  password?: string;
  role?: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  user: User;
}
