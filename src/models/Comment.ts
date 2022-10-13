export interface Comments {
  item: ItemCmt[];
}

export interface ItemCmt {
  id: number;
  content: string;
  blog_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user: {
    id: number;
    name?: string;
    email: string;
    avatar?: {
      url: string;
    };
  };
}

export interface UpdateCmt {
  'comment[content]': string;
}
