const request = require('request');

const positionKey = "02423e3c868ada50db61315a9b1ae6e0";

const geocode = (address, callback) => {

    // console.log("A");

    const url = `http://api.positionstack.com/v1/forward?access_key=${positionKey}&query=${address}&limit=1`;

    // console.log(url);

    request({ url, json: true }, (error, { body }) => {

        // console.log(response);

        if (error) {
            callback(undefined,'Unable to connect to services')
        }

        else if (body.error || body.data.length === 0) {
            callback(undefined, "Unable to find location");
        }

        else {

            console.log(body);

            callback(undefined, { "latitude": body.data[0].latitude, "longitude": body.data[0].longitude, "country": body.data[0].country });
        }
    })
}
 
// geocode(location, (error, response) => {
//     if (error) {
//         console.log(error);
//     }

//     else {
//         console.log(response);
//     }
// })

module.exports = geocode;