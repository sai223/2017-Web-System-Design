const mongoose = require('mongoose');
const SugangInfo = require('../database/sugangInfoModel');
const Schema = mongoose.Schema;

var sugangListbyUserSchema = new Schema({ // 수강신청페이지 리스트
  userID: String,
  subjectInfo: [SugangInfo.schema]
});
var SugangListByUser = mongoose.model('SugangListByUser', sugangListbyUserSchema);
module.exports = SugangListByUser;
