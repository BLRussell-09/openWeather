const domBuilder = (dataArr) =>
{
  const today = new Date();
  let domString = '';
  dataArr.forEach(element =>
  {
    domString += `<div class="row">`;
    domString += `<div class='col-md-6 col-md-offset-3 ${element.weather[0].main} weather weatherCard' id='soloCard'>`;
    domString += `<h2 class="locationTitle">${element.name}</h2>`;
    domString += `<h2 class="dateTime">${today.toDateString()}</h2>`;
    if (element.weather[0].main === 'Clouds')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/cloud.png"> ${element.main.temp}&degF</p>`;
    }
    else if (element.weather[0].main === 'Clear')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/clear.png"> ${element.main.temp}&degF</p>`;
    }
    else if (element.weather[0].main === 'Rain')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/rain.png"> ${element.main.temp}&degF</p>`;
    }
    else if (element.weather[0].main === 'Haze')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/mist.png"> ${element.main.temp}&degF</p>`;
    }
    domString += `<p><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> ${element.main.temp_min}&degF</p>`;
    domString += `<p><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> ${element.main.temp_max}&degF</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure}</p>`;
    domString += `<p>Wind Speed: ${element.wind.speed}</p>`;
    domString += `<p><button class="btn-primary" id="forecast">5 Day Forecast</button><button class="btn-primary saveForecast" id="saveForecast">Save</button></p>`;
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
    const date = new Date(element.dt * 1000).toDateString();
    domString += `<div class='col-md-3 col-sm-4 '>`;
    domString += `<div class='col-md-12 weather weatherCard ${element.weather[0].main}'>`;
    domString += `<h2 class="locationTitle">${name}</h2>`;
    domString += `<h2 class="dateTime">${date}</h2>`;
    if (element.weather[0].main === 'Clouds')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/cloud.png"> ${element.main.temp}&degF</p>`;
    }
    else if (element.weather[0].main === 'Clear')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/clear.png"> ${element.main.temp}&degF</p>`;
    }
    else if (element.weather[0].main === 'Rain')
    {
      domString += `<p class="conditionTemp"><img data-condition="${element.weather[0].main}" src="./images/rain.png"> ${element.main.temp}&degF</p>`;
    }
    domString += `<p><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span> ${element.main.temp_min}&degF</p>`;
    domString += `<p><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> ${element.main.temp_max}&degF</p>`;
    domString += `<p>Air Pressure: ${element.main.pressure}</p>`;
    domString += `<p>Wind Speed: ${element.wind.speed}</p>`;
    domString += `<button class="btn-primary saveForecast" id="saveForecast">Save</button>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  domString += `</div>`;
  $('.fiveDayCast').html(domString);
};

const weatherList = (weatherArr, whereToPrint) =>
{
  let domString = '';
  domString += `<div class="row">`;
  weatherArr.forEach(element =>
  {
    if (element.isScary === true)
    {
      domString += `<div class="col-sm-6 col-md-4 weatherCard red" data-firebase-id="${element.id}">`;
    }
    else
    {
      domString += `<div class="col-sm-6 col-md-4 weatherCard ${element.wttrConditions}" data-firebase-id="${element.id}">`;
    }
    domString += `<a class="btn btn-danger deleteCard">X</a>`;
    domString += `<h3 class="locationTitle">${element.location}</h3>`;
    domString += `<h3 class="dateTime">${element.date}</h3>`;
    if (element.wttrConditions === 'Clouds')
    {
      domString += `<p><img data-condition="${element.wttrConditions}" src="./images/cloud.png"></p>`;
    }
    else if (element.wttrConditions === 'Clear')
    {
      domString += `<p><img data-condition="${element.wttrConditions}" src="./images/clear.png"></p>`;
    }
    else if (element.wttrConditions === 'Rain')
    {
      domString += `<p><img data-condition="${element.wttrConditions}" src="./images/rain.png"></p>`;
    }
    domString += `<p class="conditionTemp">${element.temp}</p>`;
    if (element.isScary === false)
    {
      domString += `<a class="btn updateCard"><img class="scaryFace" src="./images/scared.png"></a>`;
    }
    else
    {
      domString += `<a class="btn updateCard"><img class="scaryFace" src="./images/smile.png"></a>`;
    }
    domString += `</div>`;
  });
  domString += `</div>`;
  printIt(whereToPrint, domString);
};

const printIt = (whereToPrint, domString) =>
{
  $(`#${whereToPrint}`).html(domString);
};

const printToDom = (domString) =>
{
  $('.currentWeather').html(domString);
};

module.exports =
{
  domBuilder,
  forecastBuilder,
  weatherList,
};
