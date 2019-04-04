const express=require('express');
const routert=require('./routers/router.js');
//引入中间件
const bodyParser=require('body-parser');
var server=express();
//配置中间件
server.use(bodyParser.urlencoded({
	extended:false
}));
server.listen(5050);
server.use(express.static('public'));
server.use('/lo',routert);

