const express = require("express");
const router = express.Router();

const Provider = require("../models/providerModel");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");

// -----------------GET REQUESTS

const getProvider = async (req, res) => {
  try {
    const allProviders = await Provider.findAll({
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
      ],
    });
    res.status(200).json({
      message: "Successfully Fetched !",
      providers: allProviders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong !",
      providers: null,
    });
  }
};

const getProviderById = async (req, res) => {
  try {
    const providerId = decodeURIComponent(req.params.id);
    const provider = await Provider.findByPk(providerId);

    console.log(provider);
    return res.status(200).json({
      message: "Successfully Fetched !",
      provider: provider,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong !",
      providers: null,
    });
  }
};

// -----------------POST REQUESTS

const addProvider = async (req, res) => {
  try {
    const { user, service, ...providerData } = req.body;
    providerData.userId = user;
    providerData.serviceId = service;
    const newProvider = new Provider(providerData);
    const addedProvider = await newProvider.save();
    return res.status(200).json({
      message: "Successfully Fetched !",
      providers: addedProvider,
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).json({
      message: "Unable to add service at the moment !",
      providers: null,
    });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { providerId, rating, reviews } = req.body;

    const [affectedRowsCount] = await Provider.update(
      { rating: rating, reviews: reviews },
      { where: { id: providerId }, returning: true }
    );

    if (affectedRowsCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "provider not found" });
    }

    const updatedProvider = await Provider.findOne({
      where: { id: providerId },
    });

    return res.status(200).json({ success: true, provider: updatedProvider });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateProviderStatus = async (req, res) => {
  try {
    const { providerId, status } = req.body;

    const [affectedRowsCount] = await Provider.update(
      { status: status },
      { where: { id: providerId }, returning: true }
    );

    if (affectedRowsCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "provider not found" });
    }

    const updatedProvider = await Provider.findOne({
      where: { id: providerId },
    });

    return res.status(200).json({ success: true, provider: updatedProvider });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getProvider,
  addProvider,
  getProviderById,
  updateProvider,
  updateProviderStatus,
};
