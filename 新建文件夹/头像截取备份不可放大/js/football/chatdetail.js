    var chatdetailObj = new PageController({
	   'name': 'chatdetail',
	   'tpl' : 'template/football/chatdetail.html'
    });
    chatdetailObj.createDomObj = function(){
    	this.ClickObj = $(".chdetFan");
        this.hedsetObj = $("#chatdetail") 
        // this.followObj = $(".aAbsolute") 
    }

    
    chatdetailObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            chatdetailObj.sectionEvent(e);
        });
         this.ClickObj.unbind('tap').tap(function(e){ //返回
            chatdetailObj.goBack()
        })
        /*this.followObj.unbind('tap').tap(function(e){ //关注
            imfollowObj.goBack = function(){
                imfollowObj.destroy();
                chatdetailObj.show(true);
                // Global.fixd()
            }
            imfollowObj.show(true,function(){
                // AvdetailsObj.goewm(invitationCode)
            });
        })*/
    }
    chatdetailObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "fasong" : this.gofasong();return true; //*  
            }
        }
    }
    
    chatdetailObj.updatePlay = function(typ,id,nub){
        var postData ={  
            state:'1', 
            page:'1',
            class_name:'',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
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
                    chatdetailObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    chatdetailObj.AgoraRTMObj = function(id,nm,ig){
        $('#sp_name').html(nm)
        ueid = id
        usIg = ig
        // clientss = AgoraRTM.createInstance('f9888483506847d9be1a5d0311b2cbe6');
        // accountName = ConfigObj.meId
        $('#fason').unbind('tap').tap(function(){
            text = $('#goval').val()
            // console.log($('#goval').val())
            if (text == '') {
                $.alertMsg('请输入内容');
                return false;
            }else{
                $('#goval').val('')
                var html = '<div class="xxcont anchor_right">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat anchor_img" src="'+ ConfigObj.mypice +'" alt="">\
                    </a>\
                    <span class="p_content anchor_text">'+ text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
                // $('#myanchor').append(html)
            }
            // console.log(ueid)
            clientss.sendMessageToPeer({text:text},ueid).then(function(sendResult){
                if (sendResult.hasPeerReceived) {
                    console.log('发送成功')
                    $('#im_chat').append('<p data-d="'+ ConfigObj.IManch +'" data-l="'+ ueid +'">'+ text +'</p>')
                } else {
                    console.log('发送中')
                }
            },function(error){
                console.log('发送失败')
            })
        })
        clientss.on('MessageFromPeer',function(text, peerId){
                  const msg = {
                    userName: peerId,
                    content: text
                  };
                  // console.log(msg)
            if (msg.userName == ueid) {
                var html ='<div class="xxcont user_left">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat user_img" src="'+ usIg +'" alt="">\
                    </a>\
                    <span class="p_content uesr_text">'+ msg.content.text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }
        })

        /*clientss.on('ConnectionStateChange', (newState, reason) => {
            console.log('on connection state changed to ' + state + ' reason: ' + reason);
        });*/
    }
    chatdetailObj.rtmchatLt = function(id,ing){
        // console.log(id)
        var musId = id
        var mchId =  ConfigObj.IManch
        var textLoca =  localStorage.getItem('usIde')
        if (textLoca) {
            var txt = textLoca.split(',')
            var html = ''
            for (var i = 0; i < txt.length; i++) {
                // console.log(txt[i].split(';'))
                var cont = txt[i].split(';')
                if (musId == cont[1]) {
                    html +='<div class="xxcont user_left">\
                        <a class="A_afte" href="javascript:void(0)">\
                            <img class="img_chat user_img" src="'+ ing +'" alt="">\
                        </a>\
                        <span class="p_content uesr_text">'+ cont[0] +'</span>\
                    </div>'
                    
                }else if(mchId == cont[1] && musId == cont[2]){
                    console.log(162)
                    html += '<div class="xxcont anchor_right">\
                        <a class="A_afte" href="javascript:void(0)">\
                            <img class="img_chat anchor_img" src="'+ ConfigObj.mypice +'" alt="">\
                        </a>\
                        <span class="p_content anchor_text">'+ cont[0] +'</span>\
                    </div>'

                }else{
                    console.log(3)
                }
            }
            $('#myusers').html($('#myusers').html()+html)

            setTimeout(function(){
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
                // window.scrollTo(0,796);
            },70)
            // console.log(html)
        }
    }
    chatdetailObj.onloadExecution = function(){
    	chatdetailObj.createDomObj()
        chatdetailObj.createEvent()
        // chatdetailObj.rtmchatLt()
    }
    chatdetailObj.init = function(){
	 	chatdetailObj.onloadExecution()
    }