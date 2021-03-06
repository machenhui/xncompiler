function xnCSSParser(a) {
    for (var d, e = "", f = !1, g = [], h = 0, i = a.length; i > h; h++) {
        var j = a.charAt(h);
        switch (j) {
          case ".":
            d && "" != d && g.push({
                type: "className",
                text: d
            }), e && "" != e && g.push({
                type: "other",
                text: e
            }), e = "", d = "", f = !0;
            break;

          case " ":
          case ":":
          case "[":
          case ",":
          case ">":
          case "~":
          case "+":
            d && "" != d && g.push({
                type: "className",
                text: d
            }), d = null, e += j, f = !1;
            break;

          default:
            f ? d += j : e += j;
        }
    }
    return d && "" != d && g.push({
        type: "className",
        text: d
    }), e && "" != e && g.push({
        type: "other",
        text: e
    }), g;
}

function xnGetCSSName(a) {
    for (var b = xnCSSParser(a), c = [], d = 0, e = b.length; e > d; d++) {
        var f = b[d];
        if ("className" == f.type) {
            var g = xnCSSRenameMap[f.text];
            c.push(g ? g : f.text);
        } else c.push(f.text);
    }
    return c.join("");
}

var xnCSSRenameMap = {
    baiduServiceBottomBar: "wa-ticket-a",
    noDis: "wa-ticket-b",
    iphoneDevice: "wa-ticket-c",
    count: "wa-ticket-d",
    hackIFrame: "wa-ticket-e",
    qingIcon: "wa-ticket-f",
    qingBtn: "wa-ticket-g",
    "baidu-xn-pop-parent": "wa-ticket-h",
    "baidu-xn-pop-container": "wa-ticket-i",
    "pop-tip": "wa-ticket-j",
    "align-right": "wa-ticket-k",
    vote: "wa-ticket-l",
    icon: "wa-ticket-m",
    "count-outer": "wa-ticket-n",
    showMoreBtn: "wa-ticket-o",
    comment: "wa-ticket-p",
    "showCount-5": "wa-ticket-q",
    "showCount-6": "wa-ticket-r",
    "showCount-7": "wa-ticket-s",
    "showCount-8": "wa-ticket-t",
    "showCount-9": "wa-ticket-u",
    "showCount-10": "wa-ticket-v",
    "showCount-11": "wa-ticket-w",
    bd_vote: "wa-ticket-x",
    "text-char": "wa-ticket-y",
    showQingIconStyle: "wa-ticket-z",
    hideContent: "wa-ticket-ab",
    "icon-container": "wa-ticket-bb",
    showContent: "wa-ticket-cb",
    "baiduServiceBottomBar-toast-container": "wa-ticket-db",
    "toast-text": "wa-ticket-eb",
    show: "wa-ticket-fb"
};

