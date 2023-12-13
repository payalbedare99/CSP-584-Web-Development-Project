const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");

const router = express.Router();

const pythonVersionCommand = "python --version";
const python3VersionCommand = "python3 --version";

let pythonCommand;
let pythonScriptPath;

const setPythonPath = async () => {
  try {
    await exec(python3VersionCommand);
    pythonCommand = "python3";
    pythonScriptPath = path.join(
      __dirname,
      "..",
      "PythonScript",
      "getRecommendedRepairmates.py"
    );
  } catch (error1) {
    try {
      await exec(pythonVersionCommand);
      pythonCommand = "python";
      pythonScriptPath = path.join(
        __dirname,
        "..",
        "PythonScript",
        "getRecommendedRepairmates.py"
      );
    } catch (error2) {
      console.error("Error: Python not found on the system.");
      process.exit(1);
    }
  }
};

setPythonPath();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// -----------------GET REQUESTS

const getRecommendedMates = async (req, res) => {
  const queryString = req.query.queryString;
  try {
    const { stdout, stderr } = await exec(
      `${pythonCommand} ${pythonScriptPath} ${queryString}`
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
  getRecommendedMates,
};
