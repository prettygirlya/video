const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//路由
//从数据库读取剧种图片
router.get('/pic',(req,res)=>{
	var sql='select * from pic'	
	pool.query(sql,(err,result)=>{
		if(err)throw err;	
		if(result.length>0){
			res.send(result);
		}else {
			res.send('err')
		}
	})
})
// vip
router.get('/vip',(req,res)=>{
	var sql='select * from vip'	
	pool.query(sql,(err,result)=>{
		if(err)throw err;	
		if(result.length>0){
			res.send(result);
		}else {
			res.send('err')
		}
	})
})
// onload
router.get('/on',(req,res)=>{
	var obj=req.query
	var a=obj.juzhong
	var sql='SELECT * FROM pic where  juzhong=?'
	pool.query(sql,[a],(err,result)=>{
		if(err)throw err;	
		res.send(result)
	})
})
// 二次筛选
router.get('/pica',(req,res)=>{
	var obj=req.query
	var ad=obj.juzhong
	var ba=obj.vipkind
	console.log(ba)
	var sql="SELECT * FROM pic where  juzhong=? and vipkind in(?)"
	console.log(sql)
	pool.query(sql,[ad,ba],(err,result)=>{
		if(err)throw err;	
		res.send(result)
		console.log(result)
	})
})
//注册
router.post('/reg',(req,res)=>{
	var obj=req.body
	//验证数据是否为空
	var $num=obj.num;
	var $upwd=obj.pwd;
	console.log($num)
	console.log($upwd)
	if(!$num){
		res.send({code:401,msg:'uname required'})
			return;
		}
	if(!$upwd){
		res.send({conde:402,msg:'upwd required'})
			return;
		}
	//执行sql语句 把数据 (obj) 插入到数据库中
	//注册成供:{code:200,msg:'reg suc'}
	pool.query('insert into usera values(?,?)',[$num,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,meg:'reg suc'})
		}
	})
});
//登录
router.post('/login',(req,res)=>{
	var $num=req.body.num;
	var $upwd=req.body.upwd;
	if(!$num){
		res.send('用户名不存在')
			return
	}
	if(!$upwd){
		res.send('用户密码不存在');
			return;
	}
	console.log($num)
	console.log($upwd)
	var sql='select * from usera where unum=? and upwd=?'
	pool.query(sql,[$num,$upwd],(err,result)=>{
		if(err) throw err
		if(result.length>0){
			res.send('suc')
		}else{
			res.send('err')	
		}
	});
})
//details
router.get('/details',(req,res)=>{
	var $lid=req.query.lid
	console.log(req.query)
	console.log($lid)
	var sql='select * from pic where lid=?'
	pool.query(sql,[$lid],(err,result)=>{
		if(err)throw err;	
		if(result.length>0){
			res.send(result);
		}else {
			res.send('err')
		}
	})
})
//后台 视频管理
router.get('/video',(req,res)=>{
	var sql='select * from manage'	
	pool.query(sql,(err,result)=>{
		if(err)throw err;	
		if(result.length>0){
			res.send(result);
		}else {
			res.send('err')
		}
	})
})
// 查询
router.get('/s',(req,res)=>{
	//允许执行多条sql
	var $pname=req.query.pname
	var n=req.query.num
	var p=req.query.page
	if(!n){n=1}
  if(!p){p=8}
	n=parseInt(n)
	p=parseInt(p)
	var offset = (n-1)*p;
	var sql=
	'SELECT pic.src,pic.pname,pic.pscore,pic.vip FROM pic where pname like ? limit ?,?;select	count(*) from pic where pname like ?'	
	pool.query(sql,['%'+$pname+'%',offset,p,'%'+$pname+'%'],(err,result)=>{
		if(err)throw err;	
		if(result.length>0){
			res.send({data:result[0],pge:result[1]});
		}else {
			res.send('err')
		}
	})
})

module.exports=router;