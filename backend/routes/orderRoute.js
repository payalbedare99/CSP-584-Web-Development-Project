const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("/", orderController.getOrder);

router.get("/orders", orderController.getOrdersByDate);

router.post("/add", orderController.addOrder);

router.put("/", orderController.updateOrder);

module.exports = router;
