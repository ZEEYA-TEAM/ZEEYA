const loginService = require("../services/loginService");

exports.loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const userExists = await loginService.findPersonByNameAfterFetch(username);

    if (userExists) {
      // If the user is found, send a success response
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      // If the user is not found, send a failure response
      res
        .status(404)
        .json({ success: false, message: "Username not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
