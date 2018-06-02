const weather = require('./weather');
const firebaseAPI = require('./firebaseAPI');

const apiKeys = () =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax('./db/apiKeys.json').done((data) =>
    {
      resolve(data.apiKeys);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const retrieveApiKey = () =>
{
  apiKeys().then((result) =>
  {
    weather.setKey(result.tmdb.apiKey);
    firebaseAPI.setConfig(result.firebase);
    firebase.initializeApp(result.firebase);
  }).catch((err) =>
  {
    console.error('No keys', err);
  });
};

module.exports =
{
  retrieveApiKey,
};
