define("device", function (a) {
    var b = this, c = a.media = {};
    a.media.mediamsg = {
        0: "NONE ACTIVE.",
        1: "ABORT_ERR.",
        2: "CONNECTION ERR.",
        3: "DECODE ERR.",
        4: "SRC NOT SUPPORT."
    };
    a.MEDIA_DESTINATION = {}, a.MEDIA_ENCODEING = {}, a.MEDIA_TYPE = {}, a.MEDIA_SOURCE = {}, a.MEDIA_DIRECTION = {}, a.MEDIA_DESTINATION.DATA_URL = 0, a.MEDIA_DESTINATION.FILE_URI = 1, a.MEDIA_DESTINATION.NATIVE_URI = 2, a.MEDIA_ENCODEING.JPEG = 0, a.MEDIA_ENCODEING.PNG = 1, a.MEDIA_TYPE.PICTURE = 0, a.MEDIA_TYPE.VIDEO = 1, a.MEDIA_TYPE.ALLMEDIA = 2, a.MEDIA_TYPE.AUDIO = 3, a.MEDIA_SOURCE.ALBUM = 1, a.MEDIA_SOURCE.CAMERA = 0, a.MEDIA_DIRECTION.BACK = 0, a.MEDIA_DIRECTION.FRONT = 1, a.MEDIA_FORMAT = {
        FILE: 0,
        BASE64: 1
    }, a.MEDIA_STATUS = {NONE: 0, STARTING: 1, RUNNING: 2, PAUSED: 3, STOPPED: 4};
    new DelegateClass("device", "camera", "getPicture"), new DelegateClass("device", "capture", "captureAudio"), new DelegateClass("device", "capture", "captureImage"), new DelegateClass("device", "capture", "captureVideo");
    c.captureMedia = function (c) {
        c.source || (c.source = clouda.device.MEDIA_SOURCE.CAMERA);
        var d = function (a) {
            a.lastModified && (a.lastModifiedDate = a.lastModified, delete a.lastModified), c.onsuccess(a)
        }, e = function (a) {
            "cancel" === a.error_info && (a.result = clouda.STATUS.USER_CANCELED), c.onfail(a)
        }, g = {quality: c.quality, base64: c.base64, height: c.height, width: c.width, source: c.source};
        return c.mediaType == clouda.device.MEDIA_TYPE.AUDIO ? b.error(ErrCode.NOT_FINISH, ErrCode.NOT_FINISH, c) : c.source == clouda.device.MEDIA_SOURCE.CAMERA ? (g.mediaType = c.mediaType === clouda.device.MEDIA_TYPE.VIDEO ? "lightapp.device.MEDIA_TYPE.VIDEO" : "lightapp.device.MEDIA_TYPE.IMAGE", cloudaBLight("cloudaLaunchCamera", JSON.stringify(g), d, e)) : c.source == clouda.device.MEDIA_SOURCE.ALBUM ? (g.mediaType = c.mediaType === clouda.device.MEDIA_TYPE.VIDEO ? "lightapp.device.MEDIA_TYPE.VIDEO" : "lightapp.device.MEDIA_TYPE.IMAGE", cloudaBLight("cloudaLaunchGallery", JSON.stringify(g), d, e)) : b.error(ErrCode.UNKNOW_INPUT, ErrCode.UNKNOW_INPUT, c), !1
    };
    return c.operateMedia = function (a, c, d) {
        var f = function (a) {
            d.onsuccess(a.fullPath)
        }, h = function () {
            d.onsuccess(clouda.STATUS.SUCCESS)
        }, i = function (a) {
            a.error_info || (a.error_info = clouda.device.media.mediamsg[a.result]), d.onfail(a)
        };
        switch (c) {
            case"startRecord":
                cloudaBLight("startRecording", a, h, i);
                break;
            case"stopRecord":
                cloudaBLight("stopRecording", f, i);
                break;
            case"play":
                cloudaBLight("playAudio", a, "lightapp.device.AUDIO_TYPE.PLAY", h, i);
                break;
            case"stop":
                cloudaBLight("playAudio", a, "lightapp.device.AUDIO_TYPE.STOP", h, i);
                break;
            case"seekTo":
                cloudaBLight("audioSeekTo", d.time, h, i);
                break;
            case"setVolume":
                cloudaBLight("setVolume", d.volume, h, i);
                break;
            case"speedFF":
                cloudaBLight("audioSpeedFF", h, i);
                break;
            default:
                b.error(ErrCode.UNKNOW_INPUT, ErrCode.UNKNOW_INPUT, d)
        }
        return !1
    }, c.checkSupport = function (a) {
        var b = {};
        b["native"] = BLightApp && "function" == typeof BLightApp.cloudaLaunchCamera ? 1 : 0, b.web = 0, a(b)
    }, a
});