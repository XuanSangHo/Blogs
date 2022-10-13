import { http } from './api.service';
import { Blogs, BlogsDetail } from '../models/Blogs';

const BLOGS_URL = '/api/v2/blogs';

class BlogsService {
  getAllBlogs = async (
    page?: number,
    offset?: number,
    search?: string,
    sort_by?: string,
    sort_direction?: string,
  ): Promise<Blogs> => {
    try {
      const response = await http.get<Blogs>(
        `${BLOGS_URL}?page=${page}&offset=${offset}&search=${search || ''}&sort_by=${sort_by || ''}&sort_direction=${
          sort_direction || ''
        }`,
      );
      return response.data;
    } catch (error: any) {
      //   const errors = error.response.data;
      //   errors.__type = 'Errors';
      return error;
    }
  };

  getBlogsDetail = async (id: string | undefined): Promise<BlogsDetail> => {
    try {
      const response = await http.get<BlogsDetail>(`${BLOGS_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  postBlogs = async (data: any): Promise<any> => {
    try {
      const bodyFormData: any = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];
        bodyFormData.append(key, value);
      });
      const response = await http.post<any>(BLOGS_URL, bodyFormData);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  putBlogs = async (id: string | number, data: any): Promise<any> => {
    try {
      const bodyFormData: any = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];
        bodyFormData.append(key, value);
      });
      const response = await http.put<any>(`${BLOGS_URL}/${id}`, bodyFormData);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  deleteBlogs = async (id: string | number): Promise<any> => {
    try {
      const response = await http.delete<any>(`${BLOGS_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };
}

export default new BlogsService();
