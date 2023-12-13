const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

router.get("/", serviceController.getService);

router.put("/", serviceController.updateService);

router.post("/add", serviceController.addService);

router.delete("/:id", serviceController.deleteService);

module.exports = router;
