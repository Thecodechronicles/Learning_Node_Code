var request = require('request');

var geocode = (address, callback) => {
    request('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ku3ZXzpWATD8oGR6ZsYLYVGGVy6CAwEl&q=' + address + '&language=en-us&details=false', (error, response) => {
        if (error) {
            callback(error);
        } else if (response.someError) {
            callback(response.someError)
        } else {
            var responseData = JSON.parse(response.body);
            callback(undefined, {
                latitude: responseData[0].GeoPosition.Latitude,
                longitude: responseData[0].GeoPosition.Longitude,
                location: responseData[0].LocalizedName
            })
        }

    })

}

module.exports = geocode;