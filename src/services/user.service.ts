import { http } from './api.service';
import { createSlice } from '@reduxjs/toolkit';
import { Login, LoginGoogle, RefreshToken, User, Register } from '../models/User';

const AUTH_URL = '/api/v2';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const { reducer, actions } = user;
export const { setUserInfo } = actions;
export default reducer;

export class UsersService {
  login = async (data: Login): Promise<any> => {
    try {
      const response = await http.post(`${AUTH_URL}/login`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  loginGoogle = async (data: LoginGoogle): Promise<any> => {
    try {
      const response = await http.post(`${AUTH_URL}/login/google`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  logout = async (): Promise<any> => {
    try {
      const response = await http.delete<any>(`${AUTH_URL}/logout`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  register = async (data: any): Promise<Register> => {
    try {
      const bodyFormData: any = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];
        bodyFormData.append(key, value);
      });
      const response = await http.post<Register>(`${AUTH_URL}/users`, bodyFormData);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  userInfor = async (dispatch: any): Promise<User> => {
    try {
      const response = await http.get<User>(`${AUTH_URL}/me`);
      dispatch(setUserInfo(response.data));
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  updateUser = async (data: any): Promise<any> => {
    try {
      const bodyFormData: any = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];
        bodyFormData.append(key, value);
      });
      const response = await http.put<any>(`${AUTH_URL}/me`, bodyFormData);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };
  refreshTokens = async (): Promise<RefreshToken> => {
    try {
      const response = await http.post<RefreshToken>(`${AUTH_URL}/refresh_tokens`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };
}

// export {UsersService}
