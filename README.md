# Email-service

## Description
A service that accepts necessary information and sends emails. 

The application provides an abstraction between two email service providers. If one of the services goes down, this service will failover to a different provider without affecting customers. 

Email services used:
- Mailgun
- SendGrid

Email service caters for:
- Multiple email recipients
- CCs
- BCCs
- Text (supporting plain text)

### Technology Used
NodeJs