var weatherunits = (temperature, humidity, precipProbability) => {
    return {
        celcius: ((temperature - 32) / 1.8).toFixed(2),
        humidity: humidity * 100,
        precipitation: precipProbability * 100
    }
}

module.exports = weatherunits;