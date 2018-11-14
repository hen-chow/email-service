const { expect } = require('chai');
const querystring = require('query-string');
const getRequestBody = require('../../lib/getRequestBody');

describe('getRequestBody()', () => {
  it('returns the expected request body for SendGrid when provided with email and name details', () => {
    const payload = {
      provider: 'sendGrid',
      from: { email: 'test@test.com', name: 'Test person' },
      to: [
        { email: 'example@example.com', name: 'Example 1' },
        { email: 'example2@example.com', name: 'Example 2' },
        { email: 'example3@example.com', name: 'Example 3' },
      ],
      cc: [
        { email: 'taco@taco.com', name: 'Taco' },
      ],
      bcc: [
        { email: 'burrito@burrito.com', name: 'Burrito 1' },
        { email: 'nacho2@nacho.com', name: 'Nacho' },
      ],
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const result = {
      personalizations: [{
        to: [
          { email: 'example@example.com', name: 'Example 1' },
          { email: 'example2@example.com', name: 'Example 2' },
          { email: 'example3@example.com', name: 'Example 3' },
        ],
        cc: [
          { email: 'taco@taco.com', name: 'Taco' },
        ],
        bcc: [
          { email: 'burrito@burrito.com', name: 'Burrito 1' },
          { email: 'nacho2@nacho.com', name: 'Nacho' },
        ],
      }],
      from: { email: 'test@test.com', name: 'Test person' },
      subject: 'You are invited to a Mexican fiesta',
      content: [{ type: 'text/plain', value: 'Come celebrate with us with margaritas and food' }],
    };

    const requestBody = getRequestBody(payload);

    expect(JSON.parse(requestBody)).to.deep.equal(result);
  });

  it('returns the expected request body for SendGrid when provided with email details only', () => {
    const payload = {
      provider: 'sendGrid',
      from: { email: 'test@test.com' },
      to: [
        { email: 'example@example.com' },
        { email: 'example2@example.com' },
        { email: 'example3@example.com' },
      ],
      cc: [
        { email: 'taco@taco.com' },
      ],
      bcc: [
        { email: 'burrito@burrito.com' },
        { email: 'nacho2@nacho.com' },
      ],
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const result = {
      personalizations: [{
        to: [
          { email: 'example@example.com' },
          { email: 'example2@example.com' },
          { email: 'example3@example.com' },
        ],
        cc: [
          { email: 'taco@taco.com' },
        ],
        bcc: [
          { email: 'burrito@burrito.com' },
          { email: 'nacho2@nacho.com' },
        ],
      }],
      from: { email: 'test@test.com' },
      subject: 'You are invited to a Mexican fiesta',
      content: [{ type: 'text/plain', value: 'Come celebrate with us with margaritas and food' }],
    };

    const requestBody = getRequestBody(payload);

    expect(JSON.parse(requestBody)).to.deep.equal(result);
  });

  it('returns the expected request body for Mailgun when provided with email and name details for from field', () => {
    const payload = {
      provider: 'mailgun',
      from: { email: 'test@test.com', name: 'Test person' },
      to: [
        { email: 'example@example.com', name: 'Example 1' },
        { email: 'example2@example.com', name: 'Example 2' },
        { email: 'example3@example.com', name: 'Example 3' },
      ],
      cc: [
        { email: 'taco@taco.com', name: 'Taco' },
      ],
      bcc: [
        { email: 'burrito@burrito.com', name: 'Burrito 1' },
        { email: 'nacho2@nacho.com', name: 'Nacho' },
      ],
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const result = {
      from: 'Test person <test@test.com>',
      to: 'example@example.com, example2@example.com, example3@example.com',
      cc: 'taco@taco.com',
      bcc: 'burrito@burrito.com, nacho2@nacho.com',
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const stringifiedResult = querystring.stringify(result);

    const requestBody = getRequestBody(payload);

    expect(requestBody).to.deep.equal(stringifiedResult);
  });

  it('returns the expected request body for Mailgun when provided with email details only', () => {
    const payload = {
      provider: 'mailgun',
      from: { email: 'test@test.com' },
      to: [
        { email: 'example@example.com' },
        { email: 'example2@example.com' },
        { email: 'example3@example.com' },
      ],
      cc: [
        { email: 'taco@taco.com' },
      ],
      bcc: [
        { email: 'burrito@burrito.com' },
        { email: 'nacho2@nacho.com' },
      ],
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const result = {
      from: 'test@test.com',
      to: 'example@example.com, example2@example.com, example3@example.com',
      cc: 'taco@taco.com',
      bcc: 'burrito@burrito.com, nacho2@nacho.com',
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const stringifiedResult = querystring.stringify(result);

    const requestBody = getRequestBody(payload);

    expect(requestBody).to.deep.equal(stringifiedResult);
  });

  it('returns the expected request body for Mailgun when provided with only email details for from field', () => {
    const payload = {
      provider: 'mailgun',
      from: { email: 'test@test.com' },
      to: [
        { email: 'example@example.com', name: 'Example 1' },
        { email: 'example2@example.com', name: 'Example 2' },
        { email: 'example3@example.com', name: 'Example 3' },
      ],
      cc: [
        { email: 'taco@taco.com', name: 'Taco' },
      ],
      bcc: [
        { email: 'burrito@burrito.com', name: 'Burrito 1' },
        { email: 'nacho2@nacho.com', name: 'Nacho' },
      ],
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const result = {
      from: 'test@test.com',
      to: 'example@example.com, example2@example.com, example3@example.com',
      cc: 'taco@taco.com',
      bcc: 'burrito@burrito.com, nacho2@nacho.com',
      subject: 'You are invited to a Mexican fiesta',
      text: 'Come celebrate with us with margaritas and food',
    };

    const stringifiedResult = querystring.stringify(result);

    const requestBody = getRequestBody(payload);

    expect(requestBody).to.deep.equal(stringifiedResult);
  });
});
