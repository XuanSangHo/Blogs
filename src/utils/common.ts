import { MaxHourToExpiredLogin, MaxHourToExpiredLoginRememberMe, StorageKeys } from './constants';
import { getFromStorage, removeFromStorage } from './storage';
import moment from 'moment';

const handleLogout = () => {
  removeFromStorage(StorageKeys.USER_TOKEN_KEY);
  removeFromStorage(StorageKeys.LOGIN_TYPE)
  window.location.pathname = '/login';
};

const debounce = (timeout: any, setTimeOut: any, onSubmit: any) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    onSubmit()
  }, 1000)
  setTimeOut(timeout)
}


function getCanRefreshToken(): boolean {
  const isRememberMe = !!getFromStorage(StorageKeys.REMEMBER_ME_KEY);
  const startTimeLogin = getFromStorage(StorageKeys.LOGIN_START_TIME);
  const currentTime = moment();
  const durationLogin = moment.duration(currentTime.diff(moment(startTimeLogin))).asHours();
  const localTokenString = getFromStorage(StorageKeys.USER_TOKEN_KEY);
  const userToken = localTokenString ? JSON.parse(localTokenString) : null;
  if (isRememberMe) {
    return userToken && durationLogin < MaxHourToExpiredLoginRememberMe;
  }
  return userToken && durationLogin < MaxHourToExpiredLogin;
}


export { handleLogout, getCanRefreshToken, debounce };
