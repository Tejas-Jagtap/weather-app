const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=b90e1b784b8276a92e2ebaa35361040b&query=" + latitude + "," + longitude + "&units=m"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("We are unable to connect weather services", undefined)
        }
        else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ", Its currently " + body.current.temperature + " degrees out, but it feels like " + body.current.feelslike + " degrees. The humidity is " + body.current.humidity + '.')
        }

    })
}
module.exports = forecast