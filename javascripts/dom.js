const domBuilder = (dataArr) =>
{
  let domString = '';
  dataArr.forEach(element =>
  {
    domString += `<div class="row">`;
    domString += `<div class='col-md-6 col-md-offset-3 ${element.weather[0].main}'>`;
    domString += `<h3>${element.name}</h3>`;
    domString += `<p>Low: ${element.main.temp_min}&deg  High: ${element.main.temp_max}&deg</p>`;
    domString += `<p>${element.weather[0].main}: ${element.main.temp}&deg</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure} Wind Speed: ${element.wind.speed}</p>`;
    domString += `<button class="btn-primary">5 Day Forecast</button>`;
    domString += `</div>`;
    domString += `</div>`;
    printToDom(domString);
  });
};

const printToDom = (domString) =>
{
  $('.currentWeather').append(domString);
};

module.exports =
{
  domBuilder,
};
