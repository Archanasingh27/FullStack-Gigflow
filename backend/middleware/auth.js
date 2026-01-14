import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

req.user = {
  id: decoded.id,
  roles: decoded.roles,
};

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication error",
      error: error.message,
    });
  }
};

export default isAuth;
