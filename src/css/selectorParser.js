
var parser = function(source){
    var classNameStart = ".";
    var classNameEnd = [" ",":","["];
    var className;
    var otherStr="";
    var isStart = false;
    var rsArray = [];
    for(var i= 0,l=source.length;i<l;i++){
        var char = source.charAt(i);
        switch (char){
            case ".":
                if(className&&className!=""){
                    rsArray.push({
                        type:"className",
                        text:className
                    })
                }
                if(otherStr&&otherStr!=""){
                    rsArray.push({
                        type:"other",
                        text:otherStr
                    })
                }
                otherStr = "";
                className = "";
                isStart = true;
                break;
            case " ":
            case ":":case "[": case ",":case ">":case "~":case "+":
                if(className&&className!=""){
                    rsArray.push({
                        type:"className",
                        text:className
                    })
                }
                className = null;
                //保留字符，包括空格等任何格式，我们只处理能识别的css
                otherStr +=char;
                isStart = false;
                break;
            default :
                if(isStart){
                    className+=char;
                }else{
                    otherStr+=char;
                }
                break;

        }
    }
    //处理结尾处的className
    if(className&&className!=""){
        rsArray.push({
            type:"className",
            text:className
        })
    }
    if(otherStr&&otherStr!=""){
        rsArray.push({
            type:"other",
            text:otherStr
        })
    }
    return rsArray;
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

module.exports = parser;