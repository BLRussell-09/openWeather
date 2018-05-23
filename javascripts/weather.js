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

const showFiveCast = () =>
{
  const forecastArr = [];
  fiveCast().then((result) =>
  {
    result.list.forEach(element =>
    {
      if (element.dt_txt.includes('00:00:00'))
      {
        forecastArr.push(element);
      }
    });
    console.log(forecastArr);
    console.log(result);
    dom.forecastBuilder(forecastArr, result.city.name);
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
    console.log(resultArr);
    dom.domBuilder(resultArr);
    // events.fiveCast();
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
