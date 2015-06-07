/**
 * 遍历 指定全局变量下，所有的property 删除没有被调用过的
 * 作为一个可选属性打开，提高压缩效率
 * 如何处理prototype 上的属性
 */
var util = require("../util");
var UglifyJS = require("uglify-js");
function DropUnUsedProperty() {
    this._init.apply(this, arguments);
}

DropUnUsedProperty.prototype = {
    _init: function (options) {
        this._options = util.extend({
            globalVarNames: ["goog"],//目标全觉函数
            top_level_ast: null //必须指定语法树
        }, options);
        this.topAST = this._options.top_level_ast;
        this._findGlobalVars(this._options.globalVarNames);
    },
    _findGlobalVars: function (varNames) {
        this.allChildVarTypes = {};
        this.afterLastTypeMap = {};
        this.nodeNameTree = {};
        this.nodeNameCountMap = {};
        for (var i = 0, l = varNames.length; i < l; i++) {
            var node = this.topAST.find_variable(varNames[i]);
            //console.log(node,varNames[i]);
            /*if(!node.scope){
             console.log(node.TYPE);
             }
             console.log(node instanceof UglifyJS.AST_SymbolAccessor,node.scope);
             if(node.references){
             console.log("该节点未被使用",node.references.length);
             }*/

            //this.getNoReference(node);

            console.log("该节点未被使用", node.references.length, node.references[0].TYPE);
            this.createVarDepTree(this.topAST, varNames[i], node.references.length);
        }
        /*console.log(this.allChildVarTypes);
        console.log(this.afterLastTypeMap);
        console.log("====================","var defines");
        console.log(JSON.stringify(this.nodeNameTree),this._getObjCount(this.nodeNameTree));
        console.log("====================","var use");
        console.log(this.nodeNameCountMap,this._getObjCount(this.nodeNameCountMap));*/
        //去除 定义未使用的function 并去除 在该方法中对于其他方法的调用
    },
    getNoReference: function (node) {
        if (node.references && node.references.length == 0) {
            console.log("节点未被使用");
        } else if (node.references) {
            var refs = node.references;
            for (var i = 0, l = refs.length; i < l; i++) {
                this.getNoReference(refs[i]);
            }
        } else if (node.scope) {
            var body = node.scope.body;
            for (var i = 0, l = body.length; i < l; i++) {
                //console.log(body[i].TYPE);
            }
            //console.log(node.TYPE,node.scope);
        } else {
            //console.log("\t\t", node.TYPE);
        }
    },
    //找到某个全局变量，找到其所有属性的调用次数，删除调用次数为0的
    createVarDepTree: function (topLevelAST, name, count) {
        var _count = 0;
        var beforeNode;
        var that = this;
        var walker = new UglifyJS.TreeWalker(function (node, descend) {
            //if(node instanceof UglifyJS.AST_Call){
            if (node instanceof UglifyJS.AST_SymbolRef && node.name == name) {
                //console.log(node.name, beforeNode.TYPE, walker.parent(1).TYPE);
                that.getFullStack(node, walker,name);
            } else {
                beforeNode = node;
            }

        });

        topLevelAST.walk(walker);
    },
    getFullStack: function (node, walker,name) {
        var rs = "";
        var lastItem;
        var afterLastType;
        var lastDotItem;
        var before;
        var innerUse;
        //var parent = walker.parent(0);
        //console.log("=============",node.TYPE,parent.TYPE,parent.property,parent.name);
        for (var i = 0, l = walker.stack.length-1; i < l; i++) {
            var item = walker.parent(i);
            if (!lastItem && (item instanceof UglifyJS.AST_Call)) {
                rs = item.print_to_string();
                //var before = walker.stack[l-i-1];
                if(this._checkIsFunArg(item,before)){
                    rs = before.print_to_string();
                }else if(before instanceof UglifyJS.AST_Dot){
                    rs = before.print_to_string();
                }
                //解析当前节点和上一个节点之间的关系
                //console.log("AST_Call",before.print_to_string(),item.expression.TYPE);
                lastItem = item;
                this.recodeUseCount(name,rs);
            } else if (!lastItem && (item instanceof UglifyJS.AST_Assign)){

                if(item.left === before ||!before){
                    rs = item.left.print_to_string();
                    //console.log("AST_Assign",item.left.print_to_string(),before.TYPE);
                    lastItem = item.left;

                    if(item.right instanceof UglifyJS.AST_Function){
                        innerUse = new DropUnUsedProperty({
                            globalVarNames:this._options.globalVarNames,
                            top_level_ast:item.right
                        });
                        //判断是否是定义一个新对象
                    }
                    this.getNamedTree(name,item.left.print_to_string(),innerUse&&Object.keys(innerUse.nodeNameCountMap).length&&innerUse.nodeNameCountMap);
                    //break;
                }else{
                    //一次 目标对象的属性读取
                    lastItem = item.right;
                    console.log("recodeUseCount",i,before.print_to_string());
                    this.recodeUseCount(name,before.print_to_string());
                    //break;
                }


            }else if(!lastItem&&item instanceof UglifyJS.AST_Return){
                rs = before.print_to_string();
                lastItem = before;
                this.recodeUseCount(name,rs);
                //console.log(before.TYPE);
                //break;
            }else if(!lastItem&&item instanceof UglifyJS.AST_Binary){
            	if(before){
            		rs = before.print_to_string();
                    lastItem = before;
                    this.recodeUseCount(name,rs);
            	}
                
                //console.log(before.TYPE);
                //break;
            }else if(!lastItem&&item instanceof UglifyJS.AST_VarDef){
                rs = item.value.print_to_string();
                lastItem = item.value;
                //console.log(before.TYPE);
                //break;
            }else if(!lastItem&&item instanceof UglifyJS.AST_UnaryPrefix){
            	if(item.operator == "!"){
            		rs = before.print_to_string();
                    lastItem = before;
                    this.recodeUseCount(name,rs);
            	}                
                //console.log(before.TYPE);
                //break;
            }else if(!lastItem&&(item instanceof UglifyJS.AST_If||item instanceof UglifyJS.AST_SimpleStatement)){
            		rs = before.print_to_string();
                    lastItem = before;  
                    this.recodeUseCount(name,rs);
                //console.log(before.TYPE);
                //break;
            }else if (lastItem && !afterLastType) {
                afterLastType = item.TYPE;
                break;
            }else if(!lastItem&&item instanceof UglifyJS.AST_Dot){
            	  if(item.expression&& item.expression.property== "prototype"){
            		  //访问，或者设置prototype 属性
            		  //console.log(item);
            	  }
            }else{
                //console.log("dddddddd",item&&item.TYPE,i,walker.stack.length);
            }
            before = item;
            //console.log("\t\t\t",item.TYPE);
            //console.log(before.start,before.end);
        }
        if(!lastItem){
            //console.log(before.print_to_string());
            console.log("===========",walker.stack.length);
        }
        if (!this.allChildVarTypes[lastItem.TYPE]) {
            this.allChildVarTypes[lastItem.TYPE] = 0;
        }
        if (!this.afterLastTypeMap[afterLastType]) {
            this.afterLastTypeMap[afterLastType] = 0;
        }
        this.allChildVarTypes[lastItem.TYPE]++;
        this.afterLastTypeMap[afterLastType]++;
        //console.log(walker.stack.length, rs, afterLastType);
    },
    /**
     * 生成 所有定义的属性
     * 假设规范模式都是以 AST_Assign 方式进行的复制
     * 使用的方式 是以 AST_Call
     */
    getNamedTree: function (name,protoStr,innerUse) {
        var keys = protoStr.split(".");
        var item = {};
        if(this.nodeNameTree[keys[0]]){
            item[keys[0]] = this.nodeNameTree[keys[0]];
        }else{
            this.nodeNameTree[keys[0]] = item[keys[0]] = {};
        }
        var _item = item[keys[0]];
        for(var i= 1,l=keys.length;i<l;i++){
            if(!_item[keys[i]]){
                _item[keys[i]]={};
            }
            _item = _item[keys[i]];
        }
        if(innerUse){
            _item['__innerUse'] = innerUse;
        }
    },
    recodeUseCount:function(name,protoStr){
        if(!this.nodeNameCountMap[name]){
            this.nodeNameCountMap[name] = {};
        }
        var keys = protoStr.split(".");
        var nameMap = this.nodeNameCountMap[name];
        var item = {};
        if(this.nodeNameTree[keys[0]]){
            item[keys[0]] = this.nodeNameCountMap[keys[0]];
        }else{
            this.nodeNameCountMap[keys[0]] = item[keys[0]] = {};
        }
        var _item = item[keys[0]];
        for(var i= 1,l=keys.length;i<l;i++){
            if(!_item[keys[i]]){
                _item[keys[i]]={};
            }
            _item = _item[keys[i]];
        }
        if(isNaN(_item.count)){
            _item.count= 0;
        }
        _item.count++;
    },
    _checkIsFunArg:function(parent,item){
        var args = parent.args;
        for(var i= 0,l=args.length;i<l;i++){
            if(args[i] == item){
                return true;
            }
        }
    },
    _getObjCount:function(node){
        var _count = 0;
        for(var key in node){
            var item = node[key];
            if((!item['count']&&!item['__innerUse'])&&Object.keys(item).length >0){
                var rsCount = this._getObjCount(item);
                _count+= rsCount;
            }else{
                _count++;
            }
        }
        return _count;
    },
    /**
     * 找到代码中没用到的function 
     * @param nameMap
     * @param useMap
     */
    removeUnUsed:function(nameMap,useMap){
       var keys =  Object.keys(nameMap);
       if(!nameMap['__innerUse']&&keys.length>0){
           //有子节点，递归结构
           for(var key in nameMap){
        	   var item = nameMap[key];
        	   var useItem = useMap[key];
        	   if(item['__innerUse']&&Object.keys(item).length==1){
        		   this._rediusCount(item['__innerUse']);
        		   delete item['__innerUse'];
        		   //console.log("节点未被使用，但引用了其他节点",key);
        	   }else if(Object.keys(item).length==0){
        		   if(useItem&&(!useItem.count||useItem.count<=0)){
        			   console.log("节点没被引用",key);
        			   delete useMap[key];
        		   }
        		   
        	   }else{
        		   if(key == "prototype"){
    				   useItem = useMap;
    			   }
        		   if(useItem){		  
        			   this.removeUnUsed(item,useItem);
        		   }else{
        			   console.log("--------------+++++++---------");
        			   console.log(key,useMap,item);
        		   }
        		   
        	   }
           }
       }else if(nameMap['__innerUse']&&keys.length==1){
           //无子节点,内部有使用其他节点
           console.log("节点未被使用，但引用了其他节点",nameMap);
       }else{
           //无子节点，内部没有调用其他节点
           if(useMap&&(useMap.count||useMap.count <=0)){
              console.log("节点没被引用",nameMap);
           }
       }
    },
    /**
     * 减少count 
     * @param countObj
     * @private
     */
    _rediusCount:function(countObj){
    	for(var key in countObj){
    		if(key == "count"){
    			countObj[key]--;
    		}else{
    			var item = countObj[key];
    			if(Object.keys(item).length>0){
    				this._rediusCount(item);
    			}
    		}
    	}
    }
};

module.exports = DropUnUsedProperty;

