/* jshint node: true */
var os = require('os');
var ifaces = os.networkInterfaces();

var addresses = [];
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details){
    if(details.family === 'IPv4' && details.address !== '127.0.0.1') {
      addresses.push(details.address);
    }
  });
}

const localhost = '192.168.0.8';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'incident',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    api: {
      "current": "v1"
    },

    contentSecurityPolicy: {
      // Allow inline styles
      'style-src': "'self' 'unsafe-inline'",
      'connect-src': `'self' http://${localhost}:4200 http://${localhost}:16759 ws://localhost:35729 ws://0.0.0.0:35729`,
      'script-src': "'self' 'unsafe-inline'",
      'font-src': "'self' data:",
      'object-src': "http://localhost:4200"
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.apiUrl = `http://${addresses[0]}:16759`;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
