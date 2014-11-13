var transCondition = require("../src/js/conditionTrans");
new transCondition({
    source:"./test/runtime-API/runtime-API/src/mbaas/",
    output:"./build/",
    conditionFile:"./test/data/condition.js",
    globalDefineFile:"./test/data/defineVar.js"
});
new transCondition({
    source:"./test/runtime-API/runtime-API/src/device/",
    output:"./build/",
    conditionFile:"./test/data/condition.js",
    globalDefineFile:"./test/data/defineVar.js"
});

new transCondition({
    source:"./test/runtime-API/runtime-API/src/lib/",
    output:"./build/",
    conditionFile:"./test/data/condition.js",
    globalDefineFile:"./test/data/defineVar.js"
});