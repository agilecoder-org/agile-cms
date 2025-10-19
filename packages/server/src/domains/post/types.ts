import { Types } from "mongoose";

export interface IPost extends Document {
  blog: Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  content: string;
  header_img_url?: string;
  category?: Types.ObjectId;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  is_scheduled: boolean;
  scheduled_date?: Date;
  published_on?: Date;
  updated_at?: Date;
  author: Types.ObjectId;
  reviewer?: Types.ObjectId;
}
