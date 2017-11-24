const  express = require('express');
const  path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//라우트를 받아온다. 변경해야함(했음 memo로)
const test = require('./server/routes/test');
// 수강신청 라우트
const sugangAssit = require('./server/routes/sugangAssit');
// 시간표조회 라우트
const timetable = require('./server/routes/timetable');
const app = express();

//POST 데이터 파싱 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//ng build 명령 실행시 생성되는 static 리소스 폴더 경로 및 이름 설정
app.use(express.static(path.join(__dirname,'dist')));

//test.js를 'localhost:3000/test' 에 대한 라우터로 설정
app.use('/test',test);

app.use('/sugangAssit',sugangAssit);
app.use('/timetable',timetable);

//모든 경로에 대한 라우터 설정 및 반환 파일 경로 설정
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

//Port 설정
const port = process.env.PORT || '3000';
app.set('port',port);

//HTTP 서버 생성
const server = http.createServer(app);
//설정된 포트로 서버가 요청 대기
server.listen(port,function(){
  console.log('Express run on localhost'+port);
});

module.export = server;
