import logger from "../logger/logger";

export class CustomError extends Error {
  status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
    // Ensure the correct prototype chain for CustomError instances
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function sendResponse(
  res,
  statusCode: number,
  message: string,
  data = null,
  error = false
) {
  const startTime = Date.now();
  if (error) {
    logger.error(JSON.stringify({
      statusCode,
      message,
      data,
      error,
      time: Date.now() - startTime
    }));
    return res
      .status(statusCode)
      .json({ error: true, status: statusCode, message, data: null });
  } else {
    logger.info(JSON.stringify({
      statusCode,
      message,
      data,
      error,
      time: Date.now() - startTime
    }))
    return res
      .status(statusCode)
      .json({ error: false, status: statusCode, message, data });
  }
}
