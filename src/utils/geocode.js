const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlzaHdhc3QiLCJhIjoiY2tibHF3Y3U1MGR6dzJ5cG92aWsxc3l0dCJ9.7yN_HnsxJApDpR78keRYyg&limit=1'

    request({url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find the location! Please provide another location.', undefined)
        }else{
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
