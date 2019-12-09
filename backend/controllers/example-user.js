// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user');

// exports.createUser = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10).then(hash => {
//     const user = new User({
//       email: req.body.email,
//       password: hash
//     });
//     user
//       .save()
//       .then(result => {
//         res.status(201).json({
//           message: 'User created!',
//           result: result
//         });
<<<<<<< Updated upstream
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: 'Invalid authentication credentials!'
//         });
//       });
//   });
// }

// exports.userLogin = (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       }
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         process.env.JWT_KEY,
//         { expiresIn: '1h' }
//       );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600,
//         userId: fetchedUser._id
//       });
//     })
//     .catch(err => {
//       return res.status(401).json({
//         message: 'Invalid authentication credentials!'
//       });
//     });
// }
=======
//     } catch (error) {
//         res.status(400).send(error)
//     }
// });

router.post('/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        // const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.post('/sendmail', async (req, res) => {
//     // Create a new user
//     try {
//         // const user = new User(req.body)
//         const msg = {
//             to: req.body.email,
//             from: "support@pollinizer.com",
//             templateId: 'd-8f1cd5f9702b4533903f9342b0d4cef4',
//             subject: 'Join your Friend on PollPalls',
//             dynamic_template_data: {
//                 email: req.body.email,
//                 subject: 'Join your Friend on PollPalls',
//                 link: "https://www.ajaxshowtime.com",
//             },
//         };
//         sgMail.send(msg);
//         // await user.save()

//         res.status(201).send("mail send");
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/user/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/user/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

module.exports = router
>>>>>>> Stashed changes
