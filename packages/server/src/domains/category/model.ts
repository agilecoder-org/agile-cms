import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
  name: string;
  slug: string;
  blog: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    blog: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("validate", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
