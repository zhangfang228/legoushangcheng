<?php
	header("content-type","text/html;charset=utf-8");
	
	//1.接收客户端数据
	$userName = $_POST['userName'];
	$userPass = $_POST['userPass'];
	
	//1.建立连接（搭桥）
	$conn = mysql_connect("localhost:3306","root","qianfeng");
	
	//2.选择数据库
	mysql_select_db("mydbzhangfang",$conn);

	
	//3.执行SQL语句
	$sqlStr ="insert into userInfo(userName,userPass) values('".$userName."','".$userPass."')";
	mysql_query($sqlStr,$conn);
	
	//4.关闭数据库
	mysql_close($conn);

	//echo "注册成功！<a href='index.html'>进入主页</a>";
?>