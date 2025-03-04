const authRoute = require("express").Router();
import authController from "../../../modules/auth/auth.controller";

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.post("/refresh", authController.refreshToken);

export default authRoute;
