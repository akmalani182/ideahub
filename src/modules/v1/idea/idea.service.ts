import { commonMessages } from "../../../helpers/commanMsg";
import { createDataQuery, getOneDataQuery, updateDataQuery } from "../../../helpers/dbQuery";
import { CustomError } from "../../../helpers/handleResponse";
import HttpStatus = require("../../../helpers/httpCodes");
import { getApprovedIdeas, getIdeas } from "../../../helpers/utils";
import Comments from "../../../models/comments.model";
import Idea from "../../../models/idea.model";
import User from "../../../models/user.model";
import Votes from "../../../models/vote.model";
import { createCommentValidation, createIdeaValidation, createVoteValidation, updateIdeaValidation } from "./idea.validation";


const createIdeaService = async (req) => {
    try {
        const { value, error } = createIdeaValidation(req.body);

        if (error) {
            throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }
        await createDataQuery(Idea, value);

        return {};
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const createCommentService = async (req) => {
    try {
        const { value, error } = createCommentValidation(req.body);

        const { id } = req.params;

        if (!id) {
            throw new CustomError(commonMessages.IDEA_ID_REQUIRED, HttpStatus.BAD_REQUEST);
        }
        if (error) {
            throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }

        await createDataQuery(Comments, { ...value, ideaId: id, userId: req.user.userId });

        return {};
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}

const createVoteService = async (req) => {
    try {
        const { id } = req.params;

        const { value, error } = createVoteValidation(req.body);

        if (error) {
            throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }

        if (!id) {
            throw new CustomError(commonMessages.IDEA_ID_REQUIRED, HttpStatus.BAD_REQUEST);
        }

        const vote = await Votes.findOne({
            where: {
                ideaId: id,
                userId: req.user.userId
            }
        });

        if (vote && vote.dataValues?.voteType === value.voteType) {
            throw new CustomError(commonMessages.VOTE_EXIST, HttpStatus.BAD_REQUEST);
        } else if (vote) {
            await updateDataQuery(Votes, { voteType: value.voteType }, { ideaId: id, userId: req.user.userId });
        } else {
            await createDataQuery(Votes, { voteType: value?.voteType, ideaId: id, userId: req.user.userId });
        }
        const totalVotes = await Votes.count({
            where: {
                ideaId: id
            }
        });

        return { totalVotes };
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const getIdeaService = async (req) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new CustomError(commonMessages.IDEA_ID_REQUIRED, HttpStatus.BAD_REQUEST);
        }

        const IdeaInclude = [
            {
                model: Comments,
                as: "comments",
                attributes: ["comment"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "username", "email"]
                    }
                ],
                raw: true
            }
        ]
        const idea = await getOneDataQuery(Idea, { id }, ["id", "title", "description"], IdeaInclude);

        const totalVotes = await Votes.count({
            where: {
                ideaId: id
            }
        });


        if (!idea) {
            throw new CustomError(commonMessages.IDEA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const IdeaDetails = {
            id: idea.dataValues.id,
            title: idea.dataValues.title,
            description: idea.dataValues.description,
            comments: idea.dataValues.comments.map((item) => ({
                content: item?.dataValues?.comment,
                username: item?.dataValues?.user?.username
            })),
            votes: totalVotes
        }
        return IdeaDetails;
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const getIdeasService = async (req) => {
    try {
        const { page, limit } = req.query;

        const ideaDetails = await getApprovedIdeas(page, limit, "approved");

        return ideaDetails;
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const getAllAdminIdeasService = async (req) => {
    try {
        const { page, limit } = req.query;

        const ideaDetails = await getIdeas(page, limit);

        return ideaDetails;
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}

const updateIdeaService = async (req) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new CustomError(commonMessages.IDEA_ID_REQUIRED, HttpStatus.BAD_REQUEST);
        }

        const { value, error } = updateIdeaValidation(req.body);

        if (error) {
            throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
        }

        await updateDataQuery(Idea, value, { id });

        return {};
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const deleteIdeaService = async (req) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new CustomError(commonMessages.IDEA_ID_REQUIRED, HttpStatus.BAD_REQUEST);
        }

        await Idea.destroy({
            where: {
                id
            }
        });

        return {};
    } catch (error) {
        throw new CustomError(
            error.message,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export default {
    createIdeaService,
    createCommentService,
    createVoteService,
    getIdeaService,
    getIdeasService,
    getAllAdminIdeasService,
    updateIdeaService,
    deleteIdeaService
};