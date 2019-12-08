// const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// const uniqueValidator = require('mongoose-unique-validator');


// const userSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true}
// });

//Gives an error when the email is already registered
// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');

// const postSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true},
//   imagePath: {type: String, required: true},
//   creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
// });

// module.exports = mongoose.model('Post', postSchema);
