(function(){
    function loadScript(src,callBackFn,options){
        if(Object.prototype.toString.apply(src) == "[object Array]"){
            var count = src.length;
            for(var i = 0,l=src.length;i<l;i++){
                loadScript(src[i],function(){
                    if(--i<=0&&callBackFn){
                        callBackFn();
                    }
                });
            }
            return;
        }
        var script = document.createElement("script");
        script.onload = function(){
            if(callBackFn){
                callBackFn();
            }
        }
        script.onerror = function(error){
            if(callBackFn){
                callBackFn(new Error("加载失败"));
            }
        }
        script.src = src;
        script.async ="async";
        if(options&&options.defer){
            script.defer = "defer";
        }
        script.type = "text/javascript";
        script.charset = "utf-8";
        document.head.appendChild(script);
    }
    function loadCSS(src,callBackFn){
        var link = document.createElement("link");
        link.onload = function(){
            if(callBackFn){
                callBackFn();
            }
        }
        link.href = src;
        link.rel = "stylesheet";
        link.type = "text/css";
        document.head.appendChild(link);
    }

    //使用正则剔除该变量
    var moduleName = "$$_moduleName_$$";
    function loadTest(){
        //线下使用
        var host = "http://localhost/";
        loadCSS(host+"/build/sass/"+moduleName+"/scss/index.css");
        loadScript(host+"/static/xn.config.js",function(){
            loadScript([host+"/static/core/Loader.js",host+"/build/"+moduleName+"/templateFront.debug.js"],function(){
                loadScript([host+"/static/"+moduleName+"/js/main.js"]);
            });
        });
    }
    loadTest();
})();