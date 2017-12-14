const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');
// clientID: 927685171919-tha8c8rrvg6tnbijalr98cpe9ml1co7u.apps.googleusercontent.com
// clientSecret: PtkDR2Gs4ENdcBDuIJBxvG3G
passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save(); //persists to database
    }
  )
);
