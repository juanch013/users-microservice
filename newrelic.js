const dotenv = require('dotenv');
dotenv.config();

'use strict';

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'core-platform-service'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'trace'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
};
