const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel');
const SugangInfo = require('../database/sugangInfoModel');

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
ClientInfo.find(function(err, info) {
  if (err)
    return console.error(err);
  console.log('(timetable page)고객정보: '+info);
});
SugangInfo.find(function (err, info) {
  if (err)
    return console.error(err);
  console.log('(timetable page)수강정보: '+info);
});
*/
router.get('/',function(req,res){
  console.log('시간표조회 첫페이지')
  res.send('시간표조회');
});

module.exports = router;
