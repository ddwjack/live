    var moneyObj = new PageController({
	   'name': 'money',
	   'tpl' : 'template/user/money.html'
    });
    moneyObj.createDomObj = function(){
    	this.ClickObj = $(".monFan");
        this.hedsetObj = $("#money") 
        this.gosytgObj = $("#gosytg") 
        // this.followObj = $(".aAbsolute")  

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            moneyObj.goBack()
        })
    }
    moneyObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            moneyObj.sectionEvent(e);
        });
        this.gosytgObj.unbind('tap').tap(function(e) {
            promoteObj.goBack = function(){
                promoteObj.destroy();
                mypageObj.show(true);
                Global.fixd()
            }
            promoteObj.show(true,function(){
                // moneyObj.moncentObj()
            }); 
        })
        OntimeObj()
        OfftimeObj()
    }
    function OntimeObj(){
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
        $("#inpOntin").mobiscroll($.extend(opt['date'], opt['default']));
    }
    function OfftimeObj(){
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
            endYear: currYear + 5 //结束年份
        };
        $("#inpOfftin").mobiscroll($.extend(opt['date'], opt['default']));
    }
    moneyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Agoumai" : moneyObj.goAgoumai(thisObj);return true; //   去提現 
                case "Acfgz" : moneyObj.goAcfgz(thisObj);return true; //   财富规则 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "goplay" : moneyObj.goplay(thisObL);return true; //* 
                case "Alook" : moneyObj.AlookssObj(thisObL);return true; //  查看明細
            }
        }
    }
    moneyObj.goplay = function(obj){
        obj.addClass('colC86').siblings().removeClass('colC86')
    }

    moneyObj.updatePlay = function(typ,On,Off){
        // if (true) {}
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            start_date:On,
            end_date:Off,
            page:'1',
            rows:'10',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/fortune', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    moneyObj.gohtmltext(res.info)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    moneyObj.gohtmltext = function(res){
        var Tmoney = ""+res.free_score+""
        var Dmoney = ""+res.current_score+""
        var timone = res.start_date.replace(" ",',')
        var timones = timone.replace(/-/g,'/')
        var timend = res.end_date.replace(" ",',')
        var timends = timend.replace(/-/g,'/')

        moneyObj.txmoneyObj(Dmoney)
        moneyObj.dqMoneyObj(Tmoney)
        $('#inpOntin').attr({'placeholder':timones,'value':timones})
        $('#inpOfftin').attr({'placeholder':timends,'value':timends})
        var list = res.list
        // var payT = res.method.online.pay_type
        var html = ''
        for (var i = 0; i < list.length; i++) {
            var Atime = list[i].date.replace(/-/g,'/')
            if (ConfigObj.rules == '0') {
                html += '<ul class="ul_tex_four">\
                        <li class="w25 center">'+ Atime+'</li>\
                        <li class="w25 center">'+ list[i].score +'</li>\
                        <li class="w25 center">'+ (list[i].money == '0' ? '-' : list[i].money)+'</li>\
                        <li data-t="Alook" data-d="'+ list[i].date +'" class="w25 center li_A_ck">\
                        '+ (list[i].status == '0' ? '未提現' : (list[i].status == '1' ? '已提現' : (list[i].status == '3' ? '審核中' : '已拒絕') )) +'</li>\
                    </ul>'
            }else{ 
                html += '<ul class="ul_tex_four">\
                        <li class="w25 center">'+ Atime+'</li>\
                        <li class="w25 center">'+ list[i].score +'</li>\
                        <li class="w25 center">-</li>\
                        <li data-t="Alook" data-d="'+ list[i].date +'" class="w25 center li_A_ck">明细</li>\
                    </ul>'
            }
            
        }
        $('#div_list_jl').html(html)
        $('#sp_iphons').html(res.mobile)
        $('#leijcaif').html(res.total)
    }
    moneyObj.txmoneyObj = function(num){
        if (num < 1000) {
            $('#b_ktx').html(num)
        }else{
            var b = parseInt(num).toString();
            var len = b.length;
            if (len <= 3) { return b; }
            var r = len % 3;
            var Don =  r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
            $('#b_ktx').html(Don)
        }
    }
    moneyObj.dqMoneyObj = function(num){
        if (num < 1000) {
            $('#dqMon').html(num)
        }else{
            var b = parseInt(num).toString();
            var len = b.length;
            if (len <= 3) { return b; }
            var r = len % 3;
            var Don =  r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
            $('#dqMon').html(Don)
        }
        
    }
    moneyObj.AlookssObj = function(obj){
        var thisD = obj.attr('data-d')
        extensionObj.goBack = function(){
            extensionObj.destroy();
            moneyObj.show();
        }
        // setupeeObj.show();  
        extensionObj.show(true,function(){
            extensionObj.gotoInquire(thisD,'')
        });
    }
    moneyObj.goAgoumai = function(obj){
        if (ConfigObj.rules == '0') {
            goreflectObj.goBack = function(){
                goreflectObj.destroy();
                moneyObj.show(true);
            }
            // setupeeObj.show();  
            goreflectObj.show(true,function(){
                // goreflectObj.timsDay(thisD,'')
            });
        }else{
            $.alertMsg('提现请联系家族长')
        }
        
    }
    moneyObj.goAcfgz = function(obj){
        ruleObj.goBack = function(){
            ruleObj.destroy();
            moneyObj.show();
        }
        // setupeeObj.show();  
        ruleObj.show(true,function(){
        });
    }
    moneyObj.onloadExecution = function(){
    	moneyObj.createDomObj()
        moneyObj.createEvent()
        moneyObj.updatePlay()
    }
    moneyObj.init = function(){
	 	moneyObj.onloadExecution()
    }