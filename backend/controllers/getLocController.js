const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const router = express.Router();
const pythonCommand = "python";
const pythonScriptPath =
  "/Users/pramodcgowda/Desktop/learn/Courses_Additional/EWA/Project/RepairMate/backend/PythonScript/getLocationsPython.py";

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// -----------------GET REQUESTS

const getLocationsPython = async (req, res) => {
  try {
    const { stdout, stderr } = await exec(
      `${pythonCommand} ${pythonScriptPath}`
    );
    const pythonOutput = stdout.trim();

    console.log("Python script output:", pythonOutput);

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
    }

    if (pythonOutput === "") {
      return res.status(404).json({ error: "Empty String" });
    }

    return res.status(200).json({
      message: "Successfully Fetched!",
      op: pythonOutput,
    });
  } catch (error) {
    console.error("Error executing Python script:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLocationsPython,
};
