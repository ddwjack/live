    var promoteObj = new PageController({
	   'name': 'promote',
	   'tpl' : 'template/user/promote.html'
    });
    promoteObj.createDomObj = function(){
    	this.ClickObj = $(".proFan");
        this.hedsetObj = $("#promo") 
        this.hqyzmObj = $("#span_yam") 
        this.zbsyObj = $("#sp_zbsy") // 直播收益
        // this.aleftObj = $(".gore_img_bg") // 關閉提現說明 
        // this.smshoObj = $("#sp_txsm") // 顯示提現說明 
    }
    promoteObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            promoteObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            promoteObj.goBack()
        })
        this.hqyzmObj.unbind('tap').tap(function(){
            promoteObj.getMsg()
        })
        this.zbsyObj.unbind('tap').tap(function(e) {
            moneyObj.goBack = function(){
                moneyObj.destroy();
                mypageObj.show();
            }
            moneyObj.show(true);
        })
        $('#inp_cod').blur(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        $('#inp_cod').focus(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        $('#inp_mobil').blur(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        $('#inp_mobil').focus(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        // 失去焦点时重新回到原来的状态
        
    }
    promoteObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "AtxMony" : promoteObj.goAqrtix(thisObj);return true; //  确认提现 
                case "sydetai" : promoteObj.goAtxjl(thisObj);return true; //   收益明细 
                case "A_jl" : promoteObj.goAjl(thisObj);return true; //   收益明细 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "Alook" : promoteObj.AlookObj(thisObL);return true; //  查看明細
            }
        }
    }
    
    promoteObj.updatePlay = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/promote_profit', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                        res.info = $.parseJSON(Global.crypt(res.result));
                        console.log(res.info)
                        $('#sp_current').html(res.info.current)
                        $('#span_cur').html('￥'+res.info.current)
                        $('#sp_total').html(res.info.total)
                        $('#inp_mobil').val(res.info.mobile)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
                gifNonelive()
            }
        })
    }
    promoteObj.goAqrtix = function(obj){
        var userName = $('#inp_mobil').val();
        var userYzms = $('#inp_cod').val();
        var txMoneys = $('#sp_current').html()
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        if (userYzms.length == 0) {$.alertMsg('請輸入驗證碼'); return false;}
        if (txMoneys == '0'){$.alertMsg('无可提现金额'); return false;}
        // console.log(userName,userYzms,txMoneys)
        promoteObj.tixianObj(userName,userYzms,txMoneys)
    }
    promoteObj.tixianObj = function(userName,userYzms,txMoneys){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            money:txMoneys,
            mobile:userName,
            code:userYzms,
            event:'withdraw',
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/promote_withdraw', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                        // res.info = $.parseJSON(Global.crypt(res.result));
                        // console.log(res.info)
                        $.alertMsg(res.suc)
                        $('#sp_current').html('0')
                        $('#span_cur').html('￥0')
                        // $('#sp_total').html(res.info.total)
                        /*$('#sp_current,#span_cur').html('￥'+res.info.current)
                        $('#sp_total').html(res.info.total)
                        $('#inp_mobil').val(res.info.mobile)*/
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
                gifNonelive()
            }
        })
    }
    promoteObj.getMsg = function () { //regist_updateMsg info
      if ($('#span_yam').hasClass('alreadysend')) return;  
        var userName = $('#inp_mobil').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        $('#span_yam').html('發送中');
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
                $('#span_yam').html('重新获取');
                return false;
            }
            $('#span_yam').html('60s');
            var i = 60;
            promoteObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(promoteObj.msgInterval);
                    $('#span_yam').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#span_yam').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    promoteObj.goAtxjl = function(res){
        incomeObj.goBack = function(){
            incomeObj.destroy();
            promoteObj.show();
        }
        incomeObj.show(true);
    }
    promoteObj.goAjl = function(res){
        withdrawalsObj.goBack = function(){
            withdrawalsObj.destroy();
            promoteObj.show();
        }
        withdrawalsObj.show(true);
    }
    promoteObj.onloadExecution = function(){
    	promoteObj.createDomObj()
        promoteObj.createEvent()
        promoteObj.updatePlay()
        gifJsonlive()
    }
    promoteObj.init = function(){
	 	promoteObj.onloadExecution()
    }