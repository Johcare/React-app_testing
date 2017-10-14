const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//taking out  info from mongoose
const User = mongoose.model("users");
//
passport.serializeUser((user, done) => {
  //         !! this use.id- its a mongo gener. id for us, short cut
  // this is mongoose model-instanse
  done(null, user.id);
});
//here we do opositi, terning mongoose model id , into instanse
//we will serch, in db for specific user, after we find
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//importing keys
// i want to auntf suser ,via this google strategy,
//passport.use -> use'specific strategy avail' inside an application
//googgle -> strategy has identifier, that how passport knows, and goues
//and finfing ...

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      
      //atemp to find a user, where google ID=profile.
      //this querry retern a promise, to get a signal, that process has completed

      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with the given profile ID
          //done funct.checking after .... fro user.
          done(null, existingUser);
        } else {
          //we want to create a new user,
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
