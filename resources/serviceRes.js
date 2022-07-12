const Service = require('../models/serviceModel'); 
const request = require('request');

class ServiceRes {
  
  getAllServices(req, res) {
    Service.find(function (err,data) { 
      res.status(200).send(data);
    });
  }

  createService(req, res) {
    
    const name = req.body.name;
    const uri = req.body.uri;
    const type = req.body.type;
    const inputType = req.body.inputType;
    const outputType = req.body.outputType;
    const body = req.body.body;

    if(name && name != '' && 
      uri && uri != '' && 
      type && type != '' && 
      inputType && inputType != '' && 
      outputType && outputType != '' &&
      body
    ) {
      const service = new Service({
        name: name,
        uri: uri,
        type: type,
        inputType: inputType,
        outputType: outputType,
        body: body
      });  
      service.save()
        .then(() => res.status(201).send())
        .catch(err => console.log(err));
    } else {
      res.sendStatus(400);
    }
  }

  clearServices(req, res) {
    Service.deleteMany().then(result => {
        console.log(result);
        res.sendStatus(204)
    });
  }

  deleteService(req,res) {
    const name = req.body.name;
    if(name && name != '') {
      Service.remove({ name: name })
        .then(res => res.status(200).send(res.deletedCount))
        .catch(err => console.log(err));
    }
    else
      res.sendStatus(400);
  }

 
    // updateService(req, res) {
    //   const id = Number(req.params.id);
    //   let post = posts.find(p => p.id === id);
    //   if (!post) {
    //     res.sendStatus(404);
    //     return;
    //   }
    //   Object.assign(post, req.body);
    //   res.json(post);
    // }
    // deletePost(req, res) {
    //   const id = Number(req.params.id);
    //   const post = posts.find(p => p.id === id);
    //   if (!post) {
    //     res.sendStatus(404);
    //     return;
    //   }
    //   posts = posts.filter(p => p.id !== id);
    //   res.json(post);
  // }

  async run(req, res) {

    //   req.body tiene el nombre y el payload del servicio {name,payload}

    const originalUrl = req.originalUrl;
    const name = originalUrl.split('/').pop();
    const payload = req.body.payload; // el payload incial es con el que se llama a este servicio
    let auxPayload = payload; // Aqui guardamos los diferentes payloads del flujo (respuestas de la llamada al servicio anterior)
    /** post servicio1(auxpayload) -> respuesta1; auxPayload = repsuesta1;
     * post servicio2(auxPayload) -> respuesta2; auxPayload = repsuesta2;
     * ...
     */

    // Recuperamos el servicio de BBDD
    const service = await Service.findOne({ name: name });

    if(service.type == 'tarea') { // Es un servicio de tarea
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
      for(const serviceName of service.body) {
        // Recuperamos de BBDD el servicio que toca
        const innerService = await Service.findOne({name: serviceName}); 
        // Llamamos al servicio con el payload correspondiente
        // IMPORTANTE: este post tiene que ser síncrono
        // const auxPayload = await http.post(innerService.uri,auxPayload);
        const call = {
          uri: innerService.uri,
          body: JSON.stringify(auxPayload),
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        };

        console.log('-------TAREA--------------');
        console.log(serviceName);
        console.log(innerService);
        console.log(call);
        // auxPayload = await request(call);
        // auxPayload = await 
        request({
          uri:'http://127.0.0.1:8000/testmicroservice',
          body: JSON.stringify({}),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }, function(error,data) {console.log(error,data.body)});
        // console.log(auxPayload);
        console.log('---------------------');
      };

      res.send('tarea');
    } else if( service.type == 'microservicio') { // Es un microservicio
      // LLamamos directamente al microservicio
      // const response = await http.post(service.uri,payload);
      // res.send(data);
      console.log('#########MICROSERVICIO###########');
      console.log(service);
      console.log('####################');
      res.send('microservicio');
    }
    
    // res.send(500);
  }

}

module.exports = ServiceRes;