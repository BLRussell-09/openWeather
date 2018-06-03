const weather = require('./weather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const initButtons = () =>
{
  $(document).keypress((e) =>
  {
    if (/(\d{5}([\-]\d{4})?)/.test($('#searchBar').val()))
    {
      if (e.key === 'Enter')
      {
        weather.showWeather();
        $('.fiveDayCast').html('');
      }
    }
    else if ((e.key === 'Enter'))
    {
      alert('You need an actual zipcode');
      $('#searchBar').val('');
    };
  });
};

const myPages = () =>
{
  $(document).click(showPages);
};

const showPages = (e) =>
{
  if (e.target.id === 'myWeatherNav')
  {
    $('#myWeather').removeClass('hidden');
    $('#searchWeather').addClass('hidden');
    getWeatherEvent();
  }
  else if (e.target.id === 'searchMe')
  {
    $('#searchWeather').removeClass('hidden');
    $('#myWeather').addClass('hidden');
  }
};

const fiveCast = () =>
{
  $('#forecast').click(doStuff);

};

const doStuff = () =>
{
  weather.showFiveCast();
};

const saveWeatherEvent = () =>
{
  $(document).on('click', '.saveForecast', (e) =>
  {
    console.log('saved?');
    const weatherToAddCard = $(e.target).closest('.weatherCard');
    const weatherToAdd =
    {
      location: weatherToAddCard.find('.locationTitle').text(),
      wttrConditions: weatherToAddCard.find('img').data('condition'),
      date: weatherToAddCard.find('.dateTime').text(),
      temp: weatherToAddCard.find('.conditionTemp').text(),
      isScary: false,
    };
    firebaseAPI.saveWeather(weatherToAdd).then(() =>
    {}).catch((err) =>
    {
      console.error('Error in saving weather', err);
    });
  });
};

const getWeatherEvent = () =>
{
  firebaseAPI.getWeather()
    .then((weatherArray) =>
    {
      console.log(weatherArray);
      dom.weatherList(weatherArray, 'savedWeather');
    })
    .catch((err) =>
    {
      console.error('Error in Get All Weather' ,err);
    });
};

const deleteWeatherEvent = () =>
{
  $(document).on('click', '.deleteCard', (e) =>
  {
    console.log('gone?');
    const forcastToDeleteId = $(e.target).closest('.weatherCard').data('firebaseId');
    firebaseAPI.deleteWeatherFromDb(forcastToDeleteId).then(() =>
    {
      getWeatherEvent();
    }).catch((err) =>
    {
      console.error(err);
    });
  });
};

const initializer = () =>
{
  myPages();
  initButtons();
  saveWeatherEvent();
  deleteWeatherEvent();
};

module.exports =
{
  initializer,
  fiveCast,
  saveWeatherEvent,
};
