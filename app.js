"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {
  response.render('index', { title: "CSV"});
});

app.post('/csv', (request, response) => {
  var csv = request.body.csv;
  console.log(csv);
  response.render('csv', { "csv": calculate(csv), title:"Resultado" });
});

// app.get('/pruebas', (request, response) => {
//   response.render('tests', { title: "Tests"});
// });

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
