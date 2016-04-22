# Práctica 9: CSV usando MongoDB

[![Build Status](https://travis-ci.org/alu0100698688/mongodb-mongoose-csv-estefania_morales.svg?branch=master)](https://travis-ci.org/alu0100698688/mongodb-mongoose-csv-estefania_morales)

## A los requisitos de la práctica CSV usando Ajax anterior, se le añaden los siguientes:
* Un botón guardar. Cuando se hace click en dicho botón se guarda la entrada actual en una base de datos MongoDB.
  * El contenido de la entrada actual se guarda con un nombre que se solicita previamente al usuario.
  * Usaremos Mongoose para acceder a la base de datos.
* Sólo se guardan hasta un límite de cuatro ejemplos en la Base de Datos. Cuando el número excede del límite se borra uno de los anteriores y se guarda la nueva entrada
* Al igual que en la práctica CSV usando Ajax habrán botones de selección de ejemplo.
  * Pondremos tantos botones como registros hay en la Base de Datos.
  * Al hacer click en uno de estos botones se carga el ejemplo con ese nombre desde la base de datos en la textarea de entrada.
    * Para trabajar las rutas que sirven los ejemplos cuando se pulsa uno de los botones de selección de ejemplo se puede usar algo como esto:

      >      // Supongamos que se visita con GET la ruta /mongo/input1
          get('/mongo/:ejemplo', function(req, res) {
            console.log(req.params.ejemplo); /* input1 */
            /* ... Consultar la base de datos y retornar contenidos de input1 ... */
          });

* Despliegue su aplicación en c9.io. En los enlaces de entrega (README.mdy taller) especifique la URL de c9.io

  ### Sirviendo varias rutas con un solo middleware.

    En Express es posible servir varias rutas en un sólo middleware usando la notación :string_sin_dos_puntos. En ese caso la correspondiente cadena queda en req.params:
    >     // Supongamos que se visita con GET la ruta      /usuario/pepe
        app.get('/usuario/:id', function (req, res) {
          console.log(req.params); // { id: "pepe" }
          res.send('USUARIO: '+(req.params.id || 'unknown' )); // USUARIO: pepe
        });

    Cuando se visita /usuario/pepe el valor de req.params.id será pepe.

    Es posible también usar una expresión regular para limitar el matching:

    >     // Supongamos que se visita con GET la ruta /mongo/input1.csv
      get('/mongo/:ejemplo([a-zA-Z_]\w*\.csv)', function(req, res) {
        console.log(req.params.ejemplo); /* input1.csv */
        /* ... Consultar la base de datos y retornar contenidos de input1.csv ... */
      });

    There's another way to do this. We can execute a function for a specific parameter before a route function executes. Let's rewrite our previous example using app.param.
    >     app.param('ejemplo', function (req, res, next, ejemplo) {  
        if (ejemplo.match(/^[a-z_]\w*\.csv$/i)) {
            req.ejemplo = ejemplo;
        } else {
            next(new Error(`<${ejemplo}> does not match 'ejemplo' requirements`));
            /* Error: <input1.csx> does not match 'ejemplo' requirements at app.js:85:12 */
         }
        next();
      });
      // Supongamos que se visita con GET la ruta /mongo/input1.csv
      app.get('/mongo/:ejemplo', function(req, res) {
      console.log(req.params.ejemplo); /* input1.csv */
      console.log(req.ejemplo);        /* input1.csv */
      /* ... Consultar la base de datos y retornar contenidos de input1.csv ... */
      });

  * app.param is an amazing function and can be really handy for checking or parsing parameters.
  * Remember to pass the parameter as 4th function parameter though!
  * next() is a function passed as third parameter to a route / param function.
  * When executed it will take you to the next middleware / route.
  * If you give next a parameter such as new Error() or just a string, it will show the user an error.


## Enlaces


* [Página web donde residen todas las prácticas](http://alu0100698688.github.io/web/)

* [Campus de la asignatura](https://campusvirtual.ull.es/1516/course/view.php?id=178)

* [Descripción de la práctica en el campus](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/practicamongodb.html)

* [Enlace a las pruebas](https://estefi-csv-ajax.herokuapp.com/tests) 

* [Despliegue Cloud 9](https://csv-mongodb-estefi-1.c9users.io/)

* [Repositorio Cloud 9](https://ide.c9.io/estefi/csv-mongodb)
