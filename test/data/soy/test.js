var tplCSSNameMap={"baiduServiceBottomBar":"wa-ticket-a","noDis":"wa-ticket-b","iphoneDevice":"wa-ticket-c","count":"wa-ticket-d","hackIFrame":"wa-ticket-e","qingIcon":"wa-ticket-f","qingBtn":"wa-ticket-g","baidu-xn-pop-parent":"wa-ticket-h","baidu-xn-pop-container":"wa-ticket-i","pop-tip":"wa-ticket-j","align-right":"wa-ticket-k","vote":"wa-ticket-l","icon":"wa-ticket-m","count-outer":"wa-ticket-n","showMoreBtn":"wa-ticket-o","comment":"wa-ticket-p","showCount-5":"wa-ticket-q","showCount-6":"wa-ticket-r","showCount-7":"wa-ticket-s","showCount-8":"wa-ticket-t","showCount-9":"wa-ticket-u","showCount-10":"wa-ticket-v","showCount-11":"wa-ticket-w","bd_vote":"wa-ticket-x","text-char":"wa-ticket-y","showQingIconStyle":"wa-ticket-z","hideContent":"wa-ticket-ab","icon-container":"wa-ticket-bb","showContent":"wa-ticket-cb","baiduServiceBottomBar-toast-container":"wa-ticket-db","toast-text":"wa-ticket-eb","show":"wa-ticket-fb"};
function xnGetCssName(className){var rs=className.split(/\s+/gi);for(var l=rs.length;l--;){if(tplCSSNameMap[rs[l]]){rs[l] = tplCSSNameMap[rs[l]];}}return rs.join(' ');};
// This file was automatically generated from test.js.soy.
// Please don't edit this file by hand.

if (typeof tpl == 'undefined') { var tpl = {}; }
if (typeof tpl.bottomBar == 'undefined') { tpl.bottomBar = {}; }


tpl.bottomBar.bar2 = function(opt_data, opt_ignored) {
  return '<div class="wa-ticket-a wa-ticket-b"><a class="wa-ticket-g" data-action="ecomBottomBar-iconBtn" onclick="javascript:void(0);" 1><i class="wa-ticket-f"></i></a><ul class="'+xnGetCssName('$$_cssFunctionStart_$$showCount-' + soy.$$escapeHtml(opt_data.data.length) + ' icon-container ' + ((opt_data.data.length) ? 'ddddd' : '') + '')+'$$_cssFunctionEnd_$$">' + tpl.bottomBar.ulBtns(opt_data) + '<li class="wa-ticket-o" data-action="ecomBottomBar-showMore"><a onclick="javascript:void(0);">更多</a></li></ul></div>';
};
