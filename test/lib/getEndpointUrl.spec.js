const { expect } = require('chai');
const getEndpointUrl = require('../../lib/getEndpointUrl');

describe('getEndpointUrl()', () => {
  it('returns correct url when provider is Mailgun', () => {
    const options = {
      provider: 'mailgun',
      url: '/messages',
    };
    const url = getEndpointUrl(options);

    expect(url).to.equal('https://api.mailgun.net/v3/sandbox-test-mailgun.org/messages');
  });

  it('returns correct url when provider is SendGrid', () => {
    const options = {
      provider: 'sendGrid',
      url: '/mail/send',
    };
    const url = getEndpointUrl(options);

    expect(url).to.equal('https://api.sendgrid.com/v3/mail/send');
  });

  it('throws error when not provided with a provider value', () => {
    const options = {
      url: '/taco-time',
    };

    expect(() => {
      getEndpointUrl(options);
    }).to.throw(Error, 'Provider info is required');
  });

  it('throws error when not provided with a provider url', () => {
    const options = {
      provider: 'mailgun',
    };

    expect(() => {
      getEndpointUrl(options);
    }).to.throw(Error, 'Provider url is required');
  });
});
