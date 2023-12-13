const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const sequelize = require("./db/mysql");

//Importing Routes
const services = require("./routes/serviceRoute");
const users = require("./routes/userRoute");
const providers = require("./routes/providerRoute");
const orders = require("./routes/orderRoute");
const { connectMongo } = require("./db/mongo");
const { ObjectId } = require("mongodb");
const pythonS = require("./routes/pythonRunRoute");
const getLocationsPython = require("./routes/nearmeRouter");

async function startServer() {
  const app = express();
  const PORT = 9000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Welcome to RepairMate");
  });

  app.use("/api/service", services);

  app.use("/api/provider", providers);

  app.use("/api/user", users);

  app.use("/api/order", orders);

  app.use("/api/python_run", pythonS);

  app.use("/api/getNearMe", getLocationsPython);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  try {
    await sequelize.sync();
    console.log("Sequelize synchronized successfully!");
    //await productSeeder.up();
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error during synchronization or seeding:", error);
  }

  // Connect to MongoDB
  connectMongo()
    .then((mongoDb) => {
      const reviewsData = mongoDb.collection("reviews");
      app.get("/api/reviews", async (req, res) => {
        try {
          const reviews = await reviewsData.find().toArray();
          res.json(reviews);
        } catch (error) {
          console.error("Error retrieving reviews:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      app.get("/api/reviews/:providerId", async (req, res) => {
        try {
          const providerId = req.params.providerId;

          const reviews = await reviewsData
            .find({ providerId: providerId })
            .toArray();

          res.json(reviews);
        } catch (error) {
          console.error("Error retrieving reviews:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });

      app.post("/api/reviews", async (req, res) => {
        try {
          const existingProvider = await reviewsData.findOne({
            providerId: req.body.providerId,
          });

          const newReview = {
            userId: req.body.userId,
            userAge: req.body.userAge,
            userGender: req.body.userGender,
            userOccupation: req.body.userOccupation,
            reviewRating: parseInt(req.body.reviewRating),
            reviewText: req.body.reviewText,
          };

          if (existingProvider) {
            // Provider exists, update the document
            await reviewsData.updateOne(
              { providerId: req.body.providerId },
              {
                $push: {
                  reviews: newReview,
                },
                $set: {
                  averageRating: parseInt(
                    calculateAverageRating(
                      existingProvider.reviews.concat([newReview])
                    )
                  ),
                },
              }
            );
            res.status(200).json({
              message: "Review added successfully",
              providerId: req.body.providerId,
              averageRating: newReview.reviewRating,
              reviews: existingProvider.reviews.length,
            });
          } else {
            // Provider doesn't exist, create a new document
            const result = await reviewsData.insertOne({
              providerId: req.body.providerId,
              reviews: [newReview],
              averageRating: req.body.reviewRating,
            });

            if (result && result.insertedId) {
              res.status(200).json({
                message: "Review added successfully",
                providerId: req.body.providerId,
                averageRating: req.body.reviewRating,
                reviews: 1,
              });
            } else {
              console.error("Error inserting review: Invalid result", result);
              res.status(500).json({ error: "Internal Server Error" });
            }
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Something went wrong" });
        }
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      // Handle the error appropriately (e.g., exit the process, show an error message, etc.)
      process.exit(1);
    });
}

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce(
    (acc, review) => acc + review.reviewRating,
    0
  );
  return totalRating / reviews.length;
}

startServer();
