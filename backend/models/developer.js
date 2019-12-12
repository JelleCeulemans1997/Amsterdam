const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema(
  {
    nickname: String,
    userId: String,
    firstname: String,
    lastname: String,
    email: String,
    dob: Date,
    skills: [
      {
        type: String
      }
    ],
    bio: String,
    linkedIn: String,
    experience: String,
    location: [
      {
        street: String,
        nr: String,
        zipcode: String,
        city: String
      }
    ],
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
