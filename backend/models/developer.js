const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema(
  {
    nickname: String,
    userId: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    dob: Date,
    experience: [
      {
        type: String
      }
    ],
    bio: String,
    linkedIn: String,
    location: {
      zipcode: String,
      city: String
    },
    reviews: [
      {
        name: String,
        score: Number,
        text: String
      }
    ]
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

module.exports = mongoose.model("Developer", DeveloperSchema);
