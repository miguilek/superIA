// .env
require('dotenv').config({ path: './config.env' });
// Express. Mongoose.
const express = require('express');
      mongoose = require('mongoose');
// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// Custom middleware
const middleware = require('./modules/middleware');
// Resources
const AuthResource = require('./resources/authRes');
const ServiceResource = require('./resources/serviceRes');
const Service1Resource = require('./services/service1');
const GenericService = require('./services/GenericService')

// Starting point of the server
function main() {
  const app = express();
  const port = process.env.PORT || 8000;
  
  const serviceRes = new ServiceResource();
  const authRes = new AuthResource();

  const distDir = __dirname + "/dist/";
  app.use(express.static(distDir));

  // Middleware
  app.use(bodyParser.urlencoded({ 
    extended: true
  }));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('combined'));


  // --- ROUTES ---
  
  // AUTH
  
  app.post('/users/authenticate', authRes.login);

  // SERVICE MANAGEMENT

  app.get('/services', 
    // middleware.checkToken,
    serviceRes.getAllServices);

  app.post('/service', 
    // middleware.checkToken,
    serviceRes.createService);

  // app.get('/posts/:id', middleware.checkToken, handlers.getPost);
  
  // app.put('/posts/:id', middleware.checkToken, handlers.updatePost);

  app.delete('/service', 
    // middleware.checkToken, 
    serviceRes.clearServices);

  /* 2 opciones para crear la API de services: ) */
  
  /*
  --- 1a ---
  Al crear un service desde Angular hay que generarlo en services/ e importarlo aquí.
  Importar-cargar rutas en express dinámicamente desde un fichero
  */
  
  // TODO: buscar como importar-cargar rutas en express dinamicamente
  // const service1Res = new Service1Resource();
  // app.post('/runservice/service1',
  //   // middleware.checkToken,
  //   service1Res.run)

  /*
  --- 2a ---
  Crear una clase de invocación de service dinámica: 
    1. Se le pasa en el req. el nombre del service y lo recupera de BBDD {name,uri,outputType,inputType,body}
    2. La clase genérica recorre con un bucle el body del service llamando a las URIs definidas y enrutando las respuestas con la siguiente llamada
  */

  // Ruta de service genérica a la que se le pasa en req el nombre del service, lo coge y carga de BBDD dinámicamente y lo ejecuta
  
  // const genericService = new ServiceResource();
  // // Como payload siempre recibimos un objeto del tipo Service {name,uri,outputType,inputType,body}
  // app.post('/runservice/service1',
  //   // middleware.checkToken,
  //   genericService.run)

  
  // Habilitar la navegacion por URL devolver static index.html
  app.all('*', (req, res) => {
    res.sendFile(distDir + '/index.html');
  });

  // DB
  mongoose.connect(
    process.env.ATLAS_URI, 
    {dbName: 'SuperIA'}
  );

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();