
var ServerSite = "https://www.nus-apps.com/nusapp";

var HTTPUtil = (function(){

    return{

        ajax : function(url,data,fnSuccess,fnError){
            $.ajax({
                url: url,
                type:"post",
                data:data,
                dataType:"json",
//                async:false,//同步
                beforeSend:function(){
                    showLoading();
                },
                success:function(data){
                    hideLoading();
                    fnSuccess(data);
                },
            　　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数

            　　},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    hideLoading();
                    if( typeof fnError === "function" ){
                        fnError(data);
                    }
                }
            });
        },
        get : function(url,data,fnSuccess,fnError){
            $.ajax({
                url: url,
                type:"get",
                data:data,
                crossDomain : true,
                dataType:"json",
                beforeSend:function(){
                },
                success:function(data){
                    fnSuccess(data);
                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if( typeof fnError === "function" ){
                        fnError(data);
                    }
                }
            });
        },
    }

})();


//加载中超时默认6秒
var Loading_Timeout_Value = 6;

var timer;
function showLoading(){
    var divLoading = $("#divLoading");
    var intTime = 0;

    divLoading.show();

    timer = setInterval(function(){
        if( intTime == Loading_Timeout_Value ){
            divLoading.hide();
            clearInterval(timer);
        }
        intTime++;
    },1000);
}

function hideLoading(){
    $("#divLoading").hide();
    clearInterval(timer);
}

