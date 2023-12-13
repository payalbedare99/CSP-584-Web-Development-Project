const { MongoClient } = require("mongodb");

const mongoUrl =
  "mongodb+srv://pramodcgwd50:mH5Kc53lwA7yjBQI@ewa.ga9tynk.mongodb.net/repairmate?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const db = client.db();
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectMongo };
