const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel'); //고객정보 DB

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

/* 회원가입 요청 -------------------------------------------------------------------
* 클라이언트에서 회원가입 요청을 하는 경우 실행
* POST를 통해 넘어오는 데이터(singID, signPW, signName)으로 ClientInfo에 저장한다. / 아이디 중복일 경우 아이디 중복임을 반환한다.
*
*/
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
        var cliInfo = new ClientInfo();
        cliInfo.userID = req.body.signID;
        cliInfo.userPassword = req.body.signPW;
        cliInfo.userName = req.body.signName;

        cliInfo.save(function(err, document) { //데이터 저장
            if(err) {
                return console.log("err " + err);
            }
            isValid.boolean = true;
            res.send(isValid);
            console.log('아이디 생성 완료: '+ document);
        });
      }
    })
});
module.exports = router;
