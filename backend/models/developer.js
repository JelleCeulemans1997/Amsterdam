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
    ]
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
  ref: 'Company', // The model to use
  localField: 'reviews.userId', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model("Developer", DeveloperSchema);
