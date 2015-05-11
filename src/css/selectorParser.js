var SelectorToken = require("./lexParser");
var operateChars = ":[]()";
var attributeTag = "[]";
var spliteChars = " ,";
var cssCharCode = "abcdefghijklmnopqrstuvwxyz";
cssCharCode+=cssCharCode.toUpperCase();
cssCharCode+="1234567890"
var htmlTagCode = cssCharCode;
cssCharCode+="-_";
function findHtmlTag(source,startIndex){
    var endIndex = startIndex;
    var isBreak = false;
    for(var i = startIndex,l=source.length;i<l;i++){
        var char  = source[i];
        if(htmlTagCode.indexOf(char)==-1){
            endIndex = i;
            isBreak = true;
            break;
        }else{
            endIndex = i;
        }
    }
    if(!isBreak){
        endIndex += 1;
        //console.log(source.substring(startIndex,endIndex),"-----------------");
    }
    return source.substring(startIndex,endIndex);
}
//
function findClassName(source,startIndex){
    var endIndex = startIndex;
    var isBreak = false;
    for(var i = startIndex,l=source.length;i<l;i++){
        var char  = source[i];
        if(cssCharCode.indexOf(char)==-1){
            endIndex = i;
            break;
        }else{
            endIndex = i;
        }
    }
    if(!isBreak){
        endIndex += 1;
    }
    return source.substring(startIndex,endIndex);
}

function findAttribute(source,startIndex){
    var endIndex = startIndex;
    var isBreak = false;
    var _attributeTag = attributeTag.substring(1);
    for(var i = startIndex,l=source.length;i<l;i++){
        var char  = source[i];
        if(_attributeTag.indexOf(char)!=-1){
            endIndex = i;
            break;
        }else{
            endIndex = i;
        }
    }
    if(!isBreak){
        endIndex += 1;
    }
    return source.substring(startIndex,endIndex);
}

function findCSSWord(source,startIndex){

}
//将css name 截取成scope
function findScope(){}

