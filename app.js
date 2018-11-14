const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const sendEmail = require('./lib/email');

const log = bunyan.createLogger({ name: 'EmailServiceApp' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

/**
 * @description POST route to send email
 * @param   {Object}  req     - request object for the POST request
 * @param   {Object}  res     - response object from the POST request
 */
app.post('/email/send', async (req, res) => {
  // check that all required request parameters are provided
  if (!req.body.from || !req.body.to || !req.body.subject || !req.body.text) {
    res.status(400).json({
      status: 'error',
      message: 'Email info - either /from/, /to/, /subject/ or /text/ field is missing. Cannot send email',
    });
  }

  try {
    const sendGridOptions = {
      provider: 'sendGrid',
      url: '/mail/send',
    };

    const response = await sendEmail(sendGridOptions, req);

    if (response.status === 202) {
      res.status(200).json({
        status: 'OK',
        message: 'Email has been sent',
      });
    }

    if (response.status >= 400 && response.status < 500) {
      const error = await response.json();
      const errorMessage = error.errors[0].message;
      res.status(400).json({
        status: 'error',
        message: `There was an error in sending your email. Error: ${response.status} - ${errorMessage}`,
      });
    }

    // handle the case if SendGrid's service is down, we'll try sending via Mailgun
    if (response.status >= 500) {
      try {
        const mailgunOptions = {
          provider: 'mailgun',
          url: '/messages',
        };

        const secondaryServiceResponse = await sendEmail(mailgunOptions, req);

        if (secondaryServiceResponse.status === 200) {
          res.status(200).json({
            status: 'OK',
            message: 'Email has been sent',
          });
        }

        if (secondaryServiceResponse.status >= 400 && secondaryServiceResponse.status < 500) {
          const mailgunErrorMessage = await secondaryServiceResponse.json();

          res.status(400).json({
            status: 'error',
            message: `There was an error in sending your email. Error: ${secondaryServiceResponse.status} - ${mailgunErrorMessage.message}`,
          });
        }
      } catch (err) {
        const statusCode = err.statusCode ? err.statusCode : 500;
        const error = new Error(`[${new Date()}] - Error in sending email: ${err}`);
        log.error(`[${new Date()}] - Error in sending email: ${err}`);
        res.status(statusCode).end(error.message);
      }
    }
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    const error = new Error(`[${new Date()}] - Error in sending email: ${e}`);
    log.error(`[${new Date()}] - Error in sending email: ${e}`);
    res.status(statusCode).end(error.message);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log.info(`Application listening at port://${port}`);
});


module.exports = app;
