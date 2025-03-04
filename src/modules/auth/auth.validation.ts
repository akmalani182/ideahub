import Joi = require("joi");

export const registerValidation = (data: Record<string, string>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

export const loginValidation = (data: Record<string, string>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};