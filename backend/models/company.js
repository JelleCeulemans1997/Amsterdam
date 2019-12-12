const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    contact: {
                firstname: String,
                lastname: String,
                email: String,
                phone: String
            },
    location: {
        street: String,
        nr: String,
        city: String,
        zipcode: String
    },
    tags: [
        {
            type: String,
        }
    ],
    bio: String,
    reviews: [{
        name: String,
        score: Number,
        text: String
    }],
    website: String
});

module.exports = mongoose.model('Company', companySchema);
