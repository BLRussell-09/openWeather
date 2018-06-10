# Open Weather

## Description
> An exercise in API's, this SPA will allow you to register as a new user and search by zipcode to find the local weather for that area. You can also save the forcast if you'd like, and mark it if you are displeased by the weather that day.

## Screenshots

![Login Screen](https://raw.githubusercontent.com/BLRussell-09/openWeather/master/screenshots/login.png "Log In Page")


![My Weaher](https://raw.githubusercontent.com/BLRussell-09/openWeather/master/screenshots/myWeather.png "User Saved Weather Page")


![Weather Search](https://raw.githubusercontent.com/BLRussell-09/openWeather/master/screenshots/weatherSearch.png "Weather Search")


## Fire it up
> Serve up the site and load the page
1. Clone down the repo and cd into the project.
1. Install http-server plugin via vpm
1. Cd into the lib folder and run npm init
1. Cd into the lib folder and run npm install grunt --save -dev
1. Run npm install grunt-browserify grunt-contrib-watch gruntify-eslint --save-dev
1. Run grunt
1. In the db folder make a new json file called apiKeys, copy the format laid out in the file apiKeys.json.example into your new file
1. Add your api key from https://www.openweathermap.org/
1. Add your firebase config to the file as well.
1. In your terminal type: hs -p 8080
1. In your browser navigate to: localhost:8080