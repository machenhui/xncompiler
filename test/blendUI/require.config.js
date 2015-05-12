require.config({
//    baseUrl : 'http://mcouiui.newoffline.bae.baidu.com/src/js',
    baseUrl : 'test/data/blendUI',
    // urlArgs : "bust=" + (new Date()).getTime(),
    paths: {
        '$': 'coreTT/js/lib/zepto'
    },
    shim: {
        '$': {
            exports: 'Zepto'
        }
    }
});