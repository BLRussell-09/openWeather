const domBuilder = (dataArr) =>
{
  let domString = '';
  dataArr.forEach(element =>
  {
    domString += `<div class="row">`;
    domString += `<div class='col-md-6 col-md-offset-3 ${element.weather[0].main}' id='soloCard'>`;
    domString += `<h2>${element.name}</h2>`;
    domString += `<p>${element.weather[0].main}: ${element.main.temp}&degF</p>`;
    domString += `<p><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> ${element.main.temp_min}&degF  <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> ${element.main.temp_max}&degF</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure}</p>`;
    domString += `<p>Wind Speed: ${element.wind.speed}</p>`;
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
  dataArr.forEach(element =>
  {
    const dayTime = element.dt_txt.replace(/21:00:00/, '').replace(/2018-/, '').split(' ');
    domString += `<div class='col-md-3 '>`;
    domString += `<div class='col-md-12 weatherCard ${element.weather[0].main}'>`;
    domString += `<h2>${dayTime[0]}</h2>`;
    domString += `<p>${element.weather[0].description}: ${element.main.temp}&degF</p>`;
    domString += `<p><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> ${element.main.temp_min}&degF <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> ${element.main.temp_max}&degF</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure}</p>`;
    domString += `<p>Wind Speed: ${element.wind.speed}</p>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  domString += `</div>`;
  $('.fiveDayCast').html(domString);
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
