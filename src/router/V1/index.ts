import { adminRole, authMiddleware } from "../../middleware/auth.middleware";
import adminIdeaRoute from "./admin";
import authRoute from "./auth";
import ideaRoute from "./idea";

const expressApp = require("express");
const v1routes = expressApp.Router();

v1routes.use("/auth", authRoute);
v1routes.use("/idea", authMiddleware, ideaRoute);
v1routes.use("/admin/idea", authMiddleware, adminRole, adminIdeaRoute);

export default v1routes;