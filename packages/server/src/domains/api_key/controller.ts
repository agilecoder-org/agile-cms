import { Request, Response } from "express";
import { ExtendedRequest } from "../auth/types";
import ApiKeyModel from "./model";
import crypto from "crypto";
import { checkUserIsOwner } from "../../utils/permission";
import BlogModel from "../blog/model";
import { IBlog } from "../blog/types";

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name, endpoint, origin } = req.body;
    const { userId } = (req as ExtendedRequest).user;

    const blog: IBlog | null = await BlogModel.findOne({ endpoint });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const ownsThisBlog = await checkUserIsOwner(userId);
    if (!ownsThisBlog) {
      return res.status(403).json({ message: "You are not authorized to create API keys" });
    }

    const key = crypto.randomBytes(32).toString("hex");

    const newKey = await ApiKeyModel.create({
      name,
      key,
      blogId: blog._id,
      origin
    });

    res.status(201).json({ status: "success", data: newKey });
  } catch (error) {
    console.error("Error creating API key:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getApiKeysByBlog = async (req: Request, res: Response) => {
  try {
    const { endpoint } = req.query;
    const { user } = req as ExtendedRequest;

    if (!user?.isOwner) {
      return res.status(403).json({ message: "You are not authorized to view API keys" });
    }

    const blog = await BlogModel.findOne({ endpoint });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const keys = await ApiKeyModel.find({ blogId: blog._id }).select("-__v");

    res.status(200).json({ status: "success", data: keys });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteApiKey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req as ExtendedRequest;

    if (!user?.isOwner) {
      return res.status(403).json({ message: "You are not authorized to delete API keys" });
    }

    const deleted = await ApiKeyModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "API key not found" });
    }

    res.status(200).json({ status: "success", message: "API key deleted" });
  } catch (error) {
    console.error("Error deleting API key:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

