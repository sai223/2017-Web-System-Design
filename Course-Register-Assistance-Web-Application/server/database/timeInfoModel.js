const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var timeInfoSchema = new Schema({ // 수강신청페이지 리스트
  hour: String,
  min: String,
  sec: String,
});
var TimeInfo = mongoose.model('TimeInfo', timeInfoSchema);
module.exports =TimeInfo;
