	var mypageObj = new PageController({
	   'name': 'mypage',
	   'tpl' : 'template/user/mypage.html',
	   'initScrollTop': true
    }); 
// mypageObj.goBack share huodong 立即登录 余额  wytg
	mypageObj.createDomObj = function(){
		this.wrapperObj = $("#mypage");
		this.userNameObj = $('#userCenter_userName'); //用户登录、名字 
		this.usersetObj = $('#setUp'); //设置 
		this.qiehuanObj = $('#sp_qie'); //   切換賬號 
		this.bannerImgObj = $("#page_bannerImgObj"); //轮播 
    	this.bannerDivObj = this.bannerImgObj.parent();
    	// $('#userCenter_wrapperObj').css('height',document.documentElement.clientHeight-57)
	    // $('.ul_jiu li.me_ul').on('touchstart',function(){
	    $('.fle_ty li.liFlex').on('mousedown',function(){
	    	$(this).addClass('activ').siblings().removeClass('activ')
	    })
	    $('.divLis ul.listUl').on('mousedown',function(){
	    	$(this).addClass('activ').siblings().removeClass('activ')
	    })
	    $('.fle_ty li.liFlex').on('touchend',function(){
	    	$('.fle_ty li.liFlex').removeClass('activ')
	    })
	    if (localStorage.getItem("Imtextlive") == null) {
        	$('#liveImNum').html('0')
	    }else{
	    	// alert(localStorage.getItem("Imtextlive") + '在28')
        	$('#liveImNum').html(localStorage.getItem("Imtextlive"))
	    }
	}

	//banner比例
  	mypageObj.defBannerImgProportion = 640/280;

  	//ajax返回数据 
  	mypageObj.ajaxData = new Object();

  	// console.log(homeObj.ajaxData.bannel)  hgcp mypageObj.userInfo
  	//自动生成banner高度
  	/*mypageObj.createBannerHeight = function(){
	    var bodyWidth = $("body").width();
	    var height= bodyWidth/this.defBannerImgProportion ;
	    this.bannerImgObj.css("height",height+"px");
	    this.bannerDivObj.css("height",height+"px");
  	}*/

  	//生成banner  lottery.schedule. channelObj.updatePlay
  	mypageObj.createBanner = function (typ) {
	    var data = typ;
	    var imgHtml = [];
	    var navHtml = [];
	    data.forEach(function (v, i) {
	        // console.log(v)
	        var url = v['target'];
	          // if ('news' === url) url += '?newsId=' + v['newsId'];
	        imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/chan_003.png);background-size:100% 100%;border-radius:10px;" src="' + v['url'] + '"></li>');
	        navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
	    });
	    this.bannerImgObj.html(imgHtml.join(''));
	    // console.log(this.bannerImgObj.html(imgHtml.join('')))
	    var narWrapObj = $('#user_NavWarpObj').html(navHtml.join(''));
	    this.bannerNavObj = narWrapObj.children('a');
	    this.bannerSwipeSlide();
	    delete this.ajaxData.bannel;
  	}
  	//banner轮播
  	mypageObj.bannerSwipeSlide = function () {
      	this.bannerDivObj.swipeSlide({
          	continuousScroll: true,
          	speed: 3000,
          	lazyLoad: true,
          	autoSwipe:true,
          	callback : function(i){
          		// console.log(i)
            	mypageObj.bannerNavObj.removeClass('on');
            	mypageObj.bannerNavObj.eq(i).addClass('on');
          	}
      	});
  	}
  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  	mypageObj.bannerEvent = function (e) {
	    var LiObj = $.oto_checkEvent(e, "LI");
	    if (LiObj) {
	        var thisObj = $(LiObj);
	        var v = thisObj.attr('data-v');
	        var X = thisObj.attr('data-x');
	        var D = thisObj.attr('data-d');
	        var parseSimpleUrl = function (url) {
	            var tmp = url.split('?');

	            var path = tmp[0];
	            var args = {};

	            if (tmp[1] && tmp[1].length) {
	                var tmp2 = tmp[1].split('&');
	                tmp2.forEach(function (v) {
	                    var tmp3 = v.split('=');
	                    args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
	                })
	            }

	            return {path: path, args: args};
	        };

	        if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
	            // 外部链接
	            Global.openUrl(v);
	            // kaijiangIndexObj.gohomeObj(D)
	        } else {
	            var ret = parseSimpleUrl(v);
	            // kaijiangIndexObj.gohomeObj(D)
	                // console.log(ret);  //页面跳转显示 recomList_money_0
	          	if(ConfigObj.display){
	              // console.log(ret.path)
	                if (ret.path == '/sporttery/jczq') this.gotoJczqBet(); //竟足
	                else if (ret.path == '/football') footballObj.show(); 
	                else if (ret.path == '/channel') {kaijiangIndexObj.chansobj(ret.args.id,ret.args.img,X)}
	                else if(ret.path == '/bannerIform'){ // 
		                bannerIformObj.goBack = function(){
		                    bannerIformObj.destroy();
		                    mypageObj.show();
		                    Global.fixd()
		                }
		                bannerIformObj.show(true,function(){
		                    bannerIformObj.urlObj(ret.args.url)
		                });
		            }
	                else if (ret.path == 'news') kaijiangIndexObj.goNewsDetail(ret.args.newsId);
	                // else Global.open(v);
	            }
	        }
	        Global.pv('banner', {url: v});
	    }
  	}

	mypageObj.createEvent = function(){
		this.wrapperObj.unbind('tap').tap(function(e){
			mypageObj.sectionEvent(e);
		});
		this.qiehuanObj.unbind('tap').tap(function(){ //切換賬號
			mypageObj.goqhzh()
		})
		this.usersetObj.tap(function(){
			setupObj.goBack = function(){
	            setupObj.destroy();
	            mypageObj.show();
	            Global.fixd()
	        }
	        setupObj.show(true,function(){
	        });
			/*zbrzthreeObj.goBack = function(){
	            zbrzthreeObj.destroy();
	            mypageObj.show();
	            Global.fixd()
	        }
	        zbrzthreeObj.show(true,function(){
	        });*/
		})
		this.userNameObj.tap(function(){
			console.log(40)
			signInObj.goBack = function(){
	            signInObj.destroy();
	            mypageObj.show();
	            Global.fixd()
	        }
	        // setupeeObj.show();
	        signInObj.show();
		})
		this.bannerDivObj.unbind('tap').tap(function(e){
            mypageObj.bannerEvent(e);
        })
	    $('#userCenter_droploadWrap').dropload({  //下拉刷新 activityIdxObj.goBack goForward
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				// console.log(singinObj.isLogin)
				// if(singinObj.isLogin){
                    mypageObj.pullLoad = me;
					mypageObj.getData();
				// }else{
					// me.resetload();
					// mypageObj.goLogin();
				// }
			}
	    })
	}

	mypageObj.sectionEvent = function(e){
		mypageObj.setime();
		// console.log($(e).find('li'))
		var pObj = $.oto_checkEvent(e,"LI");
		// return false;
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			console.log(thisT) 
			//zhgl   
			switch (thisT){
				case "backbtn" : mypageObj.goBack();return true; 
				case "wytg" : mypageObj.wytg();return true;  //我要推广 
				case "zhgl" : mypageObj.gozhgl();return true;  //賬號管理  
				// case "goshare" : mypageObj.gozhgl();return true;  //個人中心暫替分享  
				case "goshare" : mypageObj.goshareObj();return true;  //分享頁面添加中  
				case "bdsj" : mypageObj.gobdsj();return true;  //切換手機號 
				case "vipSsucc" : mypageObj.govipSsucc();return true;  //vipSsucc   
				case "yjfk" : mypageObj.yjfk(thisObj);return true; //意见反馈
				case "renzhen" : mypageObj.renzhenObj(thisObj);return true;  //主播认证      
				case "hbjlq" : mypageObj.gohbjlq(true);return true;  // 交流群     
				case "gomoney" : mypageObj.gomoneyObj(true);return true;  // 跳转充值      
				case "guanzhu" : mypageObj.guanzhuObj(true);return true;  // 关注   
				case "distur" : mypageObj.disturObj();return true;  // 免打擾設置       
				case "liIm" : mypageObj.goliImObj();return true;  // im      
				case "livset" : mypageObj.livsetObj(thisObj);return true;  // livset       
				case "Azlshz" : mypageObj.AzlshzObj(thisObj);return true;  //        
				case "tgsy" : mypageObj.tgsyObj(thisObj);return true;  //  推广收益      
			}
		}

		var pObj = $.oto_checkEvent(e,"A");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			// console.log(thisT)   
			switch (thisT){
				case "Asigin" : mypageObj.goAsiginss();return true;  //登录  
				case "wytg" : mypageObj.wytg();return true;  //我要推广 
				case "gozhibo" : mypageObj.gozhiObj(thisObj);return true;
				// case "A_guan" : mypageObj.goA_guan();return true;  //我要推广  Avip 
			}
		}
	}
	mypageObj.livsetObj = function(){
		liveSetupObj.goBack = function(){
            liveSetupObj.destroy();
            mypageObj.show(true);
            Global.fixd()
        }
        liveSetupObj.show(true,function(){
        	liveSetupObj.setupTim(slot,fee)
        }); 
	}
	mypageObj.AzlshzObj = function(){
          $.alertMsg('資料審核中，請耐心等待')
          return false;
	}
	mypageObj.tgsyObj = function(obj) {
		if (ConfigObj.status == '0' ) {
        	$.alertMsg('資料審核中,通過後即可享受推广收益')
            /*$('.gozbrz').show() gomoney
            $('#renconten').html('該功能需要認證成為主播')*/ 
            return false;
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('认证通过即可享受推广收益')
            return false;
        }else{
			detailsObj.goBack = function(){
	            detailsObj.destroy();
	            mypageObj.show(true);
	            Global.fixd()
	        }
	        detailsObj.show(true,function(){
	        	// moneyObj.moncentObj()
	        }); 
	    }
	}
	mypageObj.gozhiObj = function(obj){
		var thisL = obj.attr('data-l')
        if (thisL == '2') {
          $.alertMsg('資料審核中,通過後可使用')
        }else{
          $('.homezhi').show(500)
        }
        // $('.homezhi').show(500)
    }
	mypageObj.gomoneyObj = function(obj){
        if (ConfigObj.status == '0' ) {
        	$.alertMsg('資料審核中,通過後可使用')
            /*$('.gozbrz').show()
            $('#renconten').html('該功能需要認證成為主播')*/
            return false;
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
			moneyObj.goBack = function(){
	            moneyObj.destroy();
	            mypageObj.show(true);
	            Global.fixd()
	        }
	        moneyObj.show(true,function(){
	        	// moneyObj.moncentObj()
	        }); 
	    }
	}
	mypageObj.guanzhuObj = function(obj){
        if (ConfigObj.status == '0' ) {
            $.alertMsg('資料審核中,通過後可使用')
            return false;
        }else if(ConfigObj.status == '2' ){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
			myfollowObj.goBack = function(){  //我的关注
	            myfollowObj.destroy();
	            mypageObj.show(true);
	            Global.fixd()
	        }
	        myfollowObj.show(true); 
	    }
	}
	mypageObj.disturObj = function(obj){
		if (ConfigObj.status == '0') {
			$.alertMsg('資料審核中,通過後可使用')
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
			mydisturbObj.goBack = function(){
	            mydisturbObj.destroy();
	            mypageObj.show(true);
	            Global.fixd()
	        }
	        mydisturbObj.show(true,function(){
	        	mydisturbObj.setdisturb(disturb)
	        })
	    }
	}
	mypageObj.goliImObj = function(obj){
		if (ConfigObj.status == '0') {
			$.alertMsg('資料審核中,通過後可使用')
			// return false
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
			Messagetext()
		}
        /*zbrztwoObj.goBack = function(){
            zbrztwoObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        zbrztwoObj.show(true,function(){
            // AvdetailsObj.goewm(invitationCode)
        });*/
	}
	mypageObj.setime = function(){
		console.log(302)
		setTimeout(function(){ $('.licol').removeClass('activ') },1000);
	}
	/*mypageObj.goA_guan = function(){
		mycodeObj.goBack = function(){
            mycodeObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode)
        });
	}*/
	mypageObj.goAsiginss = function(){
		extensionObj.goBack = function(){
            extensionObj.destroy();
            mypageObj.show(true);
            Global.fixd()
        }
        extensionObj.show(true,function(){
            // $('#bdiph').hide()
        }); 
	}
	mypageObj.gozhgl = function(){
		if (ConfigObj.status == '0') {
			$.alertMsg('資料審核中,通過後可使用')
			// return false
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
        	if (ConfigObj.satype == '1V1') {
        		var ttypl = '1V1'
            }else if(ConfigObj.satype == '1VN'){
        		var ttypl = '1VN'
            }else{
        		var ttypl = '1V1'
            }
        	AccountObj.goBack = function(){
	            mypageObj.show(true);
	            Global.fixd()
	            AccountObj.destroy();
	        }
	        AccountObj.show(true,function(){
	        	AccountObj.portraTou(ttypl)
	        });
        }
	}
	mypageObj.goshareObj = function(){
		if (ConfigObj.status == '0') {
			$.alertMsg('資料審核中,通過後可使用')
			// return false
        }else if(ConfigObj.status == '2'){
        	$.alertMsg('該功能需要通過主播認證')
            return false;
        }else{
			myshareObj.goBack = function(){
	            mypageObj.show(true);
	            Global.fixd()
	            myshareObj.destroy();
	        }
	        myshareObj.show();
	    }
	}
	mypageObj.gobdsj = function(){
		signUpsObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            signUpsObj.destroy();
        }
        signUpsObj.show();
	}
	mypageObj.goqhzh = function(){
        signInsObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            signInsObj.destroy();
        }
        signInsObj.show(true,function(){
        	$('#bdiph').hide()
        });
	}
	mypageObj.gozcxy = function(){
		protocolObj.goBack = function(){
            protocolObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        mypageObj.destroy();
	}
	mypageObj.gohbjlq = function(){
		/*InvitationObj.goBack = function(){
            InvitationObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        InvitationObj.show(
        	// InvitationObj.beInd(beInvited)
        );*/
        // mypageObj.destroy();
		if (ConfigObj.platForm === 'android') {
			android_obj.intoPatato('https://pt.im/kdvideo')
		}else{
			ios_obj.intoPatato('https://pt.im/kdvideo')
		}
		// window.location.href = 'https://pt.im/joinchat/ab17db16918761c0ea49ad1f8c92e26e'
	}
	mypageObj.goyaoqm = function(){ //跳轉到邀請碼  
		console.log(beInvited)
		InvitationObj.goBack = function(){
            InvitationObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show(); vipSsucc
        // console.log(beInvited)
        InvitationObj.show(
        	InvitationObj.beInd(beInvited)
        );
        mypageObj.destroy();
	}
	mypageObj.goRegister = function(){
		registerObj.goBack = function(){
			mypageObj.show();	
		}
		registerObj.goForward = function(){
			// mypageObj.show();	wdxh
			mypageObj.show(true);	
		}
		registerObj.show(true);
	}
	
	mypageObj.goStation = function(){
		var self = this;
		/*if(!singinObj.isLogin ){
			mypageObj.goLogin();
			return false;	
		}*/
		stationDetailObj.goBack = function(){
			stationDetailObj.destroy();
			self.show();	
		}
		stationDetailObj.show('reload',function(){
			stationDetailObj.getData(loginObj.userInfo.s_id);
		})	
	}
	mypageObj.goLogin = function () {
        signInObj.goBack = function () {
            mypageObj.show(true);
            Global.fixd()
        };
        signInObj.goForward = function () {// lsjl
		    mypageObj.show(true)
            Global.fixd()
        };
        // signInObj.show(true);
    }
	
	mypageObj.wytg = function(){//跳转到我要推广页面 Asigin
		socialAuthCallBack1()
		$('.right').css('background','#ecd6d4')
		mycodeObj.goBack = function(){
            // mycodeObj.destroy();
            mypageObj.show();
			$('.right').css('background','transparent')
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        mycodeObj.show(true,function(){
        	mycodeObj.goewm(exten,url,tex)
        });
	}
	mypageObj.yjfk = function(obj){//跳转到意见反馈
		var typ = obj.attr('data-c')
		feedbackObj.goBack = function(){
            feedbackObj.destroy();
            mypageObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        feedbackObj.show(true,function(){
        	feedbackObj.readObj(typ)
        });
	}
	mypageObj.tz = function(){//跳转到通知
		detailsObj.goBack = function(){
            detailsObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        detailsObj.show(true,function(){
        	detailsObj.goajplay()
        });
	}
	mypageObj.lsjls = function(){//跳转到历史记录
		/*if(!singinObj.isLogin ){
			mypageObj.goLogin();
			return false;	
		}*/
		// console.log(mypageObj.userInfo) userCenter_userName
		recordsObj.goBack = function(){
            recordsObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        recordsObj.show(true,function(){
        	recordsObj.gorecodPlay()
        });
	}
	mypageObj.wdhc = function(){//跳转到我的缓存 
		OfflineObj.goBack = function(){
            OfflineObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();  mypageObj.goLogin
        OfflineObj.show();
	}
	mypageObj.renzhenObj = function(obj){//跳转到主播认证
		var thisL = obj.attr('data-l')
		if (thisL == '1') {
			// $.alertMsg('您还未认证主播')
			// zbrzoneObj.show()
			zbrzoneObj.goBack = function(){
                zbrzoneObj.destroy();
                mypageObj.show();
                Global.fixd()
            }
            zbrzoneObj.show(true);
			// return false;
		}else{
	        livexgrzObj.goBack = function(){
	            livexgrzObj.destroy();
	            mypageObj.show();
	            // $('.me_ul').removeClass('ul_url') wytg
	            Global.fixd()
	        }
	        livexgrzObj.show(true,function(){

	        });
	    }
	}
	
	mypageObj.getData = function(){
		gifJsonlive()
		var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            imei:ConfigObj.Iemid,
            version:ConfigObj.version,
            client:client,
            token:ConfigObj.token
        }
        // alert(1)
        var secretData = {
	        'info' : Global.encrypt(postData)
	    };
        $.ajax({
	        url: ConfigObj.localSite+'/anchor/personal',
	        data: secretData,
	        type: "post",
	        dataType: "json",
	        success:function(obj){
	        	// alert(2)
	        	// alert(obj.err)
	    		if (!obj.err) {
	            	obj.info = $.parseJSON(Global.crypt(obj.result));
	            	console.log(obj.info) 
                    ConfigObj.anchor = obj.info.basic.anchor_no
                    ConfigObj.mename = obj.info.basic.nickname;   //名字
                    ConfigObj.status = obj.info.basic.auth_status //是否认证
                    ConfigObj.satype = obj.info.basic.type //认证状态
                    ConfigObj.mypice = obj.info.basic.avatar_url
	                ConfigObj.rules = obj.info.basic.rules  // 0 是可提现 1 是不可提现
	                ConfigObj.profi = obj.info.basic.promote_profit
	                disturb = obj.info.basic.disturb
	                slot = obj.info.basic.slot
	                fee = obj.info.basic.fee
	            	//   gomoney
                    chatoTouNam()
                    mypageObj.createBanner(obj.info.banner)
                    $('#sy_money_qb').html(ConfigObj.profi)
	                /*if (slot) {
	                	console.log('這是'+1)
	                }else{
	                	console.log('這是'+5)
	                }*/
	                // slot = obj.info.basic.slot
	                // slot = obj.info.basic.fee
                    toldType(ConfigObj.status,ConfigObj.satype) //认证状态
                    if (ConfigObj.status == '2') {
			        }else{
			            if (ConfigObj.satype == '1V1') {
			            }else{
			            	if (ConfigObj.status == '0') {
			            		$('.foozbj').find('a').attr('data-l','2')
			            	}
			                $('.foozbj').show()
			            }
			        }
	                mypageObj.formatHtmlB(obj.info.basic); 
	                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
	                    setTimeout(function () {  //获取新信息数
	                        //android_obj.getUnreadCount();
	                    }, 500)
	                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
	                    setTimeout(function () {  //获取新信息数
	                        //ios_obj.getUnreadCount();
	                        // console.log(601) zhgl
	                    }, 500)
	                }
	            } else {
	            	if (obj.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()  
	                /*loginObj.tokenFail();
	                signInObj.show();
	                signInObj.goForward = function () {
	                    mypageObj.show('reload');
	                }
	                signInObj.goBack = function () {
	                    signInObj.show();
	                }*/
	            }
	            if (mypageObj.pullLoad) {  
	                mypageObj.pullLoad.resetload();
	            } 
	      	}
	    })
	}
	mypageObj.formatNoLoginHtml = function(){
		var html = '<li class="divLink wi35" data-t="zhgl">\
					<img class="imgMy " src="images/register/toux.png" alt="">\
				</li>\
				<li class="divLink wi65">\
					<h3 class="h3"> </h3>\
					<p class="p_pad">\
						<a class="a_col" href="#" style="padding-left:1px;">ID:EFiOadck&nbsp;&nbsp;</a>\
						<a class="a_col" href="#">綁定手機號</a>\
					</p>\
				</li>'
		$('#div_name').html(html)
		if(ConfigObj.share == 'N'){
			$('.li_vip_cen').css('opacity','0')
		}
	}
	/*<li class="P_zuan"><img src="images/me/zuan.png" alt="">&nbsp;&nbsp;0000</li>\ touchmove
					<li data-t="qhzh" class="P_zuan"><img class="wi36_qh" src="images/me/qih.png" alt="">&nbsp;切換賬號</li>*/
	mypageObj.formatHtmlB = function(ob){
		// console.log(ob)
		var html1 = '<li data-t="zhgl" class="vegTop w75">\
				<img class="fl im_my" src="'+ (ob.avatar_url == '' ? 'images/register/toux.png' : ob.avatar_url) +'" alt="#">\
				<p class="my_nam">'+ ob.nickname+'<i class="i_xingbie i_icon_wan "></i><i class="i_xingbie i_icon_xiu"></i></p>\
				<p class="my_iph">'+(ob.mobile == '' ? '暂未綁定手機號' : ob.mobile)+'</p>\
				<p class="my_jia">'+ (ob.craft == '' ? '一條有個性的簽名' : ob.craft)+'</p>\
			</li>\
			<li data-t="goshare" class="vegTop w25 center fons1">\
				<img class="wi48" src="images/my/jiang.png" alt="">\
				<p class="my_yjy">分享有禮</p>\
				<p class="my_yqm"></p>\
			</li>'
					// <p class="p_fdb904" style="'+(ConfigObj.share == 'Z' ? 'text-indent: 10px;' : '')+'"> <span class="'+(ConfigObj.share == 'Z' ? 'sp_show' : 'sp_hide')+'" >剩餘次數</span><img style="'+(ConfigObj.share == 'Z' ? 'display:none' : 'display:inline-block')+'" src="images/img/kdsp_wd_zs.png" alt="">'+(ConfigObj.share == 'Z' ? ob.more_watch : ob.money)+'</p>\
		$('#div_names').html(html1) 
		$('#wealth').html(ob.wealth)
		$('#Pfollow').html(ob.follow)
		if (ob.auth_status == '0') {
			$('#Ptype').html(ob.type+'審核中')
			$('#li_zbzt').attr('data-t','Azlshz')
		}else if(ob.auth_status == '2'){
			$('#Ptype').html('未認證')
			$('#li_zbzt').attr('data-l','1')
		}else{
			$('#Ptype').html(ob.type)
			$('#li_zbzt').attr('data-l','2')
			if (ob.type == '1VN') {
				$('#ul_zbsz').hide()
			}else{
				$('#ul_zbsz').show()
			}
		}
		// console.log(ob.auth_status)
		/*if (ob.auth_status == '0') {
			$('#li_zbzt').attr('data-l','1')
		}else{
			$('#li_zbzt').attr('data-l','2')
		}*/
		if (ob.read == 0) {
			$('#yj_acti').removeClass('active_li').attr('data-c','0')
		}else{
			$('#yj_acti').addClass('active_li').attr('data-c','1')
		}
		gifNonelive()
		// $('.p_Anam').html('<a id="" class="a_logo" href="javascript:void(0)">L0小白</a>');	 renzhen 
	}
	mypageObj.onloadExecution = function(){
		this.getData();
		/*if(singinObj.isLogin){
			this.getData();
		}else{
			this.formatNoLoginHtml();
		};*/
		mypageObj.createDomObj()
		// mypageObj.gostate()
		// mypageObj.secEvent()
		mypageObj.createEvent()
		// mypageObj.bannerObj()
	}
	mypageObj.setDefConfig = function(){
		// console.log(singinObj.isLogin) 
		mypageObj.pullLoad = '';
		/*if (ConfigObj.share == 'N') {
			$('#ul_fenxiang').hide()
			$('#us_shows').hide()
		}else if(ConfigObj.share == 'Z'){
			// $('#ul_fenxiang').show()
			$('#us_shows').hide()
			$('#use_show').show()
			$('#ul_Vip').hide()
		}else{

		}*/
	}
	mypageObj.init = function(){
		// console.log(singinObj.isLogin) 
		mypageObj.setDefConfig();
		mypageObj.onloadExecution();
	}
	