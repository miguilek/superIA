const Service = require('../models/serviceModel'); 

class ServiceRes {
  
  getAllServices(req, res) {
    Service.find(function (err,data) { 
      res.send(data);
    });
  }

  createService(req, res) {
    const name = req.body.name;
    const uri = req.body.uri;
    const inputType = req.body.inputType;
    const outputType = req.body.outputType;
    const body = req.body.body;
    
    if(name && name != '' && 
      uri && uri != '' && 
      inputType && inputType != '' && 
      outputType && outputType != '' &&
      body && body != ''
    ) {
      const service = new Service({
        name: name,
        uri: uri,
        inputType: inputType,
        outputType: outputType,
        body: body
      });  
      service.save();
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  }

  // getPost(req, res) {
    //   const id = Number(req.params.id);
    //   const post = posts.find(p => p.id === id);
    //   if (!post) {
    //     res.sendStatus(404);
    //     return;
    //   }
    //   res.json(post);
    // }
  
    // updatePost(req, res) {
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
}

module.exports = ServiceRes;