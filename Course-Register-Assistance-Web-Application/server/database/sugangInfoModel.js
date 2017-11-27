const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SugangInfoSchema = new Schema({ // 강의정보
  curriculumDivision: String, //교과구분
  major: String, //전공
  professor: String, //교수
  subjectName: String, //과목명
  subjectCode: String, //과목코드
  courseDate: String,//강의날짜
  courseTime: String //강의시간
});
var SugangInfo = mongoose.model('SugangInfo', SugangInfoSchema);
module.exports = SugangInfo;
