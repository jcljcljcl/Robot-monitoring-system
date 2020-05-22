var express = require('express');
//var cv = require('opencv4nodejs');
const os = require('os')
var router = express.Router();
var  {connection_myspeed} = require('../db/sql')

//web
const http = require('http');
const net = require('net');
const fs = require('fs');

http.createServer((req, res) => {
    let source = "";

    req.on('data', function(data) {
        source += data;
    });

    req.on('end', function() {
        console.log(`Post data: ${source.toString()}`);
    });
}).listen(8080, '127.0.0.1', () => {
    console.log('Http server listening on port 8080 at host 127.0.0.1');
});

net.createServer((socket) => {
    console.log('textClient connected');

    socket.on('data', (data) => {
        console.log(`Socket textData: ${data.toString()}`);
    });

    socket.on('end', () => {
        console.log('textClient disconnected');
    });
}).listen(8089, () => {
    console.log('Socket server for text started on port 8089');
});

net.createServer((socket) => {
    console.log('imageClient connected');

    let imageSize = 0;
    let imageBufferArray = [];

    socket.on('data', (data) => {
        if (imageSize) {
            // 接收和拼接数据，当数据长度不够时，下一次继续
            imageBufferArray.push(data);
            let imageData = Buffer.concat(imageBufferArray);
            if (imageData.byteLength >= imageSize) {
                // 数据完整，写入文件
                fs.writeFile(`demo.jpg`, imageData, (err) => {
                    console.log('Save socket image success');
                    imageSize = 0;
                    imageBufferArray = [];
                });
            }
        } else {
            imageSize = parseInt(data.toString());
            socket.write('1');
        }
    });

    socket.on('end', () => {
        console.log('imageClient disconnected');
    });
}).listen(8082, () => {
    console.log('Socket server for image started on port 8082');
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取数据库中视觉数据
router.get('/shijue', function(req, res, next) {
    //加载视觉图片
    console.log(os.hostname)
    //const mat = cv.imread('../img/11111.png');
   // cv.imwrite('../img/test.png', mat);
    //查询数据
    connection_myspeed.query("SELECT * FROM targetspeed",function (error,results,fields) {
        res.json(results)
        //console.log(results)
    })
});

// 获取数据库中触觉数据
router.get('/chujue', function(req, res, next) {
    //查询数据
    connection_myspeed.query("SELECT * FROM targetpow",function (error,results,fields) {
        res.json(results)
        //console.log(results)
    })
});

module.exports = router;
