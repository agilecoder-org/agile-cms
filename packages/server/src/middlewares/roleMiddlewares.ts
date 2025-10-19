import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../domains/auth/types";

export const allowOwnersOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as ExtendedRequest).user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (user.isOwner) {
      return next();
    }

    return res.status(403).json({ error: "You are not an owner" });
  } catch (error) {
    console.error("Error in checking owner role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
