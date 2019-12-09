var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    Nickname: String,
    voornaam: String, 
    achternaam: String,
    geboortedatum: Date,
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
    postcode: Number
    //review moet nog worden toegevoegd
});

module.exports = mongoose.model('Assignment', assignmentSchema);