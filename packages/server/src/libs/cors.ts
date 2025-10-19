import cors from "cors";

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export const corsFix = cors(corsOptions);
