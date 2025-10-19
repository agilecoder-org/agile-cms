import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

import { nodemailerConfig } from "../../configs/nodemailer";
import { verificationTypes } from "../../utils/verificationTypes";

dotenv.config();

const transporter = nodemailer.createTransport(nodemailerConfig);

const getTemplatePath = (templateName: string) => {
  const projectRoot = process.cwd();
  const isProduction = process.env.NODE_ENV === "production";

  const templatesDir = isProduction
    ? path.join(projectRoot, "dist", "templates")
    : path.join(projectRoot, "src", "templates");

  return path.join(templatesDir, templateName);
};

export const sendVerificationEmail = (
  emailAddress: string | undefined,
  otp: string,
  type: string,
  username: string | undefined = "User"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!emailAddress) {
      reject("Email address is undefined or null");
      return;
    }

    let mailTemplatePath = getTemplatePath("email_verification_template.html");
    let mailSubject = "OTP for Email Verification | Secure Passwords";

    if (type === verificationTypes.password_reset) {
      mailTemplatePath = getTemplatePath("password_reset_template.html");
      mailSubject = "OTP for Password Reset | Secure Passwords";
    }

    if (type === verificationTypes.new_email_verification) {
      mailTemplatePath = getTemplatePath("email_change_template.html");
      mailSubject = "OTP for Email Change | Secure Passwords";
    }

    fs.readFile(mailTemplatePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.error("Error reading email template:", err);
        reject("Failed to load email template");
        return;
      }

      const html = data.replace("{{otp}}", otp).replace("{{username}}", username);

      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.GMAIL_CLIENT_ID || "",
        to: emailAddress,
        subject: mailSubject,
        html: html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject("Failed to send email");
          return;
        }
        console.log("Email sent:", info.response);
        resolve(info.response);
      });
    });
  });
};

export const checkTransporterStatus = () => {
  transporter.verify(function (error, success) {
    if (error) {
      console.error("Error verifying transporter:", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};
