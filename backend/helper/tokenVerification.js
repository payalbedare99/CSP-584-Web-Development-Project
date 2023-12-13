const jwt = require("jsonwebtoken");

//Function to verify token
const verifyToken = (req, res, next) => {
  //Create that authorization check in headers
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    // Convert into array and split at space
    const bearer = bearerHeader.split(" ");
    //get token value
    const bearerToken = bearer[1];
    //verify token
    const decoded = jwt.verify(bearerToken, "honeyGoindi");
    req.userData = decoded;
    //call next middleware
    next();
  } else {
    res.status(403).json({
      message: "Token Missing",
    });
  }
};

module.exports = verifyToken;

// const token = req.headers.authorization.spilt(" ")[1];
//const decoded = jwt.verify(token,'honeyGoindi')
