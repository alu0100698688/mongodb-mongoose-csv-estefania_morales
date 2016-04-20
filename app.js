"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



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

var db = mongoose.connect('mongodb://127.0.0.1:27017/csv_db');

var csvSchema = new mongoose.Schema({
  name:  String,
  content: String
});


var Csv = db.model('Csv', csvSchema);
console.log("Created model");

var csv1 = new Csv({"name":"input", "content":"1, 2 \n 3, 4"});

let p1 = csv1.save(function (err) {
  if (err) return handleError(err);
     console.log("Guardado");
});

Promise.all([p1]).then( (value) => {
    console.log(util.inspect(value, {depth: null}));
    mongoose.connection.close();
  });

// app.listen(app.get('port'), () => {
//     console.log(`Node app is running at localhost: ${app.get('port')}` );
// });
