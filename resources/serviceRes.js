const Service = require('../models/serviceModel'); 
const nodeFetch = require('node-fetch');

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

    const originalUrl = req.originalUrl;
    const name = originalUrl.split('/').pop();
    const payload = req.body.data; // el payload incial es con el que se llama a este servicio
    
    //let auxPayload = payload; // Aqui guardamos los diferentes payloads del flujo (respuestas de la llamada al servicio anterior)

    // Recuperamos el servicio de BBDD
    const service = await Service.findOne({ name: name });

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

      // Llamamos al servicio con el payload correspondiente de manera síncrona
      const call = {
        method: 'post',
        body: JSON.stringify(auxPayload),
        headers: {'Content-Type': 'application/json'}
      };
      console.log(call);
      const response = await nodeFetch(innerService.uri, call);
      auxPayload = await response.json();
    };

    res.send(auxPayload);
  }

}

module.exports = ServiceRes;