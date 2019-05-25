//引入express
const express=require('express');
//引入中间件
const bodyParser=require('body-parser');


//引入路由器
const ajaxRouter=require('./routes_1/ajax_1.js');
const proRouter=require('./routes_1/pro.js');
var server=express();
server.listen(8080);
//托管静态资源到app_1下
server.use(express.static('ajaxdome_1'));
server.use(express.static('mypro'));
//使用中间件，将post请求数据转为对象
server.use(bodyParser.urlencoded({extended:false}));

//挂载路由url:/ajax_1
server.use('/ajax_1',ajaxRouter);
server.use('/pro',proRouter);
