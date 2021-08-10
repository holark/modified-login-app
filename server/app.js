// importing express module to constant express
const express = require('express');
const passport = require('passport')

// calling express() function and puts new express application inside app constant
const app = express();

// importing mongoose to our app.js 
const mongoose = require('mongoose');

// importing cors to enable Cross-Origin Resource Sharing 
const cors = require('cors');

// cutom Modules
const appConfig = require('./config/appConfig')
const userRoutes = require('./routes/user')

app.use(passport.initialize())
app.use(passport.session())

require('./middleware/passport')()





// connects to db
mongoose.connect(appConfig.db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true})

// if any error occurred while openning connection it will show error
mongoose.connection.on('error', err => {
    console.log('connection is failed')
});

// if connected successfully, it will deliver success message in console
mongoose.connection.on('connected', connected => {
    console.log('Connected with Database...')
})

// app.use() handles all the middleware functions
app.use(express.json(), express.urlencoded({ extended: false }));

// enables server to be accessible by different domain in same origin
app.use(cors());

app.use('/', userRoutes );

app.use((req, res, next) => {
    res.status(404).json({msg: 'Url not found'})
})

// through this command we will export all the properties or methods of app.js
module.exports = app;