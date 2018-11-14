const config = {};

if (process.env.NODE_ENV === 'test') {
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = 'sandbox-test-mailgun.org';
  config.mailgunApikey = 'this-is-mailgun-api-key';
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = 'this-is-sendgrid-api-key';
// } else if (process.env.NODE_ENV === 'development') {
} else {
  // TODO: need to replace domain and apikey
  /* mailgun api */
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = 'THIS_IS_YOUR_MAILGUN_DOMAIN.mailgun.org';
  config.mailgunApikey = 'THIS_IS_YOUR_API_KEY';

  /* sendgrip api */
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = 'THIS_IS_YOUR_API_KEY';

  config.port = 3000;
// } else if (process.env.NODE_ENV === 'production') {
//   // TODO: need to update for prod
//   console.log('do something for deployement');
}

module.exports = config;
