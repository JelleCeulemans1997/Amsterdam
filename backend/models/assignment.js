var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({

  title: String,
  description: String,
  tags: [
    {
      type: String,
    }
  ],
  location: [{
    street: String,
    nr: String,
    city: String,
    zipcode: String
  }],
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  applies: [
    {apply: {type: mongoose.Schema.Types.ObjectId, ref: "User"}}
  ],
  accepted: [
    {accept: {type: mongoose.Schema.Types.ObjectId, ref: "User"}}
  ]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
