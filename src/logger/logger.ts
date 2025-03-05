import path = require("path");

const winston = require("winston");
require("winston-daily-rotate-file");

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../../logs", "app-%DATE%.log"), // Log file pattern
    datePattern: "YYYY-MM-DD", // Rotate logs daily
    zippedArchive: false, // Don't compress logs
    maxSize: "20m", // Max size of each log file
    maxFiles: "14d", // Keep logs for 14 days
});


const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        dailyRotateFileTransport,
    ]
});

export default logger;
