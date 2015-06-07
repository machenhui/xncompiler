var fs = require("fs");
function extend(s,d) {
    for (var p in s) {
        if (s[p] !== null) d[p] = (typeof(s[p]) == 'object' && !(s[p].nodeType) && !(s[p] instanceof Array)) ? extend({}, s[p]) : s[p];
    }
    return d;
}

exports.extend= function(){
    var length = arguments.length;
    var baseObject = arguments[0];
    var result = baseObject;
    for(var i = 1;i<length;i++){
        if(result == null){
            result = {};
        }
        if(arguments[i] != null)
            result = extend(arguments[i],result);

    }
    return result;
};

exports.type = function(obj){
    var type = Object.prototype.toString.call(obj);
    if(type){
        return type.substring(8,type.length-1);
    }
}

var path = require("path");

//目录遍历
function dirWalker(dirPath,visitFn){
    var stat = fs.statSync(dirPath);
    var that = this;
    if(stat.isFile()){
        var data = fs.readFileSync(dirPath,{encoding:"utf8"});
        if(data){
            if(visitFn){
                visitFn(dirPath,data);
            }
        }else{
            throw new Error("读取文件错误");
            process.exit(-1);
        }
    }else if(stat.isDirectory()){
        var files = fs.readdirSync(dirPath);
        if(files){
            files.forEach(function(item){
                dirWalker(dirPath+path.sep+item,visitFn);
            })
        }else{
            console.error("读取目录错误");
        }
    }
}

exports.dirWalker = dirWalker;


function mkdirSync(url,mode,cb){
    var  arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}

function writeFile(_path,content){
    //测试代码
    mkdirSync(path.dirname(_path),0,function(e){
        if(e){
            console.log('出错了');
        }else{
            fs.writeFileSync(_path, content);
        }
    });
}

module.exports.writeFile = writeFile;


var base54 = (function() {
    var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
    var chars, frequency;
    function reset() {
        frequency = Object.create(null);
        chars = string.split("").map(function(ch){ return ch.charCodeAt(0) });
        chars.forEach(function(ch){ frequency[ch] = 0 });
    }
    base54.consider = function(str){
        for (var i = str.length; --i >= 0;) {
            var code = str.charCodeAt(i);
            if (code in frequency) ++frequency[code];
        }
    };
    base54.sort = function() {
        chars = mergeSort(chars, function(a, b){
            if (is_digit(a) && !is_digit(b)) return 1;
            if (is_digit(b) && !is_digit(a)) return -1;
            return frequency[b] - frequency[a];
        });
    };
    base54.reset = reset;
    reset();
    base54.get = function(){ return chars };
    base54.freq = function(){ return frequency };
    function base54(num) {
        var ret = "", base = 54;
        do {
            ret += String.fromCharCode(chars[num % base]);
            num = Math.floor(num / base);
            base = 64;
        } while (num > 0);
        return ret;
    };
    return base54;
})();
//去除大写字母
var base54_xn = (function() {
    var string = "abcdefghijklmnopqrstuvwxyz$_0123456789";
    var chars, frequency;
    function reset() {
        frequency = Object.create(null);
        chars = string.split("").map(function(ch){ return ch.charCodeAt(0) });
        chars.forEach(function(ch){ frequency[ch] = 0 });
    }
    base54_xn.consider = function(str){
        for (var i = str.length; --i >= 0;) {
            var code = str.charCodeAt(i);
            if (code in frequency) ++frequency[code];
        }
    };
    base54_xn.sort = function() {
        chars = mergeSort(chars, function(a, b){
            if (is_digit(a) && !is_digit(b)) return 1;
            if (is_digit(b) && !is_digit(a)) return -1;
            return frequency[b] - frequency[a];
        });
    };
    base54_xn.reset = reset;
    reset();
    base54_xn.get = function(){ return chars };
    base54_xn.freq = function(){ return frequency };
    function base54_xn(num) {
        var ret = "", base = 26;
        do {
            ret += String.fromCharCode(chars[num % base]);
            num = Math.floor(num / base);
            base = 38;
        } while (num > 0);
        return ret;
    };
    return base54_xn;
})();
exports.base54_xn = base54_xn;


var child_process = require('child_process');
var fs = require('fs');

function execSync(command) {
    child_process.execSync(command);
}
exports.execSync = execSync;