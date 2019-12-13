const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    title: String,
    description: String,
    tags: [
      {
        type: String
      }
    ],
    location: [
      {
        street: String,
        nr: String,
        city: String,
        zipcode: String
      }
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applies: [{ apply: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    accepted: [
      { accept: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }
    ],
    denied: [{ deny: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }]
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

module.exports = mongoose.model("Assignment", assignmentSchema);
