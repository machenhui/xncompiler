define("device",function(module) {
    var lightapp = this;
    //定义 camera 空间，clouda.device.media 支持退化
    var it = module.media = {};
    
    module.media.mediamsg = {
        0:"NONE ACTIVE.",
        1:"ABORT_ERR.",
        2:"CONNECTION ERR.",
        3:"DECODE ERR.",
        4:"SRC NOT SUPPORT.",
    };
    var mediaerror = function(first,err,options){
        //deal with err
        if (typeof err.code !== 'undefined'){
            if (module.media.mediamsg[err.code]){
                err.error_info = module.media.mediamsg[err.code];
            }
            err.result = err.code;
            delete err.code;
        }
        
        lightapp.error(first,err,options);
    };
    var mediaerror2 = function(error,options){
        lightapp.error(ErrCode.UNKNOW_INPUT,ErrCode.UNKNOW_INPUT,options);
    };
    
    /**
     * @object media
     * @memberof clouda.device
     * @instance
     * @namespace clouda.device.media
     */
    
    module.MEDIA_DESTINATION={};
    module.MEDIA_ENCODEING={};
    module.MEDIA_TYPE={};
    module.MEDIA_SOURCE={};
    module.MEDIA_DIRECTION={};
    
    //定义类型
    module.MEDIA_DESTINATION.DATA_URL = 0;
    module.MEDIA_DESTINATION.FILE_URI = 1;
    module.MEDIA_DESTINATION.NATIVE_URI = 2;
    
    module.MEDIA_ENCODEING.JPEG = 0;
    module.MEDIA_ENCODEING.PNG = 1;
    
    module.MEDIA_TYPE.PICTURE = 0;
    module.MEDIA_TYPE.VIDEO = 1;
    module.MEDIA_TYPE.ALLMEDIA = 2; //for function getPicture only
    module.MEDIA_TYPE.AUDIO = 3; //for function captureMedia only
    
    
    module.MEDIA_SOURCE.ALBUM = 1;
    module.MEDIA_SOURCE.CAMERA = 0;
    
    module.MEDIA_DIRECTION.BACK = 0;
    module.MEDIA_DIRECTION.FRONT = 1;
    
    //MEDIA_FORMAT.FILE
    module.MEDIA_FORMAT = {
        FILE : 0,
        BASE64:1,
    };
    module.MEDIA_STATUS = {
        NONE : 0,
        STARTING : 1,
        RUNNING : 2,
        PAUSED : 3,
        STOPPED : 4
    };
     
    var getPicture = new DelegateClass("device","camera","getPicture");
    // var cleanup = new DelegateClass("device","camera","cleanup");
    var captureAudio = new DelegateClass("device","capture","captureAudio");
    var captureImage = new DelegateClass("device","capture","captureImage");
    var captureVideo = new DelegateClass("device","capture","captureVideo");
    
    
    /**
     * 启动canema，支持读取手机图库或者拍照
     *
     * @function getPicture
     * @memberof clouda.device.media
     * @instance
     *
     * @param {{}} options 可定义
     * @param {function} options.onsuccess 成功
     * @param {function} options.onfail 失败
     
     * @returns null
     * 
     */
    
    // it.getPicture = function(options){
        // getPicture(function(imageData){//success callback
            // if (typeof imageData=='string'){
                // options.onsuccess.apply(this,arguments);
            // }else{
                // lightapp.error(ErrCode.MEDIA_ERR,ErrCode.UNKNOW_CALLBACK,options);
            // }
//             
        // },function(nativeErr){
            // lightapp.error(ErrCode.MEDIA_ERR,nativeErr,options);
        // },options);
    // };
    
    /**
     *
     * Launch audio recorder application for recording audio clip(s).
     *
     * @function captureMedia
     * @memberof clouda.device.media
     * @instance
     *
     * @param {{}} options
     * @param {Function} options.onsuccess
     * @param {Function} options.onfail
     * @param {int} options.mediaType=clouda.device.MEDIA_TYPE.PICTURE
     * @param {int} [options.limit=1]
     * @param {int} [options.duration=0]
     * @param {int} [options.format=FILE]
     * @param {number} [options.quality] 
     * @param {number} [options.destinationType]
     * @param {number} [options.sourceType] 
     * @param {number} [options.mediaType]
     * @param {number} [options.mediaDirection]
     * @param {number} [options.encodingType]
     * @param {boolen} [options.saveToPhotoAlbum] 
     * @param {boolen} [options.details] 
     * @returns null
     * 
     */
    
    it.captureMedia = function(options){
        if (clouda.RUNTIME === clouda.RUNTIMES.KUANG){
            if (!options.source ){
                options.source = clouda.device.MEDIA_SOURCE.CAMERA;
            }
            // var successstring = "(function(result){if(result.lastModified){result.lastModifiedDate=result.lastModified;}("+options.onsuccess.toString()+")(result);})";
            // var failstring = "(function(result){if(result.error_info=='cancel'){result.result=clouda.STATUS.USER_CANCELED};("+options.onfail.toString()+")(result);})";
            
            var successstring = function(result){
                if(result.lastModified){
                    result.lastModifiedDate=result.lastModified;
                    delete result.lastModified;
                }
                options.onsuccess(result);
            };
            var failstring = function(result){
                if(result.error_info==='cancel'){
                    result.result=clouda.STATUS.USER_CANCELED;
                }
                options.onfail(result);
            };


            if(clouda.PLATFORM == clouda.PLATFORMS.IOS){
                if(clouda.RUNTIME_VERSION >= '5.5'){

                    var source= (options.source == clouda.device.MEDIA_SOURCE.CAMERA)?'clouda.device.MEDIA_SOURCE.CAMERA':'clouda.device.MEDIA_SOURCE.ALBUM';


                    cloudaBLight("captureMedia",JSON.stringify({
                        quality:options.quality,
                        base64:options.base64,
                        height:options.height,
                        width:options.width,
                        source:source
                    }),successstring,failstring);

                    return false;

                }else{
                    //低版本ios不支持
                    return false;
                }
            }else{
                if(clouda.RUNTIME_VERSION >= '5.5'){

                    var config = {
                        quality:options.quality,
                        base64:options.base64,
                        height:options.height,
                        width:options.width,
                        source:options.source
                    };

                    if (options.mediaType == clouda.device.MEDIA_TYPE.AUDIO) {
                        lightapp.error(ErrCode.NOT_FINISH,ErrCode.NOT_FINISH,options);
                    } else if (options.source == clouda.device.MEDIA_SOURCE.CAMERA) {
                        
                        config.mediaType = (options.mediaType === clouda.device.MEDIA_TYPE.VIDEO)?'lightapp.device.MEDIA_TYPE.VIDEO':'lightapp.device.MEDIA_TYPE.IMAGE';
                        
                        cloudaBLight("cloudaLaunchCamera",JSON.stringify(config),successstring,failstring);
                    } else if (options.source == clouda.device.MEDIA_SOURCE.ALBUM) {
                       
                        config.mediaType = (options.mediaType === clouda.device.MEDIA_TYPE.VIDEO)?'lightapp.device.MEDIA_TYPE.VIDEO':'lightapp.device.MEDIA_TYPE.IMAGE';
                        cloudaBLight("cloudaLaunchGallery",JSON.stringify(config),successstring,failstring);
                    }else{
                        lightapp.error(ErrCode.UNKNOW_INPUT,ErrCode.UNKNOW_INPUT,options);
                    }

                    return false;
                }else{

                    // Android兼容低版本的框接口
                    var kuangtype;
                    if (options.mediaType == clouda.device.MEDIA_TYPE.AUDIO) {
                        lightapp.error(ErrCode.NOT_FINISH,ErrCode.NOT_FINISH,options);
                    } else if (options.source == clouda.device.MEDIA_SOURCE.CAMERA) {
                        
                        kuangtype = (options.mediaType === clouda.device.MEDIA_TYPE.VIDEO)?'lightapp.device.MEDIA_TYPE.VIDEO':'lightapp.device.MEDIA_TYPE.IMAGE';
                        cloudaBLight("cloudaLaunchCamera",kuangtype,successstring,failstring);
                    } else if (options.source == clouda.device.MEDIA_SOURCE.ALBUM) {
                       
                        kuangtype = (options.mediaType === clouda.device.MEDIA_TYPE.VIDEO)?'lightapp.device.MEDIA_TYPE.VIDEO':'lightapp.device.MEDIA_TYPE.IMAGE';
                        cloudaBLight("cloudaLaunchGallery",kuangtype,successstring,failstring);
                    }else{
                        lightapp.error(ErrCode.UNKNOW_INPUT,ErrCode.UNKNOW_INPUT,options);
                    }
                    
                    return false;
                }
            }

            

            
        }else if ( clouda.RUNTIME === clouda.RUNTIMES.NUWA ){
            installPlugin("device", function(device) {
                var func;
                if (options.mediaType == clouda.device.MEDIA_TYPE.VIDEO){
                    
                    if (options.source === clouda.device.MEDIA_SOURCE.ALBUM){
                        func=device.camera.getPicture;
                        options.sourceType = module.MEDIA_SOURCE.ALBUM;
                    }else{
                        func=device.capture.captureVideo;
                    }
                }else if (options.mediaType == clouda.device.MEDIA_TYPE.AUDIO){
                    func=device.capture.captureAudio;
                }else{//默认 MEDIA_TYPE.PICTURE
                    if (options.format === module.MEDIA_FORMAT.BASE64){
                        options.destType = module.MEDIA_DESTINATION.DATA_URL;
                    }else if (options.format === module.MEDIA_FORMAT.FILE) {
                        options.destType = module.MEDIA_DESTINATION.FILE_URI;
                    }
                    
                    if (options.source === clouda.device.MEDIA_SOURCE.ALBUM){
                        func=device.camera.getPicture;
                        options.sourceType = module.MEDIA_SOURCE.ALBUM;
                    }else if (options.format === module.MEDIA_FORMAT.BASE64){//base 64 should
                        func=device.camera.getPicture;
                    }else{
                        func=device.capture.captureImage;
                    }
                }
                func(function(mediaFile){
                    if (Array.isArray(mediaFile)){
                        if (mediaFile.length == 1 && options.details){//处理详细信息
                            var i = 0;
                            mediaFile[i].getFormatData(function(obj){
                                mediaFile[i].width = obj.width;
                                mediaFile[i].height = obj.height;
                                mediaFile[i].duration = obj.duration;
                                options.onsuccess(mediaFile[0]);
                            },function(){});
                        }else{
                            if (mediaFile.length === 1){
                                options.onsuccess(mediaFile[0]);
                            }else{
                                options.onsuccess(mediaFile);
                            }
                        }
                    } else {//base64
                        if (options.format === module.MEDIA_FORMAT.FILE) {
                            var mediaFile1 = new device.fs.MediaFile("tmpfile",mediaFile);
                            options.onsuccess(mediaFile1);
                        }else{
                            options.onsuccess(mediaFile);
                        }
                        
                    }
                },function(nativeErr){
                    if (nativeErr.code){
                        nativeErr.result = nativeErr.code;
                        nativeErr.error_info = nativeErr.message;
                    }
                    if(nativeErr.result == 3){// 取消code hack对齐
                        lightapp.error(ErrCode.MEDIA_ERR,{result:clouda.STATUS.USER_CANCELED,error_info:"cancel"},options);
                    }else{
                        lightapp.error(ErrCode.MEDIA_ERR,nativeErr,options);
                    }
                    
                },options);
            },options);
        }else{
            //退化html5 由于safari不支持getUserMedia 所以暂不支持
            lightapp.error(ErrCode.MEDIA_ERR,clouda.STATUS.SYSTEM_FAILURE,options);
        }
        
        
        
        
    };
    
     /**
     *
     * create mediafile by link
     *
     * @function createMedia
     * @memberof clouda.device.media
     * @instance
     *
     * @param {string} link
     * @param {string} operator
     * @param {{}} options
     * @param {Function} options.onsuccess
     * @param {Function} options.onfail
     * @param {Function} options.onstatus
     * @param {float} volume 设置声音大小 最大1.0 仅限(setVolume)
     * @param {int} time 从开始到的毫秒数 仅限(getDuration)
     * @returns null
     * 
     */
    var media={};
    it.operateMedia = function(link,operator,options){
        if (clouda.RUNTIME === clouda.RUNTIMES.KUANG){
            var successstring = function(result){
                if(result.lastModified){
                    result.lastModifiedDate=result.lastModified;
                    delete result.lastModified;
                }
                options.onsuccess(result);
            };
            var recordsuccess = function(result){
                options.onsuccess(result.fullPath);
            };
            var emptystring = function(){};
            var cloudasuccess = function(){
                options.onsuccess(clouda.STATUS.SUCCESS);
            };

            var failstring = function(result){
                if (!result.error_info){
                    result.error_info=clouda.device.media.mediamsg[result.result];
                }
                options.onfail(result);
            };

            if(clouda.PLATFORM == clouda.PLATFORMS.IOS){
                // alert(link);
                options.path = link;
                options.operator = operator;
                cloudaBLight('operateMedia',JSON.stringify(options),cloudasuccess,failstring);

                return false;
            }

            switch(operator){
                case "startRecord":
                    cloudaBLight('startRecording',link,cloudasuccess,failstring);
                    break;
                case "stopRecord":
                    cloudaBLight('stopRecording',recordsuccess,
                            failstring);
                    break;
                case "play":
                    cloudaBLight('playAudio',link,'lightapp.device.AUDIO_TYPE.PLAY',cloudasuccess,
                            failstring);
                    break;
                case "stop":
                    cloudaBLight('playAudio',link,'lightapp.device.AUDIO_TYPE.STOP',cloudasuccess,
                            failstring);
                    break;
                case "seekTo":
                    cloudaBLight('audioSeekTo',options.time,cloudasuccess,failstring);
                    break;
                case "setVolume":
                    cloudaBLight('setVolume',options.volume,cloudasuccess,failstring);
                    break;
                case "speedFF":
                    cloudaBLight('audioSpeedFF',cloudasuccess,failstring);
                    break;
                default:
                    lightapp.error(ErrCode.UNKNOW_INPUT,ErrCode.UNKNOW_INPUT,options);
            }
            return false;
        }
        installPlugin("device", function(device) {
           
            if (!media[link]){
                media[link] = new device.Media(link,function(id){
                },options.onfail,options.onstatus);
            }
            switch(operator){
                // case "getCurrentPosition":
                    // media[link][operator].call(media[link],options.onsuccess,options.onfail);
                    // break;
                case "getDuration":
                    var duration = media[link][operator]();
                    if (duration > -1) {
                        options.onsuccess(duration);
                    }else{
                        options.onfail(duration);
                    }
                    break;
                case "seekTo":
                    
                    media[link][operator](options.time);
                    options.onsuccess(clouda.STATUS.SUCCESS);
                    break;
                case "setVolume":
                    options.volume =  parseFloat(options.volume);
                    
                    media[link][operator](options.volume);
                    options.onsuccess(clouda.STATUS.SUCCESS);
                    break;
                case "speedFF":
                  
                    media[link][operator](5000,options.onsuccess);
                    break;
                case "play"://应该添加完成的callback
                    media[link][operator](options,options.onsuccess);
                    break;
                case "startRecord":
                case "stop":
                case "pause":
                    media[link][operator]();
                    options.onsuccess(clouda.STATUS.SUCCESS);
                    break;
                case "stopRecord":
                    media[link][operator](options.onsuccess,options.onfail);
                    break;
                case "release":
                    media[link][operator]();
                    options.onsuccess(link);
                    delete media[link];
                
            }
            
            
        },options);
    };
   


    

        /**
     * 检查该模块是否可用
     * @param  {Function} callback 异步调用的回调函数,参数是native和web能力支持情况
     * @return null  
     */
    it.checkSupport = function(callback){
        var rs = {};
        if(clouda.RUNTIME === clouda.RUNTIMES.NUWA){
            rs["native"] = 1;
        }else if(clouda.RUNTIME === clouda.RUNTIMES.KUANG){
            if(BLightApp && typeof BLightApp.cloudaLaunchCamera === "function"){
                rs["native"] = 1;
            }else{
                rs["native"] = 0;
            }
        }else if(clouda.RUNTIME === clouda.RUNTIMES.WEB){
            rs["native"] = 0;
            
        }
        rs.web =0;
        callback(rs);
    };

    return module;
});
