/**
 * 生成一个内联在压缩文件里面的loader 供 页面内部require 使用
 */

var fs = require("fs");
var content = fs.readFileSync("./simpleRequire.js","utf8");
/**
 * 输入局部的模块名称，name 映射对象
 * @param globalVarName {String} 全局变量命名空间
 * @param nameMapping {Object} 模块名和短命名的映射对象
 * @returns {String}
 */
function getRequireCode(globalVarName,nameMapping){
    var nameMapVar = globalVarName+"_nameMapping";
    var nameMapCode = "var "+nameMapVar+"="+JSON.stringify(nameMapping)+";";
    var code = nameMapCode+content.replace("$GLOBAL_MAP",nameMapVar).replace("$GLOBAL_VAR",globalVarName);
    return code;
}


