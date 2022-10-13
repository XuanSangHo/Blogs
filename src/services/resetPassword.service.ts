import { http } from './api.service';
import { Blogs, BlogsDetail } from '../models/Blogs';
import { ResetPassword, UpdatePassword } from '../models/ResetPassword';

const PASSWORD_URL = '/api/v2/reset_password';

class ResetPasswordService {
  postResetPass = async (data: ResetPassword): Promise<ResetPassword> => {
    try {
      const response = await http.post<ResetPassword>(`${PASSWORD_URL}`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  getResetPass = async (token: string | null): Promise<any> => {
    try {
      const response = await http.get<any>(`${PASSWORD_URL}?token=${token}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  putResetPass = async (data: UpdatePassword): Promise<UpdatePassword> => {
    try {
      const response = await http.put<UpdatePassword>(`${PASSWORD_URL}`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };
}

export default new ResetPasswordService();
