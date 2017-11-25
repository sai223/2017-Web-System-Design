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

router.get('/',function (req,res) {
  ClientInfo.findOne({_id: req.session.user_ID}, function (err, info){
    if (err) {
      return console.log("err " + err);
    }
    if(!info){
      const cliInfo=JSON.stringify({userName: '', boolean: false});
      res.send(JSON.parse(cliInfo));
    } else {
      const cliInfo = JSON.stringify({userName: info.userName, boolean: true});
      res.send(JSON.parse(cliInfo));
    }
  })
});
router.post('/login',function(req,res){
  console.log(req.sessionID);
  sess = req.session;
  ClientInfo.findOne({userID: req.body.id, userPassword: req.body.pw}, function (err, info) {
    if (err) {
      return console.log("err " + err);
    }
    console.log(info);
    if(!info){ //로그인 정보가 틀렸을 경우
      const cliInfo=JSON.stringify({userName: '', boolean: false});
      res.send(JSON.parse(cliInfo));
    } else{ // 로그인 정보가 맞는 경우
      sess.user_ID = info._id;
      console.log(sess.user_ID+'현브라우져 접속한사람의 ID');
      const cliInfo=JSON.stringify({userName: info.userName, boolean: true});
      res.send(JSON.parse(cliInfo));
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
