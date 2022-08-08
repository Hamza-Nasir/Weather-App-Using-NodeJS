const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express();

// Define paths for Express configuration
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and Views location (Default of views is base directory of project)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve (HTML CSS JS)
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Mein Weather",
        name: "Hamza",
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "No address provided!",
        })
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, country } = {}) => {
        if (error) {
            return res.send({error: error});
        }

        // console.log(country);

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error});
            }

            else {

                // console.log(response);

                res.send({
                    address: address,
                    country,
                    data: forecastData,
                    weather_desc: forecastData.weather_descriptions[0],
                    
                })
            }
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Hamza",
    });
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term.",
        })
    }

    res.send({
        products: [],
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "I need some halp!",
        title: "Help Page",
        name: "Hamza",
    });
})

// On all other routes except those above, give a 404
app.get('/help/*', (req, res) => {
    res.render("error", {
        errorMsg: "Help article not found!",
        name: "Hamza",
        title: "Help Error page",
    })
})

app.get('*', (req, res) => {
    res.render("error", {
        errorMsg: "404 Page not found!",
        name: "Hamza",
        title: "Page not found Error page",
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather App</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: "Hamza",
//         age: 21,
//     });
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>A simple web based weather app using Node and Express!</h1>");
// })

app.get('/weather', (req, res) => {
    res.send({
        location: "Rawalpindi",
        forecast: "Sunny",
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
})