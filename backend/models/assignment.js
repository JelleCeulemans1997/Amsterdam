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
  ref: 'Developer',
  localField: 'applies.apply',
  foreignField: 'userId',
  justOne: true
});

assignmentSchema.virtual('accepted.developer', {
  ref: 'Developer',
  localField: 'accepted.accept',
  foreignField: 'userId',
  justOne: true
});

assignmentSchema.virtual('denied.developer', {
  ref: 'Developer',
  localField: 'denied.deny',
  foreignField: 'userId',
  justOne: true
});


assignmentSchema.virtual('company', {
  ref: 'Company',
  localField: 'creator',
  foreignField: 'userId',
  justOne: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
