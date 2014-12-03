/**
 * 转化AMD 写法中的 require define 为局部变量
 */
var getModulePath = require("./transCommonJS").getModulePath;
var moduleStateMap = require("./transCMDRequire").moduleStateMap;
/**
 * 将define 指令转换成全局命名空间下的一个函数
 * define(moduleName,deps,fun) ===> window[namespace][moduleName] = (function(deps...){})();
 */

/*function varSafePrefix(namespace,array,_rs){
    var rs = _rs;
    if(!rs){
        rs = "";
    }
    if(array.length>0){
        var name = array.shift();
        if(name&& name.replace(/\s/gi,"") !=""){
            rs += "if(typeof "+namespace+" == 'undefined'){"+namespace+"={};} if(!"+namespace+"['"+name+"']){"+namespace+"['"+name+"']={}}"
            rs = varSafePrefix(namespace+"['"+name+"']",array,rs);
        }
    }
    return rs;
}

var moduleNameCache = {};
function getModulePath(namespace,moduleName){
    if(moduleNameCache[moduleName]){
        return moduleNameCache[moduleName];
    }
    var moduleNameArray = moduleName.replace("//","/").split("/");
    //var varName = "window";
    var varName = "";
    if(namespace){
        //varName+="['"+namespace+"']";
        varName+=namespace;
    }
    for(var i= 0,l=moduleNameArray.length;i<l;i++){
        var name=moduleNameArray[i];
        if(name&&name.replace(/\s/gi,'')==""){
            moduleNameArray.splice(2,0);
        }
    }
    var modulePath = "['"+moduleNameArray.join("']['")+"']";
    var prefix = varSafePrefix(varName,moduleNameArray);
    varName+=modulePath;
    moduleNameCache[moduleName] = {
        name:varName,
        prefix:prefix
    };
    return moduleNameCache[moduleName];
}
module.exports.getModulePath = getModulePath;*/

function defineTemplate(namespace,moduleName,runContent){
    var tpl = "{namespace}.__defineGetter__(\"{moduleName}\",function(){" +
       // "if(!{namespace}_cache){{namespace}_cache={}}" +
        "if(!{namespace}_cache[\"{moduleName}\"]){" +
        "{namespace}_cache[\"{moduleName}\"] = "+runContent+"" +
        "}" +
        "return {namespace}_cache[\"{moduleName}\"];" +
        "})"
    return tpl.replace(/\{namespace\}/gi,namespace).replace(/\{moduleName\}/gi,moduleName);//TODO 编译soyutils 时 正则替换出错 .replace(/\{runContent\}/gi,runContent);
}

module.exports.transDefine = function(namespace,moduleName,content,filePath){
    var moduleBrowserName = getModulePath(namespace,moduleName.replace(/\.js$/gi,""));
    var getInfo = new Function("define",content);
    try{
        var info = {};
        function define(name, deps, callBackFn) {
            info = {
                name: name,
                deps: deps,
                callBackFn: callBackFn.toString()
            };
        }
        getInfo(define);
    }catch(e){
        console.log(arguments,moduleName.replace("//","/"));
        console.log(e);
    }
    var depsNames = [];
    var l = info.deps.length;
    if(moduleStateMap&&moduleStateMap[filePath]){
        l = moduleStateMap[filePath];
    }
    for(var i= 0;i<l;i++){
        if(info.deps[i] != ""){
            depsNames.push(namespace+"[\""+getModulePath(namespace,info.deps[i],filePath)+"\"]");
        }
    }
    var runFun = "("+info.callBackFn+").call("+namespace+"_g"+(depsNames.length?",":"")+depsNames.join()+");";
    //return "var "+moduleBrowserName+"="+runFun;
    return defineTemplate(namespace,moduleBrowserName,runFun);
};



/**
 * require(deps,fun) 转换成闭包函数运行
 * require(deps,fun) ===>fun(transDepName....); transDepName 为全局命名空间下的变量
 */

module.exports.transRequire = function(namespace,content,filePath){
    var getInfo = new Function("require",content);

    try{
        var info = {};
        function require(deps, callBackFn) {
            if(Object.prototype.toString.call(deps) != "[object Array]"){
                deps = [deps];
            }
            info = {
                deps: deps,
                callBackFn: callBackFn.toString()
            };
        }
        getInfo(require);
    }catch(e){
        console.log(e);
    }
    var depsNames = [];
    var l = info.deps.length;
    if(moduleStateMap&&moduleStateMap[filePath]){
        l = moduleStateMap[filePath];
    }
    for(var i= 0;i<l;i++){
        depsNames.push(namespace+"[\""+getModulePath(namespace,info.deps[i],filePath)+"\"]");
    }
    var runFun = "("+info.callBackFn+").call("+namespace+"_g"+(depsNames.length?",":"")+depsNames.join()+");";
    return runFun;
}

