import authRoute from "./auth";

const expressApp = require("express");
const v1routes = expressApp.Router();

v1routes.use("/auth", authRoute);

export default v1routes;