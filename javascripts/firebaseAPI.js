let firebaseConfig = {};
let uid = {};
console.log(uid);
const setConfig = (fbConfig) =>
{
  firebaseConfig = fbConfig;
};

const setUID = (newUID) =>
{
  uid = newUID;
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
    $.ajax(`${firebaseConfig.databaseURL}/weather.json`).done((allWeatherObj) =>
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

const deleteWeatherFromDb = (weatherId) =>
{
  return new Promise ((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'DELETE',
        url: `${firebaseConfig.databaseURL}/weather/${weatherId}.json`,
      })
      .done(() =>
      {
        resolve();
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const updateWeatherDb = (updatedWeatherCard, weatherId) =>
{
  return new Promise ((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'PUT',
        url: `${firebaseConfig.databaseURL}/weather/${weatherId}.json`,
        data: JSON.stringify(updatedWeatherCard),
      })
      .done((modifiedWeatherCard) =>
      {
        resolve(modifiedWeatherCard);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

module.exports =
{
  setConfig,
  setUID,
  saveWeather,
  getWeather,
  deleteWeatherFromDb,
  updateWeatherDb,
};