var parser = function(source,_rootNode){
    var classNameStart = ".";
    var classNameEnd = [" ",":","["];
    var className;
    var otherStr="";
    var isStart = false;
    var rsArray = [];
    var rootNode = _rootNode || new SelectorToken.CSS_NODE(SelectorToken.CSS_NODE_TYPE.ROOT_NODE,null);
    var endSelector = true;
    var htmlTag =null;
    var inAttr = false;
    var pseudoClass = false;
    var inScope = null;

    var currentNodeType = null;
    //console.log(source);

    function storeData(option){
        var currentNode;
        //处理结尾处的className
        if(className&&className!=""){
            rsArray.push({
                type:"className",
                text:className
            })
            currentNode = new SelectorToken.CSS_NODE(SelectorToken.CSS_NODE_TYPE.CLASS_NAME,className);
        }
        if(!option||!option.noOther){
            if(otherStr&&otherStr!=""){
                rsArray.push({
                    type:"other",
                    text:otherStr
                })
                currentNode = new SelectorToken.CSS_NODE(SelectorToken.CSS_NODE_TYPE.OTHER_NODE,otherStr);
            }
        }

        if(htmlTag&&htmlTag!=""){
            rsArray.push({
                type:"htmlTag",
                text:htmlTag
            })
            currentNode = new SelectorToken.CSS_NODE(SelectorToken.CSS_NODE_TYPE.TAG_NAME,htmlTag);
        }



        if(option && option.type == SelectorToken.CSS_NODE_TYPE.SCOPE_NODE && option.children){
            currentNode = new SelectorToken.CSS_NODE(SelectorToken.CSS_NODE_TYPE.SCOPE_NODE,null);
            currentNode.appendChild(option.children);
        }

        if(currentNode) {
            rootNode.appendChild(currentNode);
        }

        //var e = new Error();
        //console.log(e.stack)
    }
    //console.log("start=============================================start",source);
    for(var i= 0,l=source.length;i<l;i++){
        var char = source.charAt(i);
        switch (char){
            case ".":
                storeData();
                otherStr = "";
                className = "";
                isStart = true;
                endSelector = false;
                currentNodeType  = SelectorToken.CSS_NODE_TYPE.CLASS_NAME;
                var testClassName = findClassName(source,i+1);
                if(testClassName.length>0){
                    i+=testClassName.length;
                    className = testClassName;
                    storeData();
                    className = "";
                }
                break;
            case " ":
            case ",":
                if(inScope === false||inScope === null){
                    pseudoClass = false;
                }
                endSelector = true;
                storeData();
                //console.log("************",rsArray);
                className = null;
                htmlTag = null;
                isStart = false;
                otherStr = "";
                //保留字符，包括空格等任何格式，我们只处理能识别的css
                otherStr +=char;
                currentNodeType  = SelectorToken.CSS_NODE_TYPE.SPLIT_NODE;
                storeData();
                otherStr = "";
                //console.log("************",rsArray);
                //console.log(endSelector,isStart,inAttr,pseudoClass,i,"========","endSelector,isStart,inAttr,pseudoClass,i",char)
                break;
            case "(":
                //内部是新的css Selector
                var startIndex = i,subStr = source.substring(i),endIndex = subStr.indexOf(")");
                var subSelector = subStr.substring(1,endIndex);
                inScope = true;
                if(subSelector.length >0){
                    storeData();
                    var _tmpArray = parser(subSelector);
                    rsArray.push({
                        type:"subScope",
                        data:_tmpArray.tokenArray
                    });
                    otherStr = "";
                    inScope = false;
                    storeData({
                        type:SelectorToken.CSS_NODE_TYPE.SCOPE_NODE,
                        children:_tmpArray.cssNode
                    });
                }
                //移动索引
                i+=endIndex;
                break;
            case ")":
                inScope = false;
                break;
            case ">":
            case "~":
            case "+":
                pseudoClass = false;
                storeData({noOther:true});
                className = null;
                htmlTag = null;
                //保留字符，包括空格等任何格式，我们只处理能识别的css
                otherStr +=char;
                isStart = false;
                currentNodeType  = SelectorToken.CSS_NODE_TYPE.OPERATE_NODE;
                //console.log(endSelector,isStart,inAttr,pseudoClass,i,"========","endSelector,isStart,inAttr,pseudoClass,i",char)
                break;
            case ":":
                pseudoClass = true;
                storeData({noOther:true});
                className = null;
                htmlTag = null;
                //保留字符，包括空格等任何格式，我们只处理能识别的css
                otherStr +=char;
                isStart = false;
                currentNodeType  = SelectorToken.CSS_NODE_TYPE.PRODUCE_NAME;
                //console.log(endSelector,isStart,inAttr,pseudoClass,i,"========","endSelector,isStart,inAttr,pseudoClass,i",char)
                break;
            case "[":
                inAttr = true;
                storeData({noOther:true});
                className = null;
                htmlTag = null;
                //保留字符，包括空格等任何格式，我们只处理能识别的css
                isStart = false;
                currentNodeType  = SelectorToken.CSS_NODE_TYPE.ATTRIBUTE_NODE;
                //store attribute
                var attributeContent = findAttribute(source,i);
                if(attributeContent && attributeContent.length>0){
                    otherStr +=attributeContent;
                    i+=attributeContent.length-1;
                }else{
                    otherStr +=char;
                }
                //console.log(endSelector,isStart,inAttr,pseudoClass,i,"========","endSelector,isStart,inAttr,pseudoClass,i",char)
                break;
            case "]":
                inAttr = false;
                otherStr+=char;
                break;
            default :
                if(isStart){
                    className+=char;
                }else if(!inAttr&&!pseudoClass&&!isStart){
                    endSelector = false;
                    if(!htmlTag){htmlTag = ""}
                    //htmlTag+=char;
                    var _htmlTag = findHtmlTag(source,i);
                    currentNodeType  = SelectorToken.CSS_NODE_TYPE.TAG_NAME;
                    if(_htmlTag.length>0){
                        i+=_htmlTag.length-1;
                        //console.log(_htmlTag,source[i],"===========",otherStr);
                        storeData();
                        otherStr = "";
                        className = "";
                        htmlTag = _htmlTag;
                        //console.log("---------------",_htmlTag,source);
                        storeData();
                        //console.log("++++++++++++");
                        htmlTag = "";
                    }
                }else{
                    otherStr+=char;
                    //console.log(otherStr);
                }
                //console.log(endSelector,isStart,inAttr,pseudoClass,i)
                break;
        }
    }
    storeData();
    //console.log(rsArray,inAttr,pseudoClass,isStart,inScope);
    return {tokenArray:rsArray,cssNode:rootNode};
}

function test(){
    var rs = parser(".map-info-content.hSlider");
    if(rs&&rs.length == 2&&rs[0].text == "map-info-content"&&rs[1].text == "hSlider"){
        console.log("ok!!!");
    }else{
        console.log("error!!!",rs);
    }

    var rs = parser(".map-info-content.hSlider .hSliderItem");
    if(rs&&rs.length == 4&&rs[0].text == "map-info-content"&&rs[1].text == "hSlider"&&rs[2].text == " "&&rs[3].text == "hSliderItem"){
        console.log("ok!!!");
    }else{
        console.log("error!!!",rs);
    }
}
//console.log(arguments.callee.toString());
module.exports = parser;