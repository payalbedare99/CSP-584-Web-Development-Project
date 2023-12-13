const express = require("express");
const providerController = require("../controllers/providerController");

const router = express.Router();

router.get("/", providerController.getProvider);

router.get("/:id", providerController.getProviderById);

router.post("/add", providerController.addProvider);

router.put("/", providerController.updateProvider);

router.put("/status", providerController.updateProviderStatus);

module.exports = router;
