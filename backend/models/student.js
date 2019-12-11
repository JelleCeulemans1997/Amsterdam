const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MakerSchema = new Schema({
    nickname: String,
    userId: String,
    firstname: String,
    lastname: String,
    email: String,
    dateofbirth: Date,
    skills: [{
                type: String,
            }],
    tags: [{
            type: String,
        }],
    bio: String,
    github: String,
    linkedin:String,
    experience: String,
    location: [{
      street: String,
      nr: String,
      zipcode: String,
      city: String
    }],
  review: [{
      like: Boolean,
      value: String
    }],
});

module.exports = mongoose.model('Maker', MakerSchema);

