import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// This function is depricated { No Longer used, OTP is used instead }
export function generateHashedToken(): string {
  const token = process.env.VERIFICATION_TOKEN_SECRET || "";
  return bcrypt.hashSync(token + Date.now(), 10);
}
