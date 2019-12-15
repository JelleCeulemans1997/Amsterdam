const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    },
    role: {
      type: String
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error({ error: "User nort registered" });
  }
  const isPasswordMatch = await bcryptjs.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "wrong password" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
