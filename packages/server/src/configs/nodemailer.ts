import dotenv from "dotenv";
dotenv.config();

export const nodemailerConfig = {
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_CLIENT_ID || "",
    pass: process.env.GMAIL_APP_PASSWORD || "",
  },
};
