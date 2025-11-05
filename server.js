const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/users.routes");
const app = express();
const PORT = process.env.PORT;
const connectionDB = require("./config/connection");
app.use(express.json());
app.use("/",userRoutes );

``

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
