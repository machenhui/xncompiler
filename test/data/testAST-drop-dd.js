if (void 0 === xnCompiler2471576) var xnCompiler2471576 = {}, xnCompiler2471576_cache = {}, xnCompiler2471576_g = "undefined" == typeof window ? global : window;

var goog = goog || {};

goog.DEBUG = !1, goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype, a.superClass_ = b.prototype, a.prototype = new c(), a.prototype.constructor = a;
}, goog.userAgent || (goog.userAgent = function() {
    var a = "";
    "undefined" != typeof navigator && navigator && "string" == typeof navigator.userAgent && (a = navigator.userAgent);
    var b = 0 == a.indexOf("Opera");
    return {
        jscript: {
            HAS_JSCRIPT: "ScriptEngine" in this
        },
        OPERA: b,
        IE: !b && -1 != a.indexOf("MSIE"),
        WEBKIT: !b && -1 != a.indexOf("WebKit")
    };
}()), goog.asserts || (goog.asserts = {
    assert: function(a) {
        if (!a) throw Error("Assertion error");
    },
    fail: function() {}
}), goog.dom || (goog.dom = {}, goog.dom.DomHelper = function(a) {
    this.document_ = a || document;
}, goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_;
}, goog.dom.DomHelper.prototype.createElement = function(a) {
    return this.document_.createElement(a);
}, goog.dom.DomHelper.prototype.createDocumentFragment = function() {
    return this.document_.createDocumentFragment();
}), goog.format || (goog.format = {
    insertWordBreaks: function(a, b) {
        a += "";
        for (var c = [], d = 0, e = !1, f = !1, g = 0, h = 0, i = 0, j = a.length; j > i; ++i) {
            var k = a.charCodeAt(i);
            if (b > g || 32 == k || (c[d++] = a.substring(h, i), h = i, c[d++] = goog.format.WORD_BREAK, 
            g = 0), e) 62 == k && (e = !1); else if (f) switch (k) {
              case 59:
                f = !1, ++g;
                break;

              case 60:
                f = !1, e = !0;
                break;

              case 32:
                f = !1, g = 0;
            } else switch (k) {
              case 60:
                e = !0;
                break;

              case 38:
                f = !0;
                break;

              case 32:
                g = 0;
                break;

              default:
                ++g;
            }
        }
        return c[d++] = a.substring(h), c.join("");
    },
    WORD_BREAK: goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : "<wbr>"
}), goog.i18n || (goog.i18n = {
    bidi: {
        detectRtlDirectionality: function(a, b) {
            return a = soyshim.$$bidiStripHtmlIfNecessary_(a, b), soyshim.$$bidiRtlWordRatio_(a) > soyshim.$$bidiRtlDetectionThreshold_;
        }
    }
}), goog.i18n.bidi.Dir = {
    RTL: -1,
    UNKNOWN: 0,
    LTR: 1
}, goog.i18n.bidi.toDir = function(a) {
    return "number" == typeof a ? a > 0 ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
}, goog.i18n.BidiFormatter = function(a) {
    this.dir_ = goog.i18n.bidi.toDir(a);
}, goog.i18n.BidiFormatter.prototype.dirAttr = function(a, b) {
    var c = soy.$$bidiTextDir(a, b);
    return c && c != this.dir_ ? 0 > c ? 'dir="rtl"' : 'dir="ltr"' : "";
}, goog.i18n.BidiFormatter.prototype.endEdge = function() {
    return this.dir_ < 0 ? "left" : "right";
}, goog.i18n.BidiFormatter.prototype.mark = function() {
    return this.dir_ > 0 ? "‎" : this.dir_ < 0 ? "‏" : "";
}, goog.i18n.BidiFormatter.prototype.markAfter = function(a, b) {
    var c = soy.$$bidiTextDir(a, b);
    return soyshim.$$bidiMarkAfterKnownDir_(this.dir_, c, a, b);
}, goog.i18n.BidiFormatter.prototype.spanWrap = function(a) {
    a += "";
    var c = soy.$$bidiTextDir(a, !0), d = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, c, a, !0);
    return c > 0 && this.dir_ <= 0 ? a = '<span dir="ltr">' + a + "</span>" : 0 > c && this.dir_ >= 0 && (a = '<span dir="rtl">' + a + "</span>"), 
    a + d;
}, goog.i18n.BidiFormatter.prototype.startEdge = function() {
    return this.dir_ < 0 ? "right" : "left";
}, goog.i18n.BidiFormatter.prototype.unicodeWrap = function(a) {
    a += "";
    var c = soy.$$bidiTextDir(a, !0), d = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, c, a, !0);
    return c > 0 && this.dir_ <= 0 ? a = "‪" + a + "‬" : 0 > c && this.dir_ >= 0 && (a = "‫" + a + "‬"), 
    a + d;
}, goog.string = {
    newLineToBr: function(a, b) {
        return a += "", goog.string.NEWLINE_TO_BR_RE_.test(a) ? a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>") : a;
    },
    urlEncode: encodeURIComponent,
    NEWLINE_TO_BR_RE_: /[\r\n]/
}, goog.string.StringBuffer = function(a) {
    this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "", null != a && this.append.apply(this, arguments);
}, goog.string.StringBuffer.prototype.bufferLength_ = 0, goog.string.StringBuffer.prototype.append = function(a, b) {
    if (goog.userAgent.jscript.HAS_JSCRIPT) if (null == b) this.buffer_[this.bufferLength_++] = a; else {
        var d = this.buffer_;
        d.push.apply(d, arguments), this.bufferLength_ = this.buffer_.length;
    } else if (this.buffer_ += a, null != b) for (var e = 1; e < arguments.length; e++) this.buffer_ += arguments[e];
    return this;
}, goog.string.StringBuffer.prototype.clear = function() {
    goog.userAgent.jscript.HAS_JSCRIPT ? (this.buffer_.length = 0, this.bufferLength_ = 0) : this.buffer_ = "";
}, goog.string.StringBuffer.prototype.toString = function() {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        var a = this.buffer_.join("");
        return this.clear(), a && this.append(a), a;
    }
    return this.buffer_;
}, goog.soy || (goog.soy = {
    renderAsElement: function(a, b, c, d) {
        return soyshim.$$renderWithWrapper_(a, b, d, !0, c);
    },
    renderAsFragment: function(a, b, c, d) {
        return soyshim.$$renderWithWrapper_(a, b, d, !1, c);
    },
    renderElement: function(a, b, c, d) {
        a.innerHTML = b(c, null, d);
    },
    data: {}
}), goog.soy.data.SanitizedContentKind = {
    HTML: {},
    JS: goog.DEBUG ? {
        sanitizedContentJsStrChars: !0
    } : {},
    JS_STR_CHARS: {},
    URI: {},
    ATTRIBUTES: goog.DEBUG ? {
        sanitizedContentHtmlAttribute: !0
    } : {},
    CSS: {},
    TEXT: {}
}, goog.soy.data.SanitizedContent = function() {
    throw Error("Do not instantiate directly");
}, goog.soy.data.SanitizedContent.prototype.contentKind, goog.soy.data.SanitizedContent.prototype.content, 
goog.soy.data.SanitizedContent.prototype.toString = function() {
    return this.content;
};

