const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
const router = require("./routes");
const config = require("./config/keys");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
connectDB();

require("./config/passport")(passport);
app.use("/api", router);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server listening on port ${config.SERVER_PORT}`);
});
