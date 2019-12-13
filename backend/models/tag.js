const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    usages: { type: Number, required: true }
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

module.exports = mongoose.model("Tag", tagSchema);
