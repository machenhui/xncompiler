/**
 * 测试gen 语法
 */
function* testGen(){
    var index = 0;
    while(index<10){
        yield index++;
    }
}

var gen = testGen();
var i = 0;
while(i<10){
    console.log(gen.next().value);
    i++;
}

console.log("==============");
function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}
function* generator(i){
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
