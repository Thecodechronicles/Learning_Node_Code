var request = require('request');
var weatherunits = require('./weatherunits');

var forecast = (latitude, longitude, callback) => {
    request('https://api.darksky.net/forecast/dc9cf54ef9917c436ae2fcc1330c6a30/' + latitude + ',' + longitude, (error, response) => {
        if (error) {
            callback(error);
        } else if (response.error) {
            callback(response.error);
        } else {
            var responseData = JSON.parse(response.body);
            const { celcius, humidity, precipitation } = weatherunits(responseData.currently.temperature, responseData.currently.humidity, responseData.currently.precipProbability);

            var fullResponseData = {
                celcius,
                humidity,
                precipitation,
                summary: responseData.currently.summary,
                hourlySummary: responseData.hourly.summary,
                pressure: responseData.currently.pressure,
                windSpeed: responseData.currently.windSpeed
            }

            callback(undefined, fullResponseData);
        }

    })
}

module.exports = forecast;