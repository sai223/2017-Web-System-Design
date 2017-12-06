const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

router.post('/requestSignUp', function (req, res) {

    ClientInfo.findOne({userID: req.body.signID}, function (err, info){
      var isValid = {boolean: false};
      if (err) {
        return console.log("err " + err);
      }
      if(info){ //ID가 있으면
        console.log('아이디 중복: '+info.userID);
        res.send(isValid);
      } else { //ID가 없으면
        cliInfo = new ClientInfo();
        cliInfo.userID = req.body.signID;
        cliInfo.userPassword = req.body.signPW;
        cliInfo.userName = req.body.signName;

        cliInfo.save(function(err, document) {
            if(err) {
                return console.log("err " + err);
            }
            const cliInfo = {boolean: true};
            res.send(isValid);
            console.log('아이디 생성 완료: '+ document);
        });
      }
    })
});
module.exports = router;
