const Service = require('../models/serviceModel'); 

class GenericService {
  
    run(req, res) {

      //   req.body tiene el nombre y el payload del servicio {name,payload}

      const name = req.body.name;
      const payload = req.body.body; // el payload incial es con el que se llama a este servicio
      let auxPayload = payload; // Aqui guardamos los diferentes payloads del flujo (respuestas de la llamada al servicio anterior)
      /** post servicio1(auxpayload) -> respuesta1; auxPayload = repsuesta1;
       * post servicio2(auxPayload) -> respuesta2; auxPayload = repsuesta2;
       * ...
       */

      // Recuperamos el servicio de BBDD
      Service.findFirst(function (err,serv) {
        
        if(serv.type == 'service') { // Es un servicio de tarea
          /** Iteramos todos los servicios que componen este servicio de tarea 
           *  serv: Service = {
           *    name: String,
           *    type: String,  
           *    uri: String,
           *    inputType: String,
           *    outputType: String,
           *    body: [String]
           *  }
          */
          serv.body.foreach(s => {
            Service.findFirst(function (err,serv) { // Recuperamos de BBDD el servicio que toca
              // Llamamos al servicio con el payload correspondiente
              // IMPORTANTE: este post tiene que ser síncrono
              http.post(serv.uri,auxPayload).then(data => {
                auxPayload = data;
              });
            });
          });
  
          res.send(auxPayload);

        } else if( serv.type == 'microservice') { // Es un microservicio
          // LLamamos directamente al microservicio
          http.post(serv.uri,payload).then(data => {
            res.send(data);
          });
        }
      });

      res.send(500);
    }
  
  }
  
  module.exports = GenericService;