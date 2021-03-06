const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.serializeUser((user, done)=> {
  // user is what we got from DB
  // works with multiple passport strategies
  done(null, user.id); //mongoID -> very easily use multiple auth providers

});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})
// clientID: 927685171919-tha8c8rrvg6tnbijalr98cpe9ml1co7u.apps.googleusercontent.com
// clientSecret: PtkDR2Gs4ENdcBDuIJBxvG3G
passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {

      const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // already have record with ID

            // passport function, says there's no error and provide existing user
            done(null, existingUser);
        } else {
            // create users
            // always use the user instance provided in the callback
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    }
  )
);
