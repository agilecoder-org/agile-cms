import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  host: 5,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
  host: "green",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

const transports = [new winston.transports.Console()];

interface CustomLogger extends winston.Logger {
  host(message: string): void;
}

const baseLogger = winston.createLogger({
  level: "host",
  levels,
  format,
  transports,
}) as winston.Logger;

const logger: CustomLogger = Object.assign(baseLogger, {
  host: (message: string) => {
    baseLogger.log("host", message);
  },
});

logger.host = (message: string) => {
  logger.log("host", message);
};

export default logger;
