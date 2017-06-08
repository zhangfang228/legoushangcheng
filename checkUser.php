<?php
	header("Content-type","text/html;charset=utf-8");
	//一、接收用户数据（用户名）
	$userName = $_GET['userName'];
	//echo $userName;
	
	//1.建立连接（搭桥）
	$conn = mysql_connect("localhost:3306","root","qianfeng");
	
	//2.选择数据库
	mysql_select_db("mydbzhangfang",$conn);
	//3.执行SQL语句
	
	$sqlStr = "select * from userInfo where userName='".$userName."'";
	$result = mysql_query($sqlStr,$conn);
	$rows = mysql_num_rows($result);
	//4.关闭数据库
	mysql_close($conn);
	
	if($rows==0){
		echo "1";
		
	}else{
		echo "0";
	}
	
?>