# Email-service

## Problem
Email-service is an Express app that accepts necessary information and sends emails. 

The application provides an abstraction between two email service providers. If one of the services goes down, this service will failover to a different provider without affecting customers. SendGrid is selected as the primary email service provider, with Mailgun as the secondary provider.

Email services used:
- SendGrid
- Mailgun

Email service caters for:
- Multiple email recipients
- CCs
- BCCs
- Text (supporting plain text)

## Solution
I chose Express for its ease of use and the fact that it's light-weight. 

* For testing, mocha, chai and sinon were selected for testing as they well-maintained libraries. 
* For linting, airbnb's eslint library was chosen to keep the codebase clean, consistent and maintainable.
* For logs, bunyan is used to create and maintain logs for the project.


### Technology/Libraries Used
NodeJs
Express

## Installation
Clone or download from Github repository: [email-service](https://github.com/hen-chow/email-service)

```
git clone git@github.com:hen-chow/email-service.git
cd email-service
nvm use
npm install
```

## Running
To run email service locally, you need to have a valid `SendGrid` and `Mailgun` accounts. Once signed up, update your development domains and api keys in your `config.js`.

```
  /* mailgun api */
  config.mailgunApi = 'https://api.mailgun.net/v3';
  config.mailgunDomain = 'THIS_IS_YOUR_MAILGUN_DOMAIN.mailgun.org';
  config.mailgunApikey = 'THIS_IS_YOUR_API_KEY';

  /* sendgrip api */
  config.sendGridApi = 'https://api.sendgrid.com/v3';
  config.sendGridApikey = 'THIS_IS_YOUR_API_KEY';
```

To run locally, run `npm run start`. You can now send email request to `https://localhost:3000/email/send` to test locally using Postman or cURL requests.

## Utility commands
The Email-service project is bundled with various commands for developers:
* `npm run start`: Starts the app
* `npm run test`: Runs all unit tests and lints the codebase
* `npm run test:unit`: Runs all unit tests
* `npm run lint`: Lints codebase. Email-service is using [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

### TODO
Due to time-constraints, I wasn't able to address some areas that are crucial to maintaining a good project.
* Better handling of failover to assign primary and secondary email service providers
* More comprehensive test coverage - particularly tests need to be written for `app.js` and `email.js`
* Improved handling and logging of each task
* Separation of concerns between tasks, and utils task to make api calls
* With implementation of tasks will allow us to introduce strict schema check for each request to ensure that required information is supplied



