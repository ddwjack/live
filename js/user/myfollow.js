    var myfollowObj = new PageController({
	   'name': 'myfollow',
	   'tpl' : 'template/user/myfollow.html',
       'pullDistance': 220
    });

    myfollowObj.createDomObj = function(){
    	this.ClickObj = $(".myfollFan");
        this.hedsetObj = $("#myfollow");
    }
    myfollowObj.bannerObj = function(mold){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            mold:mold,
            token:ConfigObj.token
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/relation', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    if (mold == 'follow') {
                        myfollowObj.follhtml(res.info)
                    }else{
                        myfollowObj.fenshtml(res.info)
                    }
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }

    myfollowObj.quxgzObj = function(obj){
        console.log(51)
        obj.find('span.sgz').toggleClass('sygz')
        var thisD = obj.attr('data-d')
        var thisL = obj.attr('data-l')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_no:ConfigObj.anchor,
            token:ConfigObj.token,
            user_id:thisD,
            role:'anchor',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/setFollow', 
            // url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.err == undefined) {
                    $.alertMsg(res.suc)
                    var txtObj = obj.find('.sgz ')
                    if ($(txtObj).html() == '已關注') {
                        $(txtObj).html('+關注')
                    }else{
                        $(txtObj).html('已關注')
                    }

                    if (thisL == 'gz') {
                        obj.parents('div.div_lst').hide()
                        if ($('#div_folltxh')[0].clientHeight <= '20') {
                            $('#myLVN_wei').show()                       
                        }
                    }
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // var ty = $('#Aload').find('a.active').attr('data-d')
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
    
    myfollowObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            myfollowObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            myfollowObj.goBack()
        })
    }
    myfollowObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "li_flowed" : myfollowObj.quxgzObj(thisObj);return true; //取消關注 添加關注   
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "lVlLive" : myfollowObj.golive(thisObL);return true; //用户印象 
                case "li_flowed" : myfollowObj.quxgzObj(thisObL);return true; //取消關注 添加關注  
                case "userxin" : myfollowObj.userxinObj(thisObL);return true; //查看信息卡 
                case "gbuser" : myfollowObj.gbuserObj(thisObL);return true; //關不 
                case "goimlt" : $('.follouser').hide(500);imcharlogin(thisObL);return true; //跟他聊天 
                case "gozbsp" : $('.follouser').hide();homeObj.gozbspObj(thisObL);return true; //跟他視頻 
            }
        }
    }
    myfollowObj.gbuserObj = function(obj){
        $('.follouser').hide()
    }
    myfollowObj.fenshtml = function(res){
        var html = ''
        if (res.length == '') {
            $('#myLVN_wei').show()                       
        }else{
            $('#myLVN_wei').hide()                       
            for (var i = 0; i < res.length; i++) {
                var re = res[i]
                html += '<div class="div_lst">\
                                <ul>\
                                    <li data-t="userxin" data-d="'+ re.user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ re.avatar_url+'" alt="#"></li>\
                                    <li data-t="userxin" data-d="'+ re.user_id +'" class="liLive liw65">\
                                        <p class="liveName">'+ re.nickname +' <span class="pColo"><i class="'+ (re.online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (re.online == 'OFF' ? '離線' : '在線') +'</span></p>\
                                        <p class="pColo hid">'+ (re.craft == '' ? '这是简介' : re.craft )+'</p>\
                                    </li>\
                                    <li data-t="li_flowed" data-d="'+ re.user_id +'" class="liLive liw17"><span class="'+ (re.followed == '0' ? 'sgz' : 'sygz') +'">'+ (re.followed == '0' ? '+關注' : '已關注') +' </span></li>\
                                </ul>\
                            </div>'
            }
        }
        $('#div_fens').html(html)
    }
    myfollowObj.follhtml = function(res){
        console.log(res)
        var html = ''
        if (res.length == '0') {
            $('#myLVN_wei').show()
        }else{
            $('#myLVN_wei').hide()
            for (var i = 0; i < res.length; i++) {
                var re = res[i]
                html += '<div class="div_lst">\
                                <ul>\
                                    <li data-t="userxin" data-d="'+ re.user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ re.avatar_url+'" alt="#"></li>\
                                    <li data-t="userxin" data-d="'+ re.user_id +'" class="liLive liw65">\
                                        <p class="liveName">'+ re.nickname +' <span class="pColo"><i class="'+ (re.online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (re.online == 'OFF' ? '離線' : '在線') +'</span></p>\
                                        <p class="pColo hid">'+ (re.craft == '' ? '这是简介' : re.craft )+'</p>\
                                    </li>\
                                    <li data-t="li_flowed" data-d="'+ re.user_id +'" data-l="gz" class="liLive liw17"><span class="'+ (re.followed == '0' ? 'sgz' : 'sygz') +'">'+ (re.followed == '0' ? '+關注' : '已關注') +' </span></li>\
                                </ul>\
                            </div>'
            }
        }
        $('#div_folltxh').html(html)
    }
    myfollowObj.usertxt = function(res){
        var time = res.slot.replace(',','-')
        var html = '<li class="overlex fsz1"><span class="'+ (res.online == 'OFF' ? 'spgray': 'icspan')+'"></span>'+ (res.online == 'OFF' ? '離線': '在線')+'</li>\
                    <li class="overlex center">\
                        <img class="imtoux" src="'+ res.avatar_url +'" alt="#">\
                    </li>\
                    <li data-t="gbuser" class="overlex ovright"><a href="javascript:void(0)"><img style="width:40px;" src="images/register/gb.png" alt=""></a></li>'
        var htm2 = '<span class="guzhu  '+ (res.followed == '0' ? 'gray' : 'gree') +'">'+ (res.followed == '0' ? '未關注' : '已關注') +'</span><a data-t="Apbyh" data-d="'+ res.id +'" href="javascript:void(0)"><span class="span_pb" class="fr"> <img class="img_pbuser" src="'+ (res.blacked == '1' ? 'images/my/jinyong.png':'images/my/jinyonghs.png')+'" alt="" />屏蔽</span></a>'
        var htm3 = '<ul class="overFlex">\
                    <li class="overlex">用户昵称：</li>\
                    <li class="overlex ovright"><span id="nickname">'+ res.nickname +'</span><img src="" alt=""></li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">贡献值：</li>\
                    <li class="overlex ovright">'+ (res.supply == 'null' ? '' : res.supply) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">在線时段：</li>\
                    <li class="overlex ovright">'+ time +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">城市：</li>\
                    <li class="overlex ovright">'+ res.region +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">感情状态：</li>\
                    <li class="overlex ovright">'+ res.emotion +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">参与直播次数：</li>\
                    <li class="overlex ovright">'+ (res.live == 'null' ? '' : res.live) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">1V1视频次数：</li>\
                    <li class="overlex ovright">'+ (res.connect == 'null' ? '' : res.connect) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">送礼：</li>\
                    <li class="overlex ovright">'+ (res.gift == 'null' ? '0' : res.gift)  +'件</li>\
                </ul>'

        var htm4 = '<li data-t="goimlt" data-d="'+ res.id +'" data-g="'+ res.avatar_url +'" data-n="'+ res.nickname +'" data-l="" class="center w50">\
                        <span class="spim"><img class="bor0" src="images/room/bianji.png" alt="">去聊天</span>\
                    </li>\
                    <li data-t="gozbsp" data-d="'+ res.id +'" data-g="'+ res.avatar_url +'" data-n="'+ res.nickname +'" class="center w50 soldRig">\
                        <span class="spco"><img class="bor0" src="images/room/shipinbofang.png" alt="">跟Ta视频</span>\
                    </li>'
        // $('#nickname').html(res.nickname)
        $('#uesrheds').html(html)
        $('#uesygzs').html(htm2)
        $('#uesethres').html(htm3)
        $('.ulfxids').html(htm4)
    }
    myfollowObj.golive = function(obj){
        var thisL = obj.attr('data-l')
        obj.addClass('activ').siblings().removeClass('activ')
        if (thisL == 'lvl') {
            $('.livegz').show().siblings('.div_live').hide()
            var ighe = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
            $('img.imHeig').css('height',ighe)
            myfollowObj.bannerObj('follow')
        }else{
            // console.log(2)
            myfollowObj.bannerObj('fens')
            $('#myLVN_wei').hide()
            $('.div_live').show().siblings('.livegz').hide()
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.6)
            $('img.img_nam').css('height',imag)
        }
    }
    myfollowObj.userxinObj = function(obj){
        $('.follouser').show(500)
        var thisD = obj.attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            user_id:thisD,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/user_info', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    myfollowObj.usertxt(res.info)
                    // var ty = $('#Aload').find('a.active').attr('data-d')
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
    myfollowObj.onloadExecution = function(){
    	myfollowObj.createDomObj()
        myfollowObj.createEvent()
        // myfollowObj.bannerObj('fens')
        myfollowObj.bannerObj('follow')
        // myfollowObj.createBannerHeight()
    }
    myfollowObj.init = function(){
	 	myfollowObj.onloadExecution()
    }