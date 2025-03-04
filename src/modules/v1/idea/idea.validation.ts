import Joi = require("joi");


export const createIdeaValidation = (data: Record<string, string>) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    });
    return schema.validate(data);
};

export const createCommentValidation = (data: Record<string, string>) => {
    const schema = Joi.object({
        comment: Joi.string().required(),
    });
    return schema.validate(data);
};

export const createVoteValidation = (data: Record<string, string>) => {
    const schema = Joi.object({
        voteType: Joi.string().required().allow("up", "down"),
    });
    return schema.validate(data);
}

export const updateIdeaValidation = (data: Record<string, string>) => {
    const schema = Joi.object({
        status: Joi.string().required().allow("approved", "rejected"),
    });
    return schema.validate(data);
}