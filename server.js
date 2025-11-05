const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const connectionDB = require("./config/connection");

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
