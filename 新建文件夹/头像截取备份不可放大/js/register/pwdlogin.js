    var pwdloginObj = new PageController({
       'name': 'pwdlogin',
       'tpl' : 'template/register/pwdlogin.html'
    });
    pwdloginObj.createDomObj = function(){
        this.ClickObj = $(".pwdFan");
        this.hedsetObj = $("#pwdlogin") 

        this.imeiObj = $("#goinyzm") //获取验证码
        this.userNameObj = $('#Xiphone')  //手机号 
        this.pwdDivObj = $('#Xpasswrd')  //密码*/
        this.submitloginObj = $('#Xqueren') //注册
        this.pwdyzmObj = $("#Xyzm"); 
    }
    
    pwdloginObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            pwdloginObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            pwdloginObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            pwdloginObj.getMsg()
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
                pwdloginObj.submitlogin();
        });
    }
    pwdloginObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : pwdloginObj.gofollow(thisObj);return true; //
                case "a_tuij" : pwdloginObj.gotuij(thisObj);return true; //  
                case "a_kuoz" : pwdloginObj.gokuoz(thisObj);return true; //  
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
    pwdloginObj.submitlogin = function(){ //修改密码 getUserInfo 
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                anchor_id:ConfigObj.meId,
                token:ConfigObj.token,
                client:client,
                mobile: userData[0],
                event:'reset_pwd',
                code: userData[2],
                password: userData[1]
            }
            // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
          url : ConfigObj.localSite+'/anchor/reset_pwd',
          data : secretData,
          type : "post",
          dataType : "json",
            success : function(obj){
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    pwdloginObj.goBack()
                }else{
                    $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
        // loginObj.socialAuth()
          },
        error : function(obj){
          alert('注册失败'+ obj)
          $('.but_sign').text('注册');
        }
        });
    }

    pwdloginObj.getMsg = function () { //regist_updateMsg info
      if ($('#goinyzm').hasClass('alreadysend')) return;  
        var userName = $('#Xiphone').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        // var passwos = $('#register_smsCode').val();
        // if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}

        $('#goinyzm').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile: userName,
            type: 'anchor',
            event:'reset_pwd'
        }
        var info = Global.encrypt(postData);
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                return false;
            }
            // else $.alertMsg(req.err);
            $('#goinyzm').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#goinyzm').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#goinyzm').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    pwdloginObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord,yzm);
    }
    pwdloginObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };
    pwdloginObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    pwdloginObj.onloadExecution = function(){
        pwdloginObj.createDomObj()
        pwdloginObj.createEvent()
    }
    pwdloginObj.init = function(){
        pwdloginObj.onloadExecution()
    }