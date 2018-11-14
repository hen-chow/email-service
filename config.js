const config = {};

if (process.env.NODE_ENV === 'test') {
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = 'sandbox-test-mailgun.org';
  config.mailgunApikey = 'this-is-mailgun-api-key';
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = 'this-is-sendgrid-api-key';
} else if (process.env.NODE_ENV === 'production') {
  /* mailgun api */
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = process.env.MAILGUN_DOMAIN;
  config.mailgunApikey = process.env.MAILGUN_API_KEY;

  /* sendgrip api */
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = process.env.SENDGRID_API_KEY;
} else {
  /* mailgun api */
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = 'THIS_IS_YOUR_MAILGUN_DOMAIN.mailgun.org';
  config.mailgunApikey = 'THIS_IS_YOUR_API_KEY';

  /* sendgrip api */
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = 'THIS_IS_YOUR_API_KEY';
}

module.exports = config;
