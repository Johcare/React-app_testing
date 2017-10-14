const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    //google will trited like a string
    //howevwr we call it string
 googleId: String,

});

mongoose.model('users' , userSchema);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//when models boots-up , it will not overwrite, it will create
//if it not alredy exist
// 1.arg - users
// 2.- userSchema
//loding this model,into mongoose, that create our model-class
//we  gonna use thhis model, to save up , a user, for first time, creating an acccoutn wit us