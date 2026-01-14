import jwt from "jsonwebtoken";

const genToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export default genToken;
