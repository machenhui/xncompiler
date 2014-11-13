//var compiler = require("../src/js/transCommonJS").xncompiler();
//new compiler("src/web/main.js", "test/blendUI/");
var compiler = require("../src/js/singleFilePackage").singleFilePackage;

new compiler({
    baseUrl:"test/blendUI/",
    source:"src/web/main.js",
    mainConfigFile:"test/blendUI/require.config.js",
    output:"./build/"
});

