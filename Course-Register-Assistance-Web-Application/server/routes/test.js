//기존에 학습했던 routes 폴더(서버)
const express = require ('express');
const router = express.Router();

router.get('/',function(req,res){
  res.send('express works');
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
