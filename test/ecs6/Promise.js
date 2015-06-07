/**
 * Created by machenhui on 2015/1/25.
 */
var promiseCount = 0;

function testPromise(){
    var thisPromiseCount = ++promiseCount;

    console.log('beforeend', thisPromiseCount + ') Started (<small>Sync code started</small>)<br/>');
    var p1 = new Promise(function(resolve,reject){
        console.log('beforeend', thisPromiseCount +') Promise started (<small>Async code started</small>)<br/>');
        setTimeout(function(){
            resolve(thisPromiseCount);
        },Math.random() * 2000 + 1000);
    });

    p1.then(function(val){
        console.log('beforeend', val + ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
    }).then(function(val){
        console.log('beforeend==', val + ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
    })
    console.log('beforeend', thisPromiseCount +') Promise made (<small>Sync code terminated</small>)<br/>');
}
testPromise();