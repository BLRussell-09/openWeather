const domBuilder = (dataArr) =>
{
  let domString = '';
  dataArr.forEach(element =>
  {
    domString += `<div class="row">`;
    domString += `<div class='col-md-6 col-md-offset-3 ${element.weather[0].main}' id='soloCard'>`;
    domString += `<h3>${element.name}</h3>`;
    domString += `<p>Low: ${element.main.temp_min}&deg  High: ${element.main.temp_max}&deg</p>`;
    domString += `<p>${element.weather[0].main}: ${element.main.temp}&deg</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure} Wind Speed: ${element.wind.speed}</p>`;
    domString += `<button class="btn-primary" id="forecast">5 Day Forecast</button>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  printToDom(domString);
};

const forecastBuilder = (dataArr, name) =>
{
  let domString = '';
  domString += `<div class="row text-center">`;
  domString += `<h3>${name}</h3>`;
  dataArr.forEach(element =>
  {
    const dayTime = element.dt_txt.replace(/00:00:00/, '');
    domString += `<div class='col-md-3 '>`;
    domString += `<div class='col-md-12 weatherCard ${element.weather[0].main}'>`;
    domString += `<h3>${dayTime}</h3>`;
    domString += `<p>Low: ${element.main.temp_min}&deg  High: ${element.main.temp_max}&deg</p>`;
    domString += `<p>${element.weather[0].main}: ${element.main.temp}&deg</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure} Wind Speed: ${element.wind.speed}</p>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  domString += `</div>`;
  $('.currentWeather').html(domString);
};

const printToDom = (domString) =>
{
  $('.currentWeather').html(domString);
};

module.exports =
{
  domBuilder,
  forecastBuilder,
};
