export interface RegisteredUserResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  soldSubscriptions: string[],
  boughtSubscriptions: string[];
}
