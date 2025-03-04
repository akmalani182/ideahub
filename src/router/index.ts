import v1routes from "./V1";

const Routes = require("express").Router();

Routes.use("/v1", v1routes);

export default Routes;