require("dotenv").config();
const express = require("express");
const routes = require("./src/router");

const PORT = process.env.PORT;
const app = express();
var cors = require("cors");
app.use(express.json());

app.use(cors());
app.use(routes);
app.use("/", async (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
