'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'card-archive',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      dbVersion: 11,
    },

    firebase: {
      apiKey: process.env.FIREBASE_KEY,
      authDomain: 'yugiohcache.firebaseapp.com',
      databaseURL: 'https://yugiohcache.firebaseio.com',
      projectId: 'yugiohcache',
      storageBucket: 'yugiohcache.appspot.com',
      messagingSenderId: '143646872359',
      appId: '1:143646872359:web:7f5ca329be7f94a6758f02',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
