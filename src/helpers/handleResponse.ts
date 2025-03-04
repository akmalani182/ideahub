class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    // Ensure the correct prototype chain for CustomError instances
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

function sendResponse(res, statusCode, message, data = null, error = false) {
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

module.exports = { sendResponse, CustomError };
