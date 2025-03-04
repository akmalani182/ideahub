const ideaRoute = require("express").Router();
import ideaController from "../../../modules/v1/idea/idea.controller";

ideaRoute.get("/", ideaController.getAllIdeas);
ideaRoute.get("/:id", ideaController.getIdeaById);
ideaRoute.post("/", ideaController.createIdea);
ideaRoute.post("/:id/comments", ideaController.createComment);
ideaRoute.post("/:id/votes", ideaController.createVote);

export default ideaRoute;