const jwt = require('jsonwebtoken');
// JWT secret
const RSA_PRIVATE_KEY = process.env.SECRET;

class AuthRes {
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
      const userId = username;

      const jwtBearerToken = jwt.sign({ username: username }, RSA_PRIVATE_KEY, {
              algorithm: 'HS256',
              expiresIn: 120,
              subject: userId
      });

      res.status(200).json({
        idToken: jwtBearerToken,
        expiresIn: 120
      });           
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
  }
}

module.exports = AuthRes;