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
  if (error) {
    return res
      .status(statusCode)
      .json({ error: true, status: statusCode, message, data: null });
  } else {
    return res
      .status(statusCode)
      .json({ error: false, status: statusCode, message, data });
  }
}
