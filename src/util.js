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
        fs.readFile(dirPath,{encoding:"utf8"}, function (err, data) {
            if (err){
                throw err;
                process.exit(-1);
            }
            if(visitFn){
                visitFn(dirPath,data);
            }
        });
    }else if(stat.isDirectory()){
        fs.readdir(dirPath,function(err,files){
            files.forEach(function(item){
                dirWalker(dirPath+path.sep+item,visitFn);
            })
        })
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
