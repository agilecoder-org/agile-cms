import { Request, Response, NextFunction } from "express";
import ApiKeyModel from "../domains/api_key/model";
import BlogModel from "../domains/blog/model";
import { ExtendedRequest } from "../domains/auth/types";

function extractApiKey(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
}

export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = extractApiKey(req.headers.authorization);
  const host = req.hostname?.toLowerCase().split('.')[0];
  console.log(apiKey, host);
  if (!apiKey) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  try {
    const blog = await BlogModel.findOne({ endpoint: host });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found for this host" });
    }

    const keyRecord = await ApiKeyModel.findOne({ blogId: blog._id, key: apiKey });
    if (!keyRecord) {
      return res.status(403).json({ message: "Invalid API Key" });
    }

    keyRecord.lastUsed = new Date();
    await keyRecord.save();

    (req as ExtendedRequest).blog = blog;
    (req as ExtendedRequest).apiKey = keyRecord;
    next();
  } catch (err) {
    console.error("API key check error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
