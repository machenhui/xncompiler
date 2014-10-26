/**
 * 测试require
 */
require(["defineA"],function(da){
    var db = require("defineB");
    console.log(da,db);
});