"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/csv_db'); //Conexión a la base de datos



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


//Creación de un objeto EntradaCsv
const Entrada = require('./models/modelo-db.js');

//Eliminación de la última entrada para que siempre hayan 4 entradas en la bd
app.get('/mongo', function(req, res) {
    Entrada.find({}, function(err, entradas) {
        if (err)
            return err;
        if (entradas.length >= 4) {
            Entrada.find({ name: entradas[3].name }).remove().exec();
        }
    });
    
    //Creación de la entrada nueva a guardar
    let input = new Entrada({
        "name": req.query.name,
        "content": req.query.content
    });
    
    //Guardando la entrada nueva en la bd
    input.save(function(err) {
        if (err) {
            console.log(`Error al guardar:\n${err}`);
            return err;
        }
        console.log(`Guardado con éxito: ${input}`);
    });
});

//Mostrar todas las entradas de la collection
app.get('/find', function(req, res) {
    Entrada.find({}, function(err, entradas) {
        if (err)
            return err;
        res.send(entradas);
    });
});

//Muestra el contenido asociado al nombre indicado
app.get('/findName', function(req, res) {
    Entrada.find({
        name: req.query.name
    }, function(err, contenido) {
        res.send(contenido);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
