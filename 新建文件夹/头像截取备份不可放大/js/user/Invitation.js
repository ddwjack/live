    var InvitationObj = new PageController({
	   'name': 'Invitation',
	   'tpl' : 'template/user/Invitation.html'
    });
    InvitationObj.createDomObj = function(){
    	this.ClickObj = $(".invit_fan");
        this.hedsetObj = $("#Invitation") 
        this.butYqmObj = $("#but_yqm") 

        this.ClickObj.tap(function(e){ //返回 
            InvitationObj.goBack()
        })
        this.butYqmObj.unbind('tap').tap(function(){
            $('#but_yqm').css('background','green')
            setTimeout(function(){ $('#but_yqm').css('background','#f4725b') }, 2000);
            InvitationObj.goinyqm()
        })
    }
    InvitationObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            InvitationObj.sectionEvent(e);
        });
    }
    InvitationObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol 
            switch (thisT){
                case "account" : InvitationObj.accountRecord();return true; //账户管理
            }
        }
    }
    InvitationObj.beInd = function(obj){
        setTimeout(function(){
            if (obj == '') {
                $('#di_show').show().siblings('#di_hide').hide()
            }else{
                $('#disab').val(obj)
                $('#di_hide').show().siblings('#di_show').hide()
            }
        },100)
    }
    InvitationObj.vitatText = function(obj){
        console.log($('#di_show'))
        
    }
    InvitationObj.goinyqm = function(){
        // console.log($('#inYqm').val())
        var Value =  $('#inYqm').val()
        if (Value == '') {
            $.alertMsg('請輸入邀請碼')
            return false;
        }
        var postData ={ //1 是查詢 2是添加
            type:'2',
            invitation_code:Value,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/api/Invitation_code_add',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    $.alertMsg(res.info)
                    $('#inYqm').val('')
                    InvitationObj.goBack()
                    // feedbackObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    InvitationObj.onloadExecution = function(){
    	InvitationObj.createDomObj()
        InvitationObj.createEvent()
    }
    InvitationObj.init = function(){
	 	InvitationObj.onloadExecution()
    }