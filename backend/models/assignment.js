var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    titel: String,
    creator:  {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    description: String,
    tags: [
            {
                value: String,
            }
        ],
    location: [{
        street: String,
        nr: Number,
        city: String,
        zipcode: Number
    }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
