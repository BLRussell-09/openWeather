const {setUID,} = require('./firebaseAPI');
const {getWeatherEvent,} = require('./events');

const checkLoginStatus = () =>
{
  firebase.auth().onAuthStateChanged((user) =>
  {
    if (user)
    {
      // User is signed in.
      setUID(user.uid);
      console.log(`I'm in`);
      getWeatherEvent();
      $('#authScreen').addClass('hidden');
      $('#myWeather').removeClass('hidden');
      $('#myWeatherNav, #searchMe, #logoutNav').removeClass('hidden');
    }
    else
    {
      // No user is signed in.
      $('#authScreen').removeClass('hidden');
      $('#myWeather').addClass('hidden');
      $('#searchWeather').addClass('hidden');
      $('#myWeatherNav, #searchMe, #logoutNav').addClass('hidden');
    }
  });
};

module.exports =
{
  checkLoginStatus,
};
