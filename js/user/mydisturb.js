    var mydisturbObj = new PageController({
	   'name': 'mydisturb',
	   'tpl' : 'template/user/mydisturb.html',
       'pullDistance': 220
    });

    mydisturbObj.createDomObj = function(){
    	this.ClickObj = $(".mydistFan");
        this.hedsetObj = $("#mydisturb");
    }
    mydisturbObj.bannerObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:'',
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            anchor_id:ConfigObj.meId,
            page:'1',
            rows:'10',
            role:'anchor',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/blacklist', 
            // url: ConfigObj.localSite+'/common/addBlacklist', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    mydisturbObj.blacktxt(res.info)
                }else{
                   $.alertMsg(res.err) 
                   if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }

    mydisturbObj.blacktxt = function(res){
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
                        <li class="li_wi20" data-t="removBlock" data-d="'+ re.anchor_id +'">\
                            <img class="im_wi46" src="images/room/remov.png" alt="#">\
                        </li>\
                    </ul>'
        }
        $('#blackmd').html(html)
    }
    mydisturbObj.removBlock = function(obj){
        var thisD = obj.attr('data-d')
        // $(obj).find('img.im_wi46').attr('src','images/room/removdl.png')
        $(obj).find('img.im_wi46').css('opacity','0.25')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:thisD,
            version:ConfigObj.version,
            client:client,
            anchor_id:ConfigObj.meId,
            role:'anchor',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/cancelBlacklist', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    $.alertMsg('刪除成功') 
                    $(obj).parent('.ulremove').hide()
                    // console.log($(obj))
                    // $(obj).css('background','rgba(50,190,255,0.1)')
                    // mydisturbObj.blacktext(res.info)
                }else{

                   $.alertMsg(res.err) 
                }
            }
        })
    }
    mydisturbObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            mydisturbObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            mydisturbObj.goBack()
        })
        var calendartime = new lCalendar();
        calendartime.init({
            'trigger': '#demo1',
            'type': 'time'
        });
        var calendartime = new lCalendar();
        calendartime.init({
            'trigger': '#demoend',
            'type': 'time'
        });
        // console.log()
        // $('#Starttim').html($('#demo1').val())
    }
    mydisturbObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "A_sub_sz" : mydisturbObj.gosubszObj(thisObj);return true; //提交修改 
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "disturset" : mydisturbObj.godisturset(thisObL);return true; //用户印象
                case "removBlock" : mydisturbObj.removBlock(thisObL);return true; //性别取消 
                // case "xbqx" : $('#sex').hide();return true; //性别取消 
            }
        }
    }
    mydisturbObj.setdisturb = function(typ){
        if (typ != '0') {
            var tim = typ.split(',')
            $('#Ldisturd').find('span.fr').addClass('s_Off')
            $('#Ldisturd').siblings().removeClass('li_hide')
            $('#demo1').attr('placeholder',tim[0]).val(tim[0])
            $('#demoend').attr('placeholder',tim[1]).val(tim[1])
        }
    }
    mydisturbObj.godisturset = function(obj){
        // console.log(165)
        obj.find('span.spbut').toggleClass('s_Off')
        obj.siblings().toggleClass('li_hide')
    }
    mydisturbObj.gosubszObj = function(obj){
        if (!$('#Ldisturd').find('span').hasClass('s_Off')) {
            var arrNm = {'disturb':'0'}
            Global.usNoetu(arrNm)
            mydisturbObj.goBack()
        }else{
            var befTime = $('#demo1').val()
            var aftTime = $('#demoend').val()
            var disTime = befTime+','+aftTime
            if (befTime == '') {$.alertMsg('未設置開始時間');return false;}
            if (aftTime == '') {$.alertMsg('未設置結束時間');return false;}
            var arrNm = {'disturb':disTime}
            Global.usNoetu(arrNm)
            mydisturbObj.goBack()
        }
    }
    mydisturbObj.onloadExecution = function(){
    	mydisturbObj.createDomObj()
        mydisturbObj.createEvent()
        mydisturbObj.bannerObj()
        // mydisturbObj.createBannerHeight()
    }
    mydisturbObj.init = function(){
	 	mydisturbObj.onloadExecution()
    }