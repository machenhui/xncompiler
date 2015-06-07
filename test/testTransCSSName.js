var transCSSName = new require("../src/js/xnTransCSSName").transCSSName;
transCSSName = new transCSSName({
    cssRenameMap:"./build/index.css.map.json",
    src:"test/data/js/min.all.js",
    output:"build/data/js/min.all-dd.js"
});