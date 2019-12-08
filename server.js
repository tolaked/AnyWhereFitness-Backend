const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const users = require("./routes/users");
const instructor = require("./routes/instructor");

const app = express();
// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    data: [
      {
        message: "Welcome to AnyWhere_Fitness"
      }
    ]
  });
});

app.use("/api/auth", users);
app.use("/instructor", instructor);

app.all("*", (req, res) => {
  return res.status(404).send({
    status: 404,
    error: "Route does not exist"
  });
});
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send({
      status: 500,
      error: "internal server error"
    });
  }
  return next();
});

// Define application port number.
const port = process.env.PORT || 6000;

// Start server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// expose app to be use in another file
module.exports = app;
