import { commonMessages } from "../../../helpers/commanMsg";
import { sendResponse } from "../../../helpers/handleResponse";
import HttpStatus = require("../../../helpers/httpCodes");

import authService from "./auth.service";
// const { Request, Response } = require("express");

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginService(req);
    return sendResponse(
      res,
      HttpStatus.OK,
      commonMessages.LOGIN_SUCCESS,
      result
    );
  } catch (error) {
    return sendResponse(
      res,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || commonMessages.INTERNAL_SERVER_ERROR,
      null,
      true
    );
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerService(req);
    return sendResponse(
      res,
      HttpStatus.OK,
      commonMessages.REGISTER_SUCCESS,
      result
    );
  } catch (error) {
    return sendResponse(
      res,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || commonMessages.INTERNAL_SERVER_ERROR,
      null,
      true
    );
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.refreshTokenService(req);
    return sendResponse(
      res,
      HttpStatus.OK,
      commonMessages.SUCCESS,
      result
    );
  } catch (error) {
    return sendResponse(
      res,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || commonMessages.INTERNAL_SERVER_ERROR,
      null,
      true
    );
  }
};

export default { login, register, refreshToken };