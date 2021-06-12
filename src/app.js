const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Vishwas Tamta'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Vishwas Tamta'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        helpText: 'SomeText',
        name: 'Vishwas Tamta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({ 
                location, 
                forecastData,
                address: req.query.address 
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        error: 'Help artical not found!',
        name: 'Vishwas Tamta'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found!',
        name: 'Vishwas Tamta'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})