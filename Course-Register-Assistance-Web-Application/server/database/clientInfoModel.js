const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var clientInfoSchema = new Schema({ // 고객정보
  userID: String,
  userPassword: String,
  userName: String
});
var ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);
module.exports = ClientInfo;
