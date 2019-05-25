//引入express
const express=require('express');
//引入链接池
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//1.登录,post请求登录接口
router.post("/login",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//console.log($uname) console.log($upwd) 打桩查错
	console.log($uname);
	console.log($upwd);

	if (!$uname)
	{res.send("用户名不存在");
	return;
	}
	if (!$upwd)
	{res.send("密码不存在");
	return;
	}
	pool.query("select * from xz_user where uname=? and upwd=?",[$uname,$upwd],(err,result)=>{
		if(err)throw err;
		if(result.length>0)
		{res.send("登录成功");
		}else{
		res.send("登录失败");
		}
	
	console.log(result);
	});
	//结束完在浏览器端验证http://127.0.0.1:8080/pro/login?uname=dongdong&upwd=123456验证





});

//2.查询用户列表,使用get获取用户列表
router.get("/list",(req,res)=>{
//连接池查询所有用户
pool.query("select * from xz_user",(err,result)=>{
	if(err) throw err;
	console.log(1);
	res.send(result);
});

});

//3.删除数据库中数据
router.get("/deleteUser",(req,res)=>{
//获取uid数据
var $uid=req.query.uid;
if (!$uid){
	res.send("uid未找到");
      return;
    };
//连接msq服务器删除数据
pool.query("delete from xz_user where uid=?",[$uid],(err,result)=>{
	if(err)throw err;
	if (result.affectedRows>0)
	{res.send("1");//1表示删除成功
	}else{
	res.send("0");//0表示删除失败
	}
})
});
//结束完在浏览器端验证http://127.0.0.1:8080/pro/deleteUser?uid=3验证


//4.根据uid检索用户,输入编号查询用户所有信息
router.get("/query",(req,res)=>{
//获取uid数据
var $uid=req.query.uid;
if (!$uid)
{res.send("uid未找到");
return;
}
//查询数据库
var sql="select * from xz_user where uid=?";
pool.query(sql,[$uid],(err,result)=>{
if (err)throw err;
if (result.length>0)
	//res.send(result);显示在浏览器端的数据json串 外面还有数组[]，
	//res.send(result[0])显示在浏览器端的数据是json串，外面没有了数组，只剩{}
	{res.send(result[0]);
	}else{
	res.send("没有查询的用户");
	}
	
});
});

//结束完在浏览器端验证http://127.0.0.1:8080/pro/query?uid=44,验证时只能输入msL数据库中有的数据才会显示json串

//5.根据修改修改表中数据
//req是html文件发来的请求的总集
router.post("/update",(req,res)=>{
//接收数据
var $uid=req.body.uid;
var $uname=req.body.uname;
var $upwd=req.body.upwd;
var $email=req.body.email;
var $phone=req.body.phone;
var $user_name=req.body.user_name;
var $gender=req.body.gender;
if (!$uid)
{res.send("用户ID未接收到");
return;
}
if (!$uname)
{res.send("用户名未接收到");
return;
}
if (!$upwd)
{res.send("用户密码未接收到");
return;
}
if (!$email)
{res.send("用户邮箱未接收到");
return;
}
if (!$phone)
{res.send("用户电话未接收到");
return;
}
if (!$user_name)
{res.send("用户真实姓名未接收到");
return;
}
if (!$gender)
{res.send("用户性别未接收到");
return;
}
//插入sql数据库
var sql="update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?";
pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,result)=>{
if (err) throw err;
if (result.affectedRows>0)
{res.send("1");//1表示修改成功
}else{
res.send("0");
}
});
});


//6.注册用户信息
router.post('/reg',(req,res)=>{
//获取post 请求数据
var n=400;
var obj=req.body;
//检测值是否为空
//遍历对象属性,获取所有属性值
for(var key in obj){
	n++;
	if(!obj[key]){
  res.send({code:401,msg:key+'required'});
   return;
	}
}
pool.query("insert into xz_user set?",[obj],(err,result)=>{
	if(err)throw err;
	if (result.affectedRows>0)
	{res.send("1");
	}

});
});

//http://127.0.0.1:8080/pro/reg?uname=123&upwd=123&email=123&phone=123




//导出路由对象
module.exports=router;

