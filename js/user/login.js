    var loginObj = new PageController({
     'name': 'login',
     'tpl' : 'template/user/login.html'
    });
    loginObj.createDomObj = function(){
      this.ClickObj = $(".login_fans");
        this.hedsetObj = $("#singin")
        this.imeiObj = $("#imeihq") //获取验证码
        this.actiObj = $("#i_acit") //同意协议  
        this.submitloginObj = $('#button_login') //验证码登录
        this.butpwdObj = $('#button_pwd') //密码登录登录
        this.userNameObj = $('#login_iphoneObj')  //手机号 login_iphoneObj
        this.useriphoneObj = $('#login_pwdObj')  //手机号 login_pwdObj  
        this.pwdDivObj = $('#register_pwd')  //密码*/ 
        this.pwdyzmObj = $("#lgyzm"); 
    }
    loginObj.submitlogin = function(ty){ //登录 getUserInfo 
        console.log(ty)
        if (ty == '1') {//验证码登录
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            var mold = 'code'
            var code = userData[1]
            var pawd = ''
        }else{//密码登录
            var userData = this.createUserpwd();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            var mold = 'pwd'
            var code = ''
            var pawd = userData[1]
        }
        gifJsonlive()
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                client:client,
                mobile: userData[0],
                password: pawd,
                mold:mold,
                code: code,
            }
        // console.log(postData)
        // console.log(postData)  Global 
      $('.but_sign').text('正在登錄中...');
      // return false;
    //    //console.log(ConfigObj.localSite + "?m=user.account.login"); but_sign
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
          url : ConfigObj.localSite+'/user/login',
          // url : ConfigObj.localSite + "?version=1&m=user.account.login", login_submitlogin
          data : secretData,
          type : "post",
          dataType : "json",
            success : function(obj){
            // obj.info = $.parseJSON(Global.crypt(obj.result));
                if(!obj.err){
                    obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    var nam_usId = obj.info.user_id
                    ConfigObj.meId = nam_usId
                    ConfigObj.iphon = obj.info.mobile
                    if (ConfigObj.platForm == 'android') {
                        android_obj.getSaveUserID(nam_usId)
                    }else if(ConfigObj.platForm == 'ios'){
                        ios_obj.getSaveUserID(nam_usId)
                    }
                    loginObj.isLogin = true;
                    // loginObj.pwdDivObj.children('input').val('');   // 清空密码域
                    mypageObj.show(true)
                    Global.fixd()
                    gifNonelive()
                }else{
                    // $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                    gifNonelive()
              }
        // loginObj.socialAuth()
          },
        error : function(obj){
          alert('登录请求失败，请稍后重试'+ obj)
        }
        });
    }
    loginObj.gouserRZ = function(){
        zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            loginObj.show(true);
        }
        zbrzoneObj.show(true);
    }
    loginObj.iphon = function(){
        $('#bdiph').hide()
    }
    loginObj.createUserData = function(){
        var userName = this.userNameObj.val();
        // console.log(userName)
        // var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,yzm);
    }
    loginObj.createUserpwd = function(){
        var userName = this.useriphoneObj.val();
        // console.log(userName)
        var passWord = this.pwdDivObj.val();
        // var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord);
    }

    loginObj.checkUserName = function (name) {
        console.log(name)
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };

    loginObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };

    loginObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            loginObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回
            loginObj.goBack()
        })
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        this.imeiObj.unbind('tap').tap(function(){
            loginObj.getMsg()
        })
        this.actiObj.unbind('tap').tap(function(){
            $(this).find('i').toggleClass('i_Off')
        })
        this.submitloginObj.unbind('tap').tap(function(){ 
            loginObj.submitlogin(1);
        });
        this.butpwdObj.unbind('tap').tap(function(){
            loginObj.submitlogin(2)
        })
    }
    loginObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "paswo" : loginObj.paswo();return true; //密码显示*
                // case "patex" : loginObj.patex();return true; //显示密码
                case "Alogin" : loginObj.AloginObj();return true;  //验证码登录 
                case "Ammlogin" : loginObj.AmmloginObj();return true;  //密码登录 
                case "Awjpwd" : loginObj.AwjpwdObj();return true;  //密码登录  
                case "Agozc" : loginObj.AgozcObj();return true;  //密码登录  
            }
        }
    }
    loginObj.AloginObj = function(obj){
        $('.goyzmdl').css('display','none')
        $('.gommdl').css('display','block')
    }
    loginObj.AmmloginObj = function(obj){
        $('.goyzmdl').css('display','block')
        $('.gommdl').css('display','none')
    }
    loginObj.AwjpwdObj = function(){
        pwdloginObj.goBack = function(){
            pwdloginObj.destroy();
            loginObj.show();
        }
        pwdloginObj.show();
    }
    loginObj.AgozcObj = function(){
        zregisterObj.goBack = function(){
            zregisterObj.destroy();
            loginObj.show();
        }
        zregisterObj.show();
    }
    loginObj.getMsg = function () { //regist_updateMsg info
      if ($('#imeihq').hasClass('alreadysend')) return;  
        var userName = $('#login_iphoneObj').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        $('#imeihq').html('發送中');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            client:client,
            mobile: userName,
            type: 'user',
            event:'login'
        }
        // console.log(postData)
        var info = Global.encrypt(postData);
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                $('#imeihq').html('重新获取');
                return false;
            }
            $('#imeihq').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#imeihq').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#imeihq').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    loginObj.onloadExecution = function(){
      loginObj.createDomObj()
        loginObj.createEvent()
    }
    loginObj.init = function(){
    loginObj.onloadExecution()
    }