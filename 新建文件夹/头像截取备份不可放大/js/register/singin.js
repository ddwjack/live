    var singinObj = new PageController({
	   'name': 'singin',
	   'tpl' : 'template/register/singin.html'
    });
    singinObj.createDomObj = function(){
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
    singinObj.submitlogin = function(ty){ //登录 getUserInfo 
        gifJsonlive()
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
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                token:ConfigObj.token,
                client:client,
                mobile: userData[0],
                password: pawd,
                mold:mold,
                code: code,
            }
        console.log(postData)
        // console.log(postData)  Global 
      $('#button_pwd').text('正在登錄中...');
      // return false;
    //    //console.log(ConfigObj.localSite + "?m=user.account.login"); but_sign
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // alert(ConfigObj.localSite)
        $.ajax({
          url : ConfigObj.localSite+'/anchor/login',
          // url : ConfigObj.localSite + "?version=1&m=user.account.login", login_submitlogin
          data : secretData,
          type : "post",
          dataType : "json",
            success : function(obj){
            // obj.info = $.parseJSON(Global.crypt(obj.result));
                if(!obj.err){
                    obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    ConfigObj.meId = obj.info.anchor_id;  
                    ConfigObj.anchor = obj.info.anchor_no
                    ConfigObj.token = obj.info.token 
                    // ConfigObj.status = obj.info.basic.auth_status //是否认证
                    // ConfigObj.satype = obj.info.basic.type //认证状态
                    Global.anchorId() //调用安卓方法传值
                    homeObj.show(true)
                    // homeObj.show(true)
                    Global.checkUpdate()  //
                    Global.fixd()
                    singinObj.destroy()
                    setupObj.destroy()
                    // Messagetext()
                    localStorage.setItem("anchor_id", obj.info.anchor_id);
                    // singinObj.isLogin = true
                }else{
                    $('#button_pwd').text('登錄');
                    // $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                    gifNonelive()
                    if (obj.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
              }
        // loginObj.socialAuth()
          },
        error : function(obj){
            $('#button_pwd').text('登錄');
            gifNonelive()
          $.alertMsg('登录请求失败，请稍后重试')
        }
        });
    }
    singinObj.gouserRZ = function(){
        zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            singinObj.show(true);
        }
        zbrzoneObj.show(true);
    }
    singinObj.iphon = function(){
        $('#bdiph').hide()
    }
    singinObj.createUserData = function(){
        var userName = this.userNameObj.val();
        console.log(userName)
        // var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,yzm);
    }
    singinObj.createUserpwd = function(){
        var userName = this.useriphoneObj.val();
        console.log(userName)
        var passWord = this.pwdDivObj.val();
        // var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord);
    }

    singinObj.checkUserName = function (name) {
        console.log(name)
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            gifNonelive()
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            gifNonelive()
            return false;
        } 
        return true;
    };

    singinObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //
            gifNonelive()
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            gifNonelive()
            return false;
        } 
        return true;
    };

    singinObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            singinObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回
            singinObj.goBack()
        })
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        this.imeiObj.unbind('tap').tap(function(){
            singinObj.getMsg()
        })
        this.actiObj.unbind('tap').tap(function(){
            $(this).find('i').toggleClass('i_Off')
        })
        this.submitloginObj.unbind('tap').tap(function(){ 
            singinObj.submitlogin(1);
        });
        this.butpwdObj.unbind('tap').tap(function(){
            singinObj.submitlogin(2)
        })
    }
    singinObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "paswo" : singinObj.paswo();return true; //密码显示*
                // case "patex" : singinObj.patex();return true; //显示密码
                case "Alogin" : singinObj.AloginObj();return true;  //验证码登录 
                case "Ammlogin" : singinObj.AmmloginObj();return true;  //密码登录 
                case "Awjpwd" : singinObj.AwjpwdObj();return true;  //密码登录  
                case "Agozc" : singinObj.AgozcObj();return true;  //密码登录  
            }
        }
    }
    singinObj.AloginObj = function(obj){
        $('.goyzmdl').css('display','none')
        $('.gommdl').css('display','block')
    }
    singinObj.AmmloginObj = function(obj){
        $('.goyzmdl').css('display','block')
        $('.gommdl').css('display','none')
    }
    singinObj.AwjpwdObj = function(){
        pwdloginObj.goBack = function(){
            pwdloginObj.destroy();
            singinObj.show();
        }
        pwdloginObj.show();
    }
    singinObj.AgozcObj = function(){
        zregisterObj.goBack = function(){
            zregisterObj.destroy();
            singinObj.show();
        }
        zregisterObj.show();
    }
    singinObj.getMsg = function () { //regist_updateMsg info
      if ($('#imeihq').hasClass('alreadysend')) return;  
        var userName = $('#login_iphoneObj').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        $('#imeihq').html('發送中');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile: userName,
            type: 'anchor',
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

    /*singinObj.paswo = function(){
        $('.div_mm').hide().siblings('.div_mm_s').show()
        $('.pa_tex').val($('.in_pwd').val())

    }
    singinObj.patex = function(){
        $('.div_mm_s').hide().siblings('.div_mm').show()
        $('.pa_tex').val($('.in_pwd').val())
    }*/

    singinObj.onloadExecution = function(){
    	singinObj.createDomObj()
        singinObj.createEvent()
    }
    singinObj.init = function(){
	 	singinObj.onloadExecution()
    }