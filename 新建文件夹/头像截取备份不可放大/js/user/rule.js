    var ruleObj = new PageController({
	   'name': 'rule',
	   'tpl' : 'template/user/rule.html',
       'pullDistance': 220
    });

    ruleObj.createDomObj = function(){
    	this.ClickObj = $(".ruleFan");
        this.hedsetObj = $("#rule");
    }
    ruleObj.blacktxt = function(res){
        var html = ''
        for(var i = 0 ; i < res.length; i++){
            var re = res[i]
            html += '<ul class="ulremove">\
                        <li class="li_wi18">\
                            <img class="im_wi48" src="'+ re.avatar_url +'" alt="#">\
                        </li>\
                        <li class="li_wi30">\
                            <p class="p_name overhid">'+ re.nickname +'</p>\
                            <p class="p_craft overhid">'+ re.craft +' </p>\
                        </li>\
                        <li class="li_wi32 overhid">\
                            <img class="im_wi22" src="images/room/xin.png" alt="#">\
                            <span class="disNum">'+ re.supply +'</span>\
                        </li>\
                        <li class="li_wi20" data-t="removBlock" data-d="'+ re.user_id +'">\
                            <img class="im_wi46" src="images/room/remov.png" alt="#">\
                        </li>\
                    </ul>'
        }
        $('#blackmd').html(html)
    }
    ruleObj.withdList = function(obj){
        // var thisD = obj.attr('data-d')
        // $(obj).find('img.im_wi46').css('opacity','0.25')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            token:ConfigObj.token,
            client:client,
            status:obj,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/withdraw_record', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // $.alertMsg('刪除成功') 
                    // $(obj).parent('.ulremove').hide()
                    console.log(res.info)
                    // $(obj).css('background','rgba(50,190,255,0.1)')
                    // ruleObj.blacktext(res.info)
                }else{

                   $.alertMsg(res.err) 
                }
            }
        })
    }
    ruleObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            ruleObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            ruleObj.goBack()
        })
    }
    ruleObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "A_sub_sz" : ruleObj.gosubszObj(thisObj);return true; //提交修改 
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "removBlock" : ruleObj.removBlock(thisObL);return true; //性别取消 
            }
        }
    }
    ruleObj.godisturset = function(obj){
        obj.find('span.spbut').toggleClass('s_Off')
        obj.siblings().toggleClass('li_hide')
    }
    ruleObj.onloadExecution = function(){
    	ruleObj.createDomObj()
        ruleObj.createEvent()
        // ruleObj.withdList('-1')
        // ruleObj.createBannerHeight()
    }
    ruleObj.init = function(){
	 	ruleObj.onloadExecution()
    }