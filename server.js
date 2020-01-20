const express = require('express')
const app = express()
const request = require('request');
let apiKey = '56e7ca84a9c479edb0f7c7ac17b2198c';
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  })
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})