import { Types } from "mongoose";

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  blog_logo?: string;
  description?: string;
  domain?: string;
  endpoint: string;
  contact_mail?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  category?: string;
  status: string;
  language?: string;
  index?: boolean;
  canonical_url?: string;
  owner_user_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
