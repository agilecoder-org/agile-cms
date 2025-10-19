import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ExtendedRequest } from "../domains/user/types";

const generateFingerprint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingDeviceId = req.cookies.deviceId;

    if (!existingDeviceId || existingDeviceId === "undefined") {
      const deviceId = uuidv4();
      (req as ExtendedRequest).deviceId = deviceId;
    } else {
      (req as ExtendedRequest).deviceId = existingDeviceId;
    }
  } catch (error) {
    console.log("Error Fetching Device ID");
  }
  next();
};

export default generateFingerprint;
