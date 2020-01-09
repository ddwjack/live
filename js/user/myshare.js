    var myshareObj = new PageController({
	   'name': 'myshare',
	   'tpl' : 'template/user/myshare.html'
    });
    myshareObj.createDomObj = function(){
    	this.ClickObj = $(".shareFan");
        this.hedsetObj = $("#myshar")  
        this.bccodeObj = $("#bccode")  // 保存二维码 
        this.fxcodeObj = $("#code_fen_ch")  // 分享 

        this.ClickObj.tap(function(e){ //返回
            myshareObj.goBack()
        })
    }

    myshareObj.createEvent = function(){
        // console.log(userCenterObj.userInfo)
        this.hedsetObj.unbind('tap').tap(function(e){
            myshareObj.sectionEvent(e);
        });
        this.fxcodeObj.unbind('tap').tap(function(){
            gifJsonlive()
            var thisV = $('#code_fen_ch').attr('data-v')
            // Global.chshareObj('anchor')
            sharePicObj(thisV)
        })
        this.bccodeObj.unbind('tap').tap(function(){
            gifJsonlive()
            $(this).css('background','green')
            if (ConfigObj.platForm === 'android') {
                android_obj.savePic(ConfigObj.share_url)
                gifNonelive()
            }else if(ConfigObj.platForm === 'ios'){
                ios_obj.savePic(ConfigObj.share_url)
                gifNonelive()
            }else{
                console.log(ConfigObj.share_url)
                gifNonelive()
                // $(this).css('background','#32beff')
            }
        })
    }
    myshareObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Ayqzb" : myshareObj.goAyqzbObj(thisObj);return true; //分享主播 
                case "Abccode" : myshareObj.goAcodeObj(thisObj);return true; //保存二维码  
                case "Ayqjl" : myshareObj.goAyqjlObj(thisObj);return true; //保存二维码  
            }
        }
    }
    myshareObj.goAyqzbObj = function(obj) {
        gifJsonlive()
        var thisV = obj.attr("data-v");
        $(obj).addClass('activv').siblings().removeClass('activv')
        if (thisV == 'anchor') {
            $('#div_anchor_sh').show().siblings('#div_user_sh').hide()
            $('.p_anch_use').css('color','#fff')
        }else{
            $('#div_user_sh').show().siblings('#div_anchor_sh').hide()
            $('.p_anch_use').css('color','transparent')
        }
        myshareObj.shareAObj(thisV)
    }
    myshareObj.goAcodeObj = function(obj) {
        var thisV = obj.attr('data-v')
        gifJsonlive()
        // $(this).css('background','green')
        if (ConfigObj.platForm === 'android') {
            android_obj.savePic(thisV)
            gifNonelive()
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.savePic(thisV)
            gifNonelive()
        }else{
            console.log(thisV)
            gifNonelive()
            // $(this).css('background','#32beff')
        }

    }
    myshareObj.goAyqjlObj = function(obj) {
        proRecordObj.goBack = function(){
            proRecordObj.destroy();
            myshareObj.show();
            // Global.fixd()
        }
        proRecordObj.show(true,function(){
        });
    }
    myshareObj.shareAObj = function(typ) {
        // anchor/user
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            client:client,
            mold:'anchor',
            type:typ
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Video/video_comment', code_fen_ch
            url: ConfigObj.localSite+'/api/share',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    ConfigObj.share_url = res.info.qc_url //分享地址 
                    // ConfigObj.dowand = res.info.download
                    var dowand = res.info.download
                    var messag = res.info.message+'?invitecode='+ConfigObj.anchor+'&inviterole=anchor'
                    // ConfigObj.messag = res.info.message
                    // console.log(messag)
                    // console.log(dowand)
                    $('#code_img_typ').attr('src',res.info.qc_url)
                    $('#A_baocun').attr('data-v',dowand)
                    $('#p_cod_yq').html(ConfigObj.anchor)
                    $('#code_fen_ch').attr('data-v',messag)
                    gifNonelive()
                    // ConfigObj.userNum = res.info.users
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myshareObj.onloadExecution = function(){
    	myshareObj.createDomObj()
        myshareObj.createEvent()
        myshareObj.shareAObj('anchor')   
        gifJsonlive()
    }
    myshareObj.init = function(){
	 	myshareObj.onloadExecution()
    }