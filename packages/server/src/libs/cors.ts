import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export const corsFix = cors(corsOptions);
