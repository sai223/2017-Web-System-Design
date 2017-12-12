const express = require ('express');
const router = express.Router();
var mongoose = require('mongoose');
const ClientInfo = require('../database/clientInfoModel');
const SugangInfo = require('../database/sugangInfoModel');
const SugangListbyUserModel = require('../database/sugangListbyUserModel');
const SugangListbyUserModel2 = require('../database/sugangListbyUserModel');
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

// DB에 Test Data 비우실때 사용하세요----------------------------------------------------------------------------------------
//DB 내용 삭제
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
TimeTableForUser.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('TimeTableForUser 삭제 완료');
    }
  }
);
*/



// DB에 Test Data 넣으실때 사용하세요----------------------------------------------------------------------------------------
//DB에 과목 생성
/*

//소프트웨어및컴퓨터공학전공(과)
new SugangInfo({subjectType: '전공과목',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '화D 목C', time: 3, subjectName: '알고리즘',
  professorName: '손경아', credit: 3, subjectNumber: 'X123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '월A 목A', time: 3, subjectName: '데이터마이닝',
  professorName: '손경아', credit: 3, subjectNumber: 'X124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '월D 목D', time: 3, subjectName: '도메인분석및SW설계',
  professorName: '이정태', credit: 3, subjectNumber: 'X125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '화C 금C', time: 3, subjectName: '웹시스템설계',
  professorName: '오상윤', credit: 3, subjectNumber: 'X126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '월4 목3', time: 3, subjectName: '객체지향프로그래밍',
  professorName: '오상윤', credit: 3, subjectNumber: 'X127'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '화A 금F', time: 3, subjectName: '선형대수1',
  professorName: '김응기', credit: 3, subjectNumber: 'X128'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '수D 금D', time: 3, subjectName: '확률및통계1',
  professorName: '조영종', credit: 3, subjectNumber: 'X129'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '화F 목F', time: 3, subjectName: '확률및통계2',
  professorName: '김수진', credit: 3, subjectNumber: 'X130'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '수A 목D', time: 3, subjectName: '수학2',
  professorName: '김응기', credit: 3, subjectNumber: 'X131'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학인증교양',major: '소프트웨어및컴퓨터공학전공(과)', subjectTime: '월B 목B', time: 3, subjectName: '과학기술과법',
  professorName: '오승한', credit: 3, subjectNumber: 'X132'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});

//전자공학전공(과)
new SugangInfo({subjectType: '전공과목',major: '전자공학전공(과)', subjectTime: '화C 금C', time: 3, subjectName: '전자회로1',
  professorName: '이기근', credit: 3, subjectNumber: 'J123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '전자공학전공(과)', subjectTime: '월C 목A', time: 3, subjectName: '전자장론',
  professorName: '김상인', credit: 3, subjectNumber: 'J124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '전자공학전공(과)', subjectTime: '월4 수3', time: 3, subjectName: '공업수학1',
  professorName: '김공업', credit: 3, subjectNumber: 'J125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '전자공학전공(과)', subjectTime: '화E 수D', time: 3, subjectName: '공업수학2',
  professorName: '박공업', credit: 3, subjectNumber: 'J126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학인증교양',major: '전자공학전공(과)', subjectTime: '월B 목B', time: 3, subjectName: '전자란무엇인가',
  professorName: '김전자', credit: 3, subjectNumber: 'J127'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});


//화학공학전공(과)
new SugangInfo({subjectType: '전공과목',major: '화학공학전공(과)', subjectTime: '수D 금D', time: 3, subjectName: '화학1',
  professorName: '김화학', credit: 3, subjectNumber: 'H123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '화학공학전공(과)', subjectTime: '화C 수E', time: 3, subjectName: '화학2',
  professorName: '김학화', credit: 3, subjectNumber: 'H124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '화학공학전공(과)', subjectTime: '월B 수B', time: 3, subjectName: '화학실험',
  professorName: '박분자', credit: 3, subjectNumber: 'H125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학인증교양',major: '화학공학전공(과)', subjectTime: '월B 목B', time: 3, subjectName: '분자란무엇인가',
  professorName: '김분자', credit: 3, subjectNumber: 'H126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});

//미디어콘텐전공(과)
new SugangInfo({subjectType: '전공과목',major: '미디어콘텐전공(과)', subjectTime: '월2 수2', time: 3, subjectName: '게임디자인',
  professorName: '오규환', credit: 3, subjectNumber: 'M123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '미디어콘텐전공(과)', subjectTime: '월D 금D', time: 3, subjectName: '게임프로그래밍',
  professorName: '김게임', credit: 3, subjectNumber: 'M124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '미디어콘텐전공(과)', subjectTime: '월B 목C', time: 3, subjectName: '게임수학',
  professorName: '김미디', credit: 3, subjectNumber: 'M125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학인증교양',major: '미디어콘텐전공(과)', subjectTime: '화A 금A', time: 3, subjectName: '영상매체란무엇인가',
  professorName: '박미디', credit: 3, subjectNumber: 'M126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});

//경영학전공(과)
new SugangInfo({subjectType: '전공과목',major: '경영학전공(과)', subjectTime: '월4 목4', time: 3, subjectName: '경영학개론',
  professorName: '김경영', credit: 3, subjectNumber: 'T123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '전공과목',major: '경영학전공(과)', subjectTime: '월D 금D', time: 3, subjectName: '경영학1',
  professorName: '최영경', credit: 3, subjectNumber: 'T124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학기초',major: '경영학전공(과)', subjectTime: '수B 목C', time: 3, subjectName: '기초경영',
  professorName: '김경경', credit: 3, subjectNumber: 'T125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '공학인증교양',major: '경영학전공(과)', subjectTime: '화C 금A', time: 3, subjectName: '경영이란무엇인가',
  professorName: '박영학', credit: 3, subjectNumber: 'T126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});

//교양과목
new SugangInfo({subjectType: '교양과목',major: '', subjectTime: '월4 화3', time: 3, subjectName: '과학과철학',
  professorName: '이진희', credit: 3, subjectNumber: 'G123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '교양과목',major: '', subjectTime: '수B 목B', time: 3, subjectName: '스토리텔링이란무엇인가',
  professorName: '박정식', credit: 3, subjectNumber: 'G124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '교양과목',major: '', subjectTime: '월E 화E', time: 3, subjectName: '신화와철학',
  professorName: '김신화', credit: 3, subjectNumber: 'G125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '교양과목',major: '', subjectTime: '수F 목F', time: 3, subjectName: '정치와철학',
  professorName: '최정치', credit: 3, subjectNumber: 'G126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});

//기초과목
new SugangInfo({subjectType: '기초과목',major: '', subjectTime: '목2 금2', time: 3, subjectName: '물리학',
  professorName: '김물리', credit: 3, subjectNumber: 'K123'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '기초과목',major: '', subjectTime: '수D 목D', time: 3, subjectName: '생명과학',
  professorName: '최생명', credit: 3, subjectNumber: 'K124'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '기초과목',major: '', subjectTime: '월D 목D', time: 3, subjectName: '지구과학',
  professorName: '고지구', credit: 3, subjectNumber: 'K125'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});
new SugangInfo({subjectType: '기초과목',major: '', subjectTime: '화A 목A', time: 3, subjectName: '생명과학2',
  professorName: '이생명', credit: 3, subjectNumber: 'K126'}).save(function(err,document) {
  if (err)
    return console.error(err);
  console.log('강의 생성');
});




// DB에 Test Data 조회하실때 사용하세요----------------------------------------------------------------------------------------
//DB 조회
/*

ClientInfo.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 ClientInfo 저장되어있는 Data: '+info);
  }
});
SugangListbyUserModel.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 SugangListbyUserModel 저장되어있는 Data: '+info);
  }
});
SugangInfo.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 SugangInfo 저장되어있는 Data: '+info);
  }
});
TimeTableForUser.find(function (err,info) {
  if (err) {
    return console.log("err " + err);
  } else {
    console.log('현재 TimeTableForUser 저장되어있는 Data: '+info);
  }
});
*/







