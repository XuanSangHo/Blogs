export interface ResetPassword {
  email: string;
  reset_password_url: string;
}

export interface UpdatePassword {
  password: string;
  token: string | null;
}
