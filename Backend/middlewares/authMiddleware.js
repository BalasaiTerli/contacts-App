const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader); // Log the header

  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach user ID to request
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return res.status(401).json({ message: "Invalid token" });
  }
};
