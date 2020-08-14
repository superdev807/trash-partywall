const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/keys");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();

app.listen(config.SERVER_PORT, () => {
  console.log(`Server listening on port ${config.SERVER_PORT}`);
});
