/**
 * Created by machenhui on 2015/4/25.
 * 翻译htmlTag 为指定的tag
 *
 * 指定浏览器 默认的css
 *
 */

var tagRenameMap = {};

module.exports = {
    trans:function(tagName){
    	if(tagRenameMap[tagName]){
    		return tagRenameMap[tagName];
    	}else{
    		return tagName;
    	}
    	
    },
    setRenameMap:function(nameMap){
    	tagRenameMap = nameMap;
    }
}
