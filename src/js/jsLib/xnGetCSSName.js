/**
 * 获取css名称
 */

//selector parser

//cssRenameMap json 数据


//xnGetCSSName 方法主体
function xnGetCSSName(sourceText){
    var rs = xnCSSParser(sourceText);
    var rsT = [];
    for(var i= 0,l=rs.length;i<l;i++){
        var item = rs[i];
        if(item.type == "className"){
            var text = xnCSSRenameMap[item.text];
            rsT.push(text?text:item.text);
        }else{
            rsT.push(item.text);
        }
    }
    return rsT.join("");
}

