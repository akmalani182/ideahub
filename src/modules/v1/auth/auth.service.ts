
import { CustomError } from "../../../helpers/handleResponse";
import { comparePassword, getTokens, hashPassword, verifyToken } from "../../../helpers/utils";
import HttpStatus = require("../../../helpers/httpCodes");
import { loginValidation, registerValidation } from "./auth.validation";
import { createDataQuery, getOneDataQuery } from "../../../helpers/dbQuery";
import User from "../../../models/user.model";
import { commonMessages } from "../../../helpers/commanMsg";

const loginService = async (req) => {
  try {
    const { value, error } = loginValidation(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    const user = await getOneDataQuery(User, { email: value.email }, ["id", "email", "password", "role"]);

    if (!user) {
      throw new CustomError(
        commonMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }

    const isPasswordMatch = await comparePassword(value.password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(
        commonMessages.INVALID_PASSWORD,
        HttpStatus.UNAUTHORIZED
      );
    }
    const { id, role } = user.dataValues;

    const token = await getTokens({ userId: id, role: role });

    return token;
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const registerService = async (req) => {
  try {
    const { value, error } = registerValidation(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }
    const password = await hashPassword(value.password);

    await createDataQuery(User, { ...value, password });

    return {};
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const refreshTokenService = async (req) => {
  try {
    const { refreshToken } = req.body;
    const decoded = await verifyToken(refreshToken) as { userId: string, role: string };

    if (!decoded.userId) {
      throw new CustomError(
        commonMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }
    const { userId, role } = decoded;
    const token = await getTokens({ userId, role }) as { accessToken: string };

    return { accessToken: token.accessToken };
  } catch (error) {
    throw new CustomError(
      error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export default { loginService, registerService, refreshTokenService };