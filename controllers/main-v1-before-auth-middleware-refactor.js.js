const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400); // 400 Bad Request
  }

  // Demo id only. Normally provided by db!
  const id = new Date().getDate();

  // Keep payload small
  // In production use long, complex, unguessable string value.
  // Payload will automatically include "iat", "exp"
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

/* Validation options
  - mongoose required validation 
  - Joi package. Set up entire layer of validation using Joi which will be sitting in front of all off our requests
  - Check here in the controlller
*/

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401); // normally 'Invalid credentials to access this route', 401 Invalid Credentials
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
