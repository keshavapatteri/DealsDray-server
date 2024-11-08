import jwt from 'jsonwebtoken';

export const authAdmin = (req, res, next) => {
  try {
    // Extract token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the role is 'admin'
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied for ADMIN" });
    }

    // Attach admin details to the request object
    req.admin = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    // For other errors, return a generic 500 error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
