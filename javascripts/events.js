const weather = require('./weather');

const initButtons = () =>
{
  $(document).keypress((e) =>
  {
    if (e.key === 'Enter')
    {
      weather.showWeather();
      $('.fiveDayCast').html('');
    }
  });
};

const fiveCast = () =>
{
  $('#forecast').click(doStuff);

};

const doStuff = () =>
{
  weather.showFiveCast();
};

module.exports =
{
  initButtons,
  fiveCast,
};
