    var setupObj = new PageController({
	   'name': 'setup',
	   'tpl' : 'template/user/setup.html',
    });

    setupObj.createDomObj = function(){
    	this.ClickObj = $(".setupFan");
        this.hedsetObj = $("#setup");
        this.stupObj = $("#gosetup");
    }
    setupObj.bannerObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'1'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    
    setupObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            setupObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            setupObj.goBack()
        })
        $('#banben').html('V'+ConfigObj.version)
    }
    setupObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Aqhzg" : setupObj.goqhzhs(thisObj);return true; //切换账号 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "yhxy" : setupObj.goyhxy(thisObL);return true; //用户协议
                case "jcgx" : Global.checkUpdate(2);return true; //检查更新
                case "xttz" : setupObj.goxttz(thisObL);return true; //系统通知
            }
        }
    }
    setupObj.goyhxy = function(obj){
        protocolObj.goBack = function(){
            protocolObj.destroy();
            setupObj.show();
            // Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        setupObj.destroy();
    }
    setupObj.goxttz = function(obj){
        detailsObj.goBack = function(){
            detailsObj.destroy();
            setupObj.show();
            // $('.me_ul').removeClass('ul_url')
            // Global.fixd()
        }
        // setupeeObj.show();
        detailsObj.show(true,function(){
            detailsObj.goajplay()
        });
    }
    setupObj.goqhzhs = function(){
        /*singinObj.show(true,function(){
            if (ConfigObj.platForm == 'android') {
                android_obj.doMeLogout()
            }else if(ConfigObj.platForm == 'ios'){
                ios_obj.doMeLogout()
            }else{
                console.log(106)
            }
        });
        mypageObj.destroy()
        dynamicObj.destroy();
        zregisterObj.destroy()
        localStorage.setItem("Imtextlive", '0');*/
        zbrzoneObj.goBack = function(){ 
            setupObj.show();
            zbrzoneObj.destroy();
        }
        zbrzoneObj.show(true,function(){
            $('#bdiph').hide()
        });
    }
    setupObj.onloadExecution = function(){
    	setupObj.createDomObj()
        setupObj.createEvent()
        // setupObj.createBannerHeight()
    }
    setupObj.init = function(){
	 	setupObj.onloadExecution()
    }