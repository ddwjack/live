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
            sharePicObj(ConfigObj.share+ConfigObj.share_url)
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
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_tg
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : myshareObj.accountRecord();return true; //账户管理
            }
        }
    }
    myshareObj.fxcode = function () {
        $('#fxcode').qrcode({
            render    : "canvas",
            text    : ConfigObj.share_url,
            width : "200",               //二维码的宽度
            height : "200",              //二维码的高度
            background : "#ffffff",       //二维码的后景色
            foreground : "#000000",        //二维码的前景色
            src: ''             //二维码中间的图片
        }); 
        $('.chan_id_my').html(ConfigObj.anchor)
        $('#inp_chao').val(ConfigObj.anchor)
    }
    myshareObj.onloadExecution = function(){
    	myshareObj.createDomObj()
        myshareObj.createEvent()
        myshareObj.fxcode()
    }
    myshareObj.init = function(){
	 	myshareObj.onloadExecution()
    }