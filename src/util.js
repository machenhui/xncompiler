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