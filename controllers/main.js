const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password"); // 400 Bad Request
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
  // console.log(req.user); // { id: 5, username: 'blue' }

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
