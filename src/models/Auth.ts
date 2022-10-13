export interface ResetPassword {
  email: string;
  source: string;
}

export interface Errors {
  errors: Error[];
  __type: 'Errors';
}
