// JavaScript Document

$(document).ready(function(){
	setFontSize();
	$(window).resize(function() {
	  setFontSize();
	});
});

function setFontSize(){
	document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 18 + 'px';
}



//页面加载后添加各事件监听
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //按钮事件
    document.addEventListener("backbutton", eventBackButton, false); //返回键
//    document.addEventListener("menubutton", eventMenuButton, false); //菜单键
//    document.addEventListener("searchbutton", eventSearchButton, false); //搜索键

}

//返回键
function eventBackButton(){

    if( $("div.pubHoliday_win").is(":visible") ){
        $("div.pubHoliday_win").hide();
        return;
    }else if( $("#divCalendarDetail").is(":visible")  ){
        $("#btnCalendarDetailBack").click();
        return;
    }else if( $("#divCalendarContent").is(":visible") ){
        $("#btnHome").click();
        return;
    }else{
        document.removeEventListener("backbutton", eventBackButton, false); //注销返回键
        document.addEventListener("backbutton", exitApp, false);//绑定退出事件
        //2秒后重新注册
        var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", exitApp, false); // 注销返回键
                document.addEventListener("backbutton", eventBackButton, false); //返回键
            },2000);

        function exitApp(){
            navigator.Backbutton.goHome(function() {
//                alert('go home success');
            }, function() {
//                alert('go home fail');
            });
//            navigator.app.exitApp();
        }
    }
}