import { http } from './api.service';
import { Blogs, BlogsDetail } from '../models/Blogs';
import { Comments, UpdateCmt, ItemCmt } from '../models/Comment';

const COMMENTS_URL = '/api/v2';

class CommentsService {
  getAllComments = async (
    blog_id?: number | string,
    cursor_id?: number,
    sort_direction?: string,
    offset?: number,
  ): Promise<any> => {
    try {
      const response = await http.get<any>(
        `${COMMENTS_URL}/blogs/${blog_id}/comments?cursor_id=${cursor_id || 1}&sort_direction=${
          sort_direction || 'desc'
        }&offset=${offset || 20}`,
      );
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  getCommentsDetail = async (id: string | undefined): Promise<ItemCmt> => {
    try {
      const response = await http.get<ItemCmt>(`${COMMENTS_URL}/comments/${id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  postComments = async (blog_id: string | undefined, data: any): Promise<any> => {
    try {
      const response = await http.post<any>(`${COMMENTS_URL}/blogs/${blog_id}/comments`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  putComments = async (id: string | number, data: any): Promise<any> => {
    try {
      const response = await http.put<any>(`${COMMENTS_URL}/comments/${id}`, data);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  deleteComments = async (id: string | number): Promise<any> => {
    try {
      const response = await http.delete<any>(`${COMMENTS_URL}/comments/${id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };
}

export default new CommentsService();
