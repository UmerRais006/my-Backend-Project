const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users.routes");
const app = express();
const PORT = process.env.PORT;
const connectionDB = require("./config/connection");
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use("/", userRoutes);


connectionDB()
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESFULLY !");
    app.listen(PORT, () => {
      console.log(`Example app listening on port:  http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server Error", err);
  });
