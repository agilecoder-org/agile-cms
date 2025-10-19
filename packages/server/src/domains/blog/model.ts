import { Schema, model } from "mongoose";
import { IBlog } from "./types";

enum BlogStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    blog_logo: { type: String },
    description: { type: String },
    domain: { type: String, unique: true },
    endpoint: { type: String, required: true, unique: true },
    contact_mail: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: [String] },
    status: { type: String, enum: Object.values(BlogStatus), required: true},
    category: { type: String },
    language: { type: String, default: "en" },
    index: { type: Boolean, default: true },
    canonical_url: { type: String },
    owner_user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogModel = model("Blog", blogSchema);
export default BlogModel;
