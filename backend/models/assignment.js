const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({

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
    creator:  {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

module.exports = mongoose.model('Assignment', assignmentSchema);