/* Session Check -------------------------------------------------------------------
* 페이지를 로딩시키는 동시에 실행 -> app.component.ts의 ngOnInit에서 실행됨.
*
* 세션에 사용자의 user_ID 가 있으면 새로운 창을 띄우거나 새로고침을 눌러도 세션에 들어있는 사용자의 정보를 넘긴다
*
*/

router.get('/sessionCheck',function (req,res) {
  ClientInfo.findOne({userID: req.session.user_ID}, function (err, info){
    if (err) {
      return console.log("err " + err);
    }
    if(!info){
      console.log('세션 발급되었습니다');
      res.send({userName: '', boolean: false, page: 1});
    } else { // 현재 세션에 사용자 user_ID 정보가 고객정보와 일치하는 경우 사용자의 이름과
      console.log('현 세션 사용자의 이름: '+info.userName);
      console.log('현 페이지'+sess.page);
      res.send({userName: info.userName, boolean: true, page: sess.page});
    }
  })
});
router.post('/sessionPage',function (req,res) { //req(page넘김)
  sess.page = req.body.page; // session에 페이지 저장
  res.send({});
});
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
  console.log('[getSubject]req.session.user_ID',req.session.user_ID);
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
          infoList.subjectInfo2.push(courseInfo);



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
          res.send({msg: isAddSuccess, courseInfo: courseInfo});
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
    SugangInfo.findOne({subjectNumber: req.body.subjectNumber},function (err,courseInfo) {
      if (err) {
        return console.log("err " + err);
      }
      console.log("과목정보존재");
      res.send({CourseInfo: courseInfo});
    })
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
          js.subjectName = new RegExp(ar[4]);
          break;
        case 5:
          js.professorName = new RegExp(ar[5]);
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
  console.log('[getUserTimeTable]req.session.user_ID',req.session.user_ID);
  TimeTableForUser.findOne({userID: req.session.user_ID},function (err, timetableInfo) {
    if (err) {
      return console.log("err " + err);
    }
    console.log('TimetableINFO',timetableInfo);
    console.log('req.session.userID',req.session.user_ID);
    if(timetableInfo === null){
      console.log("timetableInfo === null");
      Mon = new Array();
      Tue = new Array();
      Wed = new Array();
      Thur = new Array();
      Fri = new Array();
      numbering = new Array();

      for (var i = 0; i < 48; i++) {
        Mon.push({numbering: 0, isFirst: false, itemName: ''});
        Tue.push({numbering: 0, isFirst: false, itemName: ''});
        Wed.push({numbering: 0, isFirst: false, itemName: ''});
        Thur.push({numbering: 0, isFirst: false, itemName: ''});
        Fri.push({numbering: 0, isFirst: false, itemName: ''});
      }
      for( var j=0; j<8; j++){
        numbering.push(false);
      }
      var newUser = new TimeTableForUser();
      newUser.userID = req.session.user_ID;
      newUser.monday =  Mon;
      newUser.tuesday = Tue;
      newUser.wednesday = Wed;
      newUser.thursday = Thur;
      newUser.friday = Fri;
      newUser.numberingArray = numbering;
      newUser.save(function (err) {
        if (err) return console.error(err);
        console.log(' 계정 추가');
      });
      res.send(newUser);
      //res.send({});

      /*var userTimeTable = new TimeTableForUser({ //TimeTableForUser에 계정이 없을경우 새계정 저장
        userID: req.session.user_ID,
        monday: req.body.Monday_R,
        tuesday: req.body.Tuesday_R,
        wednesday: req.body.Wednesday_R,
        thursday: req.body.Thursday_R,
        friday: req.body.Friday_R,
      });
      userTimeTable.save(function (err) {
        if (err) return console.error(err);
        console.log(' 계정 추가');
      });
      res.send({});
      */
    }
    else{
      var userTimeTable = {
        monday: timetableInfo.monday,
        tuesday: timetableInfo.tuesday,
        wednesday: timetableInfo.wednesday,
        thursday: timetableInfo.thursday,
        friday: timetableInfo.friday,
        numberingArray: timetableInfo.numberingArray
      };
      //console.log("timetableInfo === null 아니고 ",userTimeTable);
      res.send(userTimeTable);
    }

  });
});
// 사용자가 과목 처음 추가할 때 TimeTableForUser 초기화 시키기
router.post('/createTimeTable', function (req,res) {
  var userTimeTable = new TimeTableForUser();
  userTimeTable.userID = req.session.user_ID;
  userTimeTable.monday =  req.body.Monday_R;
  userTimeTable.tuesday = req.body.Tuesday_R;
  userTimeTable.wednesday = req.body.Wednesday_R;
  userTimeTable.thursday = req.body.Thursday_R;
  userTimeTable.friday = req.body.Friday_R;
  userTimeTable.numberingArray = req.body.numberingArray;
  userTimeTable.save(function (err) {
    if (err) return console.error(err);
    console.log(req.session.user_ID,'CREATED');
  });
  res.send({}); // 아무 의미 없음
});

// 사용자 과목 추가할때  TimeTableForUser에 과목 추가 -----------------------------------------------------------------------
router.post('/updateUserTimeTable',function (req,res) {
  console.log("setuse--------------------------r");
  //req(suject, day)
  // 기존의 과목이 있고 업데이트가 필요할때
  TimeTableForUser.findOneAndUpdate({userID: req.session.user_ID},
    {monday: req.body.Monday_R, tuesday: req.body.Tuesday_R, wednesday : req.body.Wednesday_R,
      thursday : req.body.Thursday_R, friday: req.body.Friday_R,
      numberingArray : req.body.numberingArray}
    ,function (err) {
      if (err) return console.log("err " + err);
      console.log(req.body.user_ID,'MODIFIED');
      res.send({});
    });
});

module.exports = router;
