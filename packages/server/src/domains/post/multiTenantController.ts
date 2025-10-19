import { Request, Response } from "express";
import { ExtendedRequest } from "../auth/types";
import PostModel from "./model";

export const getPostsByBlogId = async (req: Request, res: Response) => {
  try {
    const blogId = (req as ExtendedRequest).blog?._id;
    if (!blogId) {
      return res.status(404).json({ status: "error", message: "Blog not found" });
    }

    const posts = await PostModel.find({ blog: blogId });

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const getPostByIdByBlogId = async (req: Request, res: Response) => {
  try {
    const blogId = (req as ExtendedRequest).blog?._id;
    if (!blogId) {
      return res.status(404).json({ status: "error", message: "Blog not found" });
    }

    const post = await PostModel.findOne({
      _id: req.params.id,
      blog: blogId,
    });

    if (!post) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};
