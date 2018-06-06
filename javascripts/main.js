const events = require('./events');
const apiKeys = require('./apiKeys');

$(document).ready(() =>
{
  apiKeys.retrieveApiKey();
  events.initializer();
});
