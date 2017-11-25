const express = require ('express');
const router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log("error: " + err);
});
db.on('connected', function() {
  console.log("Connected successfully to server");
});

var Schema = mongoose.Schema;

var clientInfoSchema = new Schema({
  userID: String,
  userPassword: String,
  userName: String
});

var ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);

ClientInfo.find(function(err, info) {
  if (err)
    return console.error(err);
  console.log(info);
});

router.post('/login',function(req,res){

  console.log(req.sessionID);
  ClientInfo.findOne({userID: req.body.id, userPassword: req.body.pw}, function (err, info) {
    if (err) {
      return console.log("err " + err);
    }
    console.log(info)
    if(!info){
      res.send(JSON.stringify('Wrong Info'));
    } else{
      res.send(JSON.stringify(info.userName));
    }
  })
});
router.get('/testGET',function(req,res){
  console.log(req.query.test);
  res.send({test : 'response data from GET handler'});
});

router.post('/testPOST',function(req,res){
  console.log(req.body.test);
  res.send({test : 'response data from POST handler'});
});

module.exports = router;
