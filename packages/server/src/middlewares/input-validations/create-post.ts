import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export const postSchema = Joi.object({
  endpoint: Joi.string().required(),
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  slug: Joi.string().required().messages({
    "string.empty": "Slug is required.",
  }),
  description: Joi.string().allow(""),
  content: Joi.required(),
  header_img_url: Joi.string().uri().allow(""),
  category: Joi.string().hex().length(24).required().messages({
    "string.length": "Category must be a valid MongoDB ObjectId.",
    "string.empty": "Category is required.",
  }),
  status: Joi.string().valid("draft", "published").required(),
  is_featured: Joi.boolean(),
  is_scheduled: Joi.boolean(),
  scheduled_date: Joi.date().optional().allow(null),
  published_on: Joi.date().optional().allow(null),
  reviewer: Joi.string().hex().length(24).optional().allow(null, ""),
});

export const validatePostInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = postSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((d) => d.message)[0];
    return res.status(400).json({ status: "error", message: messages });
  }

  next();
};
