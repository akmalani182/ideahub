import { sequelize } from "../config/db";
import Idea from "../models/idea.model";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getTokens = async (data: { userId: string, role: string }): Promise<{}> => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
  });
  return { accessToken, refreshToken };
};

export const verifyToken = async (token: string): Promise<{}> => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export const getApprovedIdeas = async (page = 1, limit = 10, status: string | string[]) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Idea.findAndCountAll({
    where: { status },
    attributes: [
      'id',
      'title',
      'description',
      [sequelize.literal(`(
                SELECT COUNT(*) FROM "votes" WHERE "votes"."ideaId" = "idea"."id"
            )`), 'votes']
    ],
    order: [[sequelize.literal('votes'), 'DESC']],
    limit,
    offset,
    subQuery: false
  });

  return {
    ideas: rows,
    total: count
  };
};

export const getIdeas = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Idea.findAndCountAll({
    attributes: [
      'id',
      'title',
      'description',
      'status'
    ],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    ideas: rows,
    total: count
  };
};