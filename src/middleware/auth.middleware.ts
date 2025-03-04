const commonMessages = require("../helpers/commanMsg");
const { sendResponse } = require("../helpers/handleResponse");
const HttpStatus = require("../helpers/httpCodes");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            sendResponse(res, HttpStatus.UNAUTHORIZED, commonMessages.Unauthorized, null, true);
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            sendResponse(res, HttpStatus.UNAUTHORIZED, commonMessages.Unauthorized, null, true);
        }
        next();
    } catch (error) {
        sendResponse(res, error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR, null, true);
    }
}

module.exports = authMiddleware;