var compiler = require("../src/js/transCommonJS").transDirCommonJS;

new compiler({
    baseUrl:"test/blendUI/",
    source:"src/web/",
    mainConfigFile:"test/blendUI/require.config.js",
    output:"./build/"
});