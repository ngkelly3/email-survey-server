const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

// the order of your require statements matter
require('./models/User');
require('./services/passport');

// connect the remote DB to server
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// currying
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log("listening on port " + PORT);
app.listen(PORT);
