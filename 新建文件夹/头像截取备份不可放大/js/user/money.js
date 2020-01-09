    var moneyObj = new PageController({
	   'name': 'money',
	   'tpl' : 'template/user/money.html'
    });
    moneyObj.createDomObj = function(){
    	this.ClickObj = $(".monFan");
        this.hedsetObj = $("#money") 
        // this.followObj = $(".aAbsolute") 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            moneyObj.goBack()
        })
    }
    moneyObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            moneyObj.sectionEvent(e);
        });
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
            startYear: currYear - 30, //开始年份
            endYear: currYear + 10//结束年份
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
            startYear: currYear - 30, //开始年份
            endYear: currYear + 10 //结束年份
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

            html += '<ul class="ul_tex_four">\
                        <li class="w25 center">'+ Atime+'</li>\
                        <li class="w25 center">'+ list[i].score +'</li>\
                        <li class="w25 center">'+ (list[i].profit == '0' ? '-' : list[i].profit)+'</li>\
                        <li data-t="Alook" data-d="'+ list[i].date +'" class="w25 center li_A_ck">查看</li>\
                    </ul>'
        }
        $('#div_list_jl').html(html)
        $('#sp_iphons').html(res.mobile)
        $('#leijcaif').html(res.total)
    }
    moneyObj.txmoneyObj = function(num){
        var string =""+ num +"";//将数字转换成字符串形式
    　　var arr = string.split('.');//分割逗号;
    　　var num1 = arr[0];
    　　var reg = /(\d+)(\d{3})/;
    　　var Don = num1.replace(reg,'$1'+','+'$2')
        $('#b_ktx').html(Don)
    }
    moneyObj.dqMoneyObj = function(num){
        var string =""+ num +"";//将数字转换成字符串形式
    　　var arr = string.split('.');//分割逗号;
    　　var num1 = arr[0];
    　　var reg = /(\d+)(\d{3})/;
    　　var Don = num1.replace(reg,'$1'+','+'$2')
        $('#dqMon').html(Don)
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
        goreflectObj.goBack = function(){
            goreflectObj.destroy();
            moneyObj.show();
        }
        // setupeeObj.show();  
        goreflectObj.show(true,function(){
            // goreflectObj.timsDay(thisD,'')
        });
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