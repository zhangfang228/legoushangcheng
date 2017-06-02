"use strict";

//轮播图
function Slideshow(obj){
//属性：
//一、轮播图整体的属性
	//1、所在容器id;
	this.boxId=obj.boxId;
	//2、图片数组；保存每张图片的路径；
	this.imgs=obj.imgs;
	//图片大小即容器大小；
	this.width=obj.width;
	this.height=obj.height;
	//播放速度
	this.timeSpace=obj.timeSpace;//3000
	//淡入和淡出的图片序列号；
	this.currInord=1;
	this.currOutord=0;
	//大定时器
	this.timer=null;
	//二、两张图片的切换效果（淡入淡出效果）的属性
	//淡入淡出效果的时间长度
	this.fadeInOutTime=obj.fadeInOutTime;//2000
	//小定时器；
	this.fadeInOutTimer=null;
	//三、按钮的属性；
	this.btnColor = obj.btnColor;//原始颜色
	this.btnHighColor = obj.btnHighColor;//高亮颜色
	this.btnWidth = obj.btnWidth;//按钮的宽
	this.btnHeight = obj.btnHeight;
	this.btnHasOrd = obj.btnHasOrd;//按钮上是否有序号；
	
	this.initUI();
	this.autoChange();
}

//初始化界面
Slideshow.prototype.initUI=function(){
//一、创建轮播图所需要的DOM元素；
//1、所有图片的创建
	for(var i=0;i<this.imgs.length;i++){
	let str="<img src='"+this.imgs[i]+"' style='width:"+this.width+"px;height:"+this.height+"px;position:absolute;z-index:"+(this.imgs.length-i)+";display:none'/>";
	$(this.boxId).append(str);//用字符串拼接的方式创建img，追加到box里
	}
	$(this.boxId+" img:first").css({"display":"block"});//第一张图的display要设置为block	
//2、所有按钮的创建
	let ulliStr="<ul style='position:absolute;right:30%;bottom:7px;z-index:10;display:flex;justify-content:space-between'>";	
	for(let i=0;i<this.imgs.length;i++){
	ulliStr+="<li ord='"+(i+1)+"'style='list-style:none;float:left;margin:10px;width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;text-align:center;background-color:"+this.btnColor+";'>"
	"</li>"
	}
	ulliStr+="</ul>";
	$(this.boxId).append(ulliStr);
	$(this.boxId+" ul li").mouseover(function(){
			that.goImg(this.getAttribute("ord"));
		});
	
	//让第一个按钮变成高亮颜色；
	$(this.boxId+" ul li:first").css({"background-color":this.btnHighColor});
	
	var that = this;
	$(this.boxId).mouseover(function(){
		that.stopChange();
	}); 

	$(this.boxId).mouseout(function(){
		that.autoChange();
	});	
}

//方法
// 一、自动切换(图片切换)
Slideshow.prototype.autoChange=function(){
//this.timer=null;
var that=this;
this.timer=setInterval(function(){
		that.goStep();
	},this.timeSpace);
}
//
Slideshow.prototype.goStep=function(){
//1)改变淡入淡出的图片序号
	this.currInord++;
	this.currOutord=this.currInord-1;
	if(this.currInord>this.imgs.length){
		this.currInord=1;
	}
	if(this.currOutord>this.imgs.length){
		this.currOutord=1;	
	}
	//2)淡入淡出效果
	this.fadeInOut();
	//3)改变按钮颜色
	this.changeBtnColor();
}
//二、点击按钮，跳转到相应图片
Slideshow.prototype.goImg=function(ord){
	//1、改变淡入和淡出的序列号；点哪个是哪个
	this.currOutord=this.currInord;
	this.currInord=ord;
	//2)淡入淡出效果
	this.fadeInOut();
	//3)改变按钮颜色
	this.changeBtnColor();
}
//淡入淡出的效果
Slideshow.prototype.fadeInOut=function(){
	$(this.boxId+" img:eq("+(this.currInord-1)+")").fadeIn(this.fadeInOutTime);
	$(this.boxId+" img:eq("+(this.currOutord-1)+")").fadeOut(this.fadeInOutTime);
}

//改变按钮颜色
Slideshow.prototype.changeBtnColor=function(){
	$(this.boxId+" ul li:eq("+(this.currInord-1)+")")
	.css("background-color",this.btnHighColor)
	.siblings()
	.css("background-color",this.btnColor);
}
//鼠标悬停时，停止变化；
Slideshow.prototype.stopChange=function(){
	window.clearInterval(this.timer);
}	
	
	
	
	