const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

// the order of your require statements matter
require('./models/User');
require('./services/passport');

// connect the remote DB to server
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

// production routing
// if no routes exist in express, do the following:
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up index.html file if
  // doesn't know the route
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
console.log("listening on port " + PORT);
app.listen(PORT);
