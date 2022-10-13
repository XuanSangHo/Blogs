export interface User {
  email: string;
  name?: string;
  avatar?: {
    url: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface Login {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface LoginGoogle {
  token_type: string;
  access_token: string;
}

export interface RefreshToken {
  token: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
