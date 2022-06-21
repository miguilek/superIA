const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');
const cors = require('cors');
let posts = require('./posts');

const user = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

class HandlerGenerator {
  login(req, res) {
    const username = req.body.username,
          password = req.body.password;

    // if (username && password) {
    //   if (username === user.username && password === user.password) {
    //     let token = jwt.sign({ username: username },
    //       config.secret,
    //       {
    //         expiresIn: '24h' // expires in 24 hours
    //       }
    //     );
    //     // return the JWT token for the future API calls
    //     res.json({
    //       token: token,
    //       ...user
    //     });
    //   } else {
    //     res.status(403).json({
    //       message: 'Incorrect username or password'
    //     });
    //   }
    // } else {
    //   res.status(400).json({
    //     message: 'Authentication failed! Please check the request'
    //   });
    // }

    if (validateEmailAndPassword()) {
      const userId = findUserIdForEmail(username);

      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
              algorithm: 'RS256',
              expiresIn: 120,
              subject: userId
      });

      // send the JWT back to the user
      // TODO - multiple options available     
      res.status(200).json({
        idToken: jwtBearerToken,
        expiresIn: ...
      })              ;           
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
  }
  getAllPosts(req, res) {
    res.json(posts);
  }
  getPost(req, res) {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
      res.sendStatus(404);
      return;
    }
    res.json(post);
  }
  createPost(req, res) {
    const post = req.body;
    post.id = new Date().getUTCMilliseconds();
    posts = [...posts, post];
    res.json(post);
  }
  updatePost(req, res) {
    const id = Number(req.params.id);
    let post = posts.find(p => p.id === id);
    if (!post) {
      res.sendStatus(404);
      return;
    }
    Object.assign(post, req.body);
    res.json(post);
  }
  deletePost(req, res) {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
      res.sendStatus(404);
      return;
    }
    posts = posts.filter(p => p.id !== id);
    res.json(post);
  }
}

// Starting point of the server
function main() {
  const app = express(); // Export app for other routes to use
  const handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  
  const distDir = __dirname + "/dist/";
  app.use(express.static(distDir));

  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(cors());
  app.use(bodyParser.json());
  
  // Routes & Handlers
  app.post('/users/authenticate', handlers.login);
  app.get('/posts', middleware.checkToken, handlers.getAllPosts);
  app.get('/posts/:id', middleware.checkToken, handlers.getPost);
  app.post('/posts', middleware.checkToken, handlers.createPost);
  app.put('/posts/:id', middleware.checkToken, handlers.updatePost);
  app.delete('/posts/:id', middleware.checkToken, handlers.deletePost);

  // Habilitar la navegacion por URL devolver static index.html
  app.all('*', (req, res) => {
    res.sendFile(distDir + '/index.html');
  });

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
