var mongoose = require('mongoose'),  
    Schema = mongoose.Schema;  
  
var serviceSchema = new Schema({  
    name: String,
    type: String,  
    uri: String,
    inputType: String,
    outputType: String,
    body: [String]
});
  
//Export the schema  
module.exports = mongoose.model('Service', serviceSchema); 