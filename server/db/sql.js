var mysql = require('mysql')

//连接mysql下的myspeed库
var connection_myspeed= mysql.createConnection({
    //主机名
    host : 'localhost',

    //用户名和密码
    user : 'root',
    password : 'ksjcl2012',
    //访问的库名
    database : 'myspeed'
})

module.exports = {connection_myspeed};