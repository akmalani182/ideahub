const adminIdeaRoute = require("express").Router();
import ideaController from "../../../modules/v1/idea/idea.controller";

adminIdeaRoute.get("/", ideaController.getAllAdminIdeas);
adminIdeaRoute.put("/:id", ideaController.updateIdea);
adminIdeaRoute.delete("/:id", ideaController.deleteIdea);

export default adminIdeaRoute;