const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast');

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        Name: 'Tejas',
        Title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        Name: 'Tejas',
        Title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Contact: 9975258478,
        Title: 'Help',
        Name: 'Tejas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                Location:location,
                Address:req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        Title: '404',
        Name: 'Tejas',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        Title: '404',
        Name: 'Tejas',
        errorMessage: 'Page not found'
    })
})

app.listen('3000', () => {
    console.log("server on 3000 ")
})