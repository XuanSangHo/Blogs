const MAX_PASSWORD = 50;
const MIN_PASSWORD = 7;

const MaxHourToExpiredLogin = 0.5;
const MaxHourToExpiredLoginRememberMe = 720;

const StorageKeys = {
  USER_ID: 'user-id',
  USER_TOKEN_KEY: 'user-token',
  REMEMBER_ME_KEY: 'remember-me',
  LOGIN_START_TIME: 'login-start-time',
  LOGIN_TYPE: 'LOGIN_TYPE',
};

const SORT = {
  DESC: 'desc',
  ASC: 'asc',
};

const ClientId = '934961644124-a67tin61j0380fnkivpii5a71acd3t78.apps.googleusercontent.com'

const LOGIN_TYPE = {
  EMAIL: 'EMAIL',
  GOOGLE: 'GOOGLE'
}


const TYPE_MODAL = {
  EDIT: 'EDIT',
  DELETE: 'DELETE'
}

export {
  MAX_PASSWORD,
  MIN_PASSWORD,
  MaxHourToExpiredLoginRememberMe,
  MaxHourToExpiredLogin, StorageKeys,
  SORT,
  ClientId,
  LOGIN_TYPE,
  TYPE_MODAL
};
