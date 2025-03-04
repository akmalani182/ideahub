require("dotenv").config();
import Routes from "./router/index";
const express = require("express");

const PORT = process.env.PORT;
const app = express();
var cors = require("cors");
app.use(express.json());

app.use(cors());
app.use(Routes);
app.use("/", async (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
