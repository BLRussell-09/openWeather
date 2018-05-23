const weather = require('./weather');

const initButtons = () =>
{
  $(document).keypress((e) =>
  {
    if (e.key === 'Enter')
    {
      weather.showWeather();
    }
  });
};

module.exports =
{
  initButtons,
};
