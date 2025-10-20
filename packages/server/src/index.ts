import { connectDatabase } from "./configs/db";
import app from "./server";
import dotenv from "dotenv";
import { cronJobs } from "./jobs/cron";
import logger from "./configs/logger";

dotenv.config();
const PORT = Number(process.env.PORT) || 3001;

connectDatabase(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT} 🚀`);
    cronJobs();
  });
});
