var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    nickname: String,
    firstname: String,
    lastname: String,
    email: String,
    dateofbirth: Date,
    skills: [
            {
                value: String,
            }
        ],
    tags: [
        {
            value: String,
        }
    ],
    bio: String,
    social: [{
        link: String,
        type: String
    }],
    ervaring: String,
    straat: String,
    huisnummer: Number,
    plaats: String,
    postcode: Number,
  review: [
    {
      like: Boolean,
      value: String
    }
  ],
});

module.exports = mongoose.model('Assignment', assignmentSchema);
