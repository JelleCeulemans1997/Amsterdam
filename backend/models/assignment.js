const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const Company = require('./company');

const assignmentSchema = new Schema(
  {
    title: String,
    description: String,
    tags: [
      {
        type: String
      }
    ],
    location: {
      street: String,
      nr: String,
      city: String,
      zipcode: String
    },
    pdf: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applies: [{ apply: { type: mongoose.Schema.Types.ObjectId, ref: "User" }}],
    accepted: [{ accept: { type: mongoose.Schema.Types.ObjectId, ref: "User" }}],
    denied: [{ deny: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }]
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

assignmentSchema.virtual('applies.developer', {
  ref: 'Developer', // The model to use
  localField: 'applies.apply', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

assignmentSchema.virtual('accepted.developer', {
  ref: 'Developer', // The model to use
  localField: 'accepted.accept', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

assignmentSchema.virtual('denied.developer', {
  ref: 'Developer', // The model to use
  localField: 'denied.deny', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});




assignmentSchema.virtual('company', {
  ref: 'Company', // The model to use
  localField: 'creator', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model('Assignment', assignmentSchema);
