var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({

    titel: String,
    creator:  {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
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
    pdf: String
});

module.exports = mongoose.model('Assignment', assignmentSchema);
