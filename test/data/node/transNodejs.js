/**
 * Created by machenhui on 2015/5/7.
 */

var transNodeJS = require("../../../src/js/transNodeJS");
var path = require("path");
//console.log(path.resolve(path.dirname(module.filename),"../../../"));
var rootPath = path.resolve(path.dirname(module.filename),"../../../");
//console.log(path.relative(rootPath,module.filename));
transNodeJS({
    baseDir:rootPath,
    sourceFile:path.relative(rootPath,module.filename),
    writeFile:true,
    tmpDir:"./build/xnBuildTmp2/",
    successFn:function(data){
        //console.log(data.reverse().join(";"));
    }
})

