const express = require("express");
const router = express.Router();

const Service = require("../models/serviceModel");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// -----------------GET REQUESTS

const getService = async (req, res) => {
  try {
    const allServices = await Service.findAll();
    return res.status(200).json({
      message: "Successfully Fetched !",
      services: allServices,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong !",
      services: null,
    });
  }
};

// -----------------POST REQUESTS

const addService = async (req, res) => {
  try {
    const newService = new Service({ ...req.body });
    const addedService = await newService.save();
    return res.status(200).json({
      message: "Successfully Fetched !",
      services: addedService,
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).json({
      message: "Unable to add service at the moment !",
      services: null,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { serviceId, status } = req.body;
    const [affectedRowsCount] = await Service.update(
      { status: status },
      { where: { id: serviceId }, returning: true }
    );

    if (affectedRowsCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "service not found" });
    }

    const updatedService = await Service.findOne({
      where: { id: serviceId },
    });

    return res.status(200).json({ success: true, service: updatedService });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.body;

    // Assuming you have a Service model
    const deletedService = await Service.destroy({
      where: {
        id: serviceId,
      },
    });

    if (deletedService) {
      return res.status(200).json({
        message: "Service successfully deleted!",
      });
    } else {
      return res.status(404).json({
        message: "Service not found or already deleted.",
      });
    }
  } catch (err) {
    console.error("Error deleting service:", err);
    return res.status(500).json({
      message: "Unable to delete service at the moment.",
    });
  }
};

module.exports = {
  getService,
  addService,
  deleteService,
  updateService,
};
