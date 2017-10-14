const express = require("express");
//reqiure passport file and asignt a varible to it..
const mongoose = require("mongoose");
const cookieSession = require ('cookie-session');
const  passport = require ('passport');
const keys = require('./config/keys');

require ('./models/user');
require('./services/passport');

//importing keys from  config file, wirh mongo info
mongoose.connect(keys.mongoURI);


const app = express();
//definng a cookiesession,and random key -id, no matter
app.use(
    cookieSession({
        maxAge:30 * 24 * 60 * 60 *1000,
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


//req this func, imidet callingg with this set of code..
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(5000);

console.log("Running on PORT: " + PORT);
