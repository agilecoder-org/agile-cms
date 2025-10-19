export interface Post {
  _id?: string;
  endpoint: string;
  title: string;
  slug: string;
  description?: string;
  content: any;
  blog: { _id: string };
  author: { _id: string};
  header_img_url?: string;
  category?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_scheduled: boolean;
  scheduled_date?: Date;
  published_on?: Date;
  updated_at?: Date;
  reviewer?: string;
  tags?: string[];
  createdAt?: any
  updatedAt?: any
}
