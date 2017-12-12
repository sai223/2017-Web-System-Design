const mongoose = require('mongoose');
const SugangInfo = require('../database/sugangInfoModel');
const SugangInfo2 = require('../database/sugangInfoModel');
const Schema = mongoose.Schema;

var sugangListbyUserSchema = new Schema({ // 수강신청페이지 리스트
  userID: String,
  subjectInfo: [SugangInfo.schema],
  subjectInfo2: [SugangInfo2.schema]
});
var SugangListByUser = mongoose.model('SugangListByUser', sugangListbyUserSchema);
module.exports = SugangListByUser;
