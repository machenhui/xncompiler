/**
 * $GLOBAL_VAR 为内置的全局变量映射
 * $GLOBAL_MAP 为 模块和短命名的映射关系
 * @param deps
 * @param callBackFn
 */
function require(deps,callBackFn){
    if(Object.prototype.toString.call(deps) == "[object String]"){
        deps = [deps];
    }
    var args = [];
    for(var i = 0,l=deps.length;i<l;i++){
        var depRefName = $GLOBAL_MAP[deps[i]];
        if(depRefName){
            args.push($GLOBAL_VAR[depRefName]);
        }
    }
    if(callBackFn){
        callBackFn.apply(window,args);
    }
}