!function() {
    function a(a) {
        function c() {}
        var d = b;
        c.prototype = d.prototype, a.j = d.prototype, a.prototype = new c();
    }
    function b() {
        throw Error("Do not instantiate directly");
    }
    function c() {
        b.call(this);
    }
    function d() {
        b.call(this);
    }
    function e() {
        b.call(this);
    }
    function f() {
        b.call(this);
    }
    function g() {
        b.call(this);
    }
    function h() {
        b.call(this);
    }
    function i(a) {
        return a && a.a && a.a === t ? a.content : (a + "").replace(v, j);
    }
    function j(a) {
        return u[a];
    }
    var k = function() {}, l = {}, m = {};
    !function() {
        var a = '\n.baiduServiceBottomBar.noDis{display:none!important}.baiduServiceBottomBar.iphoneDevice>ul>li .count{font-size:10px;line-height:10px;height:10px;padding:0 3px;top:3px;right:-8px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}.baiduServiceBottomBar.hackIFrame iframe{top:0;-webkit-transform:translateZ(5px);transform:translateZ(5px)}.baiduServiceBottomBar{line-height:1;border-top:1px solid #cdcdcd;position:fixed;z-index:200;width:100%;bottom:0;background-color:#f8f8f8}.baiduServiceBottomBar div,.baiduServiceBottomBar span,.baiduServiceBottomBar object,.baiduServiceBottomBar iframe,.baiduServiceBottomBar h1,.baiduServiceBottomBar h2,.baiduServiceBottomBar h3,.baiduServiceBottomBar h4,.baiduServiceBottomBar h5,.baiduServiceBottomBar h6,.baiduServiceBottomBar p,.baiduServiceBottomBar a,.baiduServiceBottomBar em,.baiduServiceBottomBar img,.baiduServiceBottomBar b,.baiduServiceBottomBar i,.baiduServiceBottomBar dl,.baiduServiceBottomBar dt,.baiduServiceBottomBar dd,.baiduServiceBottomBar ol,.baiduServiceBottomBar ul,.baiduServiceBottomBar li,.baiduServiceBottomBar fieldset,.baiduServiceBottomBar form,.baiduServiceBottomBar label,.baiduServiceBottomBar table,.baiduServiceBottomBar caption,.baiduServiceBottomBar tbody,.baiduServiceBottomBar tfoot,.baiduServiceBottomBar thead,.baiduServiceBottomBar tr,.baiduServiceBottomBar th,.baiduServiceBottomBar td{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline}.baiduServiceBottomBar p,.baiduServiceBottomBar div,.baiduServiceBottomBar h1,.baiduServiceBottomBar h2,.baiduServiceBottomBar h3,.baiduServiceBottomBar h4,.baiduServiceBottomBar h5,.baiduServiceBottomBar h6{-webkit-text-size-adjust:none}.baiduServiceBottomBar ul,.baiduServiceBottomBar li,.baiduServiceBottomBar a{vertical-align:middle}.baiduServiceBottomBar ol,.baiduServiceBottomBar ul{list-style:none;overflow:visible}.baiduServiceBottomBar .qingIcon{width:22px;height:22px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAqCAMAAADs1AnaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1YTA3ZWU4Yy0yNTUzLTQzOTktOTliMC0wYTYxYzc3NjY1ZGYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI1MDJCODkzOENGMTFFNDg2NjdDNzU2MzQwOTc2NzUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI1MDJCODgzOENGMTFFNDg2NjdDNzU2MzQwOTc2NzUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4YzRhMmIzNy03ODM4LTQyZTMtODI4Yy1lYjc1OTQyNjQwZWQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyOGIzNTdlNi03NTM5LTExNzctODViNy1hYTQ4NGY2ZjI2ZWIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Wt27tAAABmFBMVEXvX2pvs+r/+/vnECDlAhP0kpnwZ3EOcM383uBkRIPmCBj96+z+9fb6z9L4vMDpKznoHCvyfIX2p6397O360NPtUl7rPUrmBxjrPkv83+H2pqz4vsL2qK7lARLnDx/sQE3oHSzyfoftU17ye4TwaHIBeNn+9PXnESHoGyqJh7ZYY6Wq0vNRZan7+fsQcc36ztEHdNQZhd5+u+zc7PrW6fnvZW/4+/7pKDZsVY+1GTsOcs/0lZxhcrB3t+shasH96erv9/34ub5DZK1PouVgca/qM0EOcs7pKjjhAhTp4utmXZr//PwGe9sMftwDetrnFybKvtTpLDrrO0joGSgvkeHtUFzLv9QXhN36zdDpIzLgAxb6+PvlAxS+FzaGv+3H4fddqecCd9hGneTA3vYUg93tUV0Dd9hWS47QCyPoIjGYyPDvXmk9ZbH0k5qv1fN7OG5iVZRVpebrOkegzfH1+v4MctDl8fsIfNshid+MiLXy+P3VCB/n4euslrj8/f+ISHnqLTv0j5Y2leLoITDg7/sAeNrlABH///9RYd6zAAAAiHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AGLfWDwAAAZZJREFUeNrc1FV7wjAUBuDiDIr7cDbm7u7u7u7u7kb422spPU0F2PW+qyZ5nz5N0nOIuCD2/nqDcI7gD225SoSUan0aJFcpUCIKlTwVMpoQxGSURFoH4sWhFSHSokOC6CwkH1nNsPa9CI9mK4YMTpinPnm4OZ8dNRbNJZFerWQnk5u3qf306GA/GttsGaQQbJuKE46x/Aotnd/G6PQ9lhLctkM+/Gxe22JsSgjYS5jESM0WkLL3ARZFPBjpkI2xZO/iGSEGHXox8na0A685WaWXGYRfzvYMkIez5LIA/VwCGV2ri0uhm6p7MBt39DGKUfE8kK915kLESMaSymv2alOikdaneCbUXY39bqkQ78f9D+j4LyjQKY28wXEOITSrFSNPBKGVXheHkCsnj4/IMFOuig9ETEMhFGTjyBeChSCvpIYA2d0wGfiU84ozK4kSXYqJv7ZdUOYMkp9CmaOpBVHDSKCKSewrJVpPAmnw/Uo0MR7a1Uq3wwYOpWiHVJYLmxiUprFSeemJajK0aDoTXW67cO5XgAEAv5+0kJ0BN/wAAAAASUVORK5CYII=);margin:10px auto;background-size:100% 100%}.baiduServiceBottomBar .qingBtn{width:48px;height:48px;background-color:#f8f8f8;border:1px solid #ddd}.baiduServiceBottomBar .qingIcon,.baiduServiceBottomBar .qingBtn{display:block}.baiduServiceBottomBar *{vertical-align:middle;box-sizing:border-box}.baiduServiceBottomBar .baidu-xn-pop-parent{position:relative}.baiduServiceBottomBar .baidu-xn-pop-container{position:absolute;bottom:100%;width:120%;left:initial!important;margin-left:-10%;background-color:#f8f8f8;border:1px solid #cdcdcd;border-radius:2px;margin-bottom:8px;-webkit-transform:scale(1)}.baiduServiceBottomBar .baidu-xn-pop-container ul,.baiduServiceBottomBar .baidu-xn-pop-container li{list-style:none}.baiduServiceBottomBar .baidu-xn-pop-container ul{padding:0 10px;height:auto}.baiduServiceBottomBar .baidu-xn-pop-container ul>li:not(:last-of-type){border-bottom:1px solid #cdcdcd}.baiduServiceBottomBar .baidu-xn-pop-container .pop-tip{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg);width:6px;height:6px;position:absolute;border:1px solid #cdcdcd;background-color:#f8f8f8}.baiduServiceBottomBar .baidu-xn-pop-container .pop-tip.align-right{margin-left:100%;bottom:-4px;border-left:0;border-top:0}.baiduServiceBottomBar .baidu-xn-pop-container li.vote{height:44px}.baiduServiceBottomBar .noDis{display:none!important}.baiduServiceBottomBar a{text-decoration:none;color:#333}.baiduServiceBottomBar>ul{display:-webkit-box;display:-ms-flexbox;display:-moz-box;display:box;width:100%;list-style-type:none;padding:0;margin:0;-webkit-box-pack:center;-webkit-box-align:center;box-pack:center;box-align:center}.baiduServiceBottomBar>ul>li{width:3em;-webkit-box-flex:1;flex:1;-ms-flex:1;-moz-box-flex:1;text-align:center;font-size:10px;border-right:1px solid #cdcdcd}.baiduServiceBottomBar>ul>li a{font-size:16px;padding:6px 0 4px;display:inline-block;width:100%;line-height:34px;height:44px;overflow:hidden;text-align:center}.baiduServiceBottomBar>ul>li .icon{width:18px;height:18px;display:block;margin:0 auto 4px;background-size:100% 100%;vertical-align:middle;position:relative}.baiduServiceBottomBar>ul>li .count-outer{position:relative;width:auto;display:inline-block;line-height:inherit}.baiduServiceBottomBar>ul>li .count{background-color:#f5383d;color:#fff;border-radius:6px;padding:0 3px;position:absolute;font-size:10px;line-height:12px;height:12px;top:1px;right:-10px;font-style:normal}.baiduServiceBottomBar>ul li.showMoreBtn{display:none}.baiduServiceBottomBar>ul .comment .count{right:-9px}@media only screen and (max-width:400px){.baiduServiceBottomBar .showCount-5>li:nth-of-type(4),.baiduServiceBottomBar .showCount-5>li:nth-of-type(5),.baiduServiceBottomBar .showCount-5>li:nth-of-type(6),.baiduServiceBottomBar .showCount-5>li:nth-of-type(7),.baiduServiceBottomBar .showCount-5>li:nth-of-type(8),.baiduServiceBottomBar .showCount-5>li:nth-of-type(9),.baiduServiceBottomBar .showCount-5>li:nth-of-type(10),.baiduServiceBottomBar .showCount-5>li:nth-of-type(11),.baiduServiceBottomBar .showCount-6>li:nth-of-type(4),.baiduServiceBottomBar .showCount-6>li:nth-of-type(5),.baiduServiceBottomBar .showCount-6>li:nth-of-type(6),.baiduServiceBottomBar .showCount-6>li:nth-of-type(7),.baiduServiceBottomBar .showCount-6>li:nth-of-type(8),.baiduServiceBottomBar .showCount-6>li:nth-of-type(9),.baiduServiceBottomBar .showCount-6>li:nth-of-type(10),.baiduServiceBottomBar .showCount-6>li:nth-of-type(11),.baiduServiceBottomBar .showCount-7>li:nth-of-type(4),.baiduServiceBottomBar .showCount-7>li:nth-of-type(5),.baiduServiceBottomBar .showCount-7>li:nth-of-type(6),.baiduServiceBottomBar .showCount-7>li:nth-of-type(7),.baiduServiceBottomBar .showCount-7>li:nth-of-type(8),.baiduServiceBottomBar .showCount-7>li:nth-of-type(9),.baiduServiceBottomBar .showCount-7>li:nth-of-type(10),.baiduServiceBottomBar .showCount-7>li:nth-of-type(11),.baiduServiceBottomBar .showCount-8>li:nth-of-type(4),.baiduServiceBottomBar .showCount-8>li:nth-of-type(5),.baiduServiceBottomBar .showCount-8>li:nth-of-type(6),.baiduServiceBottomBar .showCount-8>li:nth-of-type(7),.baiduServiceBottomBar .showCount-8>li:nth-of-type(8),.baiduServiceBottomBar .showCount-8>li:nth-of-type(9),.baiduServiceBottomBar .showCount-8>li:nth-of-type(10),.baiduServiceBottomBar .showCount-8>li:nth-of-type(11),.baiduServiceBottomBar .showCount-9>li:nth-of-type(4),.baiduServiceBottomBar .showCount-9>li:nth-of-type(5),.baiduServiceBottomBar .showCount-9>li:nth-of-type(6),.baiduServiceBottomBar .showCount-9>li:nth-of-type(7),.baiduServiceBottomBar .showCount-9>li:nth-of-type(8),.baiduServiceBottomBar .showCount-9>li:nth-of-type(9),.baiduServiceBottomBar .showCount-9>li:nth-of-type(10),.baiduServiceBottomBar .showCount-9>li:nth-of-type(11),.baiduServiceBottomBar .showCount-10>li:nth-of-type(4),.baiduServiceBottomBar .showCount-10>li:nth-of-type(5),.baiduServiceBottomBar .showCount-10>li:nth-of-type(6),.baiduServiceBottomBar .showCount-10>li:nth-of-type(7),.baiduServiceBottomBar .showCount-10>li:nth-of-type(8),.baiduServiceBottomBar .showCount-10>li:nth-of-type(9),.baiduServiceBottomBar .showCount-10>li:nth-of-type(10),.baiduServiceBottomBar .showCount-10>li:nth-of-type(11),.baiduServiceBottomBar .showCount-11>li:nth-of-type(4),.baiduServiceBottomBar .showCount-11>li:nth-of-type(5),.baiduServiceBottomBar .showCount-11>li:nth-of-type(6),.baiduServiceBottomBar .showCount-11>li:nth-of-type(7),.baiduServiceBottomBar .showCount-11>li:nth-of-type(8),.baiduServiceBottomBar .showCount-11>li:nth-of-type(9),.baiduServiceBottomBar .showCount-11>li:nth-of-type(10),.baiduServiceBottomBar .showCount-11>li:nth-of-type(11){display:none}.baiduServiceBottomBar .showCount-5>li.showMoreBtn,.baiduServiceBottomBar .showCount-6>li.showMoreBtn,.baiduServiceBottomBar .showCount-7>li.showMoreBtn,.baiduServiceBottomBar .showCount-8>li.showMoreBtn,.baiduServiceBottomBar .showCount-9>li.showMoreBtn,.baiduServiceBottomBar .showCount-10>li.showMoreBtn,.baiduServiceBottomBar .showCount-11>li.showMoreBtn{display:block}}@media only screen and (min-width:400px) and (max-width:480px){.baiduServiceBottomBar .showCount-6>li:nth-of-type(5),.baiduServiceBottomBar .showCount-6>li:nth-of-type(6),.baiduServiceBottomBar .showCount-6>li:nth-of-type(7),.baiduServiceBottomBar .showCount-6>li:nth-of-type(8),.baiduServiceBottomBar .showCount-6>li:nth-of-type(9),.baiduServiceBottomBar .showCount-6>li:nth-of-type(10),.baiduServiceBottomBar .showCount-6>li:nth-of-type(11),.baiduServiceBottomBar .showCount-6>li:nth-of-type(12),.baiduServiceBottomBar .showCount-7>li:nth-of-type(5),.baiduServiceBottomBar .showCount-7>li:nth-of-type(6),.baiduServiceBottomBar .showCount-7>li:nth-of-type(7),.baiduServiceBottomBar .showCount-7>li:nth-of-type(8),.baiduServiceBottomBar .showCount-7>li:nth-of-type(9),.baiduServiceBottomBar .showCount-7>li:nth-of-type(10),.baiduServiceBottomBar .showCount-7>li:nth-of-type(11),.baiduServiceBottomBar .showCount-7>li:nth-of-type(12),.baiduServiceBottomBar .showCount-8>li:nth-of-type(5),.baiduServiceBottomBar .showCount-8>li:nth-of-type(6),.baiduServiceBottomBar .showCount-8>li:nth-of-type(7),.baiduServiceBottomBar .showCount-8>li:nth-of-type(8),.baiduServiceBottomBar .showCount-8>li:nth-of-type(9),.baiduServiceBottomBar .showCount-8>li:nth-of-type(10),.baiduServiceBottomBar .showCount-8>li:nth-of-type(11),.baiduServiceBottomBar .showCount-8>li:nth-of-type(12),.baiduServiceBottomBar .showCount-9>li:nth-of-type(5),.baiduServiceBottomBar .showCount-9>li:nth-of-type(6),.baiduServiceBottomBar .showCount-9>li:nth-of-type(7),.baiduServiceBottomBar .showCount-9>li:nth-of-type(8),.baiduServiceBottomBar .showCount-9>li:nth-of-type(9),.baiduServiceBottomBar .showCount-9>li:nth-of-type(10),.baiduServiceBottomBar .showCount-9>li:nth-of-type(11),.baiduServiceBottomBar .showCount-9>li:nth-of-type(12),.baiduServiceBottomBar .showCount-10>li:nth-of-type(5),.baiduServiceBottomBar .showCount-10>li:nth-of-type(6),.baiduServiceBottomBar .showCount-10>li:nth-of-type(7),.baiduServiceBottomBar .showCount-10>li:nth-of-type(8),.baiduServiceBottomBar .showCount-10>li:nth-of-type(9),.baiduServiceBottomBar .showCount-10>li:nth-of-type(10),.baiduServiceBottomBar .showCount-10>li:nth-of-type(11),.baiduServiceBottomBar .showCount-10>li:nth-of-type(12),.baiduServiceBottomBar .showCount-11>li:nth-of-type(5),.baiduServiceBottomBar .showCount-11>li:nth-of-type(6),.baiduServiceBottomBar .showCount-11>li:nth-of-type(7),.baiduServiceBottomBar .showCount-11>li:nth-of-type(8),.baiduServiceBottomBar .showCount-11>li:nth-of-type(9),.baiduServiceBottomBar .showCount-11>li:nth-of-type(10),.baiduServiceBottomBar .showCount-11>li:nth-of-type(11),.baiduServiceBottomBar .showCount-11>li:nth-of-type(12){display:none}.baiduServiceBottomBar .showCount-6>li.showMoreBtn,.baiduServiceBottomBar .showCount-7>li.showMoreBtn,.baiduServiceBottomBar .showCount-8>li.showMoreBtn,.baiduServiceBottomBar .showCount-9>li.showMoreBtn,.baiduServiceBottomBar .showCount-10>li.showMoreBtn,.baiduServiceBottomBar .showCount-11>li.showMoreBtn{display:block}}.baiduServiceBottomBar [data-action=ecomBottomBar-vote]{position:relative}.baiduServiceBottomBar [data-action=ecomBottomBar-vote] .bd_vote{position:absolute;z-index:1;height:100%;width:100%;top:0}.baiduServiceBottomBar [data-action=ecomBottomBar-vote] .text-char{display:inline-block;-webkit-transform:translateZ(0px);transform:translateZ(0px)}.baiduServiceBottomBar [data-action=ecomBottomBar-vote] .bd_vote iframe{position:relative}.baiduServiceBottomBar>ul>li:last-of-type .baidu-xn-pop-container{right:8px}.baiduServiceBottomBar>ul>li:first-of-type .baidu-xn-pop-container{left:8px!important;margin-left:0}.baiduServiceBottomBar .baidu-xn-pop-parent{position:relative}.baiduServiceBottomBar .baidu-xn-pop-parent:after{position:absolute;top:0;left:50%;width:1em;height:3px;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #b1b1b1;border-left:0;border-right:0;margin:6px 0 6px -.5em;content:""}.baiduServiceBottomBar .qingBtn{display:none}.baiduServiceBottomBar.showQingIconStyle.hideContent{border-top:transparent;width:auto}.baiduServiceBottomBar.showQingIconStyle.hideContent .qingBtn{display:block}.baiduServiceBottomBar.showQingIconStyle.hideContent .icon-container{display:none}.baiduServiceBottomBar.showQingIconStyle{display:-webkit-box;display:-ms-flexbox;display:-moz-box;-webkit-box-pack:center;-webkit-box-align:center;box-pack:center;box-align:center}.baiduServiceBottomBar.showQingIconStyle .qingBtn{display:block}.baiduServiceBottomBar.showQingIconStyle>ul>li:first-of-type .baidu-xn-pop-container{left:initial!important;margin-left:-10%}.baiduServiceBottomBar.showQingIconStyle [data-action=ecomBottomBar-showMore]{max-width:50px}.baiduServiceBottomBar.showQingIconStyle [data-action=ecomBottomBar-showMore] .baidu-xn-pop-container{width:180%}.baiduServiceBottomBar.showQingIconStyle [data-action=ecomBottomBar-showMore] .baidu-xn-pop-container .pop-tip.align-right{margin-left:120%}.baiduServiceBottomBar.showQingIconStyle.showContent{width:100%}.baiduServiceBottomBar.showQingIconStyle.showContent .qingBtn{border:1px solid transparent;border-right:1px solid #cdcdcd}.baiduServiceBottomBar.showQingIconStyle.showContent .qingIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjRENkJCMzY0NkJGMTFFNEI4NTc5NjE5QjFBMjJERTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjRENkJCMzc0NkJGMTFFNEI4NTc5NjE5QjFBMjJERTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NEQ2QkIzNDQ2QkYxMUU0Qjg1Nzk2MTlCMUEyMkRFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NEQ2QkIzNTQ2QkYxMUU0Qjg1Nzk2MTlCMUEyMkRFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgNHqQMAAAA8UExURdLS0tzc3Onp6fj4+ExMTHt7e2xsbNXV1fz8/Hl5ef39/dTU1E1NTfn5+ejo6Nra2tPT0z8/PzMzM////3wYFWQAAAAUdFJOU/////////////////////////8AT0/nEQAAAT5JREFUeNrMl9sSgjAMRLcFRFFu6f//q1ekjLRJ3XHGvtI9QLpJEwRy4W8A3nUlss75DaBqRC6tXd9eRJp+BfQHua15suqn+b7/UL0BJ5ESwlMvcloAXqSEsOhF/AvgpISw6sW9AMe6gBDp6+MSg/NsJkT6+bwe42QlxBsRG8lI+NS/nWgi7OjXXDAQ9vRRMqmEXX2cjQphX79J5ywh9RDBRkg+gm1bGg3TizKfBsuv5oIDQ7CywUVQCfnjRdAIij2gWG7SDArNtJrBoaWNlmIIRkIqRRFshGSRQDAR0kUGlvKVK3O/A7C/wAaRPUbWSKyV2WRi05ktKGxJY4sqW9bZi4W92tjLlb3e2QaDbXHYJott89hGk2116WabbvfpgYMeeULFDl2Psa8uHfuqjROHsWzwHIe/m52/XlcBBgCFdCWM9zfnWwAAAABJRU5ErkJggg==)}.baiduServiceBottomBar.showQingIconStyle.showContent .icon-container{display:-webkit-box;display:-ms-flexbox;display:-moz-box;dislay:box;-webkit-box-flex:1;flex:1;-ms-flex:1;-moz-box-flex:1}.baiduServiceBottomBar-toast-container{position:fixed;z-index:99999999;width:100%;bottom:50px;text-align:center}.baiduServiceBottomBar-toast-container .toast-text{min-width:40%;max-width:80%;overflow:hidden;word-break:break-all;word-wrap:nowrap;text-overflow:ellipsis;background-color:rgba(0,0,0,.75);opacity:0;-webkit-transition:opacity 2s linear 0s;border-radius:5px;color:#fff;padding:10px;margin:0 auto;font-size:16px}.baiduServiceBottomBar-toast-container.show .toast-text{opacity:1}.baiduServiceBottomBar-toast-container.noDis{display:none!important}body,html{padding:0;margin:0}\n', b = document.createElement("style");
        b.type = "text/css", b.innerHTML = a, clouda && clouda.lego && clouda.lego.smartBar && (b.id = clouda.lego.smartBar._smartBarCSSELID, 
        clouda.lego.smartBar._cacheCSSText = a), b.id && document.getElementById(b.id) || document.body.appendChild(b);
    }();
    var l = {
        debug: {}
    };
    if (l.debug.sub_data = {}, l.debug.item = {}, l.debug.info = {}, !n) var n = function() {
        var a = "";
        "undefined" != typeof navigator && navigator && "string" == typeof navigator.userAgent && (a = navigator.userAgent);
        var b = 0 == a.indexOf("Opera");
        return {
            i: {
                e: "ScriptEngine" in this
            },
            g: b,
            f: !b && -1 != a.indexOf("MSIE"),
            h: !b && -1 != a.indexOf("WebKit")
        };
    }();
    if (!o) var o = {};
    if (!p) var p = {};
    if (!q) var q = {};
    if (!r) var r = {};
    if (!s) var s = {};
    var t = {};
    b.prototype.toString = function() {
        return this.content;
    }, a(c), c.prototype.a = t, a(d), d.prototype.a = {}, a(e), e.prototype.a = {}, 
    a(f), f.prototype.a = {}, a(g), g.prototype.a = {}, a(h), h.prototype.a = {};
    var u = {
        "\x00": "&#0;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "<": "&lt;",
        ">": "&gt;",
        "	": "&#9;",
        "\n": "&#10;",
        "": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        "-": "&#45;",
        "/": "&#47;",
        "=": "&#61;",
        "`": "&#96;",
        "": "&#133;",
        " ": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    }, v = /[\x00\x22\x26\x27\x3c\x3e]/g;
    void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.bar = function(a) {
        return '<div class="baiduServiceBottomBar noDis"><ul class="' + (a.data.showCount ? "showCount-" + i(a.data.showCount) : "") + ' icon-container">' + (a.data.bridge ? '<li class="chat"><a>咨询</a></li>' : "") + (a.data.follow ? '<li id="toolbar-local" data-action="ecomBottomBar-follow" class="follow"><a><span class="follow-char">订阅</span></a></li>' : "") + (a.data.comment ? '<li class="comment"><a href="javascript:void(0);" data-action="ecomBottomBar-comment"><p class="count-outer"><i class="count noDis">0</i>评价</p></a></li>' : "") + (a.data.share ? '<li id="toolbar-share" class="share" data-action="qingBottomBarShare" onclick=""><a>分享</a></li>' : "") + (a.data.vote ? '<li data-action="ecomBottomBar-vote" class="vote"><a><p class="bd_vote"></p><p class="count-outer"><i class="count noDis">0</i><span class="vote-char">赞</span></p></a></li>' : "") + (a.data.backToSearch ? '<li class="backToPc"><a ' + (1 == a.data.searchURL ? 'data-action="ecomBottomBar-backToSearch"' : 'href="' + i(a.data.searchURL) + '"') + ' onclick="">返回搜索</a></li>' : "") + '<li class="showMoreBtn" data-action="ecomBottomBar-showMore"><a onclick="">更多</a></li></ul></div>';
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.bar2 = function(a) {
        return '<div class="baiduServiceBottomBar  noDis"><a class="qingBtn" data-action="ecomBottomBar-iconBtn" onclick="javascript:void(0);"><i class="qingIcon"></i></a><ul class="showCount-' + i(a.data.length) + ' icon-container">' + l.bottomBar.b(a) + '<li class="showMoreBtn" data-action="ecomBottomBar-showMore"><a onclick="javascript:void(0);">更多</a></li></ul></div>';
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.c = function(a) {
        return '<a data-action="' + i(a.data.actionName) + '" onclick="javascript:void(0);"><p class="count-outer"><span class="text-char">' + i(a.data.name) + '</span><span class="count noDis"></span></p></a>';
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.d = function(a) {
        return '<a href="' + i(a.data.action) + '">' + i(a.data.name) + "</a>";
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.pop = function(a) {
        return '<div class="baidu-xn-pop-container noDis"><div class="pop-tip ' + (a.data.align ? i(a.data.align) : "") + '"></div><div class="pop-content">' + i(a.data.contentHTML) + "</div></div>";
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.pop2 = function(a) {
        return '<div class="baidu-xn-pop-container noDis"><div class="pop-tip align-right"></div><div class="pop-content"><ul>' + l.bottomBar.b(a) + "</ul></div></div>";
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.k = function(a) {
        return '<div class="baiduServiceBottomBar-toast-container"><p class="toast-text">' + i(a.data.text) + "</p></div>";
    }, void 0 === l && (l = {}), void 0 === l.bottomBar && (l.bottomBar = {}), l.bottomBar.b = function(a) {
        var b = "";
        a = a.data;
        for (var c = a.length, d = 0; c > d; d++) var e = a[d], b = b + ("<li " + (e.subModules ? 'class="baidu-xn-pop-parent" data-action="baiduServiceBarShowMoreBtn"' : "") + ">" + ("LINK" == e.type ? l.bottomBar.d({
            data: e
        }) : "ACTION" == e.type ? l.bottomBar.c({
            data: e
        }) : null != e.subModules && 0 < e.subModules.length ? '<a href="javascript:void(0);">' + i(e.name) + "</a>" + l.bottomBar.pop2({
            data: e.subModules
        }) : "") + "</li>");
        return b;
    }, void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Env || (m.core.Env = {}), m.core.Env = function() {
        var a = document, b = a.documentElement, c = navigator.userAgent, d = !!c.match(/mobile/i), e = !d, f = c.match(/(iPhone\sOS)\s([\d_]+)/), g = c.match(/android/i), h = c.match(/UCBrowser/gi), i = c.match(/MQQBrowser/gi), j = c.match(/baiduboxapp/gi), k = c.match(/android\s2/i), l = c.match(/android\s2/i) || c.match(/Chrome\/3[0-9]/i), m = "ontouchstart" in window, n = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(), o = m ? "touchstart" : "mousedown", p = m ? "touchmove" : "mousemove", q = m ? "touchend" : "mouseup", r = m ? "touchcancel" : "mouseup", s = b.webkitMatchesSelector || b.mozMatchesSelector || b.oMatchesSelector || b.msMatchesSelector || b.matchesSelector;
        if (null == document.body.classList) try {
            HTMLElement.prototype.__defineGetter__("classList", function() {
                var a = this, b = a.className.split(" ");
                return {
                    add: function(b) {
                        null != b && null != a.className && -1 == a.className.search(b) && (a.className += " " + b);
                    },
                    remove: function(b) {
                        null != b && null != a.className && (a.className = a.className.replace(" " + b, ""));
                    },
                    contains: function(a) {
                        if (null == a) return !1;
                        for (var c = 0, d = b.length; d > c; c++) {
                            var e = b[c];
                            if (e.replace(/\s/gi, "") == a) return !0;
                        }
                        return !1;
                    }
                };
            });
        } catch (t) {
            console.error(t);
        }
        return {
            isMobile: d,
            isPC: e,
            isIphone: f,
            isAndroid: g,
            isAndroid2x: k,
            isAndroidChrome: l,
            isUC: h,
            isQQBrowser: i,
            isBDBox: j,
            supportTouch: m,
            support3D: n,
            TOUCH_START: o,
            TOUCH_MOVE: p,
            TOUCH_END: q,
            TOUCH_CANCEL: r,
            matchesSelector: s
        };
    }(m[""]), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Dom || (m.core.Dom = {}), m.core.Dom = function(a) {
        var b = document.body, c = a.matchesSelector, d = Array.prototype.slice, e = {
            match: function(a, b) {
                return a && 1 === a.nodeType ? c.call(a, b) : !1;
            },
            closest: function(a, c, d) {
                var e = this, f = null;
                if (e.match(a, c)) return a;
                for (;a = a.parentNode; ) {
                    if (e.match(a, c)) return a;
                    if (a === d || a === b) return f;
                }
                return f;
            },
            hasClass: function(a, b) {
                return a.classList.contains(b);
            },
            addClass: function(a, b) {
                return null != a && a.classList.add(b), a;
            },
            removeClass: function(a, b) {
                return null != a && a.classList.remove(b), a;
            },
            attr: function(a, b, c) {
                if (c = "object" == typeof c ? JSON.stringify(c) : c, 3 === arguments.length) a.setAttribute(b, c); else if (2 === arguments.length) {
                    var c = a.getAttribute(b);
                    return c ? ((0 === c.indexOf('{"') || 0 === c.indexOf('["')) && (c = JSON.parse(c)), 
                    c) : void 0;
                }
            },
            data: function(a, b, c) {
                var d = this;
                if (3 === arguments.length) d.attr(a, "data-" + b, c); else if (2 === arguments.length) return d.attr(a, "data-" + b);
            },
            index: function(a) {
                return d.call(a.parentNode.children).indexOf(a);
            }
        };
        return e;
    }(m.core.Env), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Event || (m.core.Event = {}), m.core.Event = function() {
        function a(a) {
            return b + a;
        }
        var b = "__", c = {
            on: function() {
                var b = this, c = arguments;
                if ("string" == typeof c[0] && "function" == typeof c[1]) {
                    var d = a(c[0]);
                    b[d] = b[d] || [], b[d].push(c[1]);
                } else if ("object" == typeof c[0]) {
                    var e = c[0];
                    for (var f in e) b.on(f, e[f]);
                }
            },
            off: function(b, c) {
                var d = this, b = a(b);
                if (c) {
                    var e = d[b];
                    e.splice(e.indexOf(c), 1), d[b].length || delete d[b];
                } else delete d[b];
            },
            fire: function(b, c, d) {
                var e = this, f = e[a(b)];
                if (!f) return "NO_EVENT";
                for (var g, h = 0; g = f[h]; h++) g.apply(d || e, [].concat(c));
            },
            hasEvent: function(b) {
                return !!this[a(b)];
            }
        };
        return c;
    }(m[""]), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Style || (m.core.Style = {}), m.core.Style = function(a) {
        function b(a) {
            var b = c.createElement("style");
            b.setAttribute("type", "text/css"), b.appendChild(c.createTextNode(a)), c.getElementsByTagName("head")[0].appendChild(b);
        }
        var c = window.document, d = a.support3D, e = d ? function(a, b) {
            return a = a || 0, b = b || 0, "translate3d(" + a + "px, " + b + "px, 0)";
        } : function() {
            return i = i || 0, v = v || 0, "translate(" + i + "px, " + v + "px)";
        };
        return {
            add: b,
            translate: e
        };
    }(m.core.Env), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Core || (m.core.Core = {}), m.core.Core = function(a, b, c, d) {
        function e(a) {
            p.test(n.readyState) ? a() : n.addEventListener("DOMContentLoaded", function() {
                a();
            }, !1);
        }
        function f(a) {
            "complete" == document.readyState ? a() : s.push(a);
        }
        function g() {
            return +new Date();
        }
        function h(a, b) {
            if (Object.keys) Object.keys(b).forEach(function(c) {
                Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c));
            }); else for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a;
        }
        function i(a) {
            return function() {
                for (var b = arguments, c = a(b[0], b[1]), d = 2, e = b.length; e > d; d++) c = a(c, b[d]);
                return c;
            };
        }
        function j() {}
        function k(a) {
            return "function" == typeof a && a.prototype && a === a.prototype.constructor;
        }
        function l(a, b) {
            if (arguments.length < 2 && void 0 === b) return a;
            var c = a, d = o.call(arguments, 2);
            return function() {
                var a = o.call(arguments, 0);
                c.apply(b, d.concat(a));
            };
        }
        var m = window, n = m.document, o = Array.prototype.slice, p = (a.isPC, /complete|loaded|interactive/), q = function() {
            var a = 0;
            return function() {
                return a++;
            };
        }(), h = i(h), r = h({}, a, b, c, {
            Dom: b,
            Style: d,
            ready: e,
            loaded: f,
            now: g,
            id: q,
            mixin: h,
            noop: j,
            isClass: k,
            bind: l,
            redo: i
        }), s = [];
        return m.addEventListener("load", function() {
            setTimeout(function() {
                for (var a = 0, b = s.length; b > a; a++) {
                    var c = s[a];
                    c && c();
                }
            }, 2);
        }, !1), r;
    }(m.core.Env, m.core.Dom, m.core.Event, m.core.Style), void 0 === m && (m = {}), 
    m.core || (m.core = {}), void 0 === m.core && (m.core = {}), m.core.Class || (m.core.Class = {}), 
    m.core.Class = function(a) {
        var b = a.noop, c = a.isClass, d = a.mixin;
        Object.create || (Object.create = function(a) {
            function b() {}
            if (arguments.length > 1) throw Error("Object.create implementation only accepts the first parameter.");
            return b.prototype = a, new b();
        });
        var e = {
            create: function() {
                function a() {
                    this.init.apply(this, arguments);
                }
                var e, f, g, h = arguments[0], i = arguments[1], j = arguments[2];
                c(h) ? (e = h, f = i || {}, g = j || {}) : (e = Object, f = h || {}, g = i || {}), 
                f.init = f.hasOwnProperty("init") ? f.init : b, a.Parent = e, a.Super = e.prototype;
                var k = a.prototype = Object.create(e.prototype);
                k.constructor = a, k.Super = a.Super;
                var l = f.mixin || 0;
                if (l) for (var m = 0, n = l.length; n > m; m++) d(k, l[m]);
                if (delete f.mixin, g) {
                    var o = g.mixin || 0;
                    if (o) for (var m = 0, n = o.length; n > m; m++) d(a, o[m]);
                    delete g.mixin, d(a, g);
                }
                return d(k, f), a;
            }
        };
        return e;
    }(m.core.Core), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.CustomEvent || (m.core.CustomEvent = {}), m.core.CustomEvent = function(a) {
        function b(a) {
            return e + a;
        }
        var c = "ModuleStopPropagation", d = a.create({
            _stopQueueExec: !1,
            _eventQueue: [],
            eventType: "customeEvent",
            init: function(a) {
                null != a && "" != a && (this.eventType = a), this._eventQueue = [], this._stopQueueExec = !1, 
                this.__preventDefault = !1;
            },
            addFun: function(a) {
                "function" == typeof a ? this._eventQueue.push(a) : console.error(a + " is not a function");
            },
            removeFun: function(a) {
                if ("function" == typeof a) for (var b = this._eventQueue.length - 1; b >= 0; b--) {
                    var c = this._eventQueue[b];
                    if (console.log("===" + a), c == a) {
                        var d = this._eventQueue.splice(b, 1);
                        return d;
                    }
                } else console.error(a + " is not a function");
            },
            setDefaultEventFn: function(a) {
                this._defaultFn = a;
            },
            stopPropagation: function() {
                this._stopQueueExec = !0, null != this.browserEvent && null != this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
            },
            preventDefault: function() {
                this.__preventDefault = !0, null != this.browserEvent && null != this.browserEvent.preventDefault && this.browserEvent.preventDefault();
            },
            stopAll: function() {
                this.stopPropagation(), this.preventDefault();
            },
            excuteEventQueue: function(a, b) {
                var d = null;
                null != a && null != a[0] && null != a[1] && (this.currentTarget = a[1].target, 
                this.tapTarget = a[1].target, this.browserEvent = a[0]), null != a && a instanceof Array || (a = []), 
                a.unshift(this);
                for (var e = this._eventQueue.length - 1; e >= 0; e--) {
                    var f = this._eventQueue[e];
                    if (0 == this._stopQueueExec) {
                        if (f instanceof Function && f.apply(b || window, a), 1 == this._stopQueueExec) {
                            d = {
                                type: c,
                                fun: f
                            };
                            break;
                        }
                    } else if (1 == this._stopQueueExec) break;
                }
                return this._defaultFn instanceof Function && 0 == this.__preventDefault && this._defaultFn.apply(b || window, a), 
                d;
            }
        }), e = "__", f = {
            on: function(a, c, e) {
                var f = this;
                if ("string" == typeof a && "function" == typeof c) {
                    var a = b(a);
                    f[a] = f[a] || new d(), f[a].addFun(c, e);
                } else if ("object" == typeof a) for (var g in a) f.on(g, a[g]); else console.log(typeof a);
            },
            setDefaultEventFn: function(a, c) {
                var e = this, a = b(a);
                e[a] = e[a] || new d(), e[a].setDefaultEventFn(c);
            },
            off: function(a, c) {
                var d = this, a = b(a);
                if (c) {
                    var e = d[a], f = e.removeFun(c);
                    0 == f && delete d[a];
                } else delete d[a];
            },
            fire: function(a, c, d) {
                var e = this, f = e[b(a)];
                return null == f ? "NO_EVENT" : (null == c ? c = [] : "[object Array]" != Object.prototype.toString.call(c) && (c = [ c ]), 
                f.excuteEventQueue(c, d));
            },
            hasEvent: function(a) {
                return !!this[b(a)];
            }
        };
        return f;
    }(m.core.Class), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.JSAction || (m.core.JSAction = {}), m.core.JSAction = function() {
        var a = {
            _resolve: function(a) {
                if ("" != a && null != a) {
                    var b = a.search(/\(/i), c = a.substring(0, b), d = a.search(/\)([^\)]*)$/i), e = a.substring(b + 1, d);
                    return {
                        name: c,
                        argStr: e
                    };
                }
            },
            execute: function(a, b) {
                var c = this._resolve(a);
                if (null != c) {
                    for (var d = c.name.split("."), e = null, f = 0, g = d.length, h = window; g > f; f++) h = h[d[f]];
                    if (e = h, !(null != e && e instanceof Function)) return void console.error(c.name, "该方法不存在");
                    var i = c.argStr, j = Function("e", "fn", "fn.call(this,e" + (i ? "," + i : "") + ");");
                    j.call(this, b, e);
                }
            }
        };
        return a;
    }(m[""]), void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.TongJi || (m.module.TongJi = {}), m.module.TongJi = function() {
        var a = {
            _defaultIndex: 1,
            prefix: null,
            sendTag: function(a, b, c) {
                var d = this;
                setTimeout(function() {
                    d.prefix && (a = a.replace(d.prefix, "")), "undefined" != typeof clouda && clouda.lego.monitor && clouda.lego.monitor.send && clouda.lego.monitor.send("click", {
                        name: a,
                        value: c ? c : 1
                    });
                }, 1);
            },
            sendEvent: function(a, b, c) {
                var d = arguments;
                setTimeout(function() {
                    "undefined" != typeof clouda && clouda.lego.monitor && clouda.lego.monitor.send && (1 == d.length ? clouda.lego.monitor.send("diyEv", d[0]) : clouda.lego.monitor.send("diyEv", {
                        name: a + "_" + b,
                        value: c
                    }));
                }, 1);
            },
            sendCustomerVar: function() {
                setTimeout(function() {}, 1);
            }
        };
        return a;
    }(m[""]), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Tap || (m.core.Tap = {}), m.core.Tap = function(a, b, c, d, e, f) {
        var g = window, h = g.document;
        Array.prototype.slice;
        var i = b.noop, j = b.now, k = b.bind, l = b.mixin, m = b.supportTouch, n = b.TOUCH_START, o = b.TOUCH_MOVE, p = b.TOUCH_END, q = "click";
        b.TOUCH_CANCEL;
        var r = {
            context: "body",
            toggle: !1,
            cls: "hover",
            rangeLimit: 8,
            timeLimit: 400,
            fn: i
        }, s = c.create({
            init: function(b) {
                var c = this;
                if (!b.selector) throw Error('"selector" is not defined.');
                b = c.options = l({}, r, b), c.context = "string" == typeof b.context ? h.querySelector(xnGetCSSName(b.context)) : b.context, 
                c.selector = b.selector, c.toggle = b.toggle, c.cls = b.cls, c.rangeLimit = b.rangeLimit, 
                c.timeLimit = b.timeLimit, c.fn = b.fn, c.timeBeforeStylize = 30, c._timer = null, 
                c._startX = 0, c._startY = 0, c._diffX = 0, c._diffY = 0, c._startTime = 0, c._lastFireTime = 0, 
                c._isFinish = !1, c.currentHover = null, c.toggle && (c._currentToggleTarget = null, 
                c._currentToggleStylized = !1), c._startFn = function(b) {
                    a.closest(b.target, c.selector) && c._touchStart(b);
                }, c._moveFn = k(c._touchMove, c), c._endFn = k(c._touchEnd, c), c._clickFn = k(c._click, c), 
                c.context.addEventListener(n, c._startFn, !1), c.context.addEventListener(q, c._clickFn, !1);
            },
            check: function(b) {
                return !a.hasClass(b, "disabled");
            },
            isTooFast: function() {
                var a = this, b = j();
                return b - a._lastFireTime < 310 ? !0 : (a._lastFireTime = b, !1);
            },
            _touchStart: function(b) {
                var c = this, d = c.cls, e = m ? b.touches[0] : b, f = a.closest(b.target, c.selector);
                c.check(f) && (c._isFinish = !1, c._startX = e.pageX, c._startY = e.pageY, c._startTime = j(), 
                c.toggle ? (c._currentToggleTarget = f, c._currentToggleStylized = a.hasClass(f, d)) : (c.currentHover = s.currentHoverTarget, 
                c.currentHover && a.removeClass(c.currentHover, d), s.currentHoverTarget = f), c._timer = setTimeout(function() {
                    a.addClass(f, d);
                }, c.timeBeforeStylize), f.addEventListener(o, c._moveFn, !1), f.addEventListener(p, c._endFn, !1), 
                c.isTouchMove = !1);
            },
            _touchMove: function(a) {
                var b = this, c = (b.cls, m ? a.touches[0] : a), d = b.rangeLimit;
                b._diffX = Math.abs(c.pageX - b._startX), b._diffY = Math.abs(c.pageY - b._startY), 
                (b._diffX > d || b._diffY > d) && b.finish(!0), b.isTouchMove = !0;
            },
            _touchEnd: function(a) {
                var b = this, c = (b.context, b.cls, b.fn, b.toggle), d = m ? a.changedTouches[0] : a, e = (c ? b._currentToggleTarget : s.currentHoverTarget, 
                b.rangeLimit), f = b.timeLimit;
                if (b._diffX = Math.abs(d.pageX - b._startX), b._diffY = Math.abs(d.pageY - b._startY), 
                b._diffX < e && b._diffY < e && j() - b._startTime < f) {
                    var g = function() {
                        b.isTooFast();
                    };
                    g(), b.finish();
                } else b.finish(!0);
            },
            _click: function(b) {
                if ("click" == b.type || !this.isTouchMove) {
                    var c = this, d = c.context, e = c.fn, f = a.closest(b.target, c.selector);
                    null != f ? e.call(f, b, {
                        context: d,
                        target: f
                    }) : s.fire("tap-el-click", [ b, {
                        context: d,
                        target: b.target
                    } ]);
                }
            },
            finish: function(b) {
                b = !!b;
                var c = this, d = c.cls, e = c.toggle === !1 ? s.currentHoverTarget : c._currentToggleTarget;
                if (!c._isFinish) {
                    if (c._isFinish = !0, e.removeEventListener(o, c._moveFn, !1), e.removeEventListener(p, c._endFn, !1), 
                    c.toggle) {
                        var f = "";
                        c._currentToggleStylized && !b || !c._currentToggleStylized && b ? (f = "removeClass", 
                        c._currentToggleStylized = !1) : (f = "addClass", c._currentToggleStylized = !0), 
                        e[f](d);
                    } else a.removeClass(e, d);
                    clearTimeout(c._timer), c.isTouchMove = !1;
                }
            },
            destroy: function() {
                var a = this;
                a.context.removeEventListener(n, a._startFn, !1);
            }
        }, {
            mixin: [ d ],
            NAME: "Tap",
            currentHoverTarget: null
        });
        return b.on("init", function() {
            new s({
                context: "body",
                selector: "[data-js],[data-action],[data-href],[data-tj]",
                cls: "down",
                fn: function(b, c) {
                    var d = c.target, g = a.data(d, "action"), h = a.data(d, "href"), i = a.data(d, "js"), j = a.data(d, "tj");
                    g && s.hasEvent(g) && (b.currentTarget = d, s.fire(g, [ b, c ], d), !j && g.replace && f.sendTag(g.replace(/_\d*$/gi, ""))), 
                    i && (b.tapTarget = d, e.execute(i, b), !j && i.replace && f.sendTag(i.replace(/\(.*\)/gi, ""), "js")), 
                    j && f.sendTag(j, "tongJi"), h && (location.href = h);
                }
            });
        }), s;
    }(m.core.Dom, m.core.Core, m.core.Class, m.core.CustomEvent, m.core.JSAction, m.module.TongJi), 
    void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.init || (m.core.init = {}), m.core.init = function(a) {
        function b() {
            e = g.querySelector("body");
            var b = [ e.className ];
            a.isIphone && b.push("hIphone"), a.isAndroid && b.push("hAndroid"), a.isAndroid2x && b.push("hAndroid2x"), 
            a.isPC && b.push("hPC"), e.className = b.join(" ");
        }
        function c() {
            f.addEventListener("scroll", function() {
                a.fire("scroll");
            }, !1), f.addEventListener("resize", function() {
                a.fire("resize");
            }, !1), f.addEventListener("orientationchange", function() {
                a.fire("orientationchange");
            }, !1), document.body.addEventListener("DOMSubtreeModified", function() {}, !1);
        }
        function d(b) {
            a.fire("init", [ b || {} ]);
        }
        var e, f = window, g = f.document;
        return a.on("init", function() {
            b(), c();
        }), d;
    }(m.core.Core, m.core.Event, m.core.Tap), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), 
    void 0 === m.bottomBar && (m.bottomBar = {}), m.bottomBar.js || (m.bottomBar.js = {}), 
    void 0 === m.bottomBar.js && (m.bottomBar.js = {}), m.bottomBar.js.EnvInit || (m.bottomBar.js.EnvInit = {}), 
    m.bottomBar.js.EnvInit = function(a) {
        var b = {
            isBDBoxVIPMode: "undefined" == typeof BLightApp ? !1 : !0,
            isTest: !1,
            init: function(a) {
                this.bdBoxVersionInfo = this._getBDBoxVersion();
                var b = this._readAppId();
                return !b && clouda.lightapp && clouda.lightapp.appid && (b = clouda.lightapp.appid), 
                this._options = a, b && !isNaN(parseInt(b)) || clouda.lego.mAppId ? (a.success({
                    appid: b,
                    mAppId: clouda.lego.mAppId
                }), void this._bind()) : void a.failure(Error("appid 读取错误"));
            },
            _bind: function() {
                var a = this;
                document.body.addEventListener("runtimeready", function() {
                    a.isBDBoxVIPMode = "undefined" == typeof BLightApp ? !1 : !0;
                });
            },
            _readAppId: function() {
                for (var a = document.querySelectorAll("script[src*='/seed.js']"), b = a.length; b--; ) {
                    var c = a[b], d = c.getAttribute("data-appid"), e = c.getAttribute("data-test");
                    if (d && !isNaN(d) && parseInt(d) > 0) return e && (this.isTest = e), clouda.lego.smartBar._isAddSeedJS || (clouda.lego.smartBar._isAddSeedJS = !0), 
                    d;
                }
            },
            _getBDBoxVersion: function() {
                if (a.isBDBox && a.isAndroid) {
                    var b = navigator.userAgent.match(/baiduboxapp\/\d+\.\d+/gi);
                    if (b && b.length > 0) {
                        var c = b[0].match(/\d+/gi);
                        if (c && c.length >= 2) return {
                            mainVersion: parseInt(c[0], 10),
                            subVersion: parseInt(c[1], 10)
                        };
                    }
                }
            }
        };
        return b;
    }(m.core.Env), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.Extend || (m.core.Extend = {}), m.core.Extend = function() {
        function a(b, c) {
            for (var d in b) null !== b[d] && (c[d] = "object" != typeof b[d] || b[d].nodeType || b[d] instanceof Array ? b[d] : a({}, b[d]));
            return c;
        }
        return function() {
            for (var b = arguments.length, c = arguments[0], d = c, e = 1; b > e; e++) null == d && (d = {}), 
            null != arguments[e] && (d = a(arguments[e], d));
            return d;
        };
    }(m[""]), void 0 === m && (m = {}), m.core || (m.core = {}), void 0 === m.core && (m.core = {}), 
    m.core.LoadResource || (m.core.LoadResource = {}), m.core.LoadResource = function() {
        function a(a, b, c, d) {
            var e = document.createElement("script");
            e.type = "text/javascript", e.charset = "utf-8", e.src = a, d && (d.async && (e.async = "async"), 
            d.defer && (e.defer = "defer")), e.addEventListener("load", function() {
                b && b();
            }), e.addEventListener("error", function(a) {
                c && c(a);
            }), document.body.appendChild(e);
        }
        function b(a, b, c) {
            var d = document.createElement("link");
            d.addEventListener("load", function() {
                b && b();
            }), d.addEventListener("error", function(a) {
                c && c(a);
            }), d.href = a, d.rel = "stylesheet", d.type = "text/css", d.charset = "utf-8", 
            document.body.appendChild(d);
        }
        function c(a, b, c) {
            var d = h[a];
            d.status.callBack || (d.status.callBack = {
                successFn: [],
                failureFn: []
            }), b && d.callBack.successFn.push(b), c && d.callBack.failureFn.push(b);
        }
        function d(a, b) {
            if (b) for (var c = h[a].callBack.successFn, d = 0, e = c.length; e > d; d++) c[d](); else for (var c = h[a].callBack.failureFn, d = 0, e = c.length; e > d; d++) c[d](Error("资源加载错误"));
        }
        function e(e, f, i, j, k) {
            h[e] = {
                status: g.NONE,
                callBack: {
                    successFn: [],
                    failureFn: []
                }
            }, c(e, i, j);
            try {
                var l;
                l = "js" == f ? a : b, l(e, function() {
                    h[e].status = g.LOADED, d(e, 1);
                }, function() {
                    h[e].status = g.ERROR, d(e, 0);
                }, k), h[e].status = g.LOADING;
            } catch (m) {
                h[e].status = g.ERROR, d(e, 0);
            }
        }
        function f(a, b, d, f, i) {
            if (a) {
                var j = h[a];
                if (j) switch (j.status) {
                  case g.ERROR:
                    f && f(Error("资源加载失败," + a));
                    break;

                  case g.NONE:
                    e(a, b, d, f);
                    break;

                  case g.LOADING:
                    c(a, d, f);
                    break;

                  case g.LOADED:
                    d && d();
                    break;

                  default:
                    f && f(Error("资源状态未知," + a));
                } else e(a, b, d, f, i);
            } else f && f(Error("url 不能为空"));
        }
        var g = {
            ERROR: -1,
            NONE: 0,
            LOADING: 1,
            LOADED: 2
        }, h = {}, i = {
            getJS: function(a, b, c, d) {
                f(a, "js", b, c, d);
            },
            getCSS: function(a, b, c) {
                f(a, "css", b, c);
            }
        };
        return i;
    }(m[""]), void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.net || (m.module.net = {}), void 0 === m.module.net && (m.module.net = {}), 
    m.module.net.JSONP || (m.module.net.JSONP = {}), m.module.net.JSONP = function(a, b, c) {
        var d = 0, e = "xnJSONP", f = a.create({
            init: function(a) {
                return this._options = b({
                    url: null,
                    data: {},
                    success: function() {},
                    failure: function() {}
                }, a), null == this._options.url || "" == this._options.url ? void console.error("url 不能为空", a) : void this._createScript();
            },
            _createScript: function() {
                var a = this, b = this._getCallBackFn(), d = [ "callback=" + b ];
                if (this._options && this._options.data) for (var e in this._options.data) d.push(e + "=" + this._options.data[e]);
                var f = this._options.url + "?" + d.join("&");
                c.getJS(f, function() {}, function(c) {
                    a._failure(c, b);
                }, {
                    defer: !0
                });
            },
            _getCallBackFn: function() {
                var a = this, b = e + d++ + parseInt(1e5 * Math.random());
                return this._options.data && this._options.data.callBackFnName && (b = this._options.data.callBackFnName), 
                window[b] = function(c) {
                    a._success(c, b);
                }, b;
            },
            _deleteScript: function(a) {
                if (a) {
                    var b = document.querySelector(xnGetCSSName("script[src~=" + a + "]"));
                    b && b.parentNode && b.parentNode.removeChild(b);
                }
            },
            _success: function(a, b) {
                this._options && this._options.success && this._options.success(a), delete window[b], 
                this._deleteScript(b);
            },
            _failure: function(a, b) {
                this._options && this._options.failure && this._options.failure(a), delete window[b], 
                this._deleteScript(b);
            }
        });
        return f;
    }(m.core.Class, m.core.Extend, m.core.LoadResource), void 0 === m && (m = {}), m.module || (m.module = {}), 
    void 0 === m.module && (m.module = {}), m.module.BDShare || (m.module.BDShare = {}), 
    m.module.BDShare = function(a) {
        var b = {};
        return b.initConfig2 = function(b) {
            var c;
            a.on("qingBottomBarShare", function() {
                clearTimeout(c), c = setTimeout(function() {
                    var a = document.title;
                    a || (a = "百度开发者中心 http://qing.baidu.com/");
                    var c = a;
                    b && b.content && b.content.length > 3 && (c = b.content), clouda.mbaas.socialshare && clouda.mbaas.socialshare.callShare({
                        appid: b.appid,
                        mediaType: "all",
                        content: c,
                        title: a,
                        onsuccess: function() {
                            console.log("分享成功");
                        },
                        onfail: function() {
                            console.log("分享失败");
                        }
                    });
                }, 10);
            });
        }, b;
    }(m.core.Tap), void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.BDStoreLink || (m.module.BDStoreLink = {}), m.module.BDStoreLink = function(a, b, c, d, e) {
        function f(a) {
            var b = new Date(), c = parseInt(b.getTime()) + l, d = {
                endTime: c,
                id: k + a
            };
            localStorage.setItem(k + a, JSON.stringify(d));
        }
        function g(a) {
            a && localStorage.removeItem(k + a);
        }
        function h(a) {
            var b = localStorage.getItem(k + a);
            try {
                var c = JSON.parse(b);
                if (!c) return -1;
                var d = new Date().getTime();
                return !c.endTime || isNaN(c.endTime) ? -1 : c.id != k + a ? (localStorage.removeItem(k + a), 
                -1) : d < c.endTime ? 1 : (localStorage.removeItem(k + a), -1);
            } catch (e) {
                return localStorage.removeItem(k + a), -1;
            }
        }
        function i(a, b) {
            function c() {
                j(a, function(a) {
                    console.log("更新订阅缓存成功:" + a);
                }, function(a) {
                    console.error("更新订阅缓存失败:" + d, a);
                });
            }
            var d = h(a);
            return null != d && b ? (b(d), d) : (null != d && 1 == d && (m ? c() : n.push(c)), 
            d);
        }
        function j(a, b, c) {
            var d = !1, h = setTimeout(function() {
                c && !d && c(Error("调用执行超时")), d = !0;
            }, 3e3);
            try {
                clouda.mbaas.push.isBind({
                    onsuccess: function(e) {
                        null != e && 0 == e.error ? (f(a), b && !d && (e.is_bind ? (f(a), b(1)) : (g(a), 
                        b(0)))) : c && !d && c(Error("调用失败")), d = !0, clearTimeout(h);
                    },
                    onfail: function() {
                        c && !d && c(Error("调用失败")), d = !0, clearTimeout(h);
                    }
                });
            } catch (i) {
                console.error(i), e.sendEvent("followSite", "add", "error", 1);
            }
        }
        var k = "baiduQingSmartBarIsStoreKey", l = 5184e5, m = !1, n = [];
        c.on("ecomBottomBar-cloudaInitCallBack", function() {
            m = !0;
            for (var a = 0, b = n.length; b > a; a++) {
                var c = n[a];
                c && c();
            }
        });
        var o = {
            init: function(a, b) {
                var c = this;
                this.appId = a, this._options = b, c._options && c._options.loadCallBackFn && c._options.loadCallBackFn();
            },
            storeLink: function(a, b) {
                var c = this;
                if (!this._isAddDesktopIcon) {
                    this._isAddDesktopIcon = !0;
                    var d = !1, g = setTimeout(function() {
                        c._isAddDesktopIcon = !1, !d && b && (b && b(Error("请求超时")), d = !0);
                    }, 3e3);
                    clouda.mbaas.app.followSite(this.appId, {
                        onsuccess: function(b) {
                            c._isAddDesktopIcon = !1, a && a(b), 1 == b && f(c.appId), d = !0, clearTimeout(g);
                        },
                        onfail: function(a) {
                            c._isAddDesktopIcon = !1, b && b(a), e.sendEvent("followSite", "add", "error", 1), 
                            d = !0, clearTimeout(g);
                        }
                    });
                }
            },
            checkFollow: function(a, b) {
                if (this.appId) j(this.appId, a, b); else {
                    var c = Error("appId 为空，请先执行init(appid,options)");
                    b ? b(c) : console.error(c);
                }
            },
            checkFollowFromCache: function(a, b) {
                if (this.appId) i(this.appId, a, b); else {
                    var c = Error("appId 为空，请先执行init(appid,options)");
                    b ? b(c) : console.error(c);
                }
            },
            checkFollowFromCache2: function(a, b, c) {
                if (a) return i(a, b, c);
                var d = Error("appId 为空，请先执行init(appid,options)");
                c ? c(d) : console.error(d);
            }
        };
        return o;
    }(m.core.LoadResource, m.core.Extend, m.core.Tap, m.core.Env, m.module.TongJi), 
    void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.Toast || (m.bottomBar.js.Toast = {}), m.bottomBar.js.Toast = function() {
        function a() {
            if (l && l.bottomBar && l.bottomBar.toast && !b) {
                var a = l.bottomBar.toast({
                    data: {
                        text: "调用成功!"
                    }
                }), d = document.createElement("div");
                d.innerHTML = a, b = d.children[0], c = b.querySelector(xnGetCSSName("." + f)), 
                document.body.appendChild(b);
            }
        }
        var b, c, d, e, f = "toast-text", g = {
            show: function(e) {
                a();
                var f = this;
                b && c && e && e.length > 2 && (c.innerHTML = e, b.classList.remove("noDis"), b.classList.contains("show") || setTimeout(function() {
                    b.classList.add("show");
                }, 100), clearTimeout(d), d = setTimeout(function() {
                    f.hide();
                }, 2e3));
            },
            hide: function() {
                b && c && (b.classList.contains("noDis") || (clearTimeout(e), e = setTimeout(function() {
                    b.classList.add("noDis");
                }, 2e3), b.classList.remove("show")));
            }
        };
        return g;
    }(m[""]), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleStoreLink || (m.bottomBar.js.ModuleStoreLink = {}), m.bottomBar.js.ModuleStoreLink = function(a, b, c, d, e, f, g, h, i, j) {
        var k = a.create({
            init: function(a, b) {
                var c = this;
                this._options = d({
                    container: document.body,
                    action: "ecomBottomBar-follow",
                    selector: "[data-action='ecomBottomBar-follow']"
                }, b), this._reRendView(), this.bind(), i.loaded(function() {
                    c._checkFollow(a);
                }), this.appId = a;
            },
            bind: function() {
                var a = this;
                e.on(this._options.action, function() {
                    a._followSite();
                }), this._options.container.addEventListener("reRendView", function() {
                    a._reRendView();
                });
            },
            _reRendView: function() {
                this.followEl = this._options.container.querySelectorAll("[data-action='ecomBottomBar-follow']"), 
                !this.followEl;
            },
            _checkFollow: function(a) {
                var d = this, f = this.followEl;
                if (!f) {
                    if (this._reRendView(), !this.followEl) return;
                    f = this.followEl;
                }
                var i = this._options.container.querySelectorAll("[data-action='ecomBottomBar-follow'] .wa-ticket-y");
                c.init(a, {
                    loadCallBackFn: function() {
                        c.checkFollow(function(a) {
                            if (0 == a) {
                                console.log("未添加到桌面");
                                for (var c = f.length; c--; ) f[c] && f[c].classList.remove("noDis"), i[c] && (i[c].innerHTML = "订阅");
                                b.isBDBox || g.isBDBoxVIPMode || (d._followState = "openapp");
                            } else {
                                console.log("已经添加到桌面");
                                for (var j = !1, c = f.length; c--; ) if (i[c] && (i[c].innerHTML = "已订阅"), f[c] && !f[c].classList.contains("noDis")) {
                                    f[c].classList.add("noDis");
                                    var k = f[c].parentNode;
                                    k.parentNode.removeChild(k), j = !0;
                                }
                                h.sendEvent("followSite", "add", "success", 1), j && e.fire("ecomBottomBar-resizeShowMoreBtn");
                            }
                        }, function(a) {
                            console.log("index checkFollow Error 不能添加到桌面" + a), b.isBDBox || g.isBDBoxVIPMode ? h.sendEvent("followSite", "add", "fail", 1) : d._followState = "openapp";
                        });
                    }
                });
            },
            _followSite: function() {
                var a = this.followEl;
                if (!a) {
                    if (this._reRendView(), !this.followEl) return;
                    a = this.followEl;
                }
                var b = this._options.container.querySelectorAll("[data-action='ecomBottomBar-follow'] .wa-ticket-y");
                return "openapp" == this._followState ? void (void 0 !== clouda.lib.moplus ? clouda.lib.moplus.openApp(!0, this.appId) : j.show("网络错误，不能使用该功能")) : void c.storeLink(function(c) {
                    switch (c) {
                      case 1:
                        for (var d = a.length; d--; ) b[d] && (b[d].innerHTML = "已订阅"), a[d] && a[d].removeAttribute("data-action");
                        break;

                      case 0:
                        for (var d = a.length; d--; ) b[d] && (b[d].innerHTML = "订阅");
                        break;

                      case 2:
                        for (var d = a.length; d--; ) b[d] && (b[d].innerHTML = "订阅...");
                    }
                }, function(a) {
                    if (console.log("不能添加到桌面", a), h.sendEvent("followSite", "add", "fail", 1), g.bdBoxVersionInfo) {
                        var b = g.bdBoxVersionInfo;
                        if (b.mainVersion <= 5 && b.subVersion < 3 || b.mainVersion >= 6) return;
                    }
                    j.show("订阅失败");
                });
            }
        }, {
            checkCondition: function(a, d) {
                if (!b.isAndroid) return !1;
                d || (d = {});
                var e = c.checkFollowFromCache2(a);
                return 1 == e ? !1 : void 0;
            }
        });
        return k;
    }(m.core.Class, m.core.Env, m.module.BDStoreLink, m.core.Extend, m.core.Tap, m.core.Event, m.bottomBar.js.EnvInit, m.module.TongJi, m.core.Core, m.bottomBar.js.Toast), 
    void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.URLSafe || (m.bottomBar.js.URLSafe = {}), m.bottomBar.js.URLSafe = function() {
        function a(a) {
            return a.replace(/<script.*>.*<\/script>/gi, "");
        }
        function b(a) {
            return a.replace(/bd_.*=.*&{0,1}/gi, "");
        }
        return {
            getSafeURL: function(c) {
                if (c) {
                    var d = a(c);
                    if (d) return d = b(d);
                }
            }
        };
    }(m[""]), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleLinkHref || (m.bottomBar.js.ModuleLinkHref = {}), m.bottomBar.js.ModuleLinkHref = function(a, b, c) {
        var d = {
            getLinkURL: function(a, d) {
                this.appid = a, this._options = b({
                    url: null
                }, d), this._options.themeColor && (this._options.themeColor = this._options.themeColor.match(/([0-9]|[a-z]|[A-F]){3,}/g)[0]), 
                this._options.titleColor && (this._options.titleColor = this._options.titleColor.match(/([0-9]|[a-z]|[A-F]){3,}/g)[0]);
                var e = this._options.url;
                if (!e) return void console.error("url 为空", e);
                var f = e;
                return -1 != e.search(/\/\/.*\.baidu\.com\//gi) ? (-1 != e.search(/\?/gi) ? -1 == e.search(/(\?|&)$/gi) && (e += "&") : e += "?", 
                f = e + "app_id=" + this.appid, this._options.themeColor && (f += "&themeColor=" + this._options.themeColor), 
                this._options.titleColor && (f += "&titleColor=" + this._options.titleColor)) : f = c.getSafeURL(f), 
                f;
            }
        };
        return d;
    }(m.core.Class, m.core.Extend, m.bottomBar.js.URLSafe), void 0 === m && (m = {}), 
    m.module || (m.module = {}), void 0 === m.module && (m.module = {}), m.module.BDComment || (m.module.BDComment = {}), 
    m.module.BDComment = function(a) {
        var b = {
            init: function(b, c) {
                this.qingAppId = b, this._options = a({
                    href: location.href,
                    third_source_id: this.qingAppId
                }, c), this._options.themeColor && (this._options.themeColor = this._options.themeColor.match(/([0-9]|[a-z]|[A-F]){3,}/g)[0]), 
                this._options.titleColor && (this._options.titleColor = this._options.titleColor.match(/([0-9]|[a-z]|[A-F]){3,}/g)[0]);
            },
            getLink: function() {
                var a = "http://openapi.baidu.com/widget/social/comment/list?app_id=" + this.qingAppId + "&third_source_id=" + this._options.third_source_id + "&url=" + encodeURIComponent(this._options.href ? this._options.href : location.href) + "&return_url=" + encodeURIComponent(location.href);
                return this._options.themeColor && (a += "&themeColor=" + this._options.themeColor), 
                this._options.titleColor && (a += "&titleColor=" + this._options.titleColor), a;
            }
        };
        return b;
    }(m.core.Extend), void 0 === m && (m = {}), m.coreTT || (m.coreTT = {}), void 0 === m.coreTT && (m.coreTT = {}), 
    m.coreTT.js || (m.coreTT.js = {}), void 0 === m.coreTT.js && (m.coreTT.js = {}), 
    m.coreTT.js.lib || (m.coreTT.js.lib = {}), void 0 === m.coreTT.js.lib && (m.coreTT.js.lib = {}), 
    m.coreTT.js.lib.crypto || (m.coreTT.js.lib.crypto = {}), m.coreTT.js.lib.crypto = function() {
        var a = a || function(a, b) {
            var c = {}, d = c.lib = {}, e = function() {}, f = d.Base = {
                extend: function(a) {
                    e.prototype = this;
                    var b = new e();
                    return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
                        b.$super.init.apply(this, arguments);
                    }), b.init.prototype = b, b.$super = this, b;
                },
                create: function() {
                    var a = this.extend();
                    return a.init.apply(a, arguments), a;
                },
                init: function() {},
                mixIn: function(a) {
                    for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            }, g = d.WordArray = f.extend({
                init: function(a, c) {
                    a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
                },
                toString: function(a) {
                    return (a || i).stringify(this);
                },
                concat: function(a) {
                    var b = this.words, c = a.words, d = this.sigBytes;
                    if (a = a.sigBytes, this.clamp(), d % 4) for (var e = 0; a > e; e++) b[d + e >>> 2] |= (255 & c[e >>> 2] >>> 24 - 8 * (e % 4)) << 24 - 8 * ((d + e) % 4); else if (65535 < c.length) for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2]; else b.push.apply(b, c);
                    return this.sigBytes += a, this;
                },
                clamp: function() {
                    var b = this.words, c = this.sigBytes;
                    b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
                },
                clone: function() {
                    var a = f.clone.call(this);
                    return a.words = this.words.slice(0), a;
                },
                random: function(b) {
                    for (var c = [], d = 0; b > d; d += 4) c.push(0 | 4294967296 * a.random());
                    return new g.init(c, b);
                }
            }), h = c.enc = {}, i = h.Hex = {
                stringify: function(a) {
                    var b = a.words;
                    a = a.sigBytes;
                    for (var c = [], d = 0; a > d; d++) {
                        var e = 255 & b[d >>> 2] >>> 24 - 8 * (d % 4);
                        c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
                    }
                    return c.join("");
                },
                parse: function(a) {
                    for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                    return new g.init(c, b / 2);
                }
            }, j = h.Latin1 = {
                stringify: function(a) {
                    var b = a.words;
                    a = a.sigBytes;
                    for (var c = [], d = 0; a > d; d++) c.push(String.fromCharCode(255 & b[d >>> 2] >>> 24 - 8 * (d % 4)));
                    return c.join("");
                },
                parse: function(a) {
                    for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
                    return new g.init(c, b);
                }
            }, k = h.Utf8 = {
                stringify: function(a) {
                    try {
                        return decodeURIComponent(escape(j.stringify(a)));
                    } catch (b) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function(a) {
                    return j.parse(unescape(encodeURIComponent(a)));
                }
            }, l = d.BufferedBlockAlgorithm = f.extend({
                reset: function() {
                    this._data = new g.init(), this._nDataBytes = 0;
                },
                _append: function(a) {
                    "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
                },
                _process: function(b) {
                    var c = this._data, d = c.words, e = c.sigBytes, f = this.blockSize, h = e / (4 * f), h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
                    if (b = h * f, e = a.min(4 * b, e), b) {
                        for (var i = 0; b > i; i += f) this._doProcessBlock(d, i);
                        i = d.splice(0, b), c.sigBytes -= e;
                    }
                    return new g.init(i, e);
                },
                clone: function() {
                    var a = f.clone.call(this);
                    return a._data = this._data.clone(), a;
                },
                _minBufferSize: 0
            });
            d.Hasher = l.extend({
                cfg: f.extend(),
                init: function(a) {
                    this.cfg = this.cfg.extend(a), this.reset();
                },
                reset: function() {
                    l.reset.call(this), this._doReset();
                },
                update: function(a) {
                    return this._append(a), this._process(), this;
                },
                finalize: function(a) {
                    return a && this._append(a), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function(a) {
                    return function(b, c) {
                        return new a.init(c).finalize(b);
                    };
                },
                _createHmacHelper: function(a) {
                    return function(b, c) {
                        return new m.HMAC.init(a, c).finalize(b);
                    };
                }
            });
            var m = c.algo = {};
            return c;
        }(Math);
        return function(b) {
            function c(a, b, c, d, e, f, g) {
                return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b;
            }
            function d(a, b, c, d, e, f, g) {
                return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b;
            }
            function e(a, b, c, d, e, f, g) {
                return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b;
            }
            function f(a, b, c, d, e, f, g) {
                return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b;
            }
            for (var g = a, h = g.lib, i = h.WordArray, j = h.Hasher, h = g.algo, k = [], l = 0; 64 > l; l++) k[l] = 0 | 4294967296 * b.abs(b.sin(l + 1));
            h = h.MD5 = j.extend({
                _doReset: function() {
                    this._hash = new i.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
                },
                _doProcessBlock: function(a, b) {
                    for (var g = 0; 16 > g; g++) {
                        var h = b + g, i = a[h];
                        a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
                    }
                    var g = this._hash.words, h = a[b + 0], i = a[b + 1], j = a[b + 2], l = a[b + 3], m = a[b + 4], n = a[b + 5], o = a[b + 6], p = a[b + 7], q = a[b + 8], r = a[b + 9], s = a[b + 10], t = a[b + 11], u = a[b + 12], v = a[b + 13], w = a[b + 14], x = a[b + 15], y = g[0], z = g[1], A = g[2], B = g[3], y = c(y, z, A, B, h, 7, k[0]), B = c(B, y, z, A, i, 12, k[1]), A = c(A, B, y, z, j, 17, k[2]), z = c(z, A, B, y, l, 22, k[3]), y = c(y, z, A, B, m, 7, k[4]), B = c(B, y, z, A, n, 12, k[5]), A = c(A, B, y, z, o, 17, k[6]), z = c(z, A, B, y, p, 22, k[7]), y = c(y, z, A, B, q, 7, k[8]), B = c(B, y, z, A, r, 12, k[9]), A = c(A, B, y, z, s, 17, k[10]), z = c(z, A, B, y, t, 22, k[11]), y = c(y, z, A, B, u, 7, k[12]), B = c(B, y, z, A, v, 12, k[13]), A = c(A, B, y, z, w, 17, k[14]), z = c(z, A, B, y, x, 22, k[15]), y = d(y, z, A, B, i, 5, k[16]), B = d(B, y, z, A, o, 9, k[17]), A = d(A, B, y, z, t, 14, k[18]), z = d(z, A, B, y, h, 20, k[19]), y = d(y, z, A, B, n, 5, k[20]), B = d(B, y, z, A, s, 9, k[21]), A = d(A, B, y, z, x, 14, k[22]), z = d(z, A, B, y, m, 20, k[23]), y = d(y, z, A, B, r, 5, k[24]), B = d(B, y, z, A, w, 9, k[25]), A = d(A, B, y, z, l, 14, k[26]), z = d(z, A, B, y, q, 20, k[27]), y = d(y, z, A, B, v, 5, k[28]), B = d(B, y, z, A, j, 9, k[29]), A = d(A, B, y, z, p, 14, k[30]), z = d(z, A, B, y, u, 20, k[31]), y = e(y, z, A, B, n, 4, k[32]), B = e(B, y, z, A, q, 11, k[33]), A = e(A, B, y, z, t, 16, k[34]), z = e(z, A, B, y, w, 23, k[35]), y = e(y, z, A, B, i, 4, k[36]), B = e(B, y, z, A, m, 11, k[37]), A = e(A, B, y, z, p, 16, k[38]), z = e(z, A, B, y, s, 23, k[39]), y = e(y, z, A, B, v, 4, k[40]), B = e(B, y, z, A, h, 11, k[41]), A = e(A, B, y, z, l, 16, k[42]), z = e(z, A, B, y, o, 23, k[43]), y = e(y, z, A, B, r, 4, k[44]), B = e(B, y, z, A, u, 11, k[45]), A = e(A, B, y, z, x, 16, k[46]), z = e(z, A, B, y, j, 23, k[47]), y = f(y, z, A, B, h, 6, k[48]), B = f(B, y, z, A, p, 10, k[49]), A = f(A, B, y, z, w, 15, k[50]), z = f(z, A, B, y, n, 21, k[51]), y = f(y, z, A, B, u, 6, k[52]), B = f(B, y, z, A, l, 10, k[53]), A = f(A, B, y, z, s, 15, k[54]), z = f(z, A, B, y, i, 21, k[55]), y = f(y, z, A, B, q, 6, k[56]), B = f(B, y, z, A, x, 10, k[57]), A = f(A, B, y, z, o, 15, k[58]), z = f(z, A, B, y, v, 21, k[59]), y = f(y, z, A, B, m, 6, k[60]), B = f(B, y, z, A, t, 10, k[61]), A = f(A, B, y, z, j, 15, k[62]), z = f(z, A, B, y, r, 21, k[63]);
                    g[0] = 0 | g[0] + y, g[1] = 0 | g[1] + z, g[2] = 0 | g[2] + A, g[3] = 0 | g[3] + B;
                },
                _doFinalize: function() {
                    var a = this._data, c = a.words, d = 8 * this._nDataBytes, e = 8 * a.sigBytes;
                    c[e >>> 5] |= 128 << 24 - e % 32;
                    var f = b.floor(d / 4294967296);
                    for (c[(e + 64 >>> 9 << 4) + 15] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8), 
                    c[(e + 64 >>> 9 << 4) + 14] = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), 
                    a.sigBytes = 4 * (c.length + 1), this._process(), a = this._hash, c = a.words, d = 0; 4 > d; d++) e = c[d], 
                    c[d] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
                    return a;
                },
                clone: function() {
                    var a = j.clone.call(this);
                    return a._hash = this._hash.clone(), a;
                }
            }), g.MD5 = j._createHelper(h), g.HmacMD5 = j._createHmacHelper(h);
        }(Math), a;
    }(m[""]), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleBDComment || (m.bottomBar.js.ModuleBDComment = {}), m.bottomBar.js.ModuleBDComment = function(a, b, c, d, e) {
        var f = {}, g = {
            init: function(a) {
                var b;
                try {
                    b = clouda.lego.smartBar._theme;
                } catch (d) {
                    console.error("读取色彩配置信息失败");
                }
                this._options = c({
                    container: document.body,
                    actionName: "ecomBottomBar-comment",
                    host: location.host,
                    titleColor: b ? b.wdColor : null,
                    themeColor: b ? b.bgColor : null
                }), this.appid = a, this._initCountEl(), this.bind();
            },
            transThirdSourceId: function(a) {
                var b = [ 100 ];
                if (a = a.replace(/#.*$/g, ""), f[a]) return f[a];
                for (var c = a.length; c--; ) b.push(a.charCodeAt(c));
                return f[a] = "" + d.MD5(a), f[a];
            },
            setConfig: function(a, b) {
                this._options.themeColor = a, this._options.titleColor = b;
            },
            bind: function() {
                var a = this;
                b.on(this._options.actionName, function() {
                    var b = a.getCommentURL();
                    location.href = b;
                }), b.on("ecomBottomBar-setTheme", function(b, c) {
                    c && a.setConfig(c.bgColor, c.wdColor);
                }), b.on("resizeCountEl", function() {
                    a._initCountEl();
                }), b.on("xnSmartBarUpdateEvent", function(b, c) {
                    a.setCount(c);
                });
            },
            _initCountEl: function() {
                var a = this._options.container.querySelectorAll(xnGetCSSName("[data-action=" + this._options.actionName + "] .count"));
                this.countElMap = {
                    comment: a
                };
            },
            setCount: function(a) {
                if (a && this.countElMap && a.comment_total_count && this.countElMap.comment) for (var b = parseInt(a.comment_total_count), c = this.countElMap.comment, d = c.length; d--; ) {
                    var f = c[d];
                    f.innerHTML = e.isAndroid ? b > 999 ? "999+" : b : b > 99 ? "99+" : b, 10 > b || b > 99 ? b > 99 && 999 >= b ? f.style.right = "-20px" : b > 999 ? f.style.right = e.isAndroid ? "-24px" : "-20px" : delete f.style.left : f.style.right = "-16px", 
                    b > 0 ? f.classList.remove("noDis") : f.classList.contains("noDis") || f.classList.add("noDis");
                }
            },
            getCommentURL: function() {
                return a.init(this.appid, {
                    href: location.href,
                    titleColor: this._options.titleColor,
                    themeColor: this._options.themeColor,
                    third_source_id: encodeURIComponent(this.transThirdSourceId(this._options.host))
                }), a.getLink();
            }
        };
        return g;
    }(m.module.BDComment, m.core.Tap, m.core.Extend, m.coreTT.js.lib.crypto, m.core.Env), 
    void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.BDVote || (m.module.BDVote = {}), m.module.BDVote = function(a, b, c, d) {
        var e = {
            url: "http://apps.bdimg.com/developer/static/1408011145/social-widget/js/vote.js"
        }, f = a.create({
            mixin: [ d ],
            init: function(a, d) {
                var f = this;
                this.qingAppId = a, this._options = c({
                    host: location.host,
                    default_id: a,
                    url: location.href
                }, d), f._initConfig(), b.getJS(e.url, function() {
                    f._options && f._options.loadCallBackFn && f._options.loadCallBackFn();
                }, function() {}, {
                    async: !0
                }), this.bind();
            },
            bind: function() {
                var a = this;
                window.addEventListener("message", function(b) {
                    if (b.data) {
                        var c = b.data;
                        "bottomBar" == c.type && (c.vote ? a.fire("voted", c.sync) : a.fire("cancelVote", c.sync));
                    }
                });
            },
            _initConfig: function() {
                window.bd_vote_config = {
                    default_id: this._options.default_id,
                    url: this._options.url,
                    appid: this.qingAppId,
                    cssLink: this._options.voteCSSLink ? this._options.voteCSSLink : "http://lightappfront.newoffline.bae.baidu.com/build/sass/bottomBar/scss/vote-index.css"
                };
            }
        });
        return f;
    }(m.core.Class, m.core.LoadResource, m.core.Extend, m.core.Tap), void 0 === m && (m = {}), 
    m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleBDVote || (m.bottomBar.js.ModuleBDVote = {}), m.bottomBar.js.ModuleBDVote = function(a, b, c, d, e, f, g) {
        return {
            init: function(a, b) {
                var c = this;
                this.appid = a, this._options = d({
                    host: location.host,
                    actionName: "ecomBottomBar-vote",
                    container: document.querySelector(".wa-ticket-a")
                }, b), c._init(), c.bind(), c._initCountEl();
            },
            _init: function() {
                var c = this;
                if (this._options.container = document.querySelector(".wa-ticket-a"), this._el = this._options.container.querySelector(xnGetCSSName("[data-action=" + this._options.actionName + "]")), 
                this._el) {
                    var d = document.createElement("div");
                    d.className = "wa-ticket-x", this._el.appendChild(d);
                }
                this.bdVote = new b(this.appid, {
                    default_id: encodeURIComponent(a.transThirdSourceId(this._options.host)),
                    url: this._options.href,
                    appid: this.appid,
                    cssLink: this._options.voteCSSLink ? this._options.voteCSSLink : "http://lightappfront.newoffline.bae.baidu.com/build/sass/bottomBar/scss/vote-index.css",
                    loadCallBackFn: function() {
                        bd_vote_config && bd_vote_config.getId && bd_vote_config.getId(function(a) {
                            a && (c._commentTopicId = parseInt(a));
                        });
                    }
                });
            },
            bind: function() {
                var a = this;
                this.bdVote.on("voted", function(b, c) {
                    a.updateVote(1, c);
                }), this.bdVote.on("cancelVote", function(b, c) {
                    a.updateVote(0, c);
                }), e.on("resizeCountEl", function() {
                    a._initCountEl();
                }), e.on("showMoreBtnHide", function(b, c) {
                    a._moveIFrameBack(c);
                }), e.on("showMoreBtnShow", function(b, c) {
                    a._moveIFrameToShowItem(c);
                }), e.on("xnSmartBarUpdateEvent", function(b, c) {
                    a.setCount(c);
                });
            },
            _moveIFrameBack: function(a) {
                var b = a.querySelector(".wa-ticket-x"), c = this._el.querySelector("iframe");
                if (b && !c) {
                    var d = b.cloneNode(!0);
                    this._el.appendChild(d);
                }
            },
            _moveIFrameToShowItem: function(a) {
                var b = this._el.querySelector(".wa-ticket-x"), c = a.querySelector(xnGetCSSName("[data-action=" + this._options.actionName + "]")), d = c.querySelector("iframe");
                if (b && c && !d) {
                    var e = b.cloneNode(!0);
                    c.appendChild(e);
                }
            },
            _initCountEl: function() {
                var a = this._options.container.querySelectorAll(xnGetCSSName("[data-action=" + this._options.actionName + "] .count"));
                this.countElMap = {
                    vote: a
                };
            },
            updateVote: function(a, b) {
                var c = this._options.container.querySelectorAll(xnGetCSSName("[data-action=" + this._options.actionName + "] .text-char"));
                if (!this._voteStatus || this._voteStatus != a) {
                    this._voteStatus = a;
                    var d = this._voteCount;
                    (isNaN(d) || 0 > d) && (d = 0);
                    for (var e = c.length; e--; ) {
                        var f = c[e];
                        f && (a ? (f.innerHTML = "已赞", 0 != e || b || d++) : (f.innerHTML = "赞", 0 != e || b || d--));
                    }
                    0 > d && (d = 0), d >= 0 && !b && this.setCount({
                        like_total: d
                    }), b || g.sendEvent("vote", a ? "add" : "cancel", "success", 1);
                    for (var h = this._options.container.querySelectorAll(xnGetCSSName("[data-action=" + this._options.actionName + "] iframe")), e = h.length; e--; ) {
                        var i = h[e];
                        i && (i.style.display = "block");
                    }
                }
            },
            setCount: function(a) {
                if (a && this.countElMap && null != a.like_total && this.countElMap.vote) {
                    var b = parseInt(a.like_total), c = this.countElMap.vote;
                    this._voteCount = b;
                    for (var d = c.length; d--; ) {
                        var e = c[d];
                        e.innerHTML = f.isAndroid ? b > 999 ? "999+" : b : b > 99 ? "99+" : b, 10 > b || b > 99 ? b > 99 && 999 >= b ? e.style.right = "-22px" : b > 999 ? e.style.right = f.isAndroid ? "-26px" : "-20px" : delete e.style.left : e.style.right = "-16px", 
                        b > 0 ? e.classList.remove("noDis") : e.classList.contains("noDis") || e.classList.add("noDis");
                    }
                }
            }
        };
    }(m.bottomBar.js.ModuleBDComment, m.module.BDVote, m.module.net.JSONP, m.core.Extend, m.core.Tap, m.core.Env, m.module.TongJi), 
    void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleUserJS || (m.bottomBar.js.ModuleUserJS = {}), m.bottomBar.js.ModuleUserJS = function(a, b) {
        a.create({
            init: function(a, c, d) {
                var e = "customModule" + parseInt(1e4 * Math.random()) + "_" + parseInt(1e4 * Math.random());
                d.setAttribute("data-ujsid", e), -1 != a.search(/\?/gi) ? c && (a += "&version=" + c) : c && (a += "?version=" + c), 
                a += "#" + e, d.classList.add("disabled"), b.getJS(a, function() {
                    d.classList.remove("disabled");
                }, function() {
                    console.error("加载用户js 文件失败", a);
                });
            }
        });
    }(m.core.Class, m.core.LoadResource), void 0 === m && (m = {}), m.module || (m.module = {}), 
    void 0 === m.module && (m.module = {}), m.module.CloudaInit || (m.module.CloudaInit = {}), 
    m.module.CloudaInit = function(a, b) {
        function c(a, c) {
            clouda.lightInit({
                ak: a,
                module: c ? c : [ "app", "socialshare", "push" ]
            }, function() {
                b.fire("ecomBottomBar-cloudaInitCallBack");
            });
        }
        var d = "http://apps.bdimg.com/cloudaapi/lightapp.js";
        return {
            init: function(b, e, f) {
                var g = this;
                return g._options = f, "undefined" != typeof clouda && clouda.lightInit ? (g._options && c(b, e), 
                void (g._options && g._options.loadCallBackFn && g._options.loadCallBackFn())) : void a.getJS(d, function() {
                    g._options && c(b, e), g._options && g._options.loadCallBackFn && g._options.loadCallBackFn();
                }, function(a) {
                    console.error(a);
                }, {
                    defer: !0
                });
            }
        };
    }(m.core.LoadResource, m.core.Tap), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), 
    void 0 === m.bottomBar && (m.bottomBar = {}), m.bottomBar.js || (m.bottomBar.js = {}), 
    void 0 === m.bottomBar.js && (m.bottomBar.js = {}), m.bottomBar.js.ModuleBackToSearch || (m.bottomBar.js.ModuleBackToSearch = {}), 
    m.bottomBar.js.ModuleBackToSearch = function(a, b, c) {
        var d = {
            init: function(a, b) {
                this.isVip = 1, this.isBind = !1, b && (this.isVip = b.appInfo.is_vip);
            },
            bind: function() {
                if (!this.isBind) {
                    this.isBind = !0;
                    var a;
                    c.on("ecomBottomBar-backToSearch", function(b) {
                        var c = b.currentTarget, d = c.href;
                        clearTimeout(a), a = setTimeout(function() {
                            location.href = d;
                        }, 600);
                    });
                }
            },
            getLinkURL: function() {
                var c = this._getQuery();
                if (c) {
                    if (b.isBDBoxVIPMode) {
                        if (a.isAndroid) {
                            var d = "intent:#Intent;action=android.intent.action.WEB_SEARCH;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.baidu.searchbox;S.query=" + encodeURIComponent(c) + ";end", e = !0, f = b._getBDBoxVersion();
                            f && f.mainVersion <= 5 && f.subVersion < 3 && (d = "http://m.baidu.com/s?word=" + encodeURIComponent(c) + "&tn=zbios", 
                            e = !1), this.isVip || (d = "http://m.baidu.com/s?word=" + encodeURIComponent(c) + "&tn=zbios", 
                            e = !1), e && this.bind();
                        } else var d = "baiduboxapp://search?word=" + encodeURIComponent(c);
                        return d;
                    }
                    return a.isBDBox ? a.isIphone && this.isVip ? "baiduboxapp://search?word=" + encodeURIComponent(c) : "http://m.baidu.com/s?word=" + encodeURIComponent(c) + "&tn=zbios" : "http://m.baidu.com/s?word=" + encodeURIComponent(c);
                }
            },
            _getQuery: function() {
                if (this._searchQueryWord) return this._searchQueryWord;
                var a = location.search, b = a.match(/bd_wd=[^&]*/gi);
                if (b && b.length > 0) {
                    var a = b[0].substring(6, b[0].length);
                    if (a && a.length > 0) return this._searchQueryWord = decodeURIComponent(a).replace(/(@|＠)/gi, ""), 
                    this._searchQueryWord;
                }
            },
            checkCondition: function() {
                location.href;
                var a = this._getQuery();
                return a ? !0 : !1;
            }
        };
        return d;
    }(m.core.Env, m.bottomBar.js.EnvInit, m.core.Tap), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), 
    void 0 === m.bottomBar && (m.bottomBar = {}), m.bottomBar.js || (m.bottomBar.js = {}), 
    void 0 === m.bottomBar.js && (m.bottomBar.js = {}), m.bottomBar.js.ModuleBDMapControl || (m.bottomBar.js.ModuleBDMapControl = {}), 
    m.bottomBar.js.ModuleBDMapControl = function() {
        var a, b, c = [];
        return {
            init: function(d, e, f) {
                for (var g = this, h = f + "?app_id=" + d, i = e.container.querySelectorAll(xnGetCSSName("[href='" + f + "']")), j = i.length; j--; ) {
                    var k = i[j];
                    k.href = h;
                }
                a ? b ? g.iFrameOnLoad(d, e.config, f) : c.push(function() {
                    g.iFrameOnLoad(d, e.config, f);
                }) : (a = document.createElement("iframe"), a.src = h, a.style.display = "none", 
                a.onload = function() {
                    b = !0, g.iFrameOnLoad(d, e.config, f);
                }, document.body.appendChild(a));
            },
            iFrameOnLoad: function(c, d, e) {
                a && b && a.contentWindow.postMessage(JSON.stringify({
                    appid: c,
                    config: d
                }), e.match(/http:\/\/[^\/]*\//gi));
            }
        };
    }(m[""]), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.ModuleConfig || (m.bottomBar.js.ModuleConfig = {}), m.bottomBar.js.ModuleConfig = function(a, b, c, d, e, f, g, h, i) {
        function j(a, b) {
            if (!r && b && (r = b), clouda.lego._initSmartBar && clouda.lego.mAppId) {
                o = 1;
                for (var c = 0, d = p.length; d > c; c++) {
                    var e = p[c];
                    e();
                }
                p = [];
            } else g.init(a, [ "app", "socialshare", "push", "monitor" ], {
                loadCallBackFn: function() {
                    o = 1;
                    for (var a = 0, b = p.length; b > a; a++) {
                        var c = p[a];
                        c();
                    }
                    p = [];
                }
            });
        }
        function k(a) {
            o ? a() : p.push(a);
        }
        var l = {
            type: "LINK",
            control: c
        }, n = m.bottomBar.js.ModuleBDMapControl, o = 0, p = [], q = "qingBottomBarUpdateCountEvent", r = clouda.lightapp ? clouda.lightapp.appid : null;
        k(function() {
            clouda.lego.monitor && clouda.lego.monitor.create && clouda.lego.monitor.create(r, null, 1, !0);
        });
        var s = {
            k1: l,
            k2: l,
            k3: {
                type: "ACTION",
                actionName: "qingBottomBarShare",
                control: a,
                init: function(b, c) {
                    k(function() {
                        a.init(b, c);
                    });
                }
            },
            k4: {
                type: "ACTION",
                actionName: "ecomBottomBar-follow",
                control: b,
                init: function(a, c) {
                    k(function() {
                        new b(a, c);
                    });
                }
            },
            k5: {
                type: "ACTION",
                control: d,
                actionName: "ecomBottomBar-comment",
                init: function(a, b) {
                    d.init(a, b), i.fire(q);
                }
            },
            k6: {
                type: "ACTION",
                control: e,
                actionName: "ecomBottomBar-vote",
                init: function(a, b) {
                    e.init(a, b), i.fire(q);
                }
            },
            k8: l,
            k9: l,
            k10: {
                type: "LINK",
                control: n,
                action: "http://openapi.baidu.com/smartbar/src/index.html",
                init: function(a, b) {
                    n.init(a, b, this.action);
                }
            },
            k100: {
                type: "ACTION",
                control: h,
                actionName: "ecomBottomBar-backToSearch",
                init: function(a, b) {
                    setTimeout(function() {
                        var c = document.querySelectorAll("[data-action=ecomBottomBar-backToSearch]");
                        h.init(a, b);
                        var d = h.getLinkURL();
                        if (d && c && c.length > 0) for (var e = 0, f = c.length; f > e; e++) c[e].href = d;
                    }, 2);
                }
            }
        };
        return {
            initClouda: j,
            moduleTypeMap: s
        };
    }(m.module.BDShare, m.bottomBar.js.ModuleStoreLink, m.bottomBar.js.ModuleLinkHref, m.bottomBar.js.ModuleBDComment, m.bottomBar.js.ModuleBDVote, m.bottomBar.js.ModuleUserJS, m.module.CloudaInit, m.bottomBar.js.ModuleBackToSearch, m.core.Tap, m.bottomBar.js.ModuleBDMapControl), 
    void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.Mask || (m.module.Mask = {}), m.module.Mask = function(a, b, c, d, e) {
        var f = "b-mask-contianer", g = "b-mask", h = "bMaskCloseEvent", i = "bMaskID1113", j = "bMaskClick", k = "_____", l = 50, m = d.create({
            mixin: [ c ],
            MASK_ELE: null,
            MASK_CONTAINER: document.body,
            init: function(a) {
                this.MASK_ELE = null, this.MASK_CONTAINER = null, this.MASK_ELE_ID = i + parseInt(1e4 * Math.random() + 1), 
                this.MASK_CLICK_TAP = j + this.MASK_ELE_ID, this.isDisableScroll = !1, this.CONFIG = {
                    maxAnimationTime: 1e3,
                    userExternalConfig: null
                }, this._isInitElement = !1, this.setConfigs(a);
            },
            setConfigs: function(a) {
                if (null == document.body) {
                    var b = this;
                    e.on("init", function() {
                        b._initAfterReady(a), b._isInitElement = !0;
                    });
                } else this._initAfterReady(a), this._isInitElement = !0;
            },
            _initAfterReady: function(a) {
                this._createMaskEle(), this._setConfig(a);
                var b = null;
                b = null != a && null != a.el ? a.el : document.body, this._setMaskContainer(b), 
                this._bind();
            },
            _bind: function() {
                var b = this;
                this.MASK_ELE.addEventListener("webkitTransitionEnd", function(a) {
                    var b = a.currentTarget;
                    b.classList.contains("hide") && (b.style.display = "none");
                }), this.MASK_ELE.addEventListener("touchmove", function(a) {
                    b.isDisableScroll && a.preventDefault();
                }), a.on(this.MASK_CLICK_TAP, function(a) {
                    var c = a.target, d = a.currentTarget;
                    d != c && d.contains(c) || d == c && b.fire(h);
                }), this.setDefaultEventFn(h, function() {
                    b.hide();
                });
            },
            _setMaskContainer: function(a) {
                "string" == typeof a && (a = document.querySelector(xnGetCSSName(a))), null != a && this.MASK_CONTAINER != a && (a.appendChild(this.MASK_ELE), 
                null != this.MASK_CONTAINER && this.MASK_CONTAINER.classList.contains(f) && this.MASK_CONTAINER.classList.remove(f), 
                this.MASK_CONTAINER = a), this.MASK_CONTAINER.classList.contains(f) || this.MASK_CONTAINER.classList.add(f);
            },
            _createMaskEle: function() {
                if (null == this.MASK_ELE) {
                    var a = document.getElementById(this.MASK_ELE_ID);
                    if (null == a) {
                        var b = document.createElement("div");
                        b.id = this.MASK_ELE_ID, b.className = g + " tap", b.style.display = "none", b.setAttribute("data-action", this.MASK_CLICK_TAP), 
                        this.MASK_ELE = b, document.body.appendChild(b);
                    } else this.MASK_ELE = a;
                }
            },
            _setConfig: function(a) {
                if (null != a) {
                    b(this.CONFIG.userExternalConfig, a);
                    var c = a.externalClass;
                    null == c || "" == c || this.MASK_ELE.classList.contains(c) || this.MASK_ELE.classList.add(a.externalClass);
                }
            },
            show: function(a, b) {
                var c = this;
                return 0 == this._isInitElement ? void console.error("Mask Element还未生成，不能使用该方法") : void (null != this.MASK_ELE && (this.MASK_ELE.classList.remove("hide"), 
                null != a && "number" == typeof a && (this.MASK_ELE.style.zIndex = a, a >= l && (l = a + 1)), 
                null == b && (b = ""), this.setContent(b), this.MASK_ELE.classList.contains("show") || (this.MASK_ELE.style.display = "", 
                this._disableScroll(), this.MASK_ELE.style.position = this.MASK_CONTAINER == document.body ? "fixed" : "absolute", 
                setTimeout(function() {
                    c.MASK_ELE.classList.add("show");
                }, 5))));
            },
            hide: function() {
                var a = this;
                null != this.MASK_ELE && (this.MASK_ELE.classList.remove("show"), this.MASK_ELE.classList.contains("hide") || this.MASK_ELE.classList.add("hide"), 
                setTimeout(function() {
                    a.MASK_ELE.classList.contains("hide") && (a.MASK_ELE.style.cssText = "display:none;");
                }, this.CONFIG.maxAnimationTime), this._releaseScroll());
            },
            setContent: function(a) {
                this.MASK_ELE.innerHTML = a;
            },
            removeContent: function() {
                this.MASK_ELE.innerHTML = "";
            },
            _disableScroll: function() {
                this.MASK_CONTAINER == document.body && (this.isDisableScroll = !0);
            },
            _releaseScroll: function() {
                this.MASK_CONTAINER == document.body && (this.isDisableScroll = !1);
            }
        }, {
            MASK_CLOSE_EVNET: h,
            getMaskTopIndex: function() {
                return l;
            },
            showMask: function(a) {
                null == this[k + "mask"] && (this[k + "mask"] = new m(a));
                var b = null;
                null != a && (this[k + "mask"].setConfigs(a), b = a.zIndex), this[k + "mask"].show(b);
            },
            hideMask: function() {
                null != this[k + "mask"] && this[k + "mask"].hide();
            }
        });
        return m;
    }(m.core.Tap, m.core.Extend, m.core.CustomEvent, m.core.Class, m.core.Core), void 0 === m && (m = {}), 
    m.core || (m.core = {}), void 0 === m.core && (m.core = {}), m.core.OutElementEvent || (m.core.OutElementEvent = {}), 
    m.core.OutElementEvent = function() {
        var a = [], b = {
            onClickOut: function(b, c) {
                return null != b && null != c && b instanceof Element && c instanceof Function ? void (this.hasElement(b) ? console.error("不能重复绑定多个元素::" + b) : a.push([ b, c ])) : void console.error("参数错误", b, c);
            },
            hasElement: function(b) {
                for (var c = 0; c < a.length; c++) if (a[c] == b) return !0;
                return !1;
            },
            removeElement: function(b) {
                for (var c = 0; c < a.length; c++) if (a[c] == b) return void a.splice(c, 1);
            },
            fireEvent: function(b) {
                for (var c = b.target, d = 0; d < a.length; d++) {
                    var e = a[d];
                    e[0].contains(c) || e[1].call(this, b);
                }
            }
        }, c = "ontouchstart" in window ? "touchend" : "mousedown";
        return document.body.addEventListener(c, function(a) {
            b.fireEvent(a);
        }, !1), b;
    }(m[""]), void 0 === m && (m = {}), m.module || (m.module = {}), void 0 === m.module && (m.module = {}), 
    m.module.POP || (m.module.POP = {}), m.module.POP = function(a, b, c, d) {
        var e = "baidu-xn-pop-parent", f = ".pop-content", g = ".pop-tip", h = ".baidu-xn-pop-container", i = {
            LEFT: "align-left",
            CENTER: "align-center",
            RIGHT: "align-right",
            NONE: "align-none"
        }, j = {
            UP: "menu-list-up",
            DOWN: "menu-list-down"
        }, k = 6, m = b.create({
            init: function(a) {
                this.__hasGetPosition = null, this.POP_CONTAINER = null, this.POP_CONTENT = null, 
                this.POP_ELE = null, this.POP_TIP_ELE = null, this.isShowing = !1, this._isBindClickOut = !1;
                var b = {
                    align: i.RIGHT,
                    direction: j.DOWN,
                    externalClass: "",
                    contentHTML: "",
                    el: "",
                    isShowPointer: !0
                };
                if (void 0 !== a) {
                    c(b, a), this._config = b;
                    var d = a.contentHTML, e = a.el;
                    (null != d || null != e) && this.setElAndHTML(e, d);
                } else this._config = b;
            },
            _bind: function() {
                var a = this;
                d.onClickOut(a.POP_CONTAINER, function(b) {
                    a.isShowing && (a.hide(), b.stopPropagation());
                }), this._isBindClickOut = !0;
            },
            _hidePop: function() {
                this.POP_ELE.classList.remove("show"), this.POP_ELE.classList.contains("noDis") || this.POP_ELE.classList.add("noDis"), 
                d.removeElement(this.POP_CONTAINER), this._isBindClickOut = !1;
            },
            _showPop: function() {
                this.POP_ELE.classList.remove("noDis"), this.POP_ELE.classList.contains("show") || this.POP_ELE.classList.add("show");
                var b = a.getMaskTopIndex() + 1;
                this.POP_ELE.style.zIndex = b, 0 == this._isBindClickOut && this._bind();
            },
            _createElement: function() {
                var a = this.POP_CONTAINER.querySelector(xnGetCSSName(h));
                if (a) this.POP_ELE = a; else {
                    var b = l.bottomBar.pop({
                        data: this._config
                    }), c = document.createElement("div");
                    c.innerHTML = b, this.POP_ELE = c.children[0], this._config.direction == j.DOWN ? this.POP_CONTAINER.appendChild(this.POP_ELE) : this.POP_CONTAINER.insertBefore(this.POP_ELE, this.POP_CONTAINER.firstChild);
                }
                this.POP_CONTENT = this.POP_ELE.querySelector(xnGetCSSName(f)), this.POP_TIP_ELE = this.POP_ELE.querySelector(xnGetCSSName(g));
            },
            _setContentHTML: function(a) {
                null != a && a instanceof Element ? (this.POP_CONTENT.innerHTML = "", this.POP_CONTENT.appendChild(a)) : this.POP_CONTENT.innerHTML = a;
            },
            setContentHTML: function(a) {
                this._setContentHTML(a);
            },
            _getTipLeftPosition: function() {
                if (null == this.__hasGetPosition) {
                    var a = this, b = this.POP_ELE.offsetWidth, c = a.POP_ELE.style.cssText;
                    this.POP_ELE.style.display = "block";
                    var d = this.POP_ELE.offsetWidth;
                    setTimeout(function() {
                        switch (a.POP_ELE.style.cssText = c, a._config.align) {
                          case i.NONE:
                            var e = a.POP_CONTAINER.offsetLeft;
                            1 == a._config.isShowPointer && (a.POP_TIP_ELE.style.left = e + (b - k) / 2 + "px");
                            break;

                          case i.CENTER:
                            a.POP_ELE.style.left = (b - d) / 2 + "px";
                            break;

                          case i.RIGHT:
                            a.POP_ELE.style.left = b - d + "px", 1 == a._config.isShowPointer && (a.POP_TIP_ELE.style.left = -(b + k) / 2 + "px");
                            break;

                          case i.LEFT:
                            1 == a._config.isShowPointer && (a.POP_TIP_ELE.style.left = (b - k) / 2 + "px");
                        }
                    }, 0), this.__hasGetPosition = !0;
                }
            },
            setElAndHTML: function(a, b) {
                return null == b || null == a ? void console.error("参数不能为空", "contentHTML", b, "el", a) : (this.POP_CONTAINER = a, 
                a.classList.contains(e) || this._config.align != i.NONE && a.classList.add(e), this._createElement(), 
                this._setContentHTML(b), this._config.el = a, void (this._config.contentHTML = b));
            },
            setEL: function(a) {
                return null == a ? void console.error("参数不能为空", "el", a) : (this.POP_CONTAINER = a, 
                a.classList.contains(e) || this._config.align != i.NONE && a.classList.add(e), this._createElement(), 
                void (this._config.el = a));
            },
            show: function() {
                return null == this._config.el ? void console.error("没有指定父容器,使用 setElAndHTML(el,contentHTML) 设置内容") : (this._showPop(), 
                this._getTipLeftPosition(), void (this.isShowing = !0));
            },
            hide: function() {
                this._hidePop(), this.isShowing = !1;
            }
        }, {
            ALIGN: i,
            DIRECTION: j
        });
        return m;
    }(m.module.Mask, m.core.Class, m.core.Extend, m.core.OutElementEvent), void 0 === m && (m = {}), 
    m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.TreeAction || (m.bottomBar.js.TreeAction = {}), m.bottomBar.js.TreeAction = function(a, b, c, d) {
        var e = {}, f = b.create({
            init: function(a) {
                this._options = c({
                    actionName: "bottomBarShowMoreItem"
                }, a), this.bind(), this._pop = new d();
            },
            bind: function() {
                var b = this;
                a.on(this._options.actionName, function(a) {
                    var c = a.currentTarget, d = c.getAttribute("data-popID");
                    if (!d || "" == d) {
                        var f = parseInt(1e4 * Math.random() + 4e3);
                        e[f] = b._createPOP(c), c.setAttribute("data-popID", f), d = f;
                    }
                    var g = e[d];
                    g.isShowing ? g.hide() : g.show();
                });
            },
            _createPOP: function(a) {
                var b = new d();
                return b.setEL(a), b;
            }
        });
        return f;
    }(m.core.Tap, m.core.Class, m.core.Extend, m.module.POP), void 0 === m && (m = {}), 
    m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.SmartBarUpdate || (m.bottomBar.js.SmartBarUpdate = {}), m.bottomBar.js.SmartBarUpdate = function(a, b, c, d, e, f) {
        var g = "http://openapi.baidu.com/social/api/2.0/topic/info", h = "http://qing.baidu.com//dev/v1/light/keyword/app/info";
        h = "http://m.baidu.com/lightapp/navbar/get";
        var i = "xnSmartBarCacheKey", j = "xnSmartBarCacheHTMLKey", k = "xnSmartBarCacheCSSID";
        clouda.lego.smartBar._smartBarHTMLCacheKey && (j = clouda.lego.smartBar._smartBarHTMLCacheKey), 
        clouda.lego.smartBar._smartBarCSSELID && (k = clouda.lego.smartBar._smartBarCSSELID);
        var l = "xnSmartBarUpdateEvent", m = a.create({
            newDataEventKey: "ecomBottomBar-newDataReady",
            init: function(a, b) {
                this.appid = a, this._options = e({
                    host: location.host,
                    mAppId: null,
                    UPDATE_COMMENT_COUNT_EVENT: "qingBottomBarUpdateCountEvent"
                }, b), this._getCountLatestData = null, this.bind();
            },
            bind: function() {
                var a = this, b = !1;
                c.on(this._options.UPDATE_COMMENT_COUNT_EVENT, function() {
                    (!a.app_info || 0 != a.app_info.enable_navbar || clouda.lego.smartBar._isFromSeedJS) && (b || (a.getCount(), 
                    b = !0));
                });
            },
            getCount: function() {
                function a() {
                    setTimeout(function() {
                        b._getCount(a), b._isRunLoop = !0;
                    }, 3e4);
                }
                var b = this;
                b._isRunLoop || (this._getCount(a), this._isRunLoop = !0);
            },
            _getCount: function(a) {
                var e = this;
                new b({
                    url: g,
                    data: {
                        app_id: this.appid,
                        third_source_id: encodeURIComponent(d.transThirdSourceId(this._options.host))
                    },
                    success: function(b) {
                        e._getCountLatestData = b, c.fire(l, b), a && a(null, b);
                    },
                    failure: function(b) {
                        a && a(b);
                    }
                });
            },
            getCountFromCache: function() {
                return this._getCountLatestData;
            },
            getAppInfo: function(a, b, d, e) {
                function g(f, g) {
                    return f && 0 == f.error_code && ("0.0.1" == clouda.lego.smartBar.version && (f.version || (f = i._t001To010(f))), 
                    i.appid && "" != i.appid || (i.appid = a = f.app_info.app_id), g || (f && 0 == f.error_code && f.app_info && c.fire(i.newDataEventKey, f.app_info), 
                    i._saveAppInfoToCache(a, f), b && i._saveAppInfoToCache(b, f)), f && f.app_info && (i.app_info = f.app_info), 
                    !k) ? f && "" != f && 0 == f.error_code && f.app_info && f.app_info.api_key ? void (d && (d(f), 
                    k = !0)) : void e(Error("应用已配置不显示服务导航")) : void 0;
                }
                var i = this;
                null != a && "undefined" != a || null != b && "undefined" != b || e && e(Error("appid 或 mAppId 不合法"), a, b);
                var j = {};
                a && (j.app_id = a), b && (j.m_code = b);
                var k = !1, l = this._getAppInfoFromCache(a);
                if (b && !l && (l = this._getAppInfoFromCache(b)), l && g(l, !0), "loadStart" == clouda.lego.smartBar._cacheAppState) {
                    var m = clouda.lego.smartBar._cacheAppCallBackFnName;
                    return void (window[m] = g);
                }
                return "loadError" == clouda.lego.smartBar._cacheAppState ? void (e && (e("数据加载失败"), 
                f.sendEvent("AppInfo", "add", "error", 1))) : void (clouda.lego.smartBar._cacheAppData ? g(clouda.lego.smartBar._cacheAppData) : this._loadAppData(h, j, g, e));
            },
            _loadAppData: function(a, c, d, e) {
                console.log("未进行异步加载"), new b({
                    url: a,
                    data: c,
                    success: function(a) {
                        d(a);
                    },
                    failure: function(a) {
                        e && e(a);
                    }
                });
            },
            _getAppInfoFromCache: function(a) {
                var b = localStorage.getItem(i + "_" + a);
                try {
                    return JSON.parse(b);
                } catch (c) {
                    console.error("从缓存中读取应用配置信息错误", a, c);
                }
            },
            _saveAppInfoToCache: function(a, b) {
                try {
                    localStorage.setItem(i + "_" + a, JSON.stringify(b));
                } catch (c) {
                    console.error("缓存appInfo 基础数据错误", b, c);
                }
            },
            _t001To010: function(a) {
                var b = {};
                if (b.error_code = 0, b.version = "0.1.0", b.app_info = {
                    app_id: a.appid,
                    api_key: a.apikey,
                    is_vip: a.is_vip,
                    app_url: null
                }, b.config = [], a.bridgeinfo && b.config.push({
                    type: 2,
                    name: "咨询",
                    action: a.bridgeinfo
                }), a.appconfig && a.appconfig.smartbar) for (var c = a.appconfig.smartbar, d = 0, e = c.length; e > d; d++) {
                    var f = c[d];
                    switch (f) {
                      case "bridge":
                        break;

                      case "follow":
                        b.config.push({
                            type: 4,
                            name: "订阅",
                            action: ""
                        });
                        break;

                      case "comment":
                        b.config.push({
                            type: 5,
                            name: "评价",
                            action: ""
                        });
                        break;

                      case "share":
                        b.config.push({
                            type: 3,
                            name: "分享",
                            action: ""
                        });
                        break;

                      case "vote":
                        b.config.push({
                            type: 6,
                            name: "赞",
                            action: ""
                        });
                        break;

                      case "backToSearch":
                        break;

                      default:
                        console.error("未知组件", f);
                    }
                }
                return b;
            }
        });
        return m;
    }(m.core.Class, m.module.net.JSONP, m.core.Tap, m.bottomBar.js.ModuleBDComment, m.core.Extend, m.module.TongJi, m.core.Env), 
    void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.IconStyle || (m.bottomBar.js.IconStyle = {}), m.bottomBar.js.IconStyle = function(a) {
        var b = "ecomBottomBar-iconBtn", c = {
            init: function(a) {
                a && (this.container = a), this._isBind || (this.bind(), this._isBind = !0);
            },
            bind: function() {
                var c = this;
                a.on(b, function(a) {
                    a.currentTarget, c.container.classList.contains("showContent") ? (c.container.classList.remove("showContent"), 
                    c.container.classList.contains("hideContent") || c.container.classList.add("hideContent")) : (c.container.classList.add("showContent"), 
                    c.container.classList.remove("hideContent"));
                });
            }
        };
        return c;
    }(m.core.Tap), void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.UserLayer || (m.bottomBar.js.UserLayer = {}), m.bottomBar.js.UserLayer = function(a, b, c, d) {
        var e = {
            ICON_STYLE: 0,
            BAR_STYLE: 1
        }, f = 48, g = "showQingIconStyle", h = a.create({
            init: function(a) {
                a && (a.userLayerEL && (this._userLayerEL = a.userLayerEL), a.containerEL && (this._containerEL = a.containerEL)), 
                this._viewMode = e.BAR_STYLE, this._initViewMode();
            },
            setEl: function(a, b) {
                a && (this._userLayerEL = a), b && (this._containerEL = b);
            },
            isIconStyle: function() {
                return this._viewMode == e.ICON_STYLE ? !0 : !1;
            },
            renderView: function() {
                if (this._userLayerEL && this._containerEL) {
                    c.init(this._containerEL);
                    var a = this._containerEL.getAttribute("data-rendUserLayView");
                    if (!a) {
                        switch (this._viewMode) {
                          case e.ICON_STYLE:
                            this._renderICONStyle();
                            break;

                          case e.BAR_STYLE:
                            this._renderBarStyle();
                            break;

                          default:
                            console.error("未知模式,无法解析", this._viewMode);
                        }
                        this._containerEL.setAttribute("data-rendUserLayView", !0);
                    }
                }
            },
            _renderBarStyle: function() {
                var a = window.getComputedStyle(this._userLayerEL), b = a.position, c = parseInt(a.bottom, 10);
                ("fixed" == b || "absolute" == b) && (this._userLayerEL.style.bottom = c + f + "px");
            },
            _renderICONStyle: function() {
                if (this._containerEL && !this._containerEL.classList.contains(g)) {
                    this._containerEL.classList.add(g), this._containerEL.classList.add("hideContent");
                    var a = this._userLayerEL.offsetHeight;
                    a && (this._containerEL.style.bottom = a + "px"), d.fire("ecomBottomBar-resizeShowMoreBtn");
                }
            },
            _initViewMode: function() {
                this._viewMode = b.isBDBoxVIPMode ? e.BAR_STYLE : e.ICON_STYLE;
            }
        });
        return h;
    }(m.core.Class, m.bottomBar.js.EnvInit, m.bottomBar.js.IconStyle, m.core.Tap), void 0 === m && (m = {}), 
    m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.SmartBarControl || (m.bottomBar.js.SmartBarControl = {}), m.bottomBar.js.SmartBarControl = function(a, b, c, d, e, f, g, h, i, j, k) {
        var m = a.create({
            init: function(a) {
                var c = this;
                this._options = b({
                    appId: null,
                    mAppId: null,
                    isAutoMode: !1,
                    container: document.querySelector(".wa-ticket-a"),
                    userDefineViewModules: null,
                    userDefineLinks: null
                }, a), this._contianEl = this._options.container ? this._options.container : document.body, 
                this._userLayer = new k(), this.smartBarUpdate = new i(this._options.appId, {
                    mAppId: this._options.mAppId
                }), this.smartBarUpdate.getAppInfo(this._options.appId, this._options.mAppId, function(a) {
                    c._cacheAppBaseData = a, c._options.appId && "" != c._options.appId || (c._options.appId = a.app_info.app_id, 
                    c._options.app_info = a.app_info), a.config.push({
                        name: "返回搜索",
                        type: 100
                    }), d.initClouda(a.app_info.api_key, a.app_info.app_id), c._cacheViewModules = c.checkModule(a.config), 
                    c._userDefineShowModules = c._checkUserDefineModules(c._cacheViewModules), c._userDefineLinksData = c._checkUserDefineLinks(c._userDefineShowModules), 
                    c.reRendView(c._userDefineLinksData), c._initModules(c._userDefineShowModules, c._options.container, a.app_info), 
                    f.fire("ecomBottomBar-dataReady", a.app_info);
                }, function(a) {
                    console.error("获取应用配置信息失败", a);
                }), new e({
                    actionName: "baiduServiceBarShowMoreBtn"
                }), this.bind();
            },
            bind: function() {
                function a(a) {
                    clearTimeout(d), d = setTimeout(function() {
                        e._pop.isShowing ? (e._pop.hide(), f.fire("showMoreBtnHide", a.currentTarget), b = null) : (e._pop.show(), 
                        b = a.currentTarget, f.fire("showMoreBtnShow", a.currentTarget));
                    }, 50);
                }
                var b, c, d, e = this;
                f.on("qingBottomBarShare", function(a) {
                    e._pop.isShowing && (e._pop.hide(), f.fire("showMoreBtnHide", a.currentTarget), 
                    b = null);
                }), f.on("ecomBottomBar-showMore", function(b) {
                    a(b);
                }), h.on("resize", function() {
                    clearTimeout(c), c = setTimeout(function() {
                        e._pop.isShowing && b && (e._pop.hide(), f.fire("showMoreBtnHide", b), b = null), 
                        e._showMoreBtn();
                    }, 100);
                }), f.on("ecomBottomBar-resizeShowMoreBtn", function() {
                    e._showMoreBtn();
                });
            },
            setUserLayerEL: function(a) {
                this._userLayer || (this._userLayer = new k({
                    containerEL: this._viewEl,
                    userLayerEL: a
                })), this._userLayer.setEl(a), this.show();
            },
            _getHiddenLink: function() {
                for (var a = this._options.container.querySelectorAll(".wa-ticket-bb>li"), b = [], c = a.length; c--; ) {
                    var d = a[c], e = getComputedStyle(d).display;
                    if (!d.classList.contains("showMoreBtn")) {
                        if ("none" != e) return b;
                        b.push(d);
                    }
                }
                return b;
            },
            _initShowMoreBtn: function() {
                this.isInitShowMoreBtn || (this._pop = new g({
                    el: this._options.container.querySelector(".wa-ticket-o"),
                    contentHTML: ""
                }), this.isInitShowMoreBtn = !0), this._showMoreBtn(), f.fire("resizeCountEl");
            },
            _showMoreBtn: function() {
                if (!this.isInitShowMoreBtn) return void this._initShowMoreBtn();
                for (var a = this._getHiddenLink(), b = document.createElement("ul"), c = !1, d = a.length; d--; ) {
                    var e = a[d].cloneNode(!0);
                    e.classList.contains("vote") && (c = !0), b.appendChild(e);
                }
                this._pop.setContentHTML(b), f.fire("resizeCountEl"), this._noUpdateVote = c;
            },
            reRendView: function(a) {
                var b = this;
                a || (a = this._cacheViewModules), this.showView(a), this._options.container = document.querySelector(".wa-ticket-a"), 
                setTimeout(function() {
                    b._initShowMoreBtn();
                }, 2);
            },
            checkModule: function(a) {
                for (var b = [], c = 0, e = a.length; e > c; c++) {
                    var f = a[c];
                    f.name, f.action;
                    var g = f.type, h = f.info, i = f.sub;
                    if (i) {
                        var j = this.checkModule(i);
                        j && j.length > 0 && (f.subModules = j, b.push(f));
                    } else {
                        var k = d.moduleTypeMap["k" + g];
                        if (k) {
                            var l;
                            k.control && (l = k.control.checkCondition), l && 0 == k.control.checkCondition(this._options.appId, h) || (f.type = k.type, 
                            f.sType = "k" + g, f.control = k.control, k.actionName && (f.actionName = k.actionName), 
                            k.action && !f.action && (f.action = k.action), f.init = k.init, b.push(f));
                        } else console.error("未注册module 类型", g, f);
                    }
                }
                return b;
            },
            _initModules: function(a, b, c) {
                for (var d = this, e = 0, f = a.length; f > e; e++) {
                    var g = a[e];
                    g.name, g.action, g.type, g.info;
                    var h = g.sub;
                    if (h) {
                        var i = this._initModules(h);
                        i && i.length > 0 && (g.subModules = i);
                    } else g.init && (g.info || (g.info = {}), g.info.container = b, g.info.appInfo = c, 
                    g.init(d._options.appId, g.info));
                }
            },
            _transUserDefineLinks: function(a, b, c) {
                if (a && "[object Array]" == Object.prototype.toString.call(a)) {
                    var d = [], e = a.length;
                    if (c || (c = 1), c > 2) return d;
                    var f = 3;
                    b && (f = b), e > f && (e = f, console.error(1 == c ? "用户自定义链接最多只能配置" + f + "个" : "用户自定义菜单最多只能配置" + f + "个"));
                    for (var g = 0; e > g; g++) {
                        var h = a[g];
                        h.sub && h.sub.length > 0 && (h.subModules = this._transUserDefineLinks(h.sub, 5, c++)), 
                        h.action && (h.sType = "k1", h.type = "LINK"), h.name && (h.sub || h.action) && d.push(h);
                    }
                    return d;
                }
            },
            _checkUserDefineLinks: function(a) {
                var b = this._transUserDefineLinks(this._options.userDefineLinks);
                if (!b) return a;
                var c = [];
                b && b.length > 0 && (c = c.concat(b));
                for (var d = 0, e = a.length; e > d; d++) {
                    var f = a[d];
                    f.sub || "k1" == f.sType || c.push(f);
                }
                return c;
            },
            _checkUserDefineModules: function(a) {
                var b = this._options.userDefineViewModules;
                if (!b) return a;
                if (b = this._trans001TypeTo010(b), b.length < 3) return console.error("至少设置3个可显示的元素"), 
                a;
                for (var c = [], d = 0, e = a.length; e > d; d++) {
                    var f = a[d];
                    if (f.sub || "k1" == f.sType) c.push(f); else for (var g = 0, h = b.length; h > g; g++) if (f.sType == b[g]) {
                        c.push(f);
                        break;
                    }
                }
                return c;
            },
            _trans001TypeTo010: function(a) {
                var b = [];
                if ("0.0.1" == clouda.lego.smartBar.version) for (var c = 0, d = a.length; d > c; c++) switch (a[c]) {
                  case "bridge":
                    b.push("k2");
                    break;

                  case "comment":
                    b.push("k5");
                    break;

                  case "share":
                    b.push("k3");
                    break;

                  case "vote":
                    b.push("k6");
                    break;

                  case "follow":
                    b.push("k4");
                    break;

                  default:
                    console.log(a[c], ":该类型的配置已不再支持");
                } else b = a;
                return b;
            },
            showView: function(a) {
                if (a || (a = this._cacheViewModules), l && l.bottomBar && l.bottomBar.bar2) {
                    var b = l.bottomBar.bar2({
                        data: a
                    }), c = document.createElement("div");
                    c.innerHTML = b, this._viewEl = c.children[0], j.isIphone && this._viewEl.classList.add("iphoneDevice"), 
                    this._options.container ? console.log("有cache 不再添加 展示元素") : this._contianEl.appendChild(this._viewEl), 
                    this._userLayer && this._userLayer.setEl(null, this._viewEl);
                } else console.error("模板不存在，请检查代码");
            },
            hide: function() {
                this._viewEl && !this._viewEl.classList.contains("noDis") && this._viewEl.classList.add("noDis");
            },
            show: function() {
                this._viewEl ? (this._userLayer && this._userLayer.renderView(), this._viewEl.classList.remove("noDis"), 
                this._isAddPaddingBottom()) : console.error("元素不存在，不能显示");
            },
            _isAddPaddingBottom: function() {
                clouda.lego.smartBar._noAutoCSS || (document.body.style.paddingBottom = "45px");
            }
        });
        return m;
    }(m.core.Class, m.core.Extend, m.module.net.JSONP, m.bottomBar.js.ModuleConfig, m.bottomBar.js.TreeAction, m.core.Tap, m.module.POP, m.core.Core, m.bottomBar.js.SmartBarUpdate, m.core.Env, m.bottomBar.js.UserLayer), 
    void 0 === m && (m = {}), m.bottomBar || (m.bottomBar = {}), void 0 === m.bottomBar && (m.bottomBar = {}), 
    m.bottomBar.js || (m.bottomBar.js = {}), void 0 === m.bottomBar.js && (m.bottomBar.js = {}), 
    m.bottomBar.js.Auto || (m.bottomBar.js.Auto = {}), m.bottomBar.js.Auto = function(a, b, c, d, e) {
        function f(a) {
            k.smartBar ? a() : j.push(a);
        }
        function g() {
            var a = location.pathname;
            ("/" == a || "" == a) && (isHostPage = !0);
            var b = !0, d = screen.availHeight;
            c.isQQBrowser && (d = screen.height / window.devicePixelRatio);
            var e = document.body.offsetHeight;
            d / 3 > e && (b = !1);
            var f = document.body.scrollHeight > document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
            b && (f = document.body.offsetHeight);
            var g = !1;
            return d + l >= f && f > d - l && (g = !0), isHostPage && g ? !1 : !0;
        }
        ({
            width: screen.availWidth,
            height: screen.availHeight
        });
        var h = "xnSmartBarCacheKey", i = screen.availHeight;
        10 > i && (i = window.innerHeight), c.isQQBrowser && (i = screen.height / window.devicePixelRatio);
        var j = [], k = {
            _isAutoShow: !1,
            init: function(a) {
                if (this.smartBar = a, "0.0.1" == clouda.lego.smartBar.version || 1 == clouda.lego.smartBar.isPreviewPage) k.isShow(); else if (this.checkInIFrame() || !this._appData || 1 != this._appData.enable_navbar && !clouda.lego.smartBar._isFromSeedJS) document.body.style.paddingBottom = "initial"; else {
                    if (clouda.lego.smartBar._isFromSeedJS) return void k.isShow();
                    if (this.checkHomePage() && this.checkIsFromBaidu()) return void k.isShow();
                }
                for (var b = 0, c = j.length; c > b; b++) try {
                    j[b]();
                } catch (d) {
                    console.error("AutoCallBack Exec Error", d.stack);
                }
                j = [];
            },
            setAppData: function(a) {
                this._appData = a;
            },
            checkHomePage: function() {
                var a = location.href;
                document.referrer;
                var b = !1;
                if (d._getBDBoxVersion(), this._appData) {
                    var c = this._appData.app_url, e = localStorage.getItem(h + "_" + this._appData.app_id);
                    -1 == c.search(/\/\/.*\//gi) && (c = c.replace(/\?/gi, "/?"));
                    var f = a.replace(/(\?|&)bd_\w*=[^&]*/gi, "");
                    if (e = e.replace(/(\?|&)bd_\w*=[^&]*/gi, ""), (f == c || f == e) && (b = !0), -1 != f.indexOf(c)) {
                        var g = f.search(/(service=bdbox|osname=baiduboxapp|pkgname=com\.baidu\.searchbox)/gi);
                        -1 != g && (b = !0, console.log("hack 部分框版本的首页检测"));
                    }
                }
                return (a.match(/bd_wd=[^&]*/gi) || a.match(/bd_(source_light|ts|framework)=[^&]*/gi)) && (b = !0, 
                console.log("@直达首页")), b;
            },
            checkIsFromBaidu: function() {
                var a = document.referrer, b = !1, e = location.href;
                (e.match(/bd_wd=[^&]*/gi) || e.match(/bd_(source_light|ts|framework)=[^&]*/gi)) && (b = !0, 
                console.log("@直达页面，出导航")), (c.isBDBox || d.isBDBoxVIPMode) && (b = !0), a && -1 != a.search(/http(s):\/\/\.baidu\.com\//gi) && (b = !0);
                var f = clouda.lego.smartBar._baiduFlowSessionKey;
                if (f && this._appData) {
                    var g = sessionStorage.getItem(f + "_" + this._appData.app_id);
                    g && (b = !0), b && sessionStorage.setItem(f + "_" + this._appData.app_id, 1);
                }
                return b;
            },
            checkInIFrame: function() {
                return top.location != window.location ? (this._isAutoShow = !1, !0) : !1;
            },
            isShow: function() {
                var a = this;
                if (this._isAutoShow) clearTimeout(this.timeoutID), this.timeoutID = setTimeout(function() {
                    a._isInputMethodUP || (g() ? a.smartBar.show() : (console.log("不符合条件隐藏"), a.smartBar.hide()));
                }, 1e3); else if (setTimeout(function() {
                    a.smartBar.show();
                }, 1), !this._isSendShowTJ) {
                    if (e.sendEvent({
                        SMB_pv: this._appData ? this._appData.app_id : 0
                    }), window.performance && window.performance.timing) {
                        var b = window.performance.timing, c = b.domainLookupStart;
                        e.sendEvent({
                            SMB_dur: 1 * new Date() - c
                        });
                    }
                    this._isSendShowTJ = !0;
                }
            },
            checkWinSize: function() {
                var a = this;
                this._isAutoShow && (c.isUC || (clearTimeout(this.timeoutResizeID), this.timeoutResizeID = setTimeout(function() {
                    window.innerHeight > .6 * i ? (a.smartBar.show(), console.log("resize show bar"), 
                    a._isInputMethodUP = !1) : (a.smartBar.hide(), a._isInputMethodUP = !0, console.log("resize hide bar"));
                }, 10)));
            }
        };
        a.on("ecomBottomBar-dataReady", function(a, b) {
            k.setAppData(b), f(function() {
                if (clouda.lego.smartBar._isShow && k.isShow(), !k.checkInIFrame() && b && (1 == b.enable_navbar || clouda.lego.smartBar._isFromSeedJS)) {
                    if (!clouda.lego.smartBar._isFromSeedJS && !clouda.lego.smartBar._isAddSeedJS) return void (k.checkHomePage() && k.checkIsFromBaidu() && k.isShow());
                    k.isShow();
                }
            });
        }), a.on("ecomBottomBar-newDataReady", function(a, b) {
            f(function() {
                if (!k.checkInIFrame() && b && (1 == b.enable_navbar || clouda.lego.smartBar._isFromSeedJS)) {
                    if (!clouda.lego.smartBar._isFromSeedJS && !clouda.lego.smartBar._isAddSeedJS) return b.app_id == parseInt(b.BDLIGHTID, 10) && localStorage.setItem(h + "_" + b.app_id, location.href), 
                    void (k.checkHomePage() && (k.checkIsFromBaidu() || b.app_id == b.BDLIGHTID) && k.isShow());
                    k.isShow();
                }
            });
        });
        var l = 75;
        return c.isQQBrowser && (l = 125), k;
    }(m.core.Tap, m.core.Core, m.core.Env, m.bottomBar.js.EnvInit, m.module.TongJi), 
    function(a, b, c, d, e, f) {
        function g(a) {
            clouda.lego.smartBar._noAutoCSS || (document.body.style.paddingBottom = "45px"), 
            f.prefix = /(ecomBottomBar-|qingBottomBar)/i;
            var b = new d({
                appId: a.appid,
                mAppId: a.mAppId,
                host: location.host,
                href: location.href,
                userDefineLinks: clouda.lego.smartBar._userDefineLinksData,
                userDefineViewModules: clouda.lego.smartBar._showMoules
            });
            if (clouda.lego.smartBar.mainJSVersion = "0.1.0", clouda.lego.smartBar._baiduFlowSessionKey = "xnSmartBarCacheKey", 
            clouda.lego.smartBar.show = function() {
                clouda.lego.smartBar._isShow = !0, b.show();
            }, clouda.lego.smartBar.hide = function() {
                clouda.lego.smartBar._isShow = !1, b.hide();
            }, clouda.lego.smartBar.setNoAutoCSS = function(a) {
                a && (delete document.body.style.paddingBottom, clouda.lego.smartBar._noAutoCSS = !0);
            }, clouda.lego.smartBar.setTheme = function(a, b) {
                this._theme = {
                    bgColor: a,
                    wdColor: b
                }, e.fire("ecomBottomBar-setTheme", this._theme);
            }, clouda.lego.smartBar.setUserBottomBarEl = function(a) {
                b.setUserLayerEL(a);
            }, clouda.lego.smartBar._userBottomBarEl && b.setUserLayerEL(clouda.lego.smartBar._userBottomBarEl), 
            0 == clouda.lego.smartBar._isShow ? b.hide() : h.init(b), clouda.lego.smartBar._theme) {
                var c = clouda.lego.smartBar._theme;
                setTimeout(function() {
                    e.fire("ecomBottomBar-setTheme", c);
                }, 1);
            }
        }
        a();
        var h = m.bottomBar.js.Auto;
        clouda.lego.smartBar._isInit || (b.init({
            success: function(a) {
                g(a);
            },
            failure: function(a) {
                console.error(a.stack), console.error("由于未知错误,服务导航不能显示");
            },
            viewModules: clouda.lego.smartBar._showMoules
        }), clouda.lego.smartBar._isInit = !0);
    }(m.core.init, m.bottomBar.js.EnvInit, m.core.Env, m.bottomBar.js.SmartBarControl, m.core.Tap, m.module.TongJi, m.bottomBar.js.Auto), 
    k("bottomBar/js/main.js", function() {});
}();