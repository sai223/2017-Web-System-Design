const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel');
const SugangInfo = require('../database/sugangInfoModel');
const SugangListbyUserModel = require('../database/sugangListbyUserModel');
const TimeTableForUser = require('../database/timeTableForUser');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log("error: " + err);
});

db.on('connected', function() {
  console.log("Connected successfully to server");
});


//DB 초기화 하실때 사용하세요 지울때
/*
ClientInfo.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('ClientInfo 삭제 완료');
    }
  }
);

SugangListbyUserModel.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('SugangAssitList 삭제 완료');
    }
  }
);
SugangInfo.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('SugangInfo 삭제 완료');
    }
  }
);

// 시간표 테이블 비우기
TimeTableForUser.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('ClientInfo 삭제 완료');
    }
  }
);
*/
/*
// DB에 Test Data 넣으실때 사용하세요
// 계정 생성
var ci = new ClientInfo();
ci.userID = 'psh';
ci.userPassword = '2013';
ci.userName = '박승현';
ci.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('계정 박승현 생성');
});
var ci1 = new ClientInfo();
ci1.userID = 'kbw';
ci1.userPassword = '2014';
ci1.userName = '고보원';
ci1.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('계정 고보원 생성');
});
var ci2 = new ClientInfo();
ci2.userID = 'kkh';
ci2.userPassword = '2012';
ci2.userName = '김기홍';
ci2.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('계정 김기홍 생성');
});
var ci3 = new ClientInfo();
ci3.userID = 'lit';
ci3.userPassword = '2012';
ci3.userName = '이인태';
ci3.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('계정 이인태생성');
})

// DB에 Test Data 넣으실때 사용하세요
// 과목 생성

var si = new SugangInfo({subjectType: '전공필수',major: '소프트웨어과', subjectTime: '월C 금C', time: 60, subjectName: '선형대수',
  professorName: '김응기', credit: 3, subjectNumber: 'A123'});
var si1 = new SugangInfo({subjectType: '전공선택',major: '소프트웨어과', subjectTime: '화B 금B', time: 60, subjectName: '알고리즘',
  professorName: '손경아', credit: 3, subjectNumber: 'B123'});
var si2 = new SugangInfo({subjectType: '교양선택',major: '경영학과', subjectTime: '화A 금C', time: 60, subjectName: '컴퓨터네트워크',
  professorName: '노병희', credit: 3, subjectNumber: 'C123'});
var si3 = new SugangInfo({subjectType: '교양선택',major: '경영학과', subjectTime: '화1 금5', time: 40, subjectName: '연애학개론',
  professorName: '강경란', credit: 3, subjectNumber: 'D123'});
si.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('선형대수 강의 생성');
});
si1.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('알고리즘 강의 생성');
});
si2.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('컴네 강의 생성');
});
si3.save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('연애 강의 생성');
});

//-------------------------------------------------
// DB에 Test Data 조회할때 사용하세요
// 수강과목 조회

SugangInfo.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 SugangInfo 저장되어있는 Data: '+info);
  }
});
*/


/*
---------------------------------------------------------------------*/
/*

*/
//-------------------------------------------------
/*

//-------------------------------------------------
// DB에 Test Data 조회할때 사용하세요
// 고객정보 조회
/*
ClientInfo.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 ClientInfo 저장되어있는 Data: '+info);
  }
});
//-------------------------------------------------
/*
// 리스트에 계정생성 test
var slu = new SugangListbyUserModel({userID: 'psh'})
slu.save(function (err,document) {
  if (err)
    return console.error(err);
  console.log('리스트계정 생성');
})
//-------------------------------------------------
/*
// 계정 psh의 리스트에 X123 과목 넣어보기 test (이름과 과목코드는 유동적으로 바꿔주세요)
SugangListbyUserModel.findOne({userID: 'psh'},function (err, info1) {
  if (err) {
    return console.log(err);
  }
  SugangInfo.findOne({subjectNumber: 'D123'},function (err,info2) {
    if (err) {
      return console.log("err " + err);
    } else {
      info1.subjectInfo.push(info2);
      info1.save(function(err,document) {
        if (err)
          return console.error(err);
        console.log(document)
      });

    }
  })
})
//-------------------------------------------------
*/
/*
//-------------------------------------------------
// list 정보 불러오기 test
SugangListbyUserModel.find(function (err, info1){
  if (err) {
    return console.log(err);
  }
  else console.log(info1);
});
TimeInfo.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('TimeInfo삭제 완료');
    }
  }
);
*/
//-------------------------------------------------
/*
// list에서 과목 삭제하기 test  // '계정 psh의 리스트에서 과목코드로 해당 과목만 삭제'
SugangListbyUserModel.findOneAndUpdate({userID: 'psh'},{$pull: { subjectInfo: {subjectNumber: 'X123'}}}, function (err, infoList){
  if (err) {
    return console.log("err " + err);
  }
  console.log('Delete 완료')
})
*/

