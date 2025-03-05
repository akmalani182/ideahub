require("dotenv").config();
import rateLimit from "express-rate-limit";
import { sequelize } from "./config/db";
import Routes from "./router/index";
import { commonMessages } from "./helpers/commanMsg";
const express = require("express");
const fs = require("fs");
const https = require("https");

const PORT = process.env.PORT;
const app = express();
var cors = require("cors");
app.use(express.json());

const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(",") : [];

app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ message: commonMessages.ACCESS_DENIED });
  }
  next();
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { message: commonMessages.TOO_MANY_REQ },
  headers: true,
  keyGenerator: (req) => req.ip,
});

app.use(limiter);
app.use(cors());
// sequelize.sync();
app.use(Routes);
app.use("/", async (req, res) => {
  res.send(commonMessages.URL_NOT_FOUND);
});

export default app;
const sslOptions = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
