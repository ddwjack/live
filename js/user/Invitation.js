    var InvitationObj = new PageController({
	   'name': 'Invitation',
	   'tpl' : 'template/user/Invitation.html'
    });
    InvitationObj.createDomObj = function(){
        this.ClickObj = $(".incoFan");
        this.hedsetObj = $("#Invitation");
    }
    InvitationObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            InvitationObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            InvitationObj.goBack()
        })
        onetimeObj()
        twotimeObj()
        var page = 1;
        $('#Invitation').dropload({  
            scrollArea : window,
            distance : 100,
            loadDownFn:function(me){
                // console.log(me)
                // var ty = $('#Aload').find('a.active').attr('data-d')
                // console.log(ty)
                InvitationObj.pullLoad = me;
                var ks = $('#inputone').val()
                var js = $('#inputtwo').val()
                page++;
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    version:ConfigObj.version,
                    anchor_id:ConfigObj.meId,
                    token:ConfigObj.token,
                    client:client,
                    page:page,
                    rows:'10',
                    start_date:ks,
                    end_date:js
                }
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/anchor/profit_detail', 
                    // url: ConfigObj.localSite+'/common/gift_list', 
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (res.err == undefined) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            console.log(res.info)
                            InvitationObj.downdat(res.info)
                            // homeObj.ajaxSuccessFun();
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
        })  
    }
    InvitationObj.sectionEvent = function(e){
        var pObL = $.oto_checkEvent(e,"A");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Axun" : InvitationObj.goAxun(thisObL);return true; //性别取消 
            }
        }
    }

    InvitationObj.goAxun = function(obj) {
        InvitationObj.withdList($('#inputtwo').val(),$('#inputone').val())
    }
    InvitationObj.withdList = function(js,ks){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            token:ConfigObj.token,
            client:client,
            page:'1',
            rows:'10',
            start_date:ks,
            end_date:js
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/profit_detail', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res)
                    InvitationObj.datList(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                gifNonelive()
            }
        })
    }
    InvitationObj.datList = function(dat) {
        var html = ''
        for (var i = 0; i < dat.length; i++) {
            var red = dat[i]
            html += '<ul class="ul_cen_list">\
                        <li class="li_contlst">'+ red.date.replace(/\-/g,'/')+'</li>\
                        <li class="li_contlst">'+ (red.role == 'anchor' ? '主播' : '用户')+'</li>\
                        <li class="li_contlst">'+ red.nickname+'</li>\
                        <li class="li_contlst">'+ red.profit+'</li>\
                    </ul>'
        }
        $('#incom_lst').html(html)
    }
    InvitationObj.downdat = function(obj) {
        var data = obj
        var result = '';
        var arrLen = data.length;
        if(arrLen > 0){
            for (var i = 0; i < data.length; i++) {
                var red = data[i]
                result += '<ul class="ul_cen_list">\
                                <li class="li_contlst">'+ red.date.replace(/\-/g,'/')+'</li>\
                                <li class="li_contlst">'+ (red.role == 'anchor' ? '主播' : '用户')+'</li>\
                                <li class="li_contlst">'+ red.nickname+'</li>\
                                <li class="li_contlst">'+ red.profit+'</li>\
                            </ul>'
            }
        }else{
            $.alertMsg('已經到底了，沒有更多内容了')
            InvitationObj.pullLoad.lock();
        }
        $('#incom_lst').append(result);
        InvitationObj.pullLoad.resetload();
    }
    function getdayDate() {  
        var dd = new Date();
        var m1 = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d1 = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        $('#inputtwo').val(dd.getFullYear()+"/"+m1+"/"+d1)
        return time1=dd.getFullYear()+"/"+m1+"/"+d1;
    };
    function getNextDate(day) {  
        var dd = new Date();
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        $('#inputone').val(y + "/" + m + "/" + d)
        return timTwo =  y + "/" + m + "/" + d;
    };
    function onetimeObj(){
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy/mm/dd',
            lang: 'zh',
            showNow: true,
            // nowText: "今天",
            startYear: currYear - 1, //开始年份
            endYear: currYear + 5//结束年份
        };
        $("#inputone").mobiscroll($.extend(opt['date'], opt['default']));
    }
    function twotimeObj(){
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy/mm/dd',
            lang: 'zh',
            showNow: true,
            startYear: currYear - 1, //开始年份
            endYear: currYear + 5 //结束年份
        };
        $("#inputtwo").mobiscroll($.extend(opt['date'], opt['default']));
    }
    InvitationObj.AlistWith = function(obj){
        // obj.addClass('active').siblings().removeClass('active')
        // var thisL = obj.attr('data-l')
        // InvitationObj.withdList(thisL)
    }
    InvitationObj.onloadExecution = function(){
        InvitationObj.createDomObj()
        InvitationObj.createEvent()
        getdayDate()
        getNextDate(-7)
        InvitationObj.withdList(time1,timTwo)

        gifJsonlive()
        // InvitationObj.createBannerHeight()
    }
    InvitationObj.init = function(){
        InvitationObj.onloadExecution()
    }