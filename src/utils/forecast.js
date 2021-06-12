const request = require('postman-request')

const forecast = (lattitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=6eec1df88498c4a4975e22c6e705239f&query='+ lattitude + ',' + longitude

    request({ url, json: true}, (error, { body } = {}) => {

        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ' It\'s ' + body.current.temperature +' degrees out. Feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast