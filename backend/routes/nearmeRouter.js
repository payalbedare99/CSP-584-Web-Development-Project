const express = require("express");
const getLocController = require("../controllers/getLocController");

const router = express.Router();

router.get("/", getLocController.getLocationsPython);

module.exports = router;
