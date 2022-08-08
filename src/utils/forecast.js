const request = require('request');

const weatherKey = "a22995f0c80d4d02c391a27f213bf7b2";

const forecast = (latitude, longitude, callback) => {

    // console.log("B");

    const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longitude}`;

    // console.log(url);

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Low level error detected (No connection).", undefined);
        }

        else if (body.error) {
            callback("Unable to find entered location.", undefined);
        }
        else {
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;