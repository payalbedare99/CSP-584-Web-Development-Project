const express = require("express");
const router = express.Router();

const Provider = require("../models/providerModel");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const Order = require("../models/orderModel");
const { Op } = require("sequelize");
const moment = require("moment");

// -----------------GET REQUESTS

const getOrder = async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "image"],
        },
        {
          model: Service,
          as: "service",
          attributes: ["name", "image", "price", "category"],
        },
        {
          model: Provider,
          as: "provider",
          attributes: ["hourly_rate", "image", "rating", "aboutme", "reviews"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name", "image"],
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      message: "Successfully Fetched !",
      orders: allOrders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong !",
      orders: null,
    });
  }
};

const getOrdersByDate = async (req, res) => {
  try {
    const { period } = req.query;
    const currentDate = new Date();
    let startDate, endDate;

    if (period === "lastMonth") {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
        23,
        59,
        59,
        999
      );
    } else if (period === "lastYear") {
      startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
      endDate = new Date(
        currentDate.getFullYear() - 1,
        11,
        31,
        23,
        59,
        59,
        999
      );
    }

    const allOrders = await Order.findAll({
      where: {
        orderedDate: {
          [Op.between]: [
            moment(startDate).format("YYYY-MM-DD 00:00:00"),
            moment(endDate).format("YYYY-MM-DD 23:59:59"),
          ],
        },
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "image"],
        },
        {
          model: Service,
          as: "service",
          attributes: ["name", "image", "price"],
        },
        {
          model: Provider,
          as: "provider",
          attributes: ["hourly_rate", "image", "rating", "aboutme", "reviews"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "image"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "Successfully Fetched!",
      orders: allOrders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({
      message: "Something Went Wrong!",
      orders: null,
    });
  }
};

// -----------------POST REQUESTS

const addOrder = async (req, res) => {
  try {
    console.log("=====>", req.body);
    const { user, service, provider, address, details, ...orderData } =
      req.body;
    orderData.userId = user;
    orderData.serviceId = service;
    orderData.providerId = provider;
    orderData.street = address.street;
    orderData.city = address.city;
    orderData.state = address.state;
    orderData.zipcode = address.zipcode;
    orderData.demand = details.demand;
    orderData.vehicleNeeded = details.vehicleNeeded;
    orderData.aptDate = details.aptDate;
    orderData.aptTime = details.aptTime;
    orderData.orderedDate = new Date();
    orderData.status = "Created";
    const newOrder = new Order(orderData);
    const addedOrder = await newOrder.save();
    return res.status(200).json({
      message: "Successfully Fetched !",
      order: addedOrder,
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).json({
      message: "Unable to add order at the moment !",
      order: null,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const [affectedRowsCount] = await Order.update(
      { status: status },
      { where: { id: orderId }, returning: true }
    );

    if (affectedRowsCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }

    const updatedOrder = await Order.findOne({
      where: { id: orderId },
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getOrder,
  addOrder,
  getOrdersByDate,
  updateOrder,
};
