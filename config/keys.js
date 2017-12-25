if (process.env.NODE_ENV === 'production') {
  // we are in prod - return the prod set of keys
  console.log("Hit production");
  module.exports = require('./prod');
} else {
  // we are in dev - return the dev keys!
  console.log("hit dev")
  module.exports = require('./dev');
}
