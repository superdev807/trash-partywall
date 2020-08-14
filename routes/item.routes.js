const express = require("express");
const { checkAccessToken } = require("../middlewares/check-token-permission");
const controller = require("../controllers/item.controller.js");
const router = express.Router();

router.get("/", checkAccessToken, controller.list);
router.post("/create", checkAccessToken, controller.create);
router.delete("/:id", checkAccessToken, controller.delete);
// router.patch("/:id", checkAccessToken, controller.update); // update

module.exports = router;
