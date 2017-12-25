if (process.env.NODE_ENV === 'production') {
  // we are in prod - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in dev - return the dev keys!
  module.exports = require('./dev');
}

module.exports = {
  googleClientID: '927685171919-tha8c8rrvg6tnbijalr98cpe9ml1co7u.apps.googleusercontent.com',
  googleClientSecret: 'PtkDR2Gs4ENdcBDuIJBxvG3G',
  mongoURI: 'mongodb://kelly:password@ds139262.mlab.com:39262/emaily-dev-kelly',
  cookieKey: ';sdafj;asjfa;sojf'
};
