!function () {
    if ("undefined" == typeof a)var a = {}, b = {}, c = "undefined" == typeof window ? global : window;
    a.__defineGetter__("a1", function () {
        return b.a1 || (b.a1 = function (a, b) {
            function e() {
                this._init.apply(this, arguments)
            }

            var d = {
                CLASS_NAME: 1,
                TAG_NAME: 2,
                PRODUCE_NAME: 3,
                SCOPE_NODE: 4,
                ATTRIBUTE_NODE: 5,
                OPERATE_NODE: 6,
                SPLIT_NODE: 7,
                ROOT_NODE: 8,
                OTHER_NODE: 9
            };
            e.prototype = {
                _init: function (a, b) {
                    this.type = a, this.name = b, this.children = []
                }, appendChild: function (a) {
                    this.children.push(a)
                }
            }, b.exports = {CSS_NODE: e, CSS_NODE_TYPE: d}
        }.call(c)), b.a1
    }), a.__defineGetter__("a2", function () {
        return b.a2 || (b.a2 = function (a, b) {
            function c(a, b) {
                for (var c = b, d = !1, e = b, f = a.length; f > e; e++) {
                    var g = a[e];
                    if (-1 == i.indexOf(g)) {
                        c = e, d = !0;
                        break
                    }
                    c = e
                }
                return d || (c += 1), a.substring(b, c)
            }

            function d(a, b) {
                for (var c = b, d = !1, e = b, f = a.length; f > e; e++) {
                    var g = a[e];
                    if (-1 == h.indexOf(g)) {
                        c = e;
                        break
                    }
                    c = e
                }
                return d || (c += 1), a.substring(b, c)
            }

            function e(a, b) {
                for (var c = b, d = !1, e = g.substring(1), f = b, h = a.length; h > f; f++) {
                    var i = a[f];
                    if (-1 != e.indexOf(i)) {
                        c = f;
                        break
                    }
                    c = f
                }
                return d || (c += 1), a.substring(b, c)
            }

            var f = xnNodeJS.a0, g = "[]", h = "abcdefghijklmnopqrstuvwxyz";
            h += h.toUpperCase(), h += "1234567890";
            var i = h;
            h += "-_";
            var j = function (a, b) {
                function g(a) {
                    var b;
                    h && "" != h && (l.push({
                        type: "className",
                        text: h
                    }), b = new f.CSS_NODE(f.CSS_NODE_TYPE.CLASS_NAME, h)), a && a.noOther || i && "" != i && (l.push({
                        type: "other",
                        text: i
                    }), b = new f.CSS_NODE(f.CSS_NODE_TYPE.OTHER_NODE, i)), o && "" != o && (l.push({
                        type: "htmlTag",
                        text: o
                    }), b = new f.CSS_NODE(f.CSS_NODE_TYPE.TAG_NAME, o)), a && a.type == f.CSS_NODE_TYPE.SCOPE_NODE && a.children && (b = new f.CSS_NODE(f.CSS_NODE_TYPE.SCOPE_NODE, null), b.appendChild(a.children)), b && m.appendChild(b)
                }

                for (var h, i = "", k = !1, l = [], m = b || new f.CSS_NODE(f.CSS_NODE_TYPE.ROOT_NODE, null), n = !0, o = null, p = !1, q = !1, r = null, s = null, t = 0, u = a.length; u > t; t++) {
                    var v = a.charAt(t);
                    switch (v) {
                        case".":
                            g(), i = "", h = "", k = !0, n = !1, s = f.CSS_NODE_TYPE.CLASS_NAME;
                            var w = d(a, t + 1);
                            w.length > 0 && (t += w.length, h = w, g(), h = "");
                            break;
                        case" ":
                        case",":
                            (r === !1 || null === r) && (q = !1), n = !0, g(), h = null, o = null, k = !1, i = "", i += v, s = f.CSS_NODE_TYPE.SPLIT_NODE, g(), i = "";
                            break;
                        case"(":
                            var x = a.substring(t), y = x.indexOf(")"), z = x.substring(1, y);
                            if (r = !0, z.length > 0) {
                                g();
                                var A = j(z);
                                l.push({
                                    type: "subScope",
                                    data: A.tokenArray
                                }), i = "", r = !1, g({type: f.CSS_NODE_TYPE.SCOPE_NODE, children: A.cssNode})
                            }
                            t += y;
                            break;
                        case")":
                            r = !1;
                            break;
                        case">":
                        case"~":
                        case"+":
                            q = !1, g({noOther: !0}), h = null, o = null, i += v, k = !1, s = f.CSS_NODE_TYPE.OPERATE_NODE;
                            break;
                        case":":
                            q = !0, g({noOther: !0}), h = null, o = null, i += v, k = !1, s = f.CSS_NODE_TYPE.PRODUCE_NAME;
                            break;
                        case"[":
                            p = !0, g({noOther: !0}), h = null, o = null, k = !1, s = f.CSS_NODE_TYPE.ATTRIBUTE_NODE;
                            var B = e(a, t);
                            B && B.length > 0 ? (i += B, t += B.length - 1) : i += v;
                            break;
                        case"]":
                            p = !1, i += v;
                            break;
                        default:
                            if (k)h += v; else if (p || q || k)i += v; else {
                                n = !1, o || (o = "");
                                var C = c(a, t);
                                s = f.CSS_NODE_TYPE.TAG_NAME, C.length > 0 && (t += C.length - 1, g(), i = "", h = "", o = C, g(), o = "")
                            }
                    }
                }
                return g(), {tokenArray: l, cssNode: m}
            };
            b.exports = j
        }.call(c, a.a1)), b.a2
    }), function (a) {
        xnCSSParser = a
    }.call(c, a.a2)
}();