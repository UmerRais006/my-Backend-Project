const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter firstname"],
      min: 2,
    },
    lastName: {
      type: String,
      required: [true, "please enter last name "],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "please enter last name "],
      min: 6,
    },
    age: {
      type: Number,
      min: 0,
    },
    phoneNumber: {
      type: Number,
      min: 1000000000,
      max: 999999999999999,
      match: /^\d+$/,
    },
  },

  { id: false, toObject: { virtuals: true }, toJSON: { virtuals: true } }
  // { id: false }
);

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.firstName;
  delete userObject.lastName;
  return userObject;
};
const User = mongoose.model("Users", UserSchema);
module.exports = User;
