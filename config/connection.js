const mongoose = require("mongoose");

async function connectionDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
  } catch (e) {
    throw e;
  }
}

module.exports = connectionDB;
