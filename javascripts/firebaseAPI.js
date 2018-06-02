let firebaseConfig = {};

const setConfig = (fbConfig) =>
{
  firebaseConfig = fbConfig;
};

const saveWeather = (newForecast) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'POST',
        url: `${firebaseConfig.databaseURL}/weather.json`,
        data: JSON.stringify(newForecast),
      }).done((uniqueKey) =>
    {
      resolve(uniqueKey);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const getWeather = () =>
{
  return new Promise ((resolve, reject) =>
  {
    const allWeatherArr = [];
    $.ajax(`https://openweather-476e1.firebaseio.com/weather.json`).done((allWeatherObj) =>
    {
      if (allWeatherObj !== null)
      {
        Object.keys(allWeatherObj).forEach((fbKey) =>
        {
          allWeatherObj[fbKey].id = fbKey;
          allWeatherArr.push(allWeatherObj[fbKey]);
        });
      }
      resolve(allWeatherArr);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

module.exports =
{
  setConfig,
  saveWeather,
  getWeather,
};
