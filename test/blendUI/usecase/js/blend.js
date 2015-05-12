if( !navigator.userAgent.match(/BlendUI/i) ){
    //document.write('<script src="js/BlendWebUI.js"></script>');
    document.write('<script src="http://localhost:8080/xncompiler/build/src/web/main.js"></script>');
}else{
    document.write('<script src="js/lib/zepto.js"></script>');
    document.write('<script src="js/BlendHybridUI.js"></script>');
}
