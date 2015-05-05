/**
 * Created by machenhui on 2015/5/5.
 * 生成selector 语法树
 */

var NODE_TYPE = {
    CLASS_NAME:1,
    TAG_NAME:2,
    PRODUCE_NAME:3,
    SCOPE_NODE:4, //子选择器 :not(xxxxxxx)
    ATTRIBUTE_NODE:5,
    OPERATE_NODE:6,// > + [ ( 等
    SPLIT_NODE:7, // \s , 用户分隔操作
    ROOT_NODE:8,
    OTHER_NODE:9
}

//定义 css selector 节点
function Node(){
    this._init.apply(this,arguments);
}

Node.prototype = {
    _init:function(type,name){
        this.type = type;
        this.name = name;
        this.children = [];
    },
    //添加子节点数组
    appendChild:function(child){
        this.children.push(child);
    }
}

module.exports = {
    CSS_NODE:Node,
    CSS_NODE_TYPE:NODE_TYPE
}


