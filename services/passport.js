const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

// clientID: 927685171919-tha8c8rrvg6tnbijalr98cpe9ml1co7u.apps.googleusercontent.com
// clientSecret: PtkDR2Gs4ENdcBDuIJBxvG3G
passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refereshToken);
      console.log('done', done);
      console.log('profile', profile);
    }
  )
);
