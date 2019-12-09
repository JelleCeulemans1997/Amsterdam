var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    naam: String,
    contact: [
            {
                voornaam: String,
                achternaam: String,
                email: String,
                telefoonnummer: Number
            }
        ],
    locatie: [{
        straat: String,
        huisnummer: Number,
        plaats: String,
        postcode: Number
    }],
    tags: [
        {
            value: String,
        }
    ],
    bio: String,
    review: [{
        naam: String,
        text: String,
        score: Number
    }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);