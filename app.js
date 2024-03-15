const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
var favicon = require('serve-favicon')
var path = require('path')
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html")
})


app.post("/", function(req, res){

    const query = req.body.cityName;
    const unit = "metric"
    const appKey = "41e5dbbbb9804bcf50146d1e3461d5cb"

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appKey + "&q=" + query + "&units" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherD = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn" + icon + "@2x.png"

            res.render('weather', {Weather: temp, Desc: weatherD, image: imageURL});
        })
    })

})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is alive!")
})