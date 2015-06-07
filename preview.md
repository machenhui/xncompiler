#功能预览白皮书

##跨域解决方案
    基于配置的 请求域名校验
    基于url Path 的请求参数校验
    基于配置的参数类型校验
    {
        "{path}":{
            "requestMethod":"get/post" //默认具有options 请求
            "allowedDomains":["xxx.com","xxx.cn","xxx.org"],
            "params":[
                {name:"{name}",value:"{value}","type":"{int|string}"},
                {name:"{name}",value:"{value}","type":"{int|string}"}
            ]
        }
    }
    提供平台配置界面，AP/CI 的 controller 注释扫描 工具

##css 相关
    提供css 命名空间wrap
    提供body,css 样式能力检测，提示用户修改
    提供 htmlTag 转意能力，将htmlTag ---> div.className
    提供css 命名混淆能力，输出source map
    1.
        a{color:red;}      ---->            {namespace} a{color:red;}
    2.
        body{background:#000;} ---> Error 不能给body 修改全局样式
    3.
        ul li{line-height:1.5em;}  ---> div.xn-ul div.xn-li{line-height:1.5em;}

    4.
        .cover{border:1px solid red;} ---> .{encodeName}{border:1px solid red;}


##template 相关
    1.编译成js 基于第三方提供的，必要的时候，自己再写
        <div {if $a}c{/if} class="bbb {$ccc}"> </div>  --->  function tplA(data){.........}
    2.htmlTag 翻译
        ul ---> div class="xn-ul"
    3.css 命名混淆 (source Map)
        ul class="cssA {$dyCSSB}" --> div class="{encode xn-ul} {encode cssA} {dyencode $dyCSSB}"

##javascript 相关
    1.写入，读取 window 下变量 的代码，查找并输出对应文件位置
            window[a],window.b ----> Warning  use global window.a  fileName xxx.js line 111 num 2222
    2.打包合并js 文件
    3.css 命名混淆
            a.classList.add("bbbbb") ---> a.classList.add({encode "bbbbb"})



##如何去开发的简版原则
    1.css tag翻译命名混淆
    2.模板中使用css
    3.js selector 中使用 混淆之后的名称
