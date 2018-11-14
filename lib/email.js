const fetch = require('node-fetch');
const bunyan = require('bunyan');
const getEndpointUrl = require('./getEndpointUrl');
const getHeaders = require('./getHeaders');
const getRequestBody = require('./getRequestBody');

const log = bunyan.createLogger({ name: 'SendEmail' });

/**
 * @description handles the sending of email based on provided send options and request data object
 * @param {Object}    sendOptions           - options for sending of email
 * @param {String}    sendOptions.provider  - email service provider we're using to send email
 * @param {String}    sendOptions.url       - required url for the call to provided email service
 * @param {Object}    req                   - request object for the email send
 * @param {Object}    req.body              - expected request body to be of this shape:
 *                                            {
 *                                              to: [{email, name}, {email, name}],
 *                                              cc: [{email, name}, {email, name}],
 *                                              bcc: [{email, name}, {email, name}],
 *                                              from: {email, name},
 *                                              subject,
 *                                              text: content,
 *                                            }
 */
async function sendEmail(sendOptions, req) {
  try {
    const endpointUrl = getEndpointUrl({ provider: sendOptions.provider, url: sendOptions.url });

    const headers = getHeaders({ provider: sendOptions.provider });

    const bodyPayload = {
      provider: sendOptions.provider,
      ...req.body,
    };

    const options = {
      method: 'POST',
      headers,
      body: getRequestBody(bodyPayload),
    };

    const response = await fetch(endpointUrl, options);

    return response;
  } catch (e) {
    return log.error(`[${new Date()}] - Error in sending email through ${sendOptions.provider}: ${e}`);
  }
}

module.exports = sendEmail;
