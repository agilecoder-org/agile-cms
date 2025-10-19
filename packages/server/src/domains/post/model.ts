import { Schema, model } from "mongoose";
import { IPost } from "./types";

const PostSchema = new Schema<IPost>(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    content: { type: Schema.Types.Mixed, required: true },
    header_img_url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    is_featured: { type: Boolean, default: false },
    is_scheduled: { type: Boolean, default: false },
    scheduled_date: { type: Date },
    published_on: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

PostSchema.index({ blog: 1, status: 1 });

const PostModel = model<IPost>("Post", PostSchema);

export default PostModel;
