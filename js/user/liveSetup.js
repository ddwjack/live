    var liveSetupObj = new PageController({
	   'name': 'liveSetup',
	   'tpl' : 'template/user/liveSetup.html',
    });

    liveSetupObj.createDomObj = function(){
    	this.ClickObj = $(".livestFan");
        this.hedsetObj = $("#liveset");
    }
    liveSetupObj.livListObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            handle:'before',
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/profile', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(30)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    liveSetupObj.listMoney(res.info)
                }else{
                   $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    liveSetupObj.setupTim = function(tim,fee){
        setupTims = tim
        setupfees = fee
        console.log(tim)
        if (tim == '' || tim == '0') {
            // $('#liv_dm1').attr('placeholder','0').val('0')
            // $('#liv_dm2').attr('placeholder','0').val('0')
            console.log(1)
        }else{
            console.log(2)
            var tim = setupTims.split(',')
            // $('#Ldisturd').find('span.fr').addClass('s_Off')
            // $('#Ldisturd').siblings().removeClass('li_hide')
            $('#liv_dm1').attr('placeholder',tim[0]).val(tim[0])
            $('#liv_dm2').attr('placeholder',tim[1]).val(tim[1])
        }
    }
    liveSetupObj.listMoney = function(res){
        var html = ''
        for (var i = 0; i < res.length; i++) {
            html += '<li data-t="lvMoney" data-l="'+ res[i]+'" class="li_lv_list '+ (res[i] == setupfees ? 'lv_liv_activ' : '') +'"><span class="span">'+ res[i] +'金幣/分鐘</span></li>'
        }
        $('#ul_mon_list').html(html)
    }
    liveSetupObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            liveSetupObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            liveSetupObj.goBack()
        })
        var calendartime = new lCalendar();
        calendartime.init({
            'trigger': '#liv_dm1',
            'type': 'time'
        });
        var calendartime = new lCalendar();
        calendartime.init({
            'trigger': '#liv_dm2',
            'type': 'time'
        });
        // console.log()
        // $('#Starttim').html($('#liv_dm1').val())
    }
    liveSetupObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "A_liv_sz" : liveSetupObj.gosubszObj(thisObj);return true; //確定設置 
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "disturset" : liveSetupObj.godisturset(thisObL);return true; //用户印象 
                case "lvMoney" : this.lvMoney(thisObL);return true; //選擇金幣價格 
            }
        }
    }
    liveSetupObj.lvMoney = function(obj){
        obj.addClass('lv_liv_activ').siblings().removeClass('lv_liv_activ')
    }
    liveSetupObj.setdisturb = function(typ){
        if (typ != '0') {
            var tim = typ.split(',')
            $('#Ldisturd').find('span.fr').addClass('s_Off')
            $('#Ldisturd').siblings().removeClass('li_hide')
            $('#liv_dm1').attr('placeholder',tim[0]).val(tim[0])
            $('#liv_dm2').attr('placeholder',tim[1]).val(tim[1])
        }
    }
    liveSetupObj.godisturset = function(obj){
        // console.log(165)
        obj.find('span.spbut').toggleClass('s_Off')
        obj.siblings().toggleClass('li_hide')
    }
    liveSetupObj.gosubszObj = function(obj){
        /*if (!$('#Ldisturd').find('span').hasClass('s_Off')) {
            var arrNm = {'slot':'0','fee':'0'}
            Global.usNoetu(arrNm)
            liveSetupObj.goBack()
        }else{*/
            var befTime = $('#liv_dm1').val()
            var aftTime = $('#liv_dm2').val()
            var feeMony = $('#ul_mon_list').find('li.lv_liv_activ').attr('data-l')
            var disTime = befTime+','+aftTime
            // if (befTime == '') {$.alertMsg('未設置開始時間');return false;}
            // if (aftTime == '') {$.alertMsg('未設置結束時間');return false;}
            // if (feeMony == undefined) {$.alertMsg('未設置通話價格');return false;}
            var arrNm = {'slot':disTime,'fee':feeMony}
            console.log(arrNm)
            Global.usNoetu(arrNm)
            liveSetupObj.goBack()
        // }
    }
    liveSetupObj.onloadExecution = function(){
    	liveSetupObj.createDomObj()
        liveSetupObj.createEvent()
        liveSetupObj.livListObj()
        // liveSetupObj.createBannerHeight()
    }
    liveSetupObj.init = function(){
	 	liveSetupObj.onloadExecution()
    }