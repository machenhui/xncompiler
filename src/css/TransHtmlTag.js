/**
 * Created by machenhui on 2015/4/25.
 * 将css 文件中的html tag 进行转意
 */

//tag name 映射  tagCSSPrefix-{tagName}
var tagCSSPrefix = "";
function transHTMLTag(tagName){
    return tagCSSPrefix+"-"+tagName;
}
transHTMLTag.setPrefix = function(prefix){
    tagCSSPrefix = prefix;
}
module.exports = transHTMLTag;


