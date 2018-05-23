const dom = require('./dom');

let apiKey = '';

const setKey = (key) =>
{
  apiKey = key;
};

const searchWeather = () =>
{
  const zipCode = $('#searchBar').val();
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&APPID=`;
  return new Promise((resolve, reject) =>
  {
    $.ajax(url + apiKey).done((result) =>
    {
      resolve(result);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const fiveCast = () =>
{
  const zipCode = $('#searchBar').val();
  const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&APPID=`;
  return new Promise((resolve, reject) =>
  {
    $.ajax(url + apiKey).done((result) =>
    {
      resolve(result);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const showWeather = () =>
{
  const resultArr = [];
  searchWeather().then((result) =>
  {
    resultArr.push(result);
    console.log(resultArr);
    dom.domBuilder(resultArr);
  }).catch((err) =>
  {
    console.error('Search error', err);
  });
};

module.exports =
{
  setKey,
  showWeather,
};
