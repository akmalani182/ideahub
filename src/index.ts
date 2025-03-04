require("dotenv").config();
import { sequelize } from "./config/db";
import Routes from "./router/index";
const express = require("express");

const PORT = process.env.PORT;
const app = express();
var cors = require("cors");
app.use(express.json());

app.use(cors());
// sequelize.sync();
app.use(Routes);
app.use("/", async (req, res) => {
  res.send("Url you are trying to access is not found");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