//-------------------------------------------------
// 페이지 시작할때 마다 세션 체크 -------------------------------------------------------------------
router.get('/sessionCheck',function (req,res) {
  ClientInfo.findOne({userID: req.session.user_ID}, function (err, info){
    if (err) {
      return console.log("err " + err);
    }
    if(!info){
      console.log('세션 발급');
      res.send({userName: '', boolean: false, page: 1});
    } else {
      console.log('현 세션 사용자의 이름: '+info.userName);
      console.log('현패이지'+sess.page);

      res.send({userName: info.userName, boolean: true, page: sess.page});
    }
  })
});
router.post('/sessionPage',function (req,res) { //req(page넘김)
  sess.page = req.body.page; // session에 페이지 저장
})
// log-in 기능 --------------------------------------------------------------------------------
router.post('/login',function(req,res){ //req(id,pw) res(userName,boolean)
                                        //console.log(req.sessionID);
  sess = req.session;
  ClientInfo.findOne({userID: req.body.id, userPassword: req.body.pw}, function (err, info) {
    if (err) {
      return console.log("err " + err);
    }
    //console.log(info);
    if(!info){ //로그인 정보가 틀렸을 경우
      const cliInfo= {userName: '', boolean: false};
      res.send(cliInfo);
    } else { // 로그인 정보가 맞는 경우
      sess.user_ID = info.userID; // 현 세션에 로그인한사람의 이름을 넣음
      console.log('로그인한 사용자의 이름: '+info.userName);
      console.log('세션 사용자의 이름: '+sess.user_ID);
      const cliInfo = {userName: info.userName, boolean: true} ;
      res.send(cliInfo);
    }

  })
});
// log-out 기능 --------------------------------------------------------------------------------
router.get('/logout',function (req,res) { //세션 파괴만하면 될듯 //
  req.session.destroy();
  res.send({});
});
// 접속자의 과목리스트 불러오기 -----------------------------------------------------------------------
router.get('/getAllSubjects',function (req,res) { // req() res(Subject[])
  console.log('getallsubject');
  SugangListbyUserModel.findOne({userID: req.session.user_ID},function (err,infoList) {
    if (err) {
      return console.log("err " + err);
    }
    if(!infoList){ //SugangListbyUserModel에 내 정보가 없을때 리스트에 새로운 계정 생성
      var newUser = new SugangListbyUserModel({userID: req.session.user_ID})
      newUser.save(function (err,document) {
        if (err)
          return console.error(err);
        console.log('리스트계정 생성: '+document);
      })
      var allSubject = newUser.subjectInfo;
      res.send(allSubject); // [] 이런식을 전송되면 되나 물어보기
    } else { //SugangListbyUserModel에 내 정보가 있을때
      var allSubject = infoList.subjectInfo; //
      console.log(allSubject);
      res.send(allSubject); // [{},{},{}]이런식으로 전송되는지 확인해야됨
    }
  })
});
// 수강신청페이지에서 추가버튼 -----------------------------------------------------------------------

