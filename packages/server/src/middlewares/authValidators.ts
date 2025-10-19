import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userRegisterSchema = Joi.object({
  username: Joi.string().min(8),
  email_address: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const userLoginSchema = Joi.object({
  login_id: Joi.string(),
  password: Joi.string().min(8).required(),
});

export const validateUserRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUserLoginInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
