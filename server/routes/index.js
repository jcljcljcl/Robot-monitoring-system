var express = require('express');
var router = express.Router();
var  {connection_myspeed} = require('../db/sql')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取数据库中视觉数据
router.get('/shijue', function(req, res, next) {
    //查询数据
    connection_myspeed.query("SELECT * FROM targetspeed",function (error,results,fields) {
        res.json(results)
        console.log(results)
    })
});

// 获取数据库中触觉数据
router.get('/chujue', function(req, res, next) {
    //查询数据
    connection_myspeed.query("SELECT * FROM targetpow",function (error,results,fields) {
        res.json(results)
        console.log(results)
    })
});

module.exports = router;
