const express = require("express");
const userRoute = require("./user.routes");
const itemRoute = require("./item.routes");
const router = express.Router();

router.use("/user", userRoute);
router.use("/item", itemRoute);

module.exports = router;
