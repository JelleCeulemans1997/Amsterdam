const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router();


//user pre save
exports.createUser = (req, res, next) => {
   console.log(req.body);
  bcryptjs.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      role: req.body.role
    });
    console.log(user);
    user.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User created!",
          result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.login = async (req, res) => {
  //Login a registered user
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ role: user.role, token, id: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
};


// router.get("/users", (req, res, next) => {
//   try {
//     User.find().exec((err, users) => {
//       res.json(users);
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/user/:email", function(req, res) {
//   try {
//     User.findOne({ email: { $regex: req.params.email } }).exec((err, user) => {
//       // User.find({requestReceived: { "idUser" :user._id}}).exec((err, users) => {
//       res.json(user);
//       // });
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.post("/register", async (req, res) => {
//   // Create a new user
//   try {
//     const user = new User(req.body);
//     await user.save();
//     // const token = await user.generateAuthToken()
//     res.json(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.post("/sendmail", async (req, res) => {
//   // Create a new user
//   try {
//     // const user = new User(req.body)
//     const msg = {
//       to: req.body.email,
//       from: "support@pollinizer.com",
//       templateId: "d-8f1cd5f9702b4533903f9342b0d4cef4",
//       subject: "Join your Friend on PollPalls",
//       dynamic_template_data: {
//         email: req.body.email,
//         subject: "Join your Friend on PollPalls",
//         link: "https://www.ajaxshowtime.com"
//       }
//     };
//     sgMail.send(msg);
//     // await user.save()

//     res.status(201).send("mail send");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });



// router.get("/user/me", auth, async (req, res) => {
//   // View logged in user profile
//   res.send(req.user);
// });

//module.exports = router
