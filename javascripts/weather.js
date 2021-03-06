const dom = require('./dom');
// const events = require('./events');

let apiKey = '';

const setKey = (key) =>
{
  apiKey = key;
};

const searchWeather = () =>
{
  const zipCode = $('#searchBar').val();
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&APPID=`;
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
  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&APPID=`;
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

const showFiveCast = () =>
{
  const forecastArr = [];
  fiveCast().then((result) =>
  {
    for (let idx = 0; idx < 40; idx++)
    {
      forecastArr.push(result.list[idx]);
      dom.forecastBuilder(forecastArr, result.city.name);
      idx = idx + 7;
    };
    $('#forecast').addClass('hidden');
  }).catch((err) =>
  {
    console.error('Search error', err);
  });
};

const showWeather = () =>
{
  const resultArr = [];
  searchWeather().then((result) =>
  {
    resultArr.push(result);
    dom.domBuilder(resultArr);
    $('#forecast').click(showFiveCast);
  }).catch((err) =>
  {
    console.error('Search error', err);
  });
};

module.exports =
{
  setKey,
  showWeather,
  showFiveCast,
};
