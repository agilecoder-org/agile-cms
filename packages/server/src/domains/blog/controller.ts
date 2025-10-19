import { Request, Response } from "express";
import BlogModel from "./model";
import { ExtendedRequest } from "../auth/types";

export const createBlogSite = async (req: Request, res: Response) => {
  const {
    title,
    blog_logo,
    description,
    domain,
    endpoint,
    contact_mail,
    meta_title,
    meta_description,
    meta_keywords,
    category,
    language,
    index,
    canonical_url,
  } = req.body;

  try {
    const { user } = req as ExtendedRequest;

    if (!user.isOwner) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to create a blog.",
      });
    }

    const newBlog = new BlogModel({
      title,
      blog_logo,
      description,
      domain,
      endpoint,
      contact_mail,
      meta_title,
      meta_description,
      meta_keywords,
      category,
      language,
      index,
      canonical_url,
      status: "active",
      owner_user_id: user.userId,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      status: "success",
      message: "Blog created successfully!",
      data: savedBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong while creating the blog.",
      error: (error as Error).message,
    });
  }
};

export const getBlogSites = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find();

    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching the blogs.",
      error: (error as Error).message,
    });
  }
};

export const getBlogSiteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching the blog.",
      error: (error as Error).message,
    });
  }
};
