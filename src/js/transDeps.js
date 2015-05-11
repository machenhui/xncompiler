/**
 * Created by machenhui on 2015/5/8.
 *
 * 转换依赖的相对路径
 */
var path = require("path");
function transDeps(deps,moduleName,filePath){
    var rootPath = filePath.replace(/\.js$/gi,"").replace(/\\+/gi,"/").replace(moduleName,"");
    deps.forEach(function(item,index,array){
        if(item.search(/^\.+/gi)!=-1) {
            deps[index] = path.relative(rootPath,path.resolve(path.dirname(moduleName),item)).replace(/\\+/gi,"/");
            //console.log(item,moduleName,deps[index],rootPath);
        }
    })
    return deps;
}

module.exports = transDeps;