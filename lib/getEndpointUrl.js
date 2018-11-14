const config = require('../config');

/**
 * @private
 * @description Generates a request URL based on the type of provider
 *              Currently supports SendGrid and Mailgun only
 * @param   {String}  url     -   The URL to be fetched
 * @param   {Object}  payload - The request payload (contains both header and body)
 * @returns {String|undefined}
 */
function getEndpointUrl(options) {
  if (!options.provider) {
    throw Error('Provider info is required');
  }

  if (!options.url) {
    throw Error('Provider url is required');
  }

  if (options.provider === 'sendGrid') {
    return `${config.sendGridApi}${options.url}`;
  }

  if (options.provider === 'mailgun') {
    return `${config.mailgunApi}/${config.mailgunDomain}${options.url}`;
  }

  return undefined;
}

module.exports = getEndpointUrl;
