const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router()

router.get('/users', (req, res, next) => {
    try {
        User.find().exec((err, users) => {
            res.json(users);
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

// router.get('/user/:email', function (req, res) {
//     try {
//         User.findOne({email: {$regex : req.params.email}}).exec((err, user) => {
//             // User.find({requestReceived: { "idUser" :user._id}}).exec((err, users) => {
//                 res.json(user);
//             // });
//         });
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
        res.status(201).send({ user })
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
        const role = user.role;
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({role , token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/user/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

module.exports = router
