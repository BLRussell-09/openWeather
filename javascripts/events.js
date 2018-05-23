const weather = require('./weather');

const initButtons = () =>
{
  $(document).keypress((e) =>
  {
    if (e.key === 'Enter')
    {
      weather.showWeather();
      // $('.input-group').addClass('hidden');
    }
  });
};

const fiveCast = () =>
{
  $('#forecast').click(weather.showFiveCast());
};

module.exports =
{
  initButtons,
  fiveCast,
};
