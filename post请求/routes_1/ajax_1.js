//引入express
const express=require('express');
//引入链接池
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//post请求登录接口（应该用post）
router.post('/login_post',(req,res)=>{
	//1.接收参数
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//console.log($uname);
	//console.log($upwd);
	//2.验证接受参数是否成功
	if (!$uname)
	{res.send('用户名未接收到');
	return;
	}
	if (!$upwd)
	{res.send('密码未接收到');
	return;
	}
 //查询用户表中是否含有用户名和密码同时匹配的数据
 //sql语句换行必须有+号，+后面的一个sql单词前面要加空格
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],function(err,result){
    if(err) throw err;
	//console.log(result);
	//判断数组的长度是否大于0 
    if(result.length>0){
	  res.send({code:200,msg:'login suc'});
	}else{
	  res.send({code:301,msg:'login err'});
	}
  });
//res.send("用户名"+$uname+",密码"+$upwd);
});

//使用get获取用户列表
router.get("/userlist",(req,res)=>{
//连接池查询所有用户
pool.query("select * from xz_user",(err,result)=>{
	if(err)throw err;
	console.log(result);
	res.send(result);

});
});
//在浏览器输入http://127.0.0.1:8080/ajax_1/login_post,可以检测ajax.js是否出错.

//在浏览器地址栏验证 127.0.0.1:8080/ajax/userlist 在浏览器端显示json形式的数据(后期要解析)
//刷新就可以显示 而不是点击才能显示

router.get(("/userlist01"),(req,res)=>{
//连接池查询所有用户
pool.query("select * from xz_user",(err,result)=>{
	if(err)throw err;
	res.send(result);

});

});

//在浏览器输入http://127.0.0.1:8080/ajax_1/userlist01,可以检测ajax.js是否出错.

//导出路由对象
module.exports=router;

