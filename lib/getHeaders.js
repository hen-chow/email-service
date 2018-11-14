const config = require('../config');

/**
 * @private
 * @description Generates the headers for the request based on the provider
 * @param   {Object}    options            -   The request options
 * @param   {String}    options.provider   -   Name of email service provider
 * @returns {Object}
 */
function getHeaders(options) {
  const headers = {};

  if (options.provider === 'sendGrid') {
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = `Bearer ${config.sendGridApikey}`;
  } else if (options.provider === 'mailgun') {
    const auth = 'Basic ' + Buffer.from('api:' + config.mailgunApikey).toString('base64');

    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Accept'] = 'text/json';
    headers['Authorization'] = auth;
  }
  return headers;
}

module.exports = getHeaders;