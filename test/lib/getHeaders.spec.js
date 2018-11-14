const { expect } = require('chai');
const getHeaders = require('../../lib/getHeaders');

describe('getHeaders()', () => {
  it('returns expected headers when provided with SendGrid as the provider', () => {
    const options = { provider: 'sendGrid' };

    const headers = getHeaders(options);

    expect(headers).to.deep.equal({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer this-is-sendgrid-api-key',
    });
  });

  it('returns expected headers when provided with Mailgun as the provider', () => {
    const options = { provider: 'mailgun' };
    const auth = 'Basic ' + Buffer.from('api:' + 'this-is-mailgun-api-key').toString('base64');

    const headers = getHeaders(options);

    expect(headers).to.deep.equal({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/json',
      'Authorization': auth,
    });
  });
});