const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

// connect the remote DB to server
mongoose.connect(keys.mongoURI);

const app = express();

// currying
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log("listening on port " + PORT);
app.listen(PORT);
