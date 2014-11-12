/**
 * 负责调用 clean-css 的 selectorParser
 * 将所有的css selector 名称重写
 */
var cleanCSS = require("clean-css");
var token = require("./token");
var fs = require("fs");
var context = {
    warnings:[]
};
var testData = fs.readFileSync("test/data/css/test.css");
var tokenT = token(testData.toString(),context);

var selectorAST = tokenT.process();
for(var i= 0,l=selectorAST.length;i<l;i++){
    var item = selectorAST[i];
    if(item&&item.selector){
        console.log(item.selector);
    }
}

var selectorSplits = [",","\s*"];
var selectorSplits = ["\."];
//css 伪类