var soy = {
    esc: {}
}, soydata = {};

soydata.VERY_UNSAFE = {};

var soyshim = {
    $$DEFAULT_TEMPLATE_DATA_: {}
};

soyshim.$$renderWithWrapper_ = function(a, b, c, d, e) {
    var f = c || document, g = f.createElement("div");
    if (g.innerHTML = a(b || soyshim.$$DEFAULT_TEMPLATE_DATA_, void 0, e), 1 == g.childNodes.length) {
        var h = g.firstChild;
        if (!d || 1 == h.nodeType) return h;
    }
    if (d) return g;
    for (var i = f.createDocumentFragment(); g.firstChild; ) i.appendChild(g.firstChild);
    return i;
}, soyshim.$$bidiMarkAfterKnownDir_ = function(a, b, c, d) {
    return a > 0 && (0 > b || soyshim.$$bidiIsRtlExitText_(c, d)) ? "‎" : 0 > a && (b > 0 || soyshim.$$bidiIsLtrExitText_(c, d)) ? "‏" : "";
}, soyshim.$$bidiStripHtmlIfNecessary_ = function(a, b) {
    return b ? a.replace(soyshim.$$BIDI_HTML_SKIP_RE_, " ") : a;
}, soyshim.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g, soyshim.$$bidiLtrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿", 
soyshim.$$bidiNeutralChars_ = "\x00- !-@[-`{-¿×÷ʹ-˿ -⯿", soyshim.$$bidiRtlChars_ = "֑-߿יִ-﷽ﹰ-ﻼ", 
soyshim.$$bidiRtlDirCheckRe_ = RegExp("^[^" + soyshim.$$bidiLtrChars_ + "]*[" + soyshim.$$bidiRtlChars_ + "]"), 
soyshim.$$bidiNeutralDirCheckRe_ = RegExp("^[" + soyshim.$$bidiNeutralChars_ + "]*$|^http://"), 
soyshim.$$bidiIsRtlText_ = function(a) {
    return soyshim.$$bidiRtlDirCheckRe_.test(a);
}, soyshim.$$bidiIsNeutralText_ = function(a) {
    return soyshim.$$bidiNeutralDirCheckRe_.test(a);
}, soyshim.$$bidiRtlDetectionThreshold_ = .4, soyshim.$$bidiRtlWordRatio_ = function(a) {
    for (var b = 0, c = 0, d = a.split(" "), e = 0; e < d.length; e++) soyshim.$$bidiIsRtlText_(d[e]) ? (b++, 
    c++) : soyshim.$$bidiIsNeutralText_(d[e]) || c++;
    return 0 == c ? 0 : b / c;
}, soyshim.$$bidiLtrExitDirCheckRe_ = RegExp("[" + soyshim.$$bidiLtrChars_ + "][^" + soyshim.$$bidiRtlChars_ + "]*$"), 
soyshim.$$bidiRtlExitDirCheckRe_ = RegExp("[" + soyshim.$$bidiRtlChars_ + "][^" + soyshim.$$bidiLtrChars_ + "]*$"), 
soyshim.$$bidiIsLtrExitText_ = function(a, b) {
    return a = soyshim.$$bidiStripHtmlIfNecessary_(a, b), soyshim.$$bidiLtrExitDirCheckRe_.test(a);
}, soyshim.$$bidiIsRtlExitText_ = function(a, b) {
    return a = soyshim.$$bidiStripHtmlIfNecessary_(a, b), soyshim.$$bidiRtlExitDirCheckRe_.test(a);
}, soy.StringBuilder = goog.string.StringBuffer, soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind, 
soydata.SanitizedHtml = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent), soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML, 
soydata.SanitizedJs = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedJs, goog.soy.data.SanitizedContent), soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS, 
soydata.SanitizedJsStrChars = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedJsStrChars, goog.soy.data.SanitizedContent), soydata.SanitizedJsStrChars.prototype.contentKind = soydata.SanitizedContentKind.JS_STR_CHARS, 
soydata.SanitizedUri = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent), soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI, 
soydata.SanitizedHtmlAttribute = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedHtmlAttribute, goog.soy.data.SanitizedContent), 
soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES, 
soydata.SanitizedCss = function() {
    goog.soy.data.SanitizedContent.call(this);
}, goog.inherits(soydata.SanitizedCss, goog.soy.data.SanitizedContent), soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS, 
soydata.UnsanitizedText = function(a) {
    this.content = a + "";
}, goog.inherits(soydata.UnsanitizedText, goog.soy.data.SanitizedContent), soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT, 
soydata.$$makeSanitizedContentFactory_ = function(a) {
    function b() {}
    return b.prototype = a.prototype, function(a) {
        var c = new b();
        return c.content = a + "", c;
    };
}, soydata.markUnsanitizedText = function(a) {
    return new soydata.UnsanitizedText(a);
}, soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml), 
soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJs), 
soydata.VERY_UNSAFE.ordainSanitizedJsStrChars = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJsStrChars), 
soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedUri), 
soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtmlAttribute), 
soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedCss), 
soy.renderElement = goog.soy.renderElement, soy.renderAsFragment = function(a, b, c, d) {
    return goog.soy.renderAsFragment(a, b, d, new goog.dom.DomHelper(c));
}, soy.renderAsElement = function(a, b, c, d) {
    return goog.soy.renderAsElement(a, b, d, new goog.dom.DomHelper(c));
}, soy.$$augmentMap = function(a, b) {
    function c() {}
    c.prototype = a;
    var d = new c();
    for (var e in b) d[e] = b[e];
    return d;
}, soy.$$checkMapKey = function(a) {
    if ("string" != typeof a) throw Error("Map literal's key expression must evaluate to string (encountered type \"" + typeof a + '").');
    return a;
}, soy.$$getMapKeys = function(a) {
    var b = [];
    for (var c in a) b.push(c);
    return b;
}, soy.$$getDelTemplateId = function(a) {
    return a;
}, soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {}, soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {}, 
soy.$$registerDelegateFn = function(a, b, c, d) {
    var e = "key_" + a + ":" + b, f = soy.$$DELEGATE_REGISTRY_PRIORITIES_[e];
    if (void 0 === f || c > f) soy.$$DELEGATE_REGISTRY_PRIORITIES_[e] = c, soy.$$DELEGATE_REGISTRY_FUNCTIONS_[e] = d; else if (c == f) throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
}, soy.$$getDelegateFn = function(a, b, c) {
    var d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":" + b];
    if (d || "" == b || (d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":"]), 
    d) return d;
    if (c) return soy.$$EMPTY_TEMPLATE_FN_;
    throw Error('Found no active impl for delegate call to "' + a + ":" + b + '" (and not allowemptydefault="true").');
}, soy.$$EMPTY_TEMPLATE_FN_ = function() {
    return "";
}, soy.$$escapeHtml = function(a) {
    return a && a.contentKind && a.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), 
    a.content) : soy.esc.$$escapeHtmlHelper(a);
}, soy.$$cleanHtml = function(a) {
    return a && a.contentKind && a.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), 
    a.content) : soy.$$stripHtmlTags(a, soy.esc.$$SAFE_TAG_WHITELIST_);
}, soy.$$escapeHtmlRcdata = function(a) {
    return a && a.contentKind && a.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), 
    soy.esc.$$normalizeHtmlHelper(a.content)) : soy.esc.$$escapeHtmlHelper(a);
}, soy.$$HTML5_VOID_ELEMENTS_ = RegExp("^<(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\\b"), 
soy.$$stripHtmlTags = function(a, b) {
    if (!b) return (a + "").replace(soy.esc.$$HTML_TAG_REGEX_, "").replace(soy.esc.$$LT_REGEX_, "&lt;");
    var c = (a + "").replace(/\[/g, "&#91;"), d = [];
    c = c.replace(soy.esc.$$HTML_TAG_REGEX_, function(a, c) {
        if (c && (c = c.toLowerCase(), b.hasOwnProperty(c) && b[c])) {
            var e = "/" === a.charAt(1) ? "</" : "<", f = d.length;
            return d[f] = e + c + ">", "[" + f + "]";
        }
        return "";
    }), c = soy.esc.$$normalizeHtmlHelper(c);
    var e = soy.$$balanceTags_(d);
    return c = c.replace(/\[(\d+)\]/g, function(a, b) {
        return d[b];
    }), c + e;
}, soy.$$balanceTags_ = function(a) {
    for (var b = [], c = 0, d = a.length; d > c; ++c) {
        var e = a[c];
        if ("/" === e.charAt(1)) {
            for (var f = b.length - 1; f >= 0 && b[f] != e; ) f--;
            0 > f ? a[c] = "" : (a[c] = b.slice(f).reverse().join(""), b.length = f);
        } else soy.$$HTML5_VOID_ELEMENTS_.test(e) || b.push("</" + e.substring(1));
    }
    return b.reverse().join("");
}, soy.$$escapeHtmlAttribute = function(a) {
    return a && a.contentKind && a.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), 
    soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(a.content))) : soy.esc.$$escapeHtmlHelper(a);
}, soy.$$escapeHtmlAttributeNospace = function(a) {
    return a && a.contentKind && a.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), 
    soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(a.content))) : soy.esc.$$escapeHtmlNospaceHelper(a);
}, soy.$$filterHtmlAttributes = function(a) {
    return a && a.contentKind === goog.soy.data.SanitizedContentKind.ATTRIBUTES ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtmlAttribute), 
    a.content.replace(/([^"'\s])$/, "$1 ")) : soy.esc.$$filterHtmlAttributesHelper(a);
}, soy.$$filterHtmlElementName = function(a) {
    return soy.esc.$$filterHtmlElementNameHelper(a);
}, soy.$$escapeJs = function(a) {
    return soy.$$escapeJsString(a);
}, soy.$$escapeJsString = function(a) {
    return a && a.contentKind === goog.soy.data.SanitizedContentKind.JS_STR_CHARS ? (goog.asserts.assert(a.constructor === soydata.SanitizedJsStrChars), 
    a.content) : soy.esc.$$escapeJsStringHelper(a);
}, soy.$$escapeJsValue = function(a) {
    if (null == a) return " null ";
    if (a.contentKind == goog.soy.data.SanitizedContentKind.JS) return goog.asserts.assert(a.constructor === soydata.SanitizedJs), 
    a.content;
    switch (typeof a) {
      case "boolean":
      case "number":
        return " " + a + " ";

      default:
        return "'" + soy.esc.$$escapeJsStringHelper(a + "") + "'";
    }
}, soy.$$escapeJsRegex = function(a) {
    return soy.esc.$$escapeJsRegexHelper(a);
}, soy.$$problematicUriMarks_ = /['()]/g, soy.$$pctEncode_ = function(a) {
    return "%" + a.charCodeAt(0).toString(16);
}, soy.$$escapeUri = function(a) {
    if (a && a.contentKind === goog.soy.data.SanitizedContentKind.URI) return goog.asserts.assert(a.constructor === soydata.SanitizedUri), 
    soy.$$normalizeUri(a);
    var b = soy.esc.$$escapeUriHelper(a);
    return soy.$$problematicUriMarks_.lastIndex = 0, soy.$$problematicUriMarks_.test(b) ? b.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_) : b;
}, soy.$$normalizeUri = function(a) {
    return soy.esc.$$normalizeUriHelper(a);
}, soy.$$filterNormalizeUri = function(a) {
    return a && a.contentKind == goog.soy.data.SanitizedContentKind.URI ? (goog.asserts.assert(a.constructor === soydata.SanitizedUri), 
    soy.$$normalizeUri(a)) : soy.esc.$$filterNormalizeUriHelper(a);
}, soy.$$escapeCssString = function(a) {
    return soy.esc.$$escapeCssStringHelper(a);
}, soy.$$filterCssValue = function(a) {
    return a && a.contentKind === goog.soy.data.SanitizedContentKind.CSS ? (goog.asserts.assert(a.constructor === soydata.SanitizedCss), 
    a.content) : null == a ? "" : soy.esc.$$filterCssValueHelper(a);
}, soy.$$filterNoAutoescape = function(a) {
    return a && a.contentKind === goog.soy.data.SanitizedContentKind.TEXT ? (goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [ a.content ]), 
    "zSoyz") : a + "";
}, soy.$$changeNewlineToBr = function(a) {
    return goog.string.newLineToBr(a + "", !1);
}, soy.$$insertWordBreaks = function(a, b) {
    return goog.format.insertWordBreaks(a + "", b);
}, soy.$$truncate = function(a, b, c) {
    return a += "", a.length > b ? (c && (b > 3 ? b -= 3 : c = !1), soy.$$isHighSurrogate_(a.charAt(b - 1)) && soy.$$isLowSurrogate_(a.charAt(b)) && (b -= 1), 
    a = a.substring(0, b), c && (a += "..."), a) : a;
}, soy.$$isHighSurrogate_ = function(a) {
    return a >= 55296 && 56319 >= a;
}, soy.$$isLowSurrogate_ = function(a) {
    return a >= 56320 && 57343 >= a;
}, soy.$$bidiFormatterCache_ = {}, soy.$$getBidiFormatterInstance_ = function(a) {
    return soy.$$bidiFormatterCache_[a] || (soy.$$bidiFormatterCache_[a] = new goog.i18n.BidiFormatter(a));
}, soy.$$bidiTextDir = function(a, b) {
    return a ? goog.i18n.bidi.detectRtlDirectionality(a, b) ? -1 : 1 : 0;
}, soy.$$bidiDirAttr = function(a, b, c) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_(a).dirAttr(b, c));
}, soy.$$bidiMarkAfter = function(a, b, c) {
    var d = soy.$$getBidiFormatterInstance_(a);
    return d.markAfter(b, c);
}, soy.$$bidiSpanWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a);
    return c.spanWrap(b + "", !0);
}, soy.$$bidiUnicodeWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a);
    return c.unicodeWrap(b + "", !0);
}, soy.esc.$$escapeUriHelper = function(a) {
    return encodeURIComponent(a + "");
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
    "\x00": "&#0;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "<": "&lt;",
    ">": "&gt;",
    "	": "&#9;",
    "\n": "&#10;",
    "": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    "-": "&#45;",
    "/": "&#47;",
    "=": "&#61;",
    "`": "&#96;",
    "": "&#133;",
    " ": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;"
}, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[a];
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
    "\x00": "\\x00",
    "\b": "\\x08",
    "	": "\\t",
    "\n": "\\n",
    "": "\\x0b",
    "\f": "\\f",
    "\r": "\\r",
    '"': "\\x22",
    "&": "\\x26",
    "'": "\\x27",
    "/": "\\/",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "\\": "\\\\",
    "": "\\x85",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
    $: "\\x24",
    "(": "\\x28",
    ")": "\\x29",
    "*": "\\x2a",
    "+": "\\x2b",
    ",": "\\x2c",
    "-": "\\x2d",
    ".": "\\x2e",
    ":": "\\x3a",
    "?": "\\x3f",
    "[": "\\x5b",
    "]": "\\x5d",
    "^": "\\x5e",
    "{": "\\x7b",
    "|": "\\x7c",
    "}": "\\x7d"
}, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[a];
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
    "\x00": "\\0 ",
    "\b": "\\8 ",
    "	": "\\9 ",
    "\n": "\\a ",
    "": "\\b ",
    "\f": "\\c ",
    "\r": "\\d ",
    '"': "\\22 ",
    "&": "\\26 ",
    "'": "\\27 ",
    "(": "\\28 ",
    ")": "\\29 ",
    "*": "\\2a ",
    "/": "\\2f ",
    ":": "\\3a ",
    ";": "\\3b ",
    "<": "\\3c ",
    "=": "\\3d ",
    ">": "\\3e ",
    "@": "\\40 ",
    "\\": "\\5c ",
    "{": "\\7b ",
    "}": "\\7d ",
    "": "\\85 ",
    " ": "\\a0 ",
    "\u2028": "\\2028 ",
    "\u2029": "\\2029 "
}, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[a];
}, soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {
    "\x00": "%00",
    "": "%01",
    "": "%02",
    "": "%03",
    "": "%04",
    "": "%05",
    "": "%06",
    "": "%07",
    "\b": "%08",
    "	": "%09",
    "\n": "%0A",
    "": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "": "%0E",
    "": "%0F",
    "": "%10",
    "": "%11",
    "": "%12",
    "": "%13",
    "": "%14",
    "": "%15",
    "": "%16",
    "": "%17",
    "": "%18",
    "": "%19",
    "": "%1A",
    "": "%1B",
    "": "%1C",
    "": "%1D",
    "": "%1E",
    "": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "": "%7F",
    "": "%C2%85",
    " ": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "！": "%EF%BC%81",
    "＃": "%EF%BC%83",
    "＄": "%EF%BC%84",
    "＆": "%EF%BC%86",
    "＇": "%EF%BC%87",
    "（": "%EF%BC%88",
    "）": "%EF%BC%89",
    "＊": "%EF%BC%8A",
    "＋": "%EF%BC%8B",
    "，": "%EF%BC%8C",
    "／": "%EF%BC%8F",
    "：": "%EF%BC%9A",
    "；": "%EF%BC%9B",
    "＝": "%EF%BC%9D",
    "？": "%EF%BC%9F",
    "＠": "%EF%BC%A0",
    "［": "%EF%BC%BB",
    "］": "%EF%BC%BD"
}, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[a];
}, soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g, soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g, 
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g, 
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g, 
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g, 
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g, 
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g, 
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g, 
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i, 
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i, 
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i, 
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i, 
soy.esc.$$escapeHtmlHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
}, soy.esc.$$normalizeHtmlHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
}, soy.esc.$$escapeHtmlNospaceHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
}, soy.esc.$$normalizeHtmlNospaceHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
}, soy.esc.$$escapeJsStringHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
}, soy.esc.$$escapeJsRegexHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
}, soy.esc.$$escapeCssStringHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_);
}, soy.esc.$$filterCssValueHelper = function(a) {
    var b = a + "";
    return soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(b) ? b : "zSoyz";
}, soy.esc.$$normalizeUriHelper = function(a) {
    var b = a + "";
    return b.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);
}, soy.esc.$$filterNormalizeUriHelper = function(a) {
    var b = a + "";
    return soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(b) ? b.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_) : "#zSoyz";
}, soy.esc.$$filterHtmlAttributesHelper = function(a) {
    var b = a + "";
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(b) ? b : "zSoyz";
}, soy.esc.$$filterHtmlElementNameHelper = function(a) {
    var b = a + "";
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(b) ? b : "zSoyz";
}, soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g, 
soy.esc.$$LT_REGEX_ = /</g, soy.esc.$$SAFE_TAG_WHITELIST_ = {
    b: 1,
    br: 1,
    em: 1,
    i: 1,
    s: 1,
    sub: 1,
    sup: 1,
    u: 1
}, xnCompiler2471576.a2 = function() {
    if (void 0 === a) var a = {};
    return a.dep = function() {
        return '<p class="dep">test deps</p>';
    }, xnCompiler2471576.a1, a.dep;
}.call(xnCompiler2471576_g, xnCompiler2471576.a1), xnCompiler2471576.a0 = function() {
    if (void 0 === a) var a = {};
    return a.index = function(b) {
        return soy.$$escapeHtml(b.data) + ':<a class="test-zdmgr">hello world!</a>' + a.dep(null);
    }, a.dep = xnCompiler2471576.a2, a.index;
}.call(xnCompiler2471576_g, xnCompiler2471576.a2, xnCompiler2471576.a1), function() {
    var a = xnCompiler2471576.a0, b = document.createElement("div");
    b.innerHTML = a({
        data: "信念"
    }), document.body.appendChild(b), console.log("欢迎");
}.call(xnCompiler2471576_g, xnCompiler2471576.a0);