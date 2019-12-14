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


companySchema.virtual('reviews.developer', {
  ref: 'Developer', // The model to use
  localField: 'reviews.userId', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});


const Company = mongoose.model("Company", companySchema);

module.exports = Company;
