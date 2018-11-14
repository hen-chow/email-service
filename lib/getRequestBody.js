const querystring = require('query-string');

/**
 * @description  forms an array of emails only for request
 * @param {Object[]} array - array of objects containing emails for parsing
 */
function parseEmails(array) {
  return array.map(item => item.email);
}

/**
 * @description forms the request body based on provided email provider and request body
 * @param {Object}    payload           - payload for sending of email. Expected shape:
 *                                            {
 *                                              provider: '',
 *                                              to: [{email, name}, {email, name}],
 *                                              cc: [{email, name}, {email, name}],
 *                                              bcc: [{email, name}, {email, name}],
 *                                              from: {email, name},
 *                                              subject,
 *                                              text: content,
 *                                            }
 * @param {String}    payload.provider  - email service provider we're using to send email
 * @param {Object}    payload.from      - sender of email
 * @param {Object[]}  payload.to        - recipients of email
 * @param {Object[]}  payload.cc        - cc recipients of email
 * @param {Object[]}  payload.bcc       - bcc recipients of email
 * @param {String}    payload.subject   - email subject
 * @param {String}    payload.text      - email content
 * @returns {Object}
 */
function getRequestBody(payload) {
  const { provider, from, to, cc, bcc, subject, text } = payload;
  let body = {};

  if (provider === 'sendGrid') {
    body.personalizations = [{ to, bcc, cc }];
    body.from = from;
    body.subject = subject;
    body.content = [{ type: 'text/plain', value: text }];
    body = JSON.stringify(body);
  }

  if (provider === 'mailgun') {
    if (from.name) {
      body.from = `${from.name} <${from.email}>`;
    } else {
      body.from = from.email;
    }
    body.to = parseEmails(to).join(', ');
    body.subject = subject;
    body.text = text;
    if (cc) {
      body.cc = parseEmails(cc).join(', ');
    }

    if (bcc) {
      body.bcc = parseEmails(bcc).join(', ');
    }
    body = querystring.stringify(body);
  }

  return body;
}

module.exports = getRequestBody;
