import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "./model";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import PermissionsModel from "../permission/model";

export const registerUser = async (req: Request, res: Response) => {
  const { email_address, username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email: email_address }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "Email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email: email_address,
      username,
      password: hashedPassword,
    });

    if ((await UserModel.countDocuments()) === 1) {
      const OwnerPermission = await PermissionsModel.create({
        user_id: newUser._id,
        role: "owner",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const verifyUserEmail = async (req: Request, res: Response) => {};

export const loginUser = async (req: Request, res: Response) => {
  const { login_id, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: login_id }, { username: login_id }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found with this email or username",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    user.last_login = new Date();
    await user.save();

    const isOwner = await PermissionsModel.findOne({
      user_id: user._id,
      role: "owner",
    });

    const tokenDetails = {
      userId: user._id,
      username: user.username,
      isOwner: isOwner ? true : false,
    };

    const accessToken = jwt.sign(tokenDetails, process.env.SECRET_KEY || "", {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(tokenDetails, process.env.REFRESH_SECRET_KEY || "", { expiresIn: "7d" });

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      priority: "high",
    });

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      priority: "high",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        lastLogin: user.last_login,
        emailVerified: user.email_verified,
        userId: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    priority: "high",
  });

  res.clearCookie("refreshToken", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    priority: "high",
  });

  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
};

export const resetPassword = async (req: Request, res: Response) => {};

export const checkFirstUser = async (req: Request, res: Response) => {
  try {
    const userCount = await UserModel.countDocuments();

    if (userCount === 0) {
      return res.status(200).json({
        status: "success",
        message: "No users found",
        data: {
          isFirstUser: true,
        },
      });
    }

    res.status(200).json({
      status: "success",
      message: "Users found",
      data: {
        isFirstUser: false,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};
