    var imchatObj = new PageController({
	   'name': 'imchat',
	   'tpl' : 'template/football/imchat.html'
    });
    imchatObj.createDomObj = function(){
    	this.ClickObj = $(".imFan");
        this.hedsetObj = $("#imchat") 
        this.followObj = $(".aAbsolute") 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            imchatObj.goBack()
        })
        /*this.chListObj.unbind('taphold').tap(function(e){ //返回
            console.log($(this))
            imchatObj.goBack()
        })*/
        
    }

    
    imchatObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            imchatObj.sectionEvent(e);
        });
        this.followObj.unbind('tap').tap(function(e){ //关注
            imfollowObj.goBack = function(){
                imfollowObj.destroy();
                imchatObj.show(true);
                // Global.fixd()
            }
            imfollowObj.show(true,function(){
                // AvdetailsObj.goewm(invitationCode)
            });
        })
        $.fn.longPress = function(fn) {
            var timeout = undefined;
            var $this = this;
            for(var i = 0;i<$this.length;i++){
                $this[i].addEventListener('longTap', function(event) {
                    var ths = $(this)
                    $(ths).css('background','#F0F2F5').siblings().css('background','#fff')
                    $(ths).find('.div_remove').show(500).parent('.chat_list').siblings().find('.div_remove').hide()
                }, false);
                $this[i].addEventListener('tap', function(event) {
                    var ths = $(this)
                    $('.div_remove').hide()
                    $(ths).css('background','#F0F2F5').siblings().css('background','#fff')
                }, false);
            }
        }
     
        $('.chat_list').longPress(function(e){
            console.log(e)
         });
        $('.deletefont').on('touchend',function(){
            $('.p_hider').remove();
            $('.deletefont').remove();
        })                      
    }
    imchatObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : imchatObj.gofollow(thisObj);return true; //
                case "a_tuij" : imchatObj.gotuij(thisObj);return true; //  
                case "a_kuoz" : imchatObj.gokuoz(thisObj);return true; //  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                // case "upd" : this.updateType(thisObL);return true; //* 
                // case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //*  
                // case "liimdeta" : this.goliimdeta(thisObL);return true; //*  暂时取消 

            }
        }
    }
    imchatObj.gofollow = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('active');
        obj.addClass('active');
        $('.center_gz').show().siblings('.center_tj').hide()
        // var clId = $('.kjTitleObj').find('li.on').attr('data-v')
    }
    imchatObj.lichat = function(obj){
        obj.addClass('imactiv').siblings().removeClass('imactiv')
        var thisD = obj.attr('data-d')
        if (thisD == '1') {
            $('.xxshow').show().siblings('.gzshow,.tjshow').hide()
        }else if(thisD == '2'){
            $('.gzshow').show().siblings('.xxshow,.tjshow').hide()
        }else{
            $('.tjshow').show().siblings('.gzshow,.xxshow').hide()
        }
    }
    imchatObj.goliimdeta = function(obj){
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        var thisG = obj.attr('data-g')
        chatdetailObj.goBack = function(){
            chatdetailObj.destroy();
            imchatObj.show(true);
        }
        chatdetailObj.show(true,function(){//clientss
            chatdetailObj.AgoraRTMObj(thisD,thisN,thisG)
            chatdetailObj.rtmchatLt(thisD,thisG)
        });
    }
    imchatObj.updatePlay = function(typ,id,nub){
        if (id == null) {
            var tyId = ''
        }else{
            var tyId = id
        }
        var postData ={  
            state:'1', 
            page:'1',
            class_name:'',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            token:ConfigObj.token,
            id:tyId,
            keyword:''
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    imchatObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                   if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
            }
        })
    }
    imchatObj.recordsIm = function(){
        /*clientss.on('MessageFromPeer',function(text, peerId){
                  const msg = {
                    userName: peerId,
                    content: text
                  };
                  console.log(msg)
                  console.log(msg.content.text)*/
            /*if (msg.userName == ueid) {
                var html ='<div class="xxcont user_left">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat user_img" src="http://img0.imgtn.bdimg.com/it/u=3293099503,606929711&fm=26&gp=0.jpg" alt="">\
                    </a>\
                    <span class="p_content uesr_text">'+ msg.content.text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }*/
        // })
    }
    imchatObj.onloadExecution = function(){
    	imchatObj.createDomObj()
        imchatObj.createEvent()
    }
    imchatObj.init = function(){
	 	imchatObj.onloadExecution()
    }