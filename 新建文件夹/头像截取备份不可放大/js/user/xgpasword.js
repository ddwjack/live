    var xgpaswordObj = new PageController({
       'name': 'xgpasword',
       'tpl' : 'template/user/xgpasword.html'
    });
    xgpaswordObj.createDomObj = function(){
        this.ClickObj = $(".xiwordFan");
        this.hedsetObj = $("#xgpassword") 

        this.imeiObj = $("#goxgyzm") //获取验证码
        this.userNameObj = $('#xgpwdtel')  //手机号 
        this.pwdDivObj = $('#xgpasswrds')  //密码*/
        this.submitloginObj = $('#renxgl') //注册 
        this.pwdyzmObj = $("#xgpwsyzms"); 
    }
    
    xgpaswordObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            xgpaswordObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            xgpaswordObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            xgpaswordObj.getMsg()
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
                xgpaswordObj.submitlogin();
        });
    }
    xgpaswordObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : xgpaswordObj.gofollow(thisObj);return true; //
                // case "a_tuij" : xgpaswordObj.gotuij(thisObj);return true; //  
                case "Alogin" : xgpaswordObj.AloginObj(thisObj);return true; //  
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "upd" : this.updateType(thisObL);return true; //* 
                case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //* 
            }
        }
    }
    xgpaswordObj.submitlogin = function(){ //修改密码 getUserInfo 
            var userData = this.createUserData();
            var invit = $('#input_yqm').val()
            console.log(57)
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                anchor_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'change_pwd',
                code: userData[2],
                password: userData[1],
                // invitation_code:invit
            }
            console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/anchor/reset_pwd',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                console.log(obj)
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    xgpaswordObj.goBack()
                    // mypageObj.show(true)
                    // Global.fixd()
                }else{
                    
                    $.alertMsg(obj.err )
                }
            // loginObj.socialAuth()
            },
            error : function(obj){
            alert('綁定失败'+ obj)
            }
        });
    }

    xgpaswordObj.getMsg = function () { //regist_updateMsg info
      if ($('#goxgyzm').hasClass('alreadysend')) return;  
        var userName = $('#xgpwdtel').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
       /* var passwos = $('#xgpasswrds').val();
        if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}*/

        $('#goxgyzm').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            client:client,
            mobile: userName,
            type: 'anchor',
            event:'change_pwd'
        }
        var info = Global.encrypt(postData);
        // http://120.27.68.38:9001/common/sendCode
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                $('#goxgyzm').removeClass('alreadysend').html('獲取');
                return false;
            }
            // else $.alertMsg(req.err);
            $('#goxgyzm').html('60s');
            var i = 60;
            xgpaswordObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(xgpaswordObj.msgInterval);
                    $('#goxgyzm').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#goxgyzm').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    xgpaswordObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord,yzm);
    }
    xgpaswordObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };
    xgpaswordObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    xgpaswordObj.AloginObj = function(obj){
        loginObj.goBack = function(){
            xgpaswordObj.show();
            loginObj.destroy();
        }
        loginObj.show(true,function(){
            $('#bdiph').hide()
        });
    }
    xgpaswordObj.onloadExecution = function(){
        xgpaswordObj.createDomObj()
        xgpaswordObj.createEvent()
    }
    xgpaswordObj.init = function(){
        xgpaswordObj.onloadExecution()
    }