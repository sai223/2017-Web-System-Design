const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SugangInfoSchema = new Schema({ // 강의정보
  major: String, //전공
  subjectName: String, //과목명
  subjectNumber: String, //과목번호
  subjectType: String, //교과구분
  credit: Number, //학점
  time: Number, //총 강의시간
  day: String, //강의 요일
  professorName: String, //교수명
  subjectTime: String //과목시간
});
var SugangInfo = mongoose.model('SugangInfo', SugangInfoSchema);
module.exports = SugangInfo;
