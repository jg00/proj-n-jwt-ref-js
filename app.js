require("dotenv").config();
require("express-async-errors"); // for our async controllers.  throw new Error(msg) will pass on to our custom error handler.

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware); // handle 404 - route not found
app.use(errorHandlerMiddleware); // custom error handler

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
