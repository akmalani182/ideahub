import { commonMessages } from "../helpers/commanMsg";
import { sendResponse } from "../helpers/handleResponse";
import HttpStatus = require("../helpers/httpCodes");
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            sendResponse(res, HttpStatus.UNAUTHORIZED, commonMessages.UNAUTHORIZED, null, true);
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            sendResponse(res, HttpStatus.UNAUTHORIZED, commonMessages.UNAUTHORIZED, null, true);
        }
        next();
    } catch (error) {
        sendResponse(res, error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR, null, true);
    }
}
