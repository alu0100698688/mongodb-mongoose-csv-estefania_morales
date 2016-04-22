(function() {
    "use strict";
    const util = require('util');
    var mongoose = require('mongoose');

    //Esquema 
    const EntradaSchema = mongoose.Schema({
        "name": {
            type: String,
            unique: true
        },
        "content": String
    });

    //Modelo de datos usando el schema
    const EntradaCsv = mongoose.model("EntradaCsv", EntradaSchema);

    //Se crean las tres entradas que aparecían en la app inicial
    let input1 = new EntradaCsv({
        "name": "input1.csv",
        "content": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\\"Reilly", "7,2"`
    });
    
    let input2 = new EntradaCsv({
        "name": "input2.csv",
        "content": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\\"Reilly", "7,2"     "13/02"`
    });
    
    let input3 = new EntradaCsv({
        "name": "input3.csv",
        "content": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

    //Insertando las entradas en la base de datos
    let p1 = input1.save(function(err) {
        if (err) {
            console.log(`Error al insertar:\n${err}`);
            return err;
        }
        console.log(`Guardado con éxito: ${input1}`);
    });

    let p2 = input2.save(function(err) {
        if (err) {
            console.log(`Error al insertar:\n${err}`);
            return err;
        }
        console.log(`Guardado con éxito: ${input2}`);
    });

    let p3 = input3.save(function(err) {
        if (err) {
            console.log(`Error al insertar:\n${err}`);
            return err;
        }
        console.log(`Guardado con éxito: ${input3}`);
    });

    //Tras la inserción cerrar la conexión
    Promise.all([p1,p2,p3]).then( (value) => {
        console.log(util.inspect(value, {depth: null}));
        mongoose.connection.close();
    });

    module.exports = EntradaCsv;
})();