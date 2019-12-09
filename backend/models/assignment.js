var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    titel: String,
    omschrijving: String,
    tags: [
            {
                value: String,
            }
        ],
    locatie: [{
        straat: String,
        huisnummer: Number,
        plaats: String,
        postcode: Number
    }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
