const expressApp = require("express");
const v1routes = expressApp.Router();

v1routes.use("/auth", require("./auth/index"));

module.exports = v1routes;
