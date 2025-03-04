import { commonMessages } from "../../../helpers/commanMsg";
import { sendResponse } from "../../../helpers/handleResponse";
import HttpStatus = require("../../../helpers/httpCodes");
import ideaService from "./idea.service";

const createIdea = async (req, res) => {
    try {
        const result = await ideaService.createIdeaService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.IDEA_SUBMITED,
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

const createComment = async (req, res) => {
    try {
        const result = await ideaService.createCommentService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.COMMENT_ADDED,
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

const createVote = async (req, res) => {
    try {
        const result = await ideaService.createVoteService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.VOTE_ADDED,
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

const getIdeaById = async (req, res) => {
    try {
        const result = await ideaService.getIdeaService(req);
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

const getAllIdeas = async (req, res) => {
    try {
        const result = await ideaService.getIdeasService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SUCCESS,
            result
        );
    }
    catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
}

const getAllAdminIdeas = async (req, res) => {
    try {
        const result = await ideaService.getAllAdminIdeasService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.SUCCESS,
            result
        );
    }
    catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

const updateIdea = async (req, res) => {
    try {
        const result = await ideaService.updateIdeaService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.IDEA_UPDATED,
            result
        );
    }
    catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

const deleteIdea = async (req, res) => {
    try {
        const result = await ideaService.deleteIdeaService(req);
        return sendResponse(
            res,
            HttpStatus.OK,
            commonMessages.IDEA_DELETED,
            result
        );
    }
    catch (error) {
        return sendResponse(
            res,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message || commonMessages.INTERNAL_SERVER_ERROR,
            null,
            true
        );
    }
};

export default { createIdea, createComment, createVote, getIdeaById, getAllIdeas, getAllAdminIdeas, updateIdea, deleteIdea };