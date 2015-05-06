#混淆压缩 css
>目前的css 工具有混淆，但是缺乏一个添加前缀的功能
>工具的目标是基于css 的Token 解析生成 添加前缀的css
>基于clean css selector token 分析中的clean up 处理selector 的逻辑
> tagTrans 之后，需要再外层虚构一个html 和 body 标签

## 语法树模型描述
##selector 解析
    分词 区分单词和操作符
    单词 a-zA-Z - _ 等
    分隔符 ,[ ] ( )

    树形结构描述
    root = [
        {type:"htmlTag",text:""},
        {type:"className"text:""},
        {type:"pseudoClass",text:""},
        {type:"operate",text""},//操作符
    ]
