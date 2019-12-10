
const mongoose = require('mongoose');


const tagSchema = mongoose.Schema({
  name: { type: String, required: true },
  usages: { type: Number, required: true}
});

module.exports = mongoose.model('Tag', tagSchema);
