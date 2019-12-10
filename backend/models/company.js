var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
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
            type: String,
        }
    ],
    bio: String,
    review: [{
        naam: String,
        text: String,
        score: Number
    }]
});

module.exports = mongoose.model('Company', companySchema);
