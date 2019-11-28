import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import users from "./routes/users";

const app = express();
// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    data: [
      {
        message: "Welcome to AnyWhere_Fitness"
      }
    ]
  })
);

app.use("/api/auth", users);

app.all("*", (req, res) =>
  res.status(404).json({
    status: 404,
    error: "Route does not exist"
  })
);
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: "internal server error"
    });
  }
  return next();
});

// Define application port number
const port = process.env.PORT || 6000;

// Start server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// expose app to be use in another file
export default app;
