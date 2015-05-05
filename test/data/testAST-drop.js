if (typeof xnCompiler2471576 == "undefined") {
    var xnCompiler2471576 = {}, xnCompiler2471576_cache = {}, xnCompiler2471576_g = typeof window == "undefined" ? global : window;
}
var goog = goog || {};
goog.DEBUG = false;
goog.inherits = function(childCtor, parentCtor) {
    function tempCtor() {}
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
};
if (!goog.userAgent) {
    goog.userAgent = function() {
        var userAgent = "";
        if ("undefined" !== typeof navigator && navigator && "string" == typeof navigator.userAgent) {
            userAgent = navigator.userAgent;
        }
        var isOpera = userAgent.indexOf("Opera") == 0;
        return {
            jscript: {
                HAS_JSCRIPT: "ScriptEngine" in this
            },
            OPERA: isOpera,
            IE: !isOpera && userAgent.indexOf("MSIE") != -1,
            WEBKIT: !isOpera && userAgent.indexOf("WebKit") != -1
        };
    }();
}
if (!goog.asserts) {
    goog.asserts = {
        assert: function(condition) {
            if (!condition) {
                throw Error("Assertion error");
            }
        },
        fail: function(var_args) {}
    };
}
if (!goog.dom) {
    goog.dom = {};
    goog.dom.DomHelper = function(d) {
        this.document_ = d || document;
    };
    goog.dom.DomHelper.prototype.getDocument = function() {
        return this.document_;
    };
    goog.dom.DomHelper.prototype.createElement = function(name) {
        return this.document_.createElement(name);
    };
    goog.dom.DomHelper.prototype.createDocumentFragment = function() {
        return this.document_.createDocumentFragment();
    };
}
if (!goog.format) {
    goog.format = {
        insertWordBreaks: function(str, maxCharsBetweenWordBreaks) {
            str = String(str);
            var resultArr = [];
            var resultArrLen = 0;
            var isInTag = false;
            var isMaybeInEntity = false;
            var numCharsWithoutBreak = 0;
            var flushIndex = 0;
            for (var i = 0, n = str.length; i < n; ++i) {
                var charCode = str.charCodeAt(i);
                if (numCharsWithoutBreak >= maxCharsBetweenWordBreaks && charCode != 32) {
                    resultArr[resultArrLen++] = str.substring(flushIndex, i);
                    flushIndex = i;
                    resultArr[resultArrLen++] = goog.format.WORD_BREAK;
                    numCharsWithoutBreak = 0;
                }
                if (isInTag) {
                    if (charCode == 62) {
                        isInTag = false;
                    }
                } else if (isMaybeInEntity) {
                    switch (charCode) {
                        case 59:
                            isMaybeInEntity = false;
                            ++numCharsWithoutBreak;
                            break;

                        case 60:
                            isMaybeInEntity = false;
                            isInTag = true;
                            break;

                        case 32:
                            isMaybeInEntity = false;
                            numCharsWithoutBreak = 0;
                            break;
                    }
                } else {
                    switch (charCode) {
                        case 60:
                            isInTag = true;
                            break;

                        case 38:
                            isMaybeInEntity = true;
                            break;

                        case 32:
                            numCharsWithoutBreak = 0;
                            break;

                        default:
                            ++numCharsWithoutBreak;
                            break;
                    }
                }
            }
            resultArr[resultArrLen++] = str.substring(flushIndex);
            return resultArr.join("");
        },
        WORD_BREAK: goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : "<wbr>"
    };
}
if (!goog.i18n) {
    goog.i18n = {
        bidi: {
            detectRtlDirectionality: function(text, opt_isHtml) {
                text = soyshim.$$bidiStripHtmlIfNecessary_(text, opt_isHtml);
                return soyshim.$$bidiRtlWordRatio_(text) > soyshim.$$bidiRtlDetectionThreshold_;
            }
        }
    };
}
goog.i18n.bidi.Dir = {
    RTL: -1,
    UNKNOWN: 0,
    LTR: 1
};
goog.i18n.bidi.toDir = function(givenDir) {
    if (typeof givenDir == "number") {
        return givenDir > 0 ? goog.i18n.bidi.Dir.LTR : givenDir < 0 ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN;
    } else {
        return givenDir ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    }
};
goog.i18n.BidiFormatter = function(dir) {
    this.dir_ = goog.i18n.bidi.toDir(dir);
};
goog.i18n.BidiFormatter.prototype.dirAttr = function(text, opt_isHtml) {
    var dir = soy.$$bidiTextDir(text, opt_isHtml);
    return dir && dir != this.dir_ ? dir < 0 ? 'dir="rtl"' : 'dir="ltr"' : "";
};
goog.i18n.BidiFormatter.prototype.endEdge = function() {
    return this.dir_ < 0 ? "left" : "right";
};
goog.i18n.BidiFormatter.prototype.mark = function() {
    return this.dir_ > 0 ? "‎" : this.dir_ < 0 ? "‏" : "";
};
goog.i18n.BidiFormatter.prototype.markAfter = function(text, opt_isHtml) {
    var dir = soy.$$bidiTextDir(text, opt_isHtml);
    return soyshim.$$bidiMarkAfterKnownDir_(this.dir_, dir, text, opt_isHtml);
};
goog.i18n.BidiFormatter.prototype.spanWrap = function(str, placeholder) {
    str = String(str);
    var textDir = soy.$$bidiTextDir(str, true);
    var reset = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, textDir, str, true);
    if (textDir > 0 && this.dir_ <= 0) {
        str = '<span dir="ltr">' + str + "</span>";
    } else if (textDir < 0 && this.dir_ >= 0) {
        str = '<span dir="rtl">' + str + "</span>";
    }
    return str + reset;
};
goog.i18n.BidiFormatter.prototype.startEdge = function() {
    return this.dir_ < 0 ? "right" : "left";
};
goog.i18n.BidiFormatter.prototype.unicodeWrap = function(str, placeholder) {
    str = String(str);
    var textDir = soy.$$bidiTextDir(str, true);
    var reset = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, textDir, str, true);
    if (textDir > 0 && this.dir_ <= 0) {
        str = "‪" + str + "‬";
    } else if (textDir < 0 && this.dir_ >= 0) {
        str = "‫" + str + "‬";
    }
    return str + reset;
};
goog.string = {
    newLineToBr: function(str, opt_xml) {
        str = String(str);
        if (!goog.string.NEWLINE_TO_BR_RE_.test(str)) {
            return str;
        }
        return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
    },
    urlEncode: encodeURIComponent,
    NEWLINE_TO_BR_RE_: /[\r\n]/
};
goog.string.StringBuffer = function(opt_a1, var_args) {
    this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
    if (opt_a1 != null) {
        this.append.apply(this, arguments);
    }
};
goog.string.StringBuffer.prototype.bufferLength_ = 0;
goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        if (opt_a2 == null) {
            this.buffer_[this.bufferLength_++] = a1;
        } else {
            var arr = this.buffer_;
            arr.push.apply(arr, arguments);
            this.bufferLength_ = this.buffer_.length;
        }
    } else {
        this.buffer_ += a1;
        if (opt_a2 != null) {
            for (var i = 1; i < arguments.length; i++) {
                this.buffer_ += arguments[i];
            }
        }
    }
    return this;
};
goog.string.StringBuffer.prototype.clear = function() {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        this.buffer_.length = 0;
        this.bufferLength_ = 0;
    } else {
        this.buffer_ = "";
    }
};
goog.string.StringBuffer.prototype.toString = function() {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        var str = this.buffer_.join("");
        this.clear();
        if (str) {
            this.append(str);
        }
        return str;
    } else {
        return this.buffer_;
    }
};
if (!goog.soy) goog.soy = {
    renderAsElement: function(template, opt_templateData, opt_injectedData, opt_dom) {
        return soyshim.$$renderWithWrapper_(template, opt_templateData, opt_dom, true, opt_injectedData);
    },
    renderAsFragment: function(template, opt_templateData, opt_injectedData, opt_dom) {
        return soyshim.$$renderWithWrapper_(template, opt_templateData, opt_dom, false, opt_injectedData);
    },
    renderElement: function(element, template, opt_templateData, opt_injectedData) {
        element.innerHTML = template(opt_templateData, null, opt_injectedData);
    },
    data: {}
};
goog.soy.data.SanitizedContentKind = {
    HTML: {},
    JS: goog.DEBUG ? {
        sanitizedContentJsStrChars: true
    } : {},
    JS_STR_CHARS: {},
    URI: {},
    ATTRIBUTES: goog.DEBUG ? {
        sanitizedContentHtmlAttribute: true
    } : {},
    CSS: {},
    TEXT: {}
};
goog.soy.data.SanitizedContent = function() {
    throw Error("Do not instantiate directly");
};
goog.soy.data.SanitizedContent.prototype.contentKind;
goog.soy.data.SanitizedContent.prototype.content;
goog.soy.data.SanitizedContent.prototype.toString = function() {
    return this.content;
};
var soy = {
    esc: {}
};
var soydata = {};
soydata.VERY_UNSAFE = {};
var soyshim = {
    $$DEFAULT_TEMPLATE_DATA_: {}
};
soyshim.$$renderWithWrapper_ = function(template, opt_templateData, opt_dom, opt_asElement, opt_injectedData) {
    var dom = opt_dom || document;
    var wrapper = dom.createElement("div");
    wrapper.innerHTML = template(opt_templateData || soyshim.$$DEFAULT_TEMPLATE_DATA_, undefined, opt_injectedData);
    if (wrapper.childNodes.length == 1) {
        var firstChild = wrapper.firstChild;
        if (!opt_asElement || firstChild.nodeType == 1) {
            return firstChild;
        }
    }
    if (opt_asElement) {
        return wrapper;
    }
    var fragment = dom.createDocumentFragment();
    while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
    }
    return fragment;
};
soyshim.$$bidiMarkAfterKnownDir_ = function(bidiGlobalDir, dir, text, opt_isHtml) {
    return bidiGlobalDir > 0 && (dir < 0 || soyshim.$$bidiIsRtlExitText_(text, opt_isHtml)) ? "‎" : bidiGlobalDir < 0 && (dir > 0 || soyshim.$$bidiIsLtrExitText_(text, opt_isHtml)) ? "‏" : "";
};
soyshim.$$bidiStripHtmlIfNecessary_ = function(str, opt_isHtml) {
    return opt_isHtml ? str.replace(soyshim.$$BIDI_HTML_SKIP_RE_, " ") : str;
};
soyshim.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g;
soyshim.$$bidiLtrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿" + "Ⰰ-﬜﷾-﹯﻽-￿";
soyshim.$$bidiNeutralChars_ = "\x00- !-@[-`{-¿×÷ʹ-˿ -⯿";
soyshim.$$bidiRtlChars_ = "֑-߿יִ-﷽ﹰ-ﻼ";
soyshim.$$bidiRtlDirCheckRe_ = new RegExp("^[^" + soyshim.$$bidiLtrChars_ + "]*[" + soyshim.$$bidiRtlChars_ + "]");
soyshim.$$bidiNeutralDirCheckRe_ = new RegExp("^[" + soyshim.$$bidiNeutralChars_ + "]*$|^http://");
soyshim.$$bidiIsRtlText_ = function(str) {
    return soyshim.$$bidiRtlDirCheckRe_.test(str);
};
soyshim.$$bidiIsNeutralText_ = function(str) {
    return soyshim.$$bidiNeutralDirCheckRe_.test(str);
};
soyshim.$$bidiRtlDetectionThreshold_ = .4;
soyshim.$$bidiRtlWordRatio_ = function(str) {
    var rtlCount = 0;
    var totalCount = 0;
    var tokens = str.split(" ");
    for (var i = 0; i < tokens.length; i++) {
        if (soyshim.$$bidiIsRtlText_(tokens[i])) {
            rtlCount++;
            totalCount++;
        } else if (!soyshim.$$bidiIsNeutralText_(tokens[i])) {
            totalCount++;
        }
    }
    return totalCount == 0 ? 0 : rtlCount / totalCount;
};
soyshim.$$bidiLtrExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiLtrChars_ + "][^" + soyshim.$$bidiRtlChars_ + "]*$");
soyshim.$$bidiRtlExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiRtlChars_ + "][^" + soyshim.$$bidiLtrChars_ + "]*$");
soyshim.$$bidiIsLtrExitText_ = function(str, opt_isHtml) {
    str = soyshim.$$bidiStripHtmlIfNecessary_(str, opt_isHtml);
    return soyshim.$$bidiLtrExitDirCheckRe_.test(str);
};
soyshim.$$bidiIsRtlExitText_ = function(str, opt_isHtml) {
    str = soyshim.$$bidiStripHtmlIfNecessary_(str, opt_isHtml);
    return soyshim.$$bidiRtlExitDirCheckRe_.test(str);
};
soy.StringBuilder = goog.string.StringBuffer;
soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;
soydata.SanitizedHtml = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;
soydata.SanitizedJs = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedJs, goog.soy.data.SanitizedContent);
soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS;
soydata.SanitizedJsStrChars = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedJsStrChars, goog.soy.data.SanitizedContent);
soydata.SanitizedJsStrChars.prototype.contentKind = soydata.SanitizedContentKind.JS_STR_CHARS;
soydata.SanitizedUri = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;
soydata.SanitizedHtmlAttribute = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedHtmlAttribute, goog.soy.data.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES;
soydata.SanitizedCss = function() {
    goog.soy.data.SanitizedContent.call(this);
};
goog.inherits(soydata.SanitizedCss, goog.soy.data.SanitizedContent);
soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS;
soydata.UnsanitizedText = function(content) {
    this.content = String(content);
};
goog.inherits(soydata.UnsanitizedText, goog.soy.data.SanitizedContent);
soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;
soydata.$$makeSanitizedContentFactory_ = function(ctor) {
    function InstantiableCtor() {}
    InstantiableCtor.prototype = ctor.prototype;
    return function(content) {
        var result = new InstantiableCtor();
        result.content = String(content);
        return result;
    };
};
soydata.markUnsanitizedText = function(content) {
    return new soydata.UnsanitizedText(content);
};
soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.ordainSanitizedJsStrChars = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJsStrChars);
soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedCss);
soy.renderElement = goog.soy.renderElement;
soy.renderAsFragment = function(template, opt_templateData, opt_document, opt_injectedData) {
    return goog.soy.renderAsFragment(template, opt_templateData, opt_injectedData, new goog.dom.DomHelper(opt_document));
};
soy.renderAsElement = function(template, opt_templateData, opt_document, opt_injectedData) {
    return goog.soy.renderAsElement(template, opt_templateData, opt_injectedData, new goog.dom.DomHelper(opt_document));
};
soy.$$augmentMap = function(baseMap, additionalMap) {
    function TempCtor() {}
    TempCtor.prototype = baseMap;
    var augmentedMap = new TempCtor();
    for (var key in additionalMap) {
        augmentedMap[key] = additionalMap[key];
    }
    return augmentedMap;
};
soy.$$checkMapKey = function(key) {
    if (typeof key != "string") {
        throw Error("Map literal's key expression must evaluate to string" + ' (encountered type "' + typeof key + '").');
    }
    return key;
};
soy.$$getMapKeys = function(map) {
    var mapKeys = [];
    for (var key in map) {
        mapKeys.push(key);
    }
    return mapKeys;
};
soy.$$getDelTemplateId = function(delTemplateName) {
    return delTemplateName;
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};
soy.$$registerDelegateFn = function(delTemplateId, delTemplateVariant, delPriority, delFn) {
    var mapKey = "key_" + delTemplateId + ":" + delTemplateVariant;
    var currPriority = soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];
    if (currPriority === undefined || delPriority > currPriority) {
        soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;
        soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;
    } else if (delPriority == currPriority) {
        throw Error('Encountered two active delegates with the same priority ("' + delTemplateId + ":" + delTemplateVariant + '").');
    } else {}
};
soy.$$getDelegateFn = function(delTemplateId, delTemplateVariant, allowsEmptyDefault) {
    var delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + delTemplateId + ":" + delTemplateVariant];
    if (!delFn && delTemplateVariant != "") {
        delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + delTemplateId + ":"];
    }
    if (delFn) {
        return delFn;
    } else if (allowsEmptyDefault) {
        return soy.$$EMPTY_TEMPLATE_FN_;
    } else {
        throw Error('Found no active impl for delegate call to "' + delTemplateId + ":" + delTemplateVariant + '" (and not allowemptydefault="true").');
    }
};
soy.$$EMPTY_TEMPLATE_FN_ = function(opt_data, opt_sb, opt_ijData) {
    return "";
};
soy.$$escapeHtml = function(value) {
    if (value && value.contentKind && value.contentKind === goog.soy.data.SanitizedContentKind.HTML) {
        goog.asserts.assert(value.constructor === soydata.SanitizedHtml);
        return value.content;
    }
    return soy.esc.$$escapeHtmlHelper(value);
};
soy.$$cleanHtml = function(value) {
    if (value && value.contentKind && value.contentKind === goog.soy.data.SanitizedContentKind.HTML) {
        goog.asserts.assert(value.constructor === soydata.SanitizedHtml);
        return value.content;
    }
    return soy.$$stripHtmlTags(value, soy.esc.$$SAFE_TAG_WHITELIST_);
};
soy.$$escapeHtmlRcdata = function(value) {
    if (value && value.contentKind && value.contentKind === goog.soy.data.SanitizedContentKind.HTML) {
        goog.asserts.assert(value.constructor === soydata.SanitizedHtml);
        return soy.esc.$$normalizeHtmlHelper(value.content);
    }
    return soy.esc.$$escapeHtmlHelper(value);
};
soy.$$HTML5_VOID_ELEMENTS_ = new RegExp("^<(?:area|base|br|col|command|embed|hr|img|input" + "|keygen|link|meta|param|source|track|wbr)\\b");
soy.$$stripHtmlTags = function(value, opt_tagWhitelist) {
    if (!opt_tagWhitelist) {
        return String(value).replace(soy.esc.$$HTML_TAG_REGEX_, "").replace(soy.esc.$$LT_REGEX_, "&lt;");
    }
    var html = String(value).replace(/\[/g, "&#91;");
    var tags = [];
    html = html.replace(soy.esc.$$HTML_TAG_REGEX_, function(tok, tagName) {
        if (tagName) {
            tagName = tagName.toLowerCase();
            if (opt_tagWhitelist.hasOwnProperty(tagName) && opt_tagWhitelist[tagName]) {
                var start = tok.charAt(1) === "/" ? "</" : "<";
                var index = tags.length;
                tags[index] = start + tagName + ">";
                return "[" + index + "]";
            }
        }
        return "";
    });
    html = soy.esc.$$normalizeHtmlHelper(html);
    var finalCloseTags = soy.$$balanceTags_(tags);
    html = html.replace(/\[(\d+)\]/g, function(_, index) {
        return tags[index];
    });
    return html + finalCloseTags;
};
soy.$$balanceTags_ = function(tags) {
    var open = [];
    for (var i = 0, n = tags.length; i < n; ++i) {
        var tag = tags[i];
        if (tag.charAt(1) === "/") {
            var openTagIndex = open.length - 1;
            while (openTagIndex >= 0 && open[openTagIndex] != tag) {
                openTagIndex--;
            }
            if (openTagIndex < 0) {
                tags[i] = "";
            } else {
                tags[i] = open.slice(openTagIndex).reverse().join("");
                open.length = openTagIndex;
            }
        } else if (!soy.$$HTML5_VOID_ELEMENTS_.test(tag)) {
            open.push("</" + tag.substring(1));
        }
    }
    return open.reverse().join("");
};
soy.$$escapeHtmlAttribute = function(value) {
    if (value && value.contentKind) {
        if (value.contentKind === goog.soy.data.SanitizedContentKind.HTML) {
            goog.asserts.assert(value.constructor === soydata.SanitizedHtml);
            return soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(value.content));
        }
    }
    return soy.esc.$$escapeHtmlHelper(value);
};
soy.$$escapeHtmlAttributeNospace = function(value) {
    if (value && value.contentKind) {
        if (value.contentKind === goog.soy.data.SanitizedContentKind.HTML) {
            goog.asserts.assert(value.constructor === soydata.SanitizedHtml);
            return soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(value.content));
        }
    }
    return soy.esc.$$escapeHtmlNospaceHelper(value);
};
soy.$$filterHtmlAttributes = function(value) {
    if (value && value.contentKind === goog.soy.data.SanitizedContentKind.ATTRIBUTES) {
        goog.asserts.assert(value.constructor === soydata.SanitizedHtmlAttribute);
        return value.content.replace(/([^"'\s])$/, "$1 ");
    }
    return soy.esc.$$filterHtmlAttributesHelper(value);
};
soy.$$filterHtmlElementName = function(value) {
    return soy.esc.$$filterHtmlElementNameHelper(value);
};
soy.$$escapeJs = function(value) {
    return soy.$$escapeJsString(value);
};
soy.$$escapeJsString = function(value) {
    if (value && value.contentKind === goog.soy.data.SanitizedContentKind.JS_STR_CHARS) {
        goog.asserts.assert(value.constructor === soydata.SanitizedJsStrChars);
        return value.content;
    }
    return soy.esc.$$escapeJsStringHelper(value);
};
soy.$$escapeJsValue = function(value) {
    if (value == null) {
        return " null ";
    }
    if (value.contentKind == goog.soy.data.SanitizedContentKind.JS) {
        goog.asserts.assert(value.constructor === soydata.SanitizedJs);
        return value.content;
    }
    switch (typeof value) {
        case "boolean":
        case "number":
            return " " + value + " ";

        default:
            return "'" + soy.esc.$$escapeJsStringHelper(String(value)) + "'";
    }
};
soy.$$escapeJsRegex = function(value) {
    return soy.esc.$$escapeJsRegexHelper(value);
};
soy.$$problematicUriMarks_ = /['()]/g;
soy.$$pctEncode_ = function(ch) {
    return "%" + ch.charCodeAt(0).toString(16);
};
soy.$$escapeUri = function(value) {
    if (value && value.contentKind === goog.soy.data.SanitizedContentKind.URI) {
        goog.asserts.assert(value.constructor === soydata.SanitizedUri);
        return soy.$$normalizeUri(value);
    }
    var encoded = soy.esc.$$escapeUriHelper(value);
    soy.$$problematicUriMarks_.lastIndex = 0;
    if (soy.$$problematicUriMarks_.test(encoded)) {
        return encoded.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_);
    }
    return encoded;
};
soy.$$normalizeUri = function(value) {
    return soy.esc.$$normalizeUriHelper(value);
};
soy.$$filterNormalizeUri = function(value) {
    if (value && value.contentKind == goog.soy.data.SanitizedContentKind.URI) {
        goog.asserts.assert(value.constructor === soydata.SanitizedUri);
        return soy.$$normalizeUri(value);
    }
    return soy.esc.$$filterNormalizeUriHelper(value);
};
soy.$$escapeCssString = function(value) {
    return soy.esc.$$escapeCssStringHelper(value);
};
soy.$$filterCssValue = function(value) {
    if (value && value.contentKind === goog.soy.data.SanitizedContentKind.CSS) {
        goog.asserts.assert(value.constructor === soydata.SanitizedCss);
        return value.content;
    }
    if (value == null) {
        return "";
    }
    return soy.esc.$$filterCssValueHelper(value);
};
soy.$$filterNoAutoescape = function(value) {
    if (value && value.contentKind === goog.soy.data.SanitizedContentKind.TEXT) {
        goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [ value.content ]);
        return "zSoyz";
    }
    return String(value);
};
soy.$$changeNewlineToBr = function(str) {
    return goog.string.newLineToBr(String(str), false);
};
soy.$$insertWordBreaks = function(str, maxCharsBetweenWordBreaks) {
    return goog.format.insertWordBreaks(String(str), maxCharsBetweenWordBreaks);
};
soy.$$truncate = function(str, maxLen, doAddEllipsis) {
    str = String(str);
    if (str.length <= maxLen) {
        return str;
    }
    if (doAddEllipsis) {
        if (maxLen > 3) {
            maxLen -= 3;
        } else {
            doAddEllipsis = false;
        }
    }
    if (soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) && soy.$$isLowSurrogate_(str.charAt(maxLen))) {
        maxLen -= 1;
    }
    str = str.substring(0, maxLen);
    if (doAddEllipsis) {
        str += "...";
    }
    return str;
};
soy.$$isHighSurrogate_ = function(ch) {
    return 55296 <= ch && ch <= 56319;
};
soy.$$isLowSurrogate_ = function(ch) {
    return 56320 <= ch && ch <= 57343;
};
soy.$$bidiFormatterCache_ = {};
soy.$$getBidiFormatterInstance_ = function(bidiGlobalDir) {
    return soy.$$bidiFormatterCache_[bidiGlobalDir] || (soy.$$bidiFormatterCache_[bidiGlobalDir] = new goog.i18n.BidiFormatter(bidiGlobalDir));
};
soy.$$bidiTextDir = function(text, opt_isHtml) {
    if (!text) {
        return 0;
    }
    return goog.i18n.bidi.detectRtlDirectionality(text, opt_isHtml) ? -1 : 1;
};
soy.$$bidiDirAttr = function(bidiGlobalDir, text, opt_isHtml) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_(bidiGlobalDir).dirAttr(text, opt_isHtml));
};
soy.$$bidiMarkAfter = function(bidiGlobalDir, text, opt_isHtml) {
    var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
    return formatter.markAfter(text, opt_isHtml);
};
soy.$$bidiSpanWrap = function(bidiGlobalDir, str) {
    var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
    return formatter.spanWrap(str + "", true);
};
soy.$$bidiUnicodeWrap = function(bidiGlobalDir, str) {
    var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
    return formatter.unicodeWrap(str + "", true);
};
soy.esc.$$escapeUriHelper = function(v) {
    return encodeURIComponent(String(v));
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
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
};
soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(ch) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[ch];
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
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
};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(ch) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[ch];
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
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
};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(ch) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[ch];
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {
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
};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function(ch) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[ch];
};
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$escapeHtmlHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};
soy.esc.$$normalizeHtmlHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};
soy.esc.$$escapeHtmlNospaceHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};
soy.esc.$$normalizeHtmlNospaceHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};
soy.esc.$$escapeJsStringHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
};
soy.esc.$$escapeJsRegexHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
};
soy.esc.$$escapeCssStringHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_);
};
soy.esc.$$filterCssValueHelper = function(value) {
    var str = String(value);
    if (!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(str)) {
        return "zSoyz";
    }
    return str;
};
soy.esc.$$normalizeUriHelper = function(value) {
    var str = String(value);
    return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);
};
soy.esc.$$filterNormalizeUriHelper = function(value) {
    var str = String(value);
    if (!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(str)) {
        return "#zSoyz";
    }
    return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);
};
soy.esc.$$filterHtmlAttributesHelper = function(value) {
    var str = String(value);
    if (!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(str)) {
        return "zSoyz";
    }
    return str;
};
soy.esc.$$filterHtmlElementNameHelper = function(value) {
    var str = String(value);
    if (!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(str)) {
        return "zSoyz";
    }
    return str;
};
soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
soy.esc.$$LT_REGEX_ = /</g;
soy.esc.$$SAFE_TAG_WHITELIST_ = {
    b: 1,
    br: 1,
    em: 1,
    i: 1,
    s: 1,
    sub: 1,
    sup: 1,
    u: 1
};

xnCompiler2471576["a2"] = function() {
    if ("undefined" == typeof template) var template = {};
    template.dep = function() {
        return '<p class="dep">test deps</p>';
    };
    xnCompiler2471576["a1"];
    return template.dep;
}.call(xnCompiler2471576_g, xnCompiler2471576["a1"]);
xnCompiler2471576["a0"] = function() {
    if ("undefined" == typeof template) var template = {};
    template.index = function(opt_data) {
        return soy.$$escapeHtml(opt_data.data) + ':<a class="test-zdmgr">hello world!</a>' + template.dep(null);
    };

    return template.dep = xnCompiler2471576["a2"], template.index;
}.call(xnCompiler2471576_g, xnCompiler2471576["a2"], xnCompiler2471576["a1"]);
(function() {
    var indexTpl = xnCompiler2471576["a0"], el = document.createElement("div");
    el.innerHTML = indexTpl({
        data: "信念"
    }), document.body.appendChild(el), console.log("欢迎");
}).call(xnCompiler2471576_g, xnCompiler2471576["a0"]);