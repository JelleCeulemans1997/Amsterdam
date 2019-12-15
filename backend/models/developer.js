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
        userId: String,
        score: Number,
        text: String
      }
    ],
    image: String,
    cv: String,
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

DeveloperSchema.virtual('reviews.company', {
  ref: 'Company',
  localField: 'reviews.userId',
  foreignField: 'userId',
  justOne: true

});

module.exports = mongoose.model("Developer", DeveloperSchema);
