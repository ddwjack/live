    var goreflectObj = new PageController({
	   'name': 'goreflect',
	   'tpl' : 'template/user/goreflect.html'
    });
    goreflectObj.createDomObj = function(){
    	this.ClickObj = $(".reflFan");
        this.hedsetObj = $("#reflect") 
        this.hqyzmObj = $("#txyan") 
        this.aleftObj = $(".gore_img_bg") // 關閉提現說明 
        this.smshoObj = $("#sp_txsm") // 顯示提現說明  
        this.gofrsytObj = $("#gofrsytg") // 顯示提現說明  
    }
    goreflectObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            goreflectObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            goreflectObj.goBack()
        })
        this.hqyzmObj.unbind('tap').tap(function(){
            goreflectObj.getMsg()
        })
        this.aleftObj.unbind('tap').tap(function(){
            $('#goreTxsm').hide()
        })
        this.smshoObj.unbind('tap').tap(function(){
            $('#goreTxsm').show()
        })
        this.gofrsytObj.unbind('tap').tap(function() {
            promoteObj.goBack = function(){
                promoteObj.destroy();
                mypageObj.show(true);
                // Global.fixd()
            }
            promoteObj.show(true,function(){
                // moneyObj.moncentObj()
            }); 
        })
        var inphonch = localStorage.getItem("chIphone")
        if (inphonch == null) {
            // $('#inp_sjh').val('135645544') inp_sjh
        }else{
            $('#inp_sjh').val(inphonch)
        }

        $('#inp_sjh').focus(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        // 失去焦点时重新回到原来的状态
        $('#inp_sjh').blur(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        $('#inp_yzm').blur(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        $('#inp_yzm').focus(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        // 失去焦点时重新回到原来的状态
        // $(window).scroll(function(event){
        //     console.log(81)
        //     if ($('#home').css("display")!="none") {
        //         // start()
        //     }
        // })
    }
    goreflectObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Aqrtix" : goreflectObj.goAqrtix(thisObj);return true; //  确认提现 
                case "Atxjl" : goreflectObj.goAtxjl(thisObj);return true; //   
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "Alook" : goreflectObj.AlookObj(thisObL);return true; //  查看明細
            }
        }
    }
    
    goreflectObj.updatePlay = function(typ,userName,userYzms,txMoneys){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile:userName,
            score:txMoneys,
            handle:typ,
            code:userYzms,
            event:'withdraw',
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/withdraw', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                    if (typ == 'before') {
                        res.info = $.parseJSON(Global.crypt(res.result));
                        console.log(res.info)
                        goreflectObj.refleObj(res.info)   
                    }else{
                        $('#Btxjf').html(($('#Btxjf').html().replace(',','')*1)-txMoneys)
                        $('#Bzjf,#span_mon_sub,#sp_fenshu').html('0')
                        $('#inp_yzm').val('')
                        $.alertMsg(res.suc)
                    }
                    // goreflectObj.gohtmltext(res.info)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    goreflectObj.goAqrtix = function(obj){
        var userName = $('#inp_sjh').val();
        var userYzms = $('#inp_yzm').val();
        var txMoneys = ($('#Bzjf').html().replace(/,/,''))
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        if (userYzms.length == 0) {$.alertMsg('請輸入驗證碼'); return false;}
        if (txMoneys == '0'){$.alertMsg('无可用积分'); return false;}
        localStorage.setItem("chIphone",userName)
        goreflectObj.updatePlay('after',userName,userYzms,txMoneys)
    }
    goreflectObj.refleObj = function(res){
        var zjf = res.current_score
        var rjf = res.free_score
        goreflectObj.txmoneyObj(zjf)
        goreflectObj.dqMoneyObj(rjf)
        $('#refl_iphons').html(res.mobile)
        $('#p_txjes').html('￥'+'<span id="span_mon_sub">'+res.money +'</span>')
    }

    goreflectObj.getMsg = function () { //regist_updateMsg info
      if ($('#txyan').hasClass('alreadysend')) return;  
        var userName = $('#inp_sjh').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        $('#txyan').html('發送中');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile: userName,
            type: 'anchor',
            event:'withdraw'
        }
        // console.log(postData)
        var info = Global.encrypt(postData);
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                $('#txyan').html('重新获取');
                return false;
            }
            $('#txyan').html('60s');
            var i = 60;
            goreflectObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(goreflectObj.msgInterval);
                    $('#txyan').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#txyan').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    goreflectObj.txmoneyObj = function(num){
        var string =""+ num +"";//将数字转换成字符串形式
    　　var arr = string.split('.');//分割逗号;
    　　var num1 = arr[0];
    　　var reg = /(\d+)(\d{3})/;
    　　var Don = num1.replace(reg,'$1'+','+'$2')
        $('#Btxjf').html(Don)
    }
    goreflectObj.dqMoneyObj = function(num){
        var string =""+ num +"";//将数字转换成字符串形式
    　　var arr = string.split('.');//分割逗号;
    　　var num1 = arr[0];
    　　var reg = /(\d+)(\d{3})/;
    　　var Don = num1.replace(reg,'$1'+','+'$2')
        $('#Bzjf').html(Don)
        $('#sp_fenshu').html(Don) 
    }
    goreflectObj.goAtxjl = function(res){
        withdrawalsObj.goBack = function(){
            withdrawalsObj.destroy();
            goreflectObj.show();
        }
        withdrawalsObj.show(true);
    }
    goreflectObj.onloadExecution = function(){
    	goreflectObj.createDomObj()
        goreflectObj.createEvent()
        goreflectObj.updatePlay('before')
    }
    goreflectObj.init = function(){
	 	goreflectObj.onloadExecution()
    }