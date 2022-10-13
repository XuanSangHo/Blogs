export interface Blogs {
  data: {
    items: Item[];
  };
  pagination: Pagination;
}

export interface Item {
  id: number;
  comments_count?: number;
  content: string;
  title: string;
  image: {
    url: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  count: number;
  page: number;
  offset: number;
  total: number;
  prev: number;
  next: number;
}

export interface BlogsDetail {
  data: Item;
}
