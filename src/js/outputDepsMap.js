/**
 * 负责输出从入口文件开始的依赖分析关系
 * 输出每个文件的MD5 值
 */
function DepNode(){
    this._init.apply(this,arguments);
}
DepNode.prototype = {
    _init:function(moduleName,version){
        if(version){
            this.version = version;
        }
        if(moduleName){
            this.name = moduleName;
        }
    },
    setChildNodes:function(childNodes){
        if(childNodes){
            this._childNodes = childNodes;
        }
    },
    getChildNodes:function(){
        return this._childNodes;
    }
}
function DependsTree() {
    this._init.apply(this, arguments);
}

DependsTree.prototype = {
    _init: function () {
        this._depsMap = {};
    },
    /**
     * r.js 分析的时候会解析出每个文件的这三个内容
     * @param moduleName
     * @param deps
     * @param content
     */
    setDepData: function (moduleName, deps, content) {
        if (!moduleName || Object.prototype.toString.call(deps) != "[object Array]") {
            throw new Error("设置参数错误", moduleName, deps, content);
        }
        var version = content.length;
        this._depsMap[moduleName] = {
            deps: deps,
            version: version
        };
    },
    /**
     * 根据入口节点获得其依赖分析树
     * @param moduleName
     * @returns {Object}
     */
    getTree: function (moduleName) {
        var node = this._depsMap[moduleName];
        var rsNode = new DepNode(moduleName,node.version);
        if(node&&node.deps){
            var childNodes = [];
            var deps = node.deps;
            for(var i = 0,l=deps.length;i<l;i++){
                childNodes.push(this.getTree(deps[i]));
            }
            rsNode.setChildNodes(childNodes);
        }
        return rsNode;
    }
};

module.exports={
    DependsTree:DependsTree,
    DepNode:DepNode
}

