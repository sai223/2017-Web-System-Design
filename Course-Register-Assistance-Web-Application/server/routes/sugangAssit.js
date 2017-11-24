const express = require ('express');
const router = express.Router();

router.get('/',function(req,res){
  console.log('수강신청 첫페이지');
  res.send('수강신청');
});

router.get('/testGET',function(req,res){
  console.log(req.query.test);
  res.send({test : 'response data from GET handler'});
});

router.post('/testPOST',function(req,res){
  console.log(req.body.test);
  res.send({test : 'response data from POST handler'});
});

module.exports = router;
