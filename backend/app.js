//const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/example-user')

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://jelle:'+ process.env.MONGODB_PASSWORD +'@cluster0-ujjqf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//forward to this folder
//Add this for pdf
//app.use('/images', express.static(path.join('backend/images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api', userRouter)
//app.use('/api/posts', postRoutes);
//app.use('/api/user', userRoutes);


module.exports = app;
