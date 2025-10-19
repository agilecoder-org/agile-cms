import { Request, Response } from "express";
import PostModel from "./model";
import BlogModel from "../blog/model";
import { ExtendedRequest } from "../auth/types";

export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      endpoint,
      title,
      slug,
      description,
      content,
      header_img_url,
      category,
      status,
      is_featured,
      is_scheduled,
      scheduled_date,
      published_on,
      reviewer,
    } = req.body;

    const blog = await BlogModel.findOne({ endpoint });
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found for this endpoint",
      });
    }

    const existing = await PostModel.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        status: "error",
        message: "A post with this slug already exists. Please choose another slug.",
      });
    }

    const userId = (req as ExtendedRequest).user.userId;

    const newPost = new PostModel({
      blog: blog._id,
      title,
      slug,
      description,
      content,
      header_img_url,
      category,
      status,
      is_featured,
      is_scheduled,
      scheduled_date,
      published_on,
      author: userId,
      reviewer,
    });

    const savedPost = await newPost.save();

    res.status(200).json({
      status: "success",
      data: savedPost,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(409).json({
        status: "error",
        message: "Slug must be unique. This one is already taken.",
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const { endpoint } = req.query;

  const blog: any = await BlogModel.findOne({ endpoint });
  console.log(blog, endpoint)

  try {
    const posts = await PostModel.find({ blog: blog._id })
      .populate("blog", "title")
      .populate("category", "name")
      .populate("author", "username email")
      .populate("reviewer", "username email");

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    _id,
    title,
    slug,
    description,
    content,
    header_img_url,
    category,
    status,
    is_featured,
    is_scheduled,
    scheduled_date,
    published_on,
    reviewer,
  } = req.body;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        content,
        header_img_url,
        category,
        status,
        is_featured,
        is_scheduled,
        scheduled_date,
        published_on,
        reviewer,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedPost,
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(409).json({
        status: "error",
        message: "Slug must be unique. This one is already taken.",
      });
    }

    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id)
      .populate("blog", "title")
      .populate("category", "name")
      .populate("author", "username email")
      .populate("reviewer", "username email");

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};


