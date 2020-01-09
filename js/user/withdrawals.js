    var withdrawalsObj = new PageController({
	   'name': 'withdrawals',
	   'tpl' : 'template/user/withdrawals.html',
       'pullDistance': 220
    });

    withdrawalsObj.createDomObj = function(){
    	this.ClickObj = $(".withFan");
        this.hedsetObj = $("#wihdra");
    }
    withdrawalsObj.blacktxt = function(res){
        var html = ''
        for(var i = 0 ; i < res.length; i++){
            var re = res[i]
            var time = re.created_date.substring(0,11)
            // console.log(time.replace(/\-/g,'/'))
            html += '<ul class="withdr_flex ul_witd_list">\
                        <li class="li_withd_flex li_list_fled"><span>'+ time.replace(/\-/g,'/') +'</span></li>\
                        <li class="li_withd_flex li_list_fled"><span>'+ (re.type == '1' ? '直播收益' : '推广收益') +'</span></li>\
                        <li class="li_withd_flex li_list_fled"><span>'+ re.money +'</span></li>\
                        <li class="li_withd_flex li_list_fled"><span class="'+ (re.status == '0' ? 'sqz' : (re.status == '1' ? 'ywc' :'sqsb')) +'">'+ (re.status == '0' ? '申請中' : (re.status == '1' ? '成功' : '申請失敗'))+'</span></li>\
                    </ul>'
        }
        $('#witlistd').html(html)
    }
    withdrawalsObj.withdList = function(obj){
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
                    withdrawalsObj.blacktxt(res.info)
                }else{

                   $.alertMsg(res.err) 
                }
            }
        })
    }
    withdrawalsObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            withdrawalsObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            withdrawalsObj.goBack()
        })
    }
    withdrawalsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "A_sub_sz" : withdrawalsObj.gosubszObj(thisObj);return true; //提交修改 
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "AlistWith" : withdrawalsObj.AlistWith(thisObL);return true; //性别取消 
            }
        }
    }
    withdrawalsObj.AlistWith = function(obj){
        obj.addClass('active').siblings().removeClass('active')
        var thisL = obj.attr('data-l')
        withdrawalsObj.withdList(thisL)
    }
    withdrawalsObj.godisturset = function(obj){
        obj.find('span.spbut').toggleClass('s_Off')
        obj.siblings().toggleClass('li_hide')
    }
    withdrawalsObj.onloadExecution = function(){
    	withdrawalsObj.createDomObj()
        withdrawalsObj.createEvent()
        withdrawalsObj.withdList('-1')
        // withdrawalsObj.createBannerHeight()
    }
    withdrawalsObj.init = function(){
	 	withdrawalsObj.onloadExecution()
    }