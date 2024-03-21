// emailLoginController.js
const {
  validateUserByEmailAndPassword,
} = require("../services/emailLoginService");

exports.loginByEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await validateUserByEmailAndPassword(email, password);
    if (isValidUser) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
