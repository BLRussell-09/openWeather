const weather = require('./weather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const initButtons = () =>
{
  $(document).keypress((e) =>
  {
    if (/(\d{5}([\-]\d{4})?)/.test($('#searchBar').val()))
    {
      if (e.key === 'Enter' && !$('#searchWeather').hasClass('hidden'))
      {
        weather.showWeather();
        $('.fiveDayCast').html('');
      }
    }
    else if (e.key === 'Enter' && !$('#searchWeather').hasClass('hidden'))
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

const updateWeatherEvent = () =>
{
  $(document).on('click', '.updateCard', (e) =>
  {
    console.log('updated?');
    const weatherToUpdateId = $(e.target).closest('.weatherCard').data('firebaseId');
    const weatherToUpdateCard = $(e.target).closest('.weatherCard');
    const updatedWeather =
    {
      location: weatherToUpdateCard.find('.locationTitle').text(),
      wttrConditions: weatherToUpdateCard.find('img').data('condition'),
      date: weatherToUpdateCard.find('.dateTime').text(),
      temp: weatherToUpdateCard.find('.conditionTemp').text(),
      isScary: true,
    };
    firebaseAPI.updateWeatherDb(updatedWeather, weatherToUpdateId)
      .then(() =>
      {
        getWeatherEvent();
      })
      .catch((err) =>
      {
        console.error(err);
      });
  });
};

const authEvents = () =>
{
  // Log In Event
  $('#signInButton').click((e) =>
  {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {})
      .catch((error) =>
      {
        // Handle Errors here.
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hidden');
        console.error(error.message);
        // ...
      });
  });

  // Log Out Event
  $('#logoutNav').click((e) =>
  {
    firebase.auth().signOut().then(() =>
    {
      // Sign-out successful.
      $('#authScreen').removeClass('hidden');
      $('#myWeather').addClass('hidden');
      $('#searchWeather').addClass('hidden');
      $('#myWeatherNav, #searchMe, #logoutNav').addClass('hidden');
    })
      .catch((error) =>
      {
        // An error happened.
        console.error(error);
      });
  });

  // Register Button
  $('#register-link').click(() =>
  {
    $('#registration-form').removeClass('hidden');
    $('#login-form').addClass('hidden');
  });

  // Signin Button
  $('#signin-link').click(() =>
  {
    $('#registration-form').addClass('hidden');
    $('#login-form').removeClass('hidden');
  });

  // Register New User Event
  $('#registerButton').click(() =>
  {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch((error) =>
    {
      // Handle Errors here.
      console.error(error.message);
      // ...
    });

  });
};

const initializer = () =>
{
  myPages();
  initButtons();
  saveWeatherEvent();
  deleteWeatherEvent();
  updateWeatherEvent();
  authEvents();
};

module.exports =
{
  initializer,
  fiveCast,
  saveWeatherEvent,
  getWeatherEvent,
};
