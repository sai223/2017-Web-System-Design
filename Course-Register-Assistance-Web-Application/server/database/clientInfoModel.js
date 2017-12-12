const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var clientInfoSchema = new Schema({ // 고객정보
  userID: String, //사용자 계정 아이디
  userPassword: String, //사용자 계정 비밀번호
  userName: String //사용자 이름
});
var ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);
module.exports = ClientInfo;
