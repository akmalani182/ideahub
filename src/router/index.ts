const Routes = require("express").Router();

Routes.use("/v1", require("./V1/index"));

module.exports = Routes;
