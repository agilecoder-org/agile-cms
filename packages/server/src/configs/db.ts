import mongoose from "mongoose";
import logger from "./logger";

export const connectDatabase = async (callback: () => void, retries = 5, delay = 3000) => {
  const dbUrl = process.env.DB_URL;

  console.log(dbUrl);
  
  if (!dbUrl) {
    logger.error("❌ DB_URL environment variable is not set!");
    process.exit(1);
  }

  for (let i = 0; i < retries; i++) {
    try {
      logger.info(`🔌 Connecting to MongoDB (attempt ${i + 1}/${retries})...`);
      await mongoose.connect(dbUrl);
      logger.info("✅ Connected to Database");
      callback();
      return;
    } catch (err: any) {
      logger.error(`❌ Connection attempt ${i + 1} failed: ${err.message}`);
      
      if (i < retries - 1) {
        logger.info(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        logger.error("❌ Could not connect to MongoDB after multiple attempts");
        process.exit(1);
      }
    }
  }
};