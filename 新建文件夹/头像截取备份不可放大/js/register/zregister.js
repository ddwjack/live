    var zregisterObj = new PageController({
	   'name': 'zregister',
	   'tpl' : 'template/register/zregister.html'
    });
    zregisterObj.createDomObj = function(){
    	this.ClickObj = $(".zczb_fans");
        this.hedsetObj = $("#zregister")
        this.imeiObj = $("#imei") //获取验证码
        this.actiObj = $("#i_acit") //同意协议  
        this.submitloginObj = $('#button_zczb') //注册
        this.userNameObj = $('#login_userNameObj')  //手机号 
        this.pwdDivObj = $('#register_smsCode')  //密码*/
        this.pwdyzmObj = $("#yzm"); 
        this.spgoyhxyObj = $(".spgoyhxy"); 


        // this.incoloObj = $(".in_colo")
        /*this.spxmObj = $(".sp_xm") //用户名登录改忘记密码 
        // this.spsjhObj = $(".sp_sjh") //用户名登录 
        this.ssignObj = $(".but_sign") //登录 
        this.userNameObj = $('.login_user')  //手机号 
        this.pwdDivObj = $('.in_pwd')  //密码*/
        this.ClickObj.tap(function(e){ //返回
            zregisterObj.goBack()
        })
        /*this.spxmObj.tap(function(){
            wjwordObj.goBack = function(){
                wjwordObj.destroy();
                zregisterObj.show();
            }
            wjwordObj.show();
        })*/
        /*this.spsjhObj.tap(function(){  loginObj.getUserInfo
            $('.div_zh').show().siblings('.div_yhm').hide()
            $('.ym_p').show().siblings('.sj_p').hide()
        })*/
        /*this.ssignObj.unbind('tap').tap(function(){
            zregisterObj.submitlogin('1');  //登录
        })
        */
    }
    zregisterObj.submitlogin = function(){ //注册 getUserInfo 
            // $('.div_log').show()
            gifJsonlive()
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            // if (!this.checkPassword(userData[1])) return;
            // var pwd = hex_md5(userData[1]);  //加密屏蔽  请输入用户名
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                client:client,
                mobile: userData[0],
                type: 'anchor',
                event:'register',
                code: userData[2],
                imei: ConfigObj.Iemid,
                password:userData[1]
            }
            // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/anchor/register',
            // url : ConfigObj.localSite + "?version=1&m=user.account.login", login_submitlogin
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
            // obj.info = $.parseJSON(Global.crypt(obj.result));
                if(!obj.err){
                    obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    // alert(obj.info.anchor_id)
                    ConfigObj.meId = obj.info.anchor_id;  
                    ConfigObj.anchor = obj.info.anchor_no
                    
                    zregisterObj.sublogindl(userData[0],userData[1],userData[2])
                    localStorage.setItem("anchor_id", obj.info.anchor_id);
                }else{
                    $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                    gifNonelive()
                    // token:ConfigObj.token  tekenLOgin()
                }
            // loginObj.socialAuth()
          },
        error : function(obj){
            $.alertMsg('注册失败')
            gifNonelive()
          $('.but_sign').text('注册');
        }
        });
    }
    zregisterObj.gouserRZ = function(){
        /*homeObj.goBack = function(){
            homeObj.destroy();
            zregisterObj.show(true);
        }*/
        homeObj.show(true);
        Global.fixd()
        /*zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            zregisterObj.show(true);
        }
        zbrzoneObj.show(true);*/
    }
    zregisterObj.iphon = function(){
        $('#bdiph').hide()
    }
    zregisterObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord,yzm);
    }

    zregisterObj.checkUserName = function (name) {
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

    zregisterObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            gifNonelive()
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            gifNonelive()
            return false;
        } 
        return true;
    };

    zregisterObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            zregisterObj.sectionEvent(e);
        });
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        this.imeiObj.unbind('tap').tap(function(){
            zregisterObj.getMsg()
        })
        this.actiObj.unbind('tap').tap(function(){
            $(this).toggleClass('i_Off')
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
            if ($('#i_acit').hasClass('i_Off') == true) {
                zregisterObj.submitlogin();
            }else{
                $.alertMsg('請同意用戶註冊協議')
            }
          // console.log(353) obj.hasClass('on')
        });
        this.spgoyhxyObj.unbind('tap').tap(function(){
            protocolObj.goBack = function(){
                protocolObj.destroy();
                zregisterObj.show(true);
            }
            protocolObj.show(true);
        })
    }
    zregisterObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "paswo" : zregisterObj.paswo();return true; //密码显示*
                // case "patex" : zregisterObj.patex();return true; //显示密码
                // case "current" : zregisterObj.currentRecord();return true;  //版本更新
                // case "protocol" : zregisterObj.protocolRecord();return true;  //用户协议 
                case "Alogin" : zregisterObj.AloginObj();return true;  //登录 
            }
        }
    }
    zregisterObj.AloginObj = function(){
        singinObj.goBack = function(){
            singinObj.destroy();
            zregisterObj.show(true);
        }
        singinObj.show(true);
    }
    zregisterObj.getMsg = function () { //regist_updateMsg info
      if ($('#imei').hasClass('alreadysend')) return;  
        var userName = $('#login_userNameObj').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        var passwos = $('#register_smsCode').val();
        if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}

        $('#imei').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile: userName,
            type: 'anchor',
            event:'register'
        }
        var info = Global.encrypt(postData);
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                if (obj.code == '1000') {
                    tekenLOgin()
                }
                // token:ConfigObj.token  tekenLOgin()
            }
            // else $.alertMsg(req.err);
            $('#imei').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#imei').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#imei').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }
    zregisterObj.sublogindl = function(sj,pawd){ //登录 getUserInfo 
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mobile: sj,
            password: pawd,
            mold:'pwd',
            code: '',
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
          url : ConfigObj.localSite+'/anchor/login',
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
                    Global.anchorId()
                    Global.checkUpdate()
                    zregisterObj.gouserRZ()
                    /*Global.anchorId()
                    Global.checkUpdate()*/
                    localStorage.setItem("anchor_id", obj.info.anchor_id);
                }else{
                    // $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                    if (obj.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
              }
        // loginObj.socialAuth()
          },
        error : function(obj){
          alert('登录请求失败，请稍后重试'+ obj)
        }
        });
    }
    zregisterObj.paswo = function(){
        $('.div_mm').hide().siblings('.div_mm_s').show()
        $('.pa_tex').val($('.in_pwd').val())

    }
    zregisterObj.patex = function(){
        $('.div_mm_s').hide().siblings('.div_mm').show()
        $('.pa_tex').val($('.in_pwd').val())
    }

    zregisterObj.onloadExecution = function(){
    	zregisterObj.createDomObj()
        zregisterObj.createEvent()
    }
    zregisterObj.init = function(){
	 	zregisterObj.onloadExecution()
    }