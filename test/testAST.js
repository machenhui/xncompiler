var UglifyJS = require("uglify-js");
var fs = require("fs");
var fileName = "./test/data/testAST.js";
//fileName = "./test/data/media.js";
var defineVarName = "./test/data/defineVar.js";
var vm = require("vm");
var globalDefs = vm.createContext({
});
var content = fs.readFileSync(fileName);
var globalDefContent = fs.readFileSync(defineVarName);
vm.runInContext(globalDefContent, globalDefs, defineVarName);
var globalDefAST = null;
globalDefAST = UglifyJS.parse(globalDefContent.toString(),{
    fileName:defineVarName,
    toplevel:globalDefAST
});
globalDefAST.figure_out_scope();


//console.log(globalDefAST.find_variable("clouda"));
var topLevelAST = null;
topLevelAST = UglifyJS.parse(content.toString(),{
    fileName:fileName,
    toplevel:topLevelAST
});


function findClouda(ast_dot,_path){
    if(!_path){
        _path = [];
    }
    if(ast_dot instanceof UglifyJS.AST_Dot){
        if(ast_dot.expression){
            _path.push(ast_dot.property);
            return findClouda(ast_dot.expression,_path);
        }
    }else{
        if((ast_dot instanceof UglifyJS.AST_SymbolRef)&&ast_dot.global()&&ast_dot.undeclared()){
            var global_def = globalDefAST.find_variable(ast_dot.name);
            if(global_def){
                var value = globalDefs[ast_dot.name];
                for(var l=_path.length;l--;){
                    if(value[_path[l]] == null){
                        //console.error("获取的参数不存在",ast_dot.name,value,_path[l],_path.reverse());
                        return;
                    }else{
                        value = value[_path[l]];
                    }
                }
                //console.log(value,ast_dot.name,_path.reverse());
                return value;

                //console.log("------",global_def.init,"===",global_def.references);
            }

        }

    }
}

topLevelAST.figure_out_scope();
/*var compressor = UglifyJS.Compressor({
    warnings:false,
    if_return:true,
    //beautify:false
    global_defs:{
        d:0
    }
});
topLevelAST.mangle_names(true);
var compressed_ast2 = topLevelAST.transform(compressor);
content = compressed_ast2.print_to_string();
var oldLength = content.length;
console.log(oldLength);*/
var deep_clone = new UglifyJS.TreeTransformer(function(node,descend){
    console.log("\t",node.TYPE);
    switch(node.TYPE){
        case "VarDef":
            console.log(node.name.name);
            break;
        case "SymbolVar":
            console.log(node.name);
            break;
        case "ObjectKeyVal":
            console.log(node.key);
            break;
        case "SymbolRef":
            console.log(node.name,node.TYPE);
            break;
        case "Dot":
            console.log(node.property,node.TYPE);
            var parent = deep_clone.parent();
            var rs = findClouda(node);
            if(rs !=null && parent instanceof UglifyJS.AST_Assign) {
                console.error("代码中不能对常量进行定义", node);
                process.exit(-1);
            }else if(rs != null){
                return new UglifyJS.AST_Number({
                    value:rs,
                    start:node.start,
                    end:node.end
                });
            }

            //console.log("====",node.expression,node.property);
            //console.log("\r\n");
            break;
        case "If":
            //console.log(node);
            break;
        default:
            //console.log(node.TYPE);
            break;
    }
    descend(node, this);
    return node;
});
var transTree = topLevelAST.transform(deep_clone);
content = transTree.print_to_string({ beautify: true });
//console.log(topLevelAST.globals._values['$clouda'].references);
//console.log(content);
var compressor1 = UglifyJS.Compressor({
    warnings:false,
    if_return:true,
    unsafe:true,
    unsafe_comps:true
    //beautify:false
});
//命名混淆
transTree.mangle_names(true);
var compressed_ast2 = transTree.transform(compressor1);
content = compressed_ast2.print_to_string({beautify:false});
var newLength = content.length;
fs.writeFileSync(fileName.replace(/\.js$/gi,"-dd.js"),content);
var scopeBody = transTree.find_variable("clouda");
console.log("====================================print_start");
//console.log(transTree.globals._values);
console.log(scopeBody.scope.body);
console.log("=======================",scopeBody.scope.body.length);
for(var i= 0,l=scopeBody.scope.body.length;i<l;i++){
    var item = scopeBody.scope.body[i];
    if(item instanceof UglifyJS.AST_Var){
        console.log("+++++++");
        console.log(item.definitions);
    }else{
        console.log(item);
    }
    console.log("------------------------");
}

console.log(newLength);




