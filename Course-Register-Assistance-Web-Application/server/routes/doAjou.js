const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel');
const SugangInfo = require('../database/sugangInfoModel');
const SugangAssitList = require('../database/sugangAssitListModel');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log("error: " + err);
});
db.on('connected', function() {
  console.log("Connected successfully to server");
});
/*
var sal = new SugangAssitList();
sal.userID = 'psh7'
sal.subjectInfo = {subjectName: '알고', subjectCode: 'D123'};
sal.save(function(err, savedDocument) { if (err)
  return console.error(err);
  console.log(savedDocument);
});
*/
SugangAssitList.findOne({userID: 'psh6'}, function (err, info){
  if (err) {
    return console.log("err " + err);
  }
  if(!info){
    const cliInfo=JSON.stringify({userName: '', boolean: false});
    console.log('1');
  } else {
    info.subjectInfo.push({subjectName: '객프',subjectCode: 'K013'});
    console.log('2');
  }
})
SugangAssitList.find(function(err, info) {
  if (err)
    return console.error(err);
  console.log('리스트정보: '+info);
});
/*
SugangAssitList.update({userID: 'psh4'},function (err, info) {
  if (err) {
    return console.log(err);
  }
  info.subjectInfo.push(new({subjectName: '과기법',subjectCode: 'Z123'}));
})
*/

router.get('/',function (req,res) {
  ClientInfo.findOne({userID: req.session.user_ID}, function (err, info){
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
  //console.log(req.sessionID);
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
      sess.user_ID = info.userID;
      console.log(sess.user_ID+'현브라우져 접속한사람의 ID');
      const cliInfo=JSON.stringify({userName: info.userName, boolean: true});
      res.send(JSON.parse(cliInfo));
    }
  })
});
router.post('/addSugangListItem', function (req,res) { //추가버튼 //req 로 수강과목(subjectName) 과목코드(subjectCode) 보내면
  SugangAssitList.findOne({userID: req.session.user_ID}, function (err, info){ //세션ID 로 확인
    if (err) {
      return console.log("err " + err);
    }
    if(!info){ //SugangAssitList에 내 정보가 없을때 새로운 객체 생성
      var sal = new SugangAssitList();
      sal.userID = req.session.user_ID;
      sal.subjectInfo.subjectName = req.body.subjectName;
      sal.subjectInfo.subjectCode = req.body.subjectCode;
      sal.save(function(err, savedDocument) { if (err)
        return console.error(err);
        console.log('SugangAssitList에 새 정보 생성: '+savedDocument);
      });

    } else { //SugangAssitList에 내 정보가 있을때  과목 추가
      SugangAssitList.update({userID: req.session.user_ID},function (err, info) {
        if (err) {
          return console.log(err);
        }
        info.subjectInfo[info.subjectInfo.length] = {subjectName: req.body.subjectName,subjectCode: req.body.subjectCode};
        //info.subjectInfo.push({subjectName: req.body.subjectName,subjectCode: req.body.subjectCode});
      })
    }
  })
})
module.exports = router;