router.post('/addSubject', function (req,res) { //추가버튼 req(isNickname,subjectName,subjectNumber) res(isAddSuccess)

  var timetable = new Array(new Array(24), new Array(24), new Array(24), new Array(24), new Array(24) );
  for(var i = 0; i < timetable.length; i++) {
    for(var j = 0; j < timetable[i].length; j++) {
      timetable[i][j] = 0;
    }
  }

  function markTime(time) {
    var day;
    switch(time[0]) {
      case '월':
        day = 0;
        break;
      case '화':
        day = 1;
        break;
      case '수':
        day = 2;
        break;
      case '목':
        day = 3;
        break;
      case '금':
        day = 4;
        break;
    }

    switch(time[1]) {
      case 'A':
        timetable[day][0] += 1;
        timetable[day][1] += 1;
        timetable[day][2] += 1;
        break;
      case 'B':
        timetable[day][3] += 1;
        timetable[day][4] += 1;
        timetable[day][5] += 1;
        break;
      case 'C':
        timetable[day][6] += 1;
        timetable[day][7] += 1;
        timetable[day][8] += 1;
        break;
      case 'D':
        timetable[day][9] += 1;
        timetable[day][10] += 1;
        timetable[day][11] += 1;
        break;
      case 'E':
        timetable[day][12] += 1;
        timetable[day][13] += 1;
        timetable[day][14] += 1;
        break;
      case 'F':
        timetable[day][15] += 1;
        timetable[day][16] += 1;
        timetable[day][17] += 1;
        break;
      case 'G':
        timetable[day][18] += 1;
        timetable[day][19] += 1;
        timetable[day][20] += 1;
        break;
      case 'H':
        timetable[day][21] += 1;
        timetable[day][22] += 1;
        timetable[day][23] += 1;
        break;
      default:
        timetable[day][time[1]*2 - 2] += 1;
        timetable[day][time[1]*2 - 1] += 1;
    }
  }

  console.log('addsubject');
  SugangListbyUserModel.findOne({userID: req.session.user_ID}, function (err, infoList){ //세션ID 로 확인
    if (err) {
      return console.log("err " + err);
    }
    if(req.body.isNickname == true){ //첫페이지에서 올 경우 (isNickname => boolean , Nickname은 사용자 편의를 위한 과목명 ex) 확률과통계 -> 확통,ㅎㅌ)
      SugangInfo.findOne({subjectNumber: req.body.subjectNumber},function (err, courseInfo) { //과목코드로 과목 존재 확인
        if (err) {
          return console.log("err " + err);
        }
        if(!courseInfo){ // 잘못된 입력값(과목코드)
          var isAddSuccess = 'wrong';

          res.send({msg: isAddSuccess}); // 클라이언트쪽에서 alert호출 요망
        } else { //올바른 입력값(과목코드)
          var isAddSuccess = 'success';

          courseInfo.subjectName = req.body.subjectName; // 계정 List에 과목 저장 (계정 List의 subjectName을 nickname으로 변경)

          infoList.subjectInfo.push(courseInfo);

          for(var i=0; i < infoList.subjectInfo.length; i++) {
            var timeString = infoList.subjectInfo[i].subjectTime;
            for(var j=0; j < timeString.length / 2 - 1; j++) {
              var time = timeString[j * 3] + timeString[j * 3 + 1];
              console.log(time);
              console.log(typeof(time));
              markTime(time);
            }
          }
          console.log(timetable);

          for(var i = 0; i < timetable.length; i++) {
            for(var j = 0; j < timetable[i].length; j++) {
              if(timetable[i][j] > 1) {
                var isAddSuccess = 'duplicate'; // 시간 중복일 경우
              }
            }
          }

          if(isAddSuccess === 'success') {
            infoList.save(function(err,document) {
              if (err)
                return console.error(err);
              console.log('해당과목 저장 성공');
              console.log(document)
            });
          }
          res.send({msg: isAddSuccess});
        }
      })
    } else { // 두번째 페이지에서 올 경우
      SugangInfo.findOne({subjectNumber: req.body.subjectNumber},function (err, courseInfo) {
        if (err) {
          return console.log("err " + err);
        }
        if(!courseInfo){ // 잘못된 입력값(과목코드)
          var isAddSuccess = false;
          res.send(isAddSuccess); // 클라이언트쪽에서 alert호출 요망
        } else { //올바른 입력값(과목코드)
          var isAddSuccess = true;

          courseInfo.subjectName = req.body.subjectName; // 계정 List에 과목 저장 (계정 List의 subjectName을 nickname으로 변경)
          infoList.subjectInfo.push(courseInfo);
          infoList.save(function(err,document) {
            if (err)
              return console.error(err);
            console.log('해당과목 저장 성공');
            console.log(document)
          });
          res.send(isAddSuccess); // 올바른 입력값(과목코드)
        }
      })
    }

  })
})
// 수강신청페이지에서 삭제버튼 -----------------------------------------------------------------------
router.post('/deleteSubject',function (req,res) { // req(subjectNumber)
  SugangListbyUserModel.findOneAndUpdate({userID: req.session.user_ID},{$pull: { subjectInfo: {subjectNumber: req.body.subjectNumber}}}, function (err, infoList){
    if (err) {
      return console.log("err " + err);
    }
    console.log('Delete 완료')
    //res로 뭘줘야지
    res.send({});
  })
})
// 시간표조회페이지에서 조회 버튼 -----------------------------------------------------------------------
router.post('/searchSubject',function (req,res) { // req(subjectType_2B,major_2B,day_2B,time_2B,subjectName_2B,professorName_2B) res(Subject[])

  var ar = new Array();
  const js = new Object();
  ar[0] = req.body.subjectType_2B;
  ar[1] = req.body.major_2B;
  ar[2] = req.body.day_2B;
  ar[3] = req.body.time_2B;
  ar[4] = req.body.subjectName_2B;
  ar[5] = req.body.professorName_2B;
  for(var i=0;i<6;i++) {
    if (ar[i] == undefined || ar[i]=="undefined") {
      ar[i] = "";
    }
    else {
      switch (i) {
        case 0:
          js.subjectType = ar[0];
          break;
        case 1:
          js.major = ar[1];
          break;
        case 4:
          js.subjectName = ar[4];
          break;
        case 5:
          js.professorName = ar[5];
      }
    }
  }
  js.subjectTime = new RegExp(ar[2]+ar[3]);

  console.log("js: "+JSON.stringify(js));
  console.log("js2: "+js.subjectTime);

  SugangInfo.find(js,function (err, courseInfo){
    if (err) {
      return console.log("err " + err);
    }
    console.log("정보: "+[courseInfo]);
    res.send(courseInfo);
  });
})
// 사용자 시간표 불러올 경우  -----------------------------------------------------------------------
router.get('/getUserTimeTable',function (req,res) { //req(userID)
  console.log('!21211212');
  TimeTableForUser.findOne({userID: req.session.userID},function (err, timetableInfo) {
    if (err) {
      return console.log("err " + err);
    }
    //console.log('TimetableINFO',timetableInfo);
    if(timetableInfo === null){
      var userTimeTable = new TimeTableForUser({ //TimeTableForUser에 계정이 없을경우 새계정 저장
        userID: req.body.userID,
        monday: req.body.Monday_R,
        tuesday: req.body.Tuesday_R,
        wednesday: req.body.Wednesday_R,
        thursday: req.body.Thursday_R,
        friday: req.body.Friday_R,
      });
      userTimeTable.save(function (err,document) {
        if (err)
          return console.error(err);
        console.log('타임태이블리스트 계정 추가');
      });
      res.send(null);
    }
    else{
      var userTimeTable = {
        Monday_R: timetableInfo.monday,
        Tuesday_R: timetableInfo.tuesday,
        Wednesday_R: timetableInfo.wednesday,
        Thursday_R: timetableInfo.thursday,
        Friday_R: timetableInfo.friday,
      };
      res.send(userTimeTable);
    }

  });
});
// 사용자 과목 추가할때  TimeTableForUser에 과목 추가 -----------------------------------------------------------------------
router.post('/setUserTimeTable',function (req,res) {
  console.log("setuse--------------------------r");
  //req(suject, day)
  TimeTableForUser.findOne({userID: req.session.userID},function (err, timetableInfo) {
    if (err) {
      return console.log("err " + err);
    }
    if(!timetableInfo){ // 사용자 정보 없을경우

      var userTimeTable = new TimeTableForUser({ //TimeTableForUser에 계정이 없을경우 새계정 저장
        userID: req.body.userID,
        monday: req.body.Monday_R,
        tuesday: req.body.Tuesday_R,
        wednesday: req.body.Wednesday_R,
        thursday: req.body.Thursday_R,
        friday: req.body.Friday_R,
      });
      userTimeTable.save(function (err,document) {
        if (err)
          return console.error(err);
        console.log('타임태이블리스트 계정 update추가');
      });
      res.send({});
    } else { // 기존의 과목이 있고 업데이트가 필요할때

      timetableInfo.monday = req.body.Monday_R;
      timetableInfo.tuesday = req.body.Tuesday_R;
      timetableInfo.wednesday = req.body.Wednesday_R;
      timetableInfo.thursday = req.body.Thursday_R;
      timetableInfo.friday= req.body.Friday_R;

      timetableInfo.save(function (err,document) {
        if (err)
          return console.error(err);
        //console.log('기존계정 타임태이블리스트 변경: '+document);
        res.send({});
      });
    }
  })


});
module.exports = router;
