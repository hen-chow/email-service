/* eslint-disable */
const chaiAsPromised = require('chai-as-promised');

/* Chai-related integration */
var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiDeepMatch = require('chai-deep-match');
chai.use(sinonChai);
chai.use(chaiDeepMatch);
chai.use(chaiAsPromised);
/* eslint-enable */
