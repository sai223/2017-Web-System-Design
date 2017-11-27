const mongoose = require('mongoose');
const SugangInfo = require('../database/sugangInfoModel');
const Schema = mongoose.Schema;

var sugangAssitListSchema = new Schema({ // 수강신청페이지 리스트
  userID: String,
  subjectInfo: [SugangInfo]
});
var SugangAssitList = mongoose.model('SugangAssitList', sugangAssitListSchema);
module.exports = SugangAssitList;
