const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contact: {
      firstname: String,
      lastname: String,
      email: String,
      phone: String
    },
    location: {
      street: String,
      nr: String,
      city: String,
      zipcode: String
    },
    tags: [
      {
        type: String
      }
    ],
    bio: String,
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: Number,
        text: String
      }
    ],
    image: String
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);


companySchema.virtual('reviews.developer', {
  ref: 'Developer',
  localField: 'reviews.userId',
  foreignField: 'userId',
  justOne: true
});


const Company = mongoose.model("Company", companySchema);

module.exports = Company;
