import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../domains/auth/types";

export const authorise = (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken;
    let deviceId;
    const isMobileApp = req.headers["client-type"] === "mobile_app";

    if (isMobileApp) {
      accessToken = req.headers.authorization?.split(" ")[1];
      deviceId = req.headers.deviceId;
    } else {
      accessToken = req.cookies?.accessToken;
      deviceId = req.cookies?.deviceId;
    }

    if (!accessToken) {
      return res.status(401).json({ error: "User not logged in" });
    }

    jwt.verify(accessToken, process.env.SECRET_KEY || "", async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Invalid access token" });
      }

      (req as ExtendedRequest).user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error in authorise middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
