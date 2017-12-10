const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var timeTableForUserSchema = new Schema({ // 수강신청페이지 리스트
  userID: String,
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  numberingArray: []
});
var TimeTableForUser = mongoose.model('TimeTableForUser', timeTableForUserSchema);
module.exports = TimeTableForUser;
