    var extensionObj = new PageController({
	   'name': 'extension',
	   'tpl' : 'template/user/extension.html'
    });
    extensionObj.createDomObj = function(){
        this.ClickObj = $(".inquFan");
        this.hedsetObj = $("#extens");
    }
    extensionObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            extensionObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            extensionObj.goBack()
        })
        var page = 1;
        $('#extens').dropload({  
            scrollArea : window,
            distance : 80,
            /*loadUpFn:function(me){
                extensionObj.pullLoad = me;
                me.resetload(); 
            },*/
            loadDownFn:function(me){
                extensionObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                    var typ = $('#ul_type_leix').find('li.activ').attr('data-l')
                    var postData ={  
                        page:page,
                        channel:ConfigObj.zdid,
                        app_key:ConfigObj.appkey,
                        anchor_id:ConfigObj.meId,
                        version:ConfigObj.version,
                        token:ConfigObj.token,
                        client:client,
                        mold:typ,
                        date:timeType,
                        rows:'10',
                    } 
                    console.log(postData)
                    var secretData = {
                      'info' : Global.encrypt(postData)
                    };
                    $.ajax({
                        url: ConfigObj.localSite+'/anchor/fortune_detail',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success:function(res){
                            if (res.ok == true) {
                                res.info = $.parseJSON(Global.crypt(res.result));
                                console.log(res.info)
                                extensionObj.loadListObj(res.info)
                            }else{
                               $.alertMsg(res.err) 
                            }
                        },
                        error:function(xhr, type){
                            me.resetload();
                        }
                    })
            }
        });

    }
    extensionObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "li_flowed" : extensionObj.quxgzObj(thisObj);return true; //礼物柜  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "inquLi" : extensionObj.golive(thisObL);return true; //類型 直播間 LVL 
            }
        }
    }
    extensionObj.golive = function(obj){
        obj.addClass('activ').siblings().removeClass('activ')
        var thisL = obj.attr('data-l')
        extensionObj.timsDay(thisL)
        if (thisL == '1V1') {
            $('#sp_wt_LV').show().siblings('#sp_wt_VN').hide()
        }else if(thisL == '1VN'){
            $('#sp_wt_LV').hide().siblings('#sp_wt_VN').show()
        }else{
            $('#sp_wt_LV,#sp_wt_VN').show()
        }
    }
    extensionObj.gotoInquire = function(obj,typ){
        timeType = obj
        extensionObj.timsDay()
        console.log(obj)
        $('#exten_time').html(obj)
    }
    extensionObj.timsDay = function(typ){
        // alert(54)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mold:typ,
            date:timeType,
            page:'1',
            rows:'10',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/fortune_detail', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    extensionObj.listTimday(res.info)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    extensionObj.listTimday = function(res){
        var html = ''
        var text = res.list
        if (ConfigObj.rules == '0') {
            text.forEach(function (v, i) {
                var time = v.created_date.substring(11,19)
                html += '<ul class="weaList_ul">\
                            <li class="center LiOverHid">'+ time+'</li>\
                            <li style="width: 10%;" class="center LiOverHid">'+ v.mold +'</li>\
                            <li class="center LiOverHid">'+ v.nickname +'</li>\
                            <li class="center LiOverHid">'+ (v.title == undefined ? '--' : v.title) +'</li>\
                            <li class="center LiOverHid">'+ v.score +'</li>\
                            <li class="center LiOverHid">'+ (v.money == '0' ? '-' : v.money) +'</li>\
                        </ul>'
            });
            $('#sp_wt_mony').html((res.total == '0' ? '-' : res.total))
            $('#sp_wt_LV').html('1v1 '+ (res.rate_1 == '0' ? '-' : res.rate_1))
            $('#sp_wt_VN').html('直播間 '+ (res.rate_n == '0' ? '-' : res.rate_n))
            $('#divListWeat').html(html)
        }else{
            for (var i = 0; i < text.length; i++) {
                var time = text[i].created_date.substring(11,19)
                html += '<ul class="weaList_ul">\
                            <li class="center LiOverHid">'+ time+'</li>\
                            <li style="width: 10%;" class="center LiOverHid">'+ text[i].mold +'</li>\
                            <li class="center LiOverHid">'+ text[i].nickname +'</li>\
                            <li class="center LiOverHid">'+ (text[i].title == undefined ? '--' : text[i].title) +'</li>\
                            <li class="center LiOverHid">'+ text[i].score +'</li>\
                            <li class="center LiOverHid">-</li>\
                        </ul>'
            }
            $('#sp_wt_mony').html('-')
            $('#sp_wt_LV').html('1v1  -')
            $('#sp_wt_VN').html('直播間  -')
            $('#divListWeat').html(html)
        }
        
    }
    extensionObj.loadListObj = function (res) {
        var dat = res.list
        var resuone = '';
        var arrLen = dat.length;
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            var time = dat[i].created_date.substring(11,19)
                if (ConfigObj.rules == '0') {
                    resuone += '<ul class="weaList_ul">\
                        <li class="center LiOverHid">'+ time+'</li>\
                        <li style="width: 10%;" class="center LiOverHid">'+ dat[i].mold +'</li>\
                        <li class="center LiOverHid">'+ dat[i].nickname +'</li>\
                        <li class="center LiOverHid">'+ (dat[i].title == undefined ? '--' : dat[i].title) +'</li>\
                        <li class="center LiOverHid">'+ dat[i].score +'</li>\
                        <li class="center LiOverHid">'+ (dat[i].money == '0' ? '-' : dat[i].money) +'</li>\
                    </ul>'
                }else{
                    resuone += '<ul class="weaList_ul">\
                        <li class="center LiOverHid">'+ time+'</li>\
                        <li style="width: 10%;" class="center LiOverHid">'+ dat[i].mold +'</li>\
                        <li class="center LiOverHid">'+ dat[i].nickname +'</li>\
                        <li class="center LiOverHid">'+ (dat[i].title == undefined ? '--' : dat[i].title) +'</li>\
                        <li class="center LiOverHid">'+ dat[i].score +'</li>\
                        <li class="center LiOverHid">-</li>\
                    </ul>'
                }
            }
        }else{
            $.alertMsg('已經到底了，沒有更多了')
            extensionObj.pullLoad.lock();
            // $('#fix_hide').show()
        }
        $('#divListWeat').append(resuone)
        extensionObj.pullLoad.resetload();
    }
    extensionObj.onloadExecution = function(){
        extensionObj.createDomObj()
        extensionObj.createEvent()
        // extensionObj.bannerObj('fens')
        // extensionObj.createBannerHeight()
    }
    extensionObj.init = function(){
        extensionObj.onloadExecution()
    } 

    