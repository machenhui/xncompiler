/**
 * Created by machenhui on 2015/1/25.
 */
"use strict";
class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '('+this.x+', '+this.y+')';
    }

}

var point = new Point(2,3);
point.toString()

console.log(Point);
