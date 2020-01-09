
  //首页js
  var homeObj = new PageController({
     'name': 'home',
     'tpl' : 'template/home.html',
     'pullDistance': 220
  });

  //banner比例
  homeObj.defBannerImgProportion = 640/280;

  // 默认彩种数据，已删除，liuchao awardObj 
  homeObj.defLotteryData = [];

  //彩种权重数据 me
  homeObj.lotterySortData = window.localStorage.getItem("homeObj_lotteryStor_data");
  homeObj.lotterySortData = homeObj.lotterySortData ? $.parseJSON(homeObj.lotterySortData) : {};


  //ajax返回数据
  homeObj.ajaxData = new Object();
  homeObj.ajaxkaij = new Object();

  
  //自动生成banner高度
  homeObj.createBannerHeight = function(){
    var bodyWidth = $("body").width();
    var height= bodyWidth/this.defBannerImgProportion ;
    this.bannerImgObj.css("height",height+"px");
    this.bannerDivObj.css("height",height+"px");
  }

  //生成banner  lottery.schedule.getRecommendSchedule inSearch
  homeObj.createBanner = function (rgb) {
      var data = rgb;
      var imgHtml = [];
      var navHtml = [];
      var html = ''
      data.forEach(function (v, i) {
        // console.log(v)
          var url = v['target'];
          // imgHtml.push('<li  data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="http://47.93.204.144/uploads/bannel/20181026/8f8029b540ff608aa6e7c4c18418e0bc.jpg"></li>');
          imgHtml.push('<li data-d="'+v['id']+'" data-g="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/chan_003.png);background-size:100% 100%;" src="' + v['url'] + '"></li>');
          navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
      });
      
      this.bannerImgObj.html(imgHtml.join(''));
      var narWrapObj = $('#home_bannerNavWarpObj').html(navHtml.join(''));
      this.bannerNavObj = narWrapObj.children('a');
      this.bannerSwipeSlide();
      delete this.ajaxData.bannel;
  }

  //banner轮播
  homeObj.bannerSwipeSlide = function () {
      this.bannerDivObj.swipeSlide({
          continuousScroll: true,
          speed: 3000,
          lazyLoad: true,
          callback : function(i){
            // console.log(i)
          homeObj.bannerNavObj.removeClass('on');
          homeObj.bannerNavObj.eq(i).addClass('on');
        }
      });
  }
  
  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  homeObj.bannerEvent = function (e) {
      var LiObj = $.oto_checkEvent(e, "LI");
      if (LiObj) {
          var thisObj = $(LiObj);
          var v = thisObj.attr('data-v');
          var G = thisObj.attr('data-g');
          var D = thisObj.attr("data-d");
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
              // console.log(v)
              // homeObj.gohomeObj(D)
            Global.openUrl(v);
          } else {
              var ret = parseSimpleUrl(v);
        // console.log(ret);  //页面跳转显示 whole
      if(ConfigObj.display){
        // homeObj.gohomeObj(D)
              if (ret.path == '/sporttery/jczq') this.gotoJczqBet(); //竟足
              else if (ret.path == '/football') footballObj.show(); 
              else if (ret.path == '/Vdetail') homeObj.godetails(ret.args.id,ret.args.typ,G);  
              else if (ret.path == '/home') {
                    kaijiangIndexObj.show()
              }
                // else if (ret.path == 'news') homeObj.goNewsDetail(ret.args.newsId); //原稿
              else Global.open(v);
            }
          }
          Global.pv('banner', {url: v});
        }
    } 
    homeObj.invitationCode = function(exten){
        mycodeObj.goBack = function(){
            mycodeObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(exten)
            // console.log(exten) video_list

        });
    }

    homeObj.ajahtm = function(obj,tp){
        // console.log(obj)
        if(tp == '3'){
            var html = ''
            var data = obj.user
            for (var i = 0; i < data.length; i++) {
                if (data[i].title == null) {
                    var tim = '暂未'
                    var liw = '礼物'
                }else{
                    var tim = data[i].give_date.substring(11,19)
                    var liw = data[i].title
                }
                html += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" style="width:62%;" class="liLive liw65">\
                                    <p class="liveName">'+data[i].nickname+'<span class="pColo"><i class="'+(data[i].online == 'OFF' ? 'grtime' : 'iTime')+'"></i>'+(data[i].online == 'OFF'?'離線':'在線')+'</p>\
                                    <p class="pColo hid">'+ tim +'送出：'+ liw +'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" style="width:20%;" class="liLive liw17">\
                                    <span class="sp_num"><img class="imhNum" src="images/register/zuan.png" alt="">'+ data[i].supply +'</span><br/>\
                                    <span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span>\
                                </li>\
                            </ul>\
                        </div>'
            }
            $('#sec_liveList').html(html)
        }else if(tp == '4'){
            var html = ''
            var data = obj.user
            for (var i = 0; i < data.length; i++) {
                html += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" style="width:62%;" class="liLive liw65">\
                                    <p class="liveName">'+data[i].nickname+'<span class="pColo"><i class="'+(data[i].online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+(data[i].online =='OFF'?'離線':'在線')+'</p>\
                                    <p class="pColo hid">'+ (data[i].craft == '' ? '这是简介' : data[i].craft )+'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" style="width:20%;" class="liLive liw17">\
                                    <span class="sp_num"><img class="imhNum" src="images/home/huoy.png" alt="">'+ data[i].activities +'</span><br/>\
                                    <span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span>\
                                </li>\
                            </ul>\
                        </div>'
            }
            $('#sec_liveList').html(html)
        }else{
            var html = ''
            var data = obj.user
            for (var i = 0; i < data.length; i++) {
                // var tim = data[i].give_date.substring(11,19)
                html += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw65">\
                                    <p class="liveName">'+data[i].nickname+'<span class="pColo"><i class="'+ (data[i].online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (data[i].online == 'OFF' ? '離線' : '在線') +'</span></p>\
                                    <p class="pColo hid">'+ (data[i].craft == '' ? '这是简介' : data[i].craft )+'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" class="liLive liw17"><span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span></li>\
                            </ul>\
                        </div>'
            }
            $('#sec_liveList').html(html)
        }
    }
    //数据返回后回调函数 liDeta
    homeObj.ajaxSuccessFun = function(){
      // console.log(206)
        // $('.div_log').hide()
        gifNonelive()
        // this.createBanner(); im_most
    }
   
  //创建dom对象
    homeObj.createDomObj = function(){
        this.goImObj = $("#img_wdhcs");
        this.wrapObj = $("#home_wrapObj");
        this.bannerImgObj = $("#home_bannerImgObj"); //轮播
        this.bannerDivObj = this.bannerImgObj.parent();

    }
    homeObj.createEvent = function(){
        var page = 1;
        var size = 10;
        $('#home_wrapObj').dropload({  
            scrollArea : window,
            distance : 100,
            loadUpFn:function(me){
                homeObj.pullLoad = me;
                // Global.channelId()
                console.log($('#Aload').find('a.active').attr('data-d'))
                homeObj.getDatass($('#Aload').find('a.active').attr('data-d'))
                homeObj.RefreshObj()
                me.resetload(); 
            },
            loadDownFn:function(me){
                // console.log(me)
                var ty = $('#Aload').find('a.active').attr('data-d')
                console.log(ty)
                homeObj.pullLoad = me;
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    anchor_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    token:ConfigObj.token,
                    client:client,
                    type:ty,
                    page:page,
                    rows:'10',
                }
                // console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/anchor/index', 
                    // url: ConfigObj.localSite+'/common/gift_list', 
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (res.err == undefined) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            console.log(res.info)
                            homeObj.ajaxkaij = res.info
                            homeObj.fadownf(homeObj.ajaxkaij.user,ty)
                            // homeObj.ajaxSuccessFun();
                        }else{
                            $.alertMsg(res.err) 
                            if (res.code == '1000') {
                                tekenLOgin()
                            }
                            // token:ConfigObj.token  tekenLOgin()
                        }
                    }
                })
            }
        })  
        this.wrapObj.unbind('tap').tap(function(e){
            homeObj.updateMoneyEvent(e);
        });
        this.goImObj.unbind('tap').tap(function(){
          Messagetext()
        })
        /*this.wdhcObj.unbind('tap').tap(function(){
            $('#img_wdhc').css('background','rgba(0,0,0,0.25)')
            OfflineObj.goBack = function(){
                OfflineObj.destroy();
                homeObj.show();
                $('#img_wdhc').css('background','transparent')
                Global.fixd()
            }
            OfflineObj.show(); 
        })*/
        
  }
    homeObj.fadownf = function(obj,tp){
        var data = obj
        var result = '';
        var arrLen = data.length;
        if(arrLen > 0){
           if(tp == '3'){
            for (var i = 0; i < data.length; i++) {
                if (data[i].title == null) {
                    var tim = '暂未'
                    var liw = '礼物'
                }else{
                    var tim = data[i].give_date.substring(11,19)
                    var liw = data[i].title
                }
                result += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" style="width:62%;" class="liLive liw65">\
                                    <p class="liveName">'+ data[i].nickname +' <span class="pColo"><i class="'+ (data[i].online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (data[i].online == 'OFF' ? '離線' : '在線') +'</p>\
                                    <p class="pColo hid">'+ tim +'送出：'+ liw +'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" style="width:20%;" class="liLive liw17">\
                                    <span class="sp_num"><img class="imhNum" src="images/register/zuan.png" alt="">'+ data[i].supply +'</span><br/>\
                                    <span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span>\
                                </li>\
                            </ul>\
                        </div>'
            }
        }else if(tp == '4'){
            for (var i = 0; i < data.length; i++) {
                result += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" style="width:62%;" class="liLive liw65">\
                                    <p class="liveName">'+ data[i].nickname +' <span class="pColo"><i class="'+ (data[i].online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (data[i].online == 'OFF' ? '離線' : '在線') +'</p>\
                                    <p class="pColo hid">'+ (data[i].craft == '' ? '这是简介' : data[i].craft )+'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" style="width:20%;" class="liLive liw17">\
                                    <span class="sp_num"><img class="imhNum" src="images/register/zuan.png" alt="">'+ data[i].activities +'</span><br/>\
                                    <span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span>\
                                </li>\
                            </ul>\
                        </div>'
            }
        }else{
            for (var i = 0; i < data.length; i++) {
                // var tim = data[i].give_date.substring(11,19)
                result += '<div class="div_lst">\
                            <ul>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" data-d="'+ data[i].user_id +'" data-t="Ldetil" class="liLive liw18"><img class="w100 rad5" src="'+ data[i].avatar_url+'" alt="#"></li>\
                                <li data-t="userxin" data-d="'+ data[i].user_id +'" data-d="'+ data[i].user_id +'" data-t="Ldetil" class="liLive liw65">\
                                    <p class="liveName">'+ data[i].nickname +' <span class="pColo"><i class="'+ (data[i].online == 'OFF' ? 'grtime' : 'iTime') +'"></i>'+ (data[i].online == 'OFF' ? '離線' : '在線') +'</span></p>\
                                    <p class="pColo hid">'+ (data[i].craft == '' ? '这是简介' : data[i].craft )+'</p>\
                                </li>\
                                <li data-t="tjgz" data-d="'+ data[i].user_id +'" class="liLive liw17"><span class="'+ (data[i].followed == '0' ? 'sgz' : 'sygz') +'">'+ (data[i].followed == '0' ? '+關注' : '已關注') +' </span></li>\
                            </ul>\
                        </div>'
            }
        }
        }else{
                $.alertMsg('已經到底了，沒有更多内容了')
                homeObj.pullLoad.lock();
                $('#fixed_hide').show()
            }
        $('#sec_liveList').append(result);
        // var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.47)/1.6)
        // $('#sec_fa img').css('height',imag)
        // $('.div_log').hide()
        gifNonelive()
        if (homeObj.pullLoad) {
            homeObj.pullLoad.resetload();
        }
    }
    homeObj.usertxt = function(res){
        // $('.homuser').show(500)
        // console.log(res)
        var time = res.slot.replace(',','-')
        var html = '<li class="overlex fsz1"><span class="'+ (res.online == 'OFF' ? 'spgray': 'icspan')+'"></span>'+ (res.online == 'OFF' ? '離線': '在線')+'</li>\
                    <li class="overlex center">\
                        <img class="imtoux" src="'+ res.avatar_url +'" alt="#">\
                    </li>\
                    <li data-t="gbuser" class="overlex ovright"><a href="javascript:void(0)"><img style="width:40px;" src="images/register/gb.png" alt=""></a></li>'
        var htm2 = '<span class="guzhu  '+ (res.followed == '0' ? 'gray' : 'gree') +'">'+ (res.followed == '0' ? '未關注' : '已關注') +'</span><a data-t="Apbyh" data-d="'+ res.id +'" href="javascript:void(0)"><span class="span_pb" class="fr"> <img class="img_pbuser" src="'+ (res.blacked == '1' ? 'images/my/jinyong.png':'images/my/jinyonghs.png')+'" alt="" />屏蔽</span></a>'
        var htm3 = '<ul class="overFlex">\
                    <li class="overlex">用户昵称：</li>\
                    <li class="overlex ovright"><span id="nickname">'+ res.nickname +'</span><img src="" alt=""></li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">贡献值：</li>\
                    <li class="overlex ovright">'+ (res.supply == 'null' ? '' : res.supply) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">在線时段：</li>\
                    <li class="overlex ovright">'+ time +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">城市：</li>\
                    <li class="overlex ovright">'+ res.region +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">感情状态：</li>\
                    <li class="overlex ovright">'+ res.emotion +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">参与直播次数：</li>\
                    <li class="overlex ovright">'+ (res.live == 'null' ? '' : res.live) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">1V1视频次数：</li>\
                    <li class="overlex ovright">'+ (res.connect == 'null' ? '' : res.connect) +'</li>\
                </ul>\
                <ul class="overFlex">\
                    <li class="overlex">送礼：</li>\
                    <li class="overlex ovright">'+ (res.gift == 'null' ? '0' : res.gift)  +'件</li>\
                </ul>'

        var htm4 = '<li data-t="goimlt" data-d="'+ res.id +'" data-g="'+ res.avatar_url +'" data-n="'+ res.nickname +'" data-l="" class="center w50">\
                        <span class="spim"><img class="bor0" src="images/room/bianji.png" alt="">去聊天</span>\
                    </li>\
                    <li data-t="gozbsp" data-d="'+ res.id +'" data-g="'+ res.avatar_url +'" data-n="'+ res.nickname +'" class="center w50 soldRig">\
                        <span class="spco"><img class="bor0" src="images/room/shipinbofang.png" alt="">跟Ta视频</span>\
                    </li>'
        // $('#nickname').html(res.nickname)
        $('#uesrhed').html(html)
        $('#uesygz').html(htm2)
        $('#uesethre').html(htm3)
        $('.ulfxid').html(htm4)
    }
    homeObj.updateMoneyEvent = function(e){
        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          // console.log(thisV) 
          switch(thisT){
            case "tjgz" : homeObj.gotjgzObj(thisObj);return true;  //添加關注  
            case "gbuser" : homeObj.gogbuser(thisObj);return true;  //添加關注  
            case "userxin" : homeObj.userxinObj(thisObj);return true;  //  获取用户信息 
            case "goimlt" : homeObj.goimltObj(thisObj);return true; //  去聊天
            case "gozbsp" : homeObj.gozbspObj(thisObj);return true; //  视频聊天
          }
          return false;
        }
        
        var dObj = $.oto_checkEvent(e,"A");
        if(dObj){
            var thisObj = $(dObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Afollow" : homeObj.AclassObj(thisObj);homeObj.AfollowObj(thisObj);return true; //  關注
                case "Arooms" : homeObj.AclassObj(thisObj);homeObj.AroomsObj(thisObj);return true; //  最新
                case "Avideo" : homeObj.AclassObj(thisObj);homeObj.AvideoObj(thisObj);return true; //  贡献 
                case "huoyue" : homeObj.AclassObj(thisObj);homeObj.huoyueObj(thisObj);return true; //  活跃 
                case "Apbyh" : homeObj.ApbyhObj(thisObj);;return true; //  屏蔽用戶 
                case "gozhibo" : homeObj.gozhiObj(thisObj);return true; //  进入直播间  
                /*case "Abutqx" : homeObj.AbutqxObj(thisObj);return true; //  取消进入直播间  
                case "Abutkb" : homeObj.AbutkbObj(thisObj);return true; //  开播直播  */
            }
        }
    }
    homeObj.AfollowObj = function(obj){
        homeObj.getDatass('2')
        $('#home_wrap').hide()
        // homeObj.createEvent()
        // $('#sec_liveList').css('padding-top','44px')
    }
    homeObj.AroomsObj = function(obj){
        homeObj.getDatass('1')
        $('#home_wrap').show()
        // homeObj.createEvent()
    }
    homeObj.AvideoObj = function(obj){
        homeObj.getDatass('3')
        $('#home_wrap').hide()
        // homeObj.createEvent()
        // $('#sec_liveList').css('padding-top','44px') 
    }
    homeObj.huoyueObj = function(obj){
        homeObj.getDatass('4')
        $('#home_wrap').hide()
        // homeObj.createEvent()
        // $('#sec_liveList').css('padding-top','44px') 
    }
    homeObj.gozhiObj = function(obj){
        var thisL = obj.attr('data-l')
        if (thisL == '2') {
          $.alertMsg('認證審核中,通過後可直播')
        }else{
          $('.homezhi').show(500)
        }
    }
    homeObj.AclassObj = function(obj){
        homeObj.createEvent()
        $('#fixed_hide').hide()
        obj.addClass('active').siblings().removeClass('active')
    }
    homeObj.goimltObj = function(obj){
        imcharlogin(obj)
        /*imchatObj.goBack = function(){
            imchatObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        imchatObj.show(true,function(){
        });*/
    }
    homeObj.acvideobj = function(typ,cla,ig,obj){
        // console.log(obj.find('.new_opac'))
        obj.find('.new_opac').show()
        obj.siblings().find('.new_opac').hide()
        setTimeout(function(){$('#AV_list').find('.new_opac').hide()},1000);
        Global.playVideo(typ,cla,ig)
    }
    homeObj.opacit = function(obj,typ){
        if (typ == '1') {
            $('#dl_tj').find('i.i_opact').css('display','none')
        }else{
            $('#kai_re').find('i.i_opact').css('display','none')
        }
        obj.find('i').css('display','block')
        obj.siblings().find('i').css('display','none')
    }
    homeObj.gogbuser = function(obj){
        $('.homuser').hide(500)
    }
    homeObj.ApbyhObj = function(obj){
        var thisD = obj.attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:thisD,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            anchor_id:ConfigObj.meId,
            page:'1',
            rows:'10',
            role:'anchor',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/addBlacklist', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    $.alertMsg(res.suc)
                    if ($(obj).find('img').attr('src') == 'images/my/jinyonghs.png') {
                        $(obj).find('img').attr('src','images/my/jinyong.png')
                    }else{
                        $(obj).find('img').attr('src','images/my/jinyonghs.png')
                    }
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    // mydisturbObj.blacktxt(res.info)
                }else{
                   $.alertMsg(res.err) 
                   if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    homeObj.gozbspObj = function(obj){
        var thisN = obj.attr('data-n')
        var thisD = obj.attr('data-d')
        var thisG = obj.attr('data-g')
        if (ConfigObj.platForm === 'android') {
            android_obj.sendCallMsg(thisD,thisG,thisN)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.sendCallMsg(thisD,thisG,thisN)
        }else{}
        console.log(ConfigObj.status)
        if (ConfigObj.status == '2') {
            $('.homuser').hide()
            $('.gozbrz').show()
            $('#renconten').html('該功能需要認證1V1')
            $('#pweirzen').show().siblings('#p_wzhidl').hide()
        }else if(ConfigObj.status == '0'){
            $('#p_wzhidl').show().siblings('#pweirzen').hide()
            $('.homuser').hide()
            $('.gozbrz').show()
            $('#renconten').html('資料正在審核中')
        }else{
            if (ConfigObj.satype == '1VN') {
                $('.homuser').hide()
                $('.gozbrz').show()
                $('#renconten').html('完成主播認證才能與用戶聊天')
            }else{
                var thisD = obj.attr('data-d')
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    anchor_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    anchor_no:ConfigObj.anchor,
                    token:ConfigObj.token,
                    user_id:thisD,
                    role:'anchor',
                    mold:'1V1',
                    handle:'before'
                }
                // console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/anchor/build_connect', 
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        // console.log(res)
                        if (res.err == undefined) {
                            if (ConfigObj.platForm == 'android') {
                                android_obj.doOneLive(ConfigObj.anchor,thisD,res.result)
                            }else{
                                ios_obj.doOneLive(ConfigObj.anchor,thisD,res.result)
                            }
                        }else{
                            $.alertMsg(res.err) 
                            if (res.code == '1000') {
                                tekenLOgin()
                            }
                            // token:ConfigObj.token  tekenLOgin()
                        }
                    },error:function(res){
                      $.alertMsg('請求失敗，請稍後重試')
                    }
                })
            }
        }
        
    }
    homeObj.userxinObj = function(obj){
        $('.homuser').show(500)
        var thisD = obj.attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            user_id:thisD,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/user_info', 
            // url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    homeObj.usertxt(res.info)

                    // var ty = $('#Aload').find('a.active').attr('data-d')
                }else{
                    $.alertMsg(res.err)
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin() 
                }
            }
        })
    }
    homeObj.gotjgzObj = function(obj){
        if (ConfigObj.status == '0') {
            $('.gozbrz').show()
            $('#renconten').html('該功能需要認證成為主播')
            return false;
        }
        obj.find('span.sgz').toggleClass('sygz')
        var thisD = obj.attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_no:ConfigObj.anchor,
            token:ConfigObj.token,
            user_id:thisD,
            role:'anchor',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/setFollow', 
            // url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.err == undefined) {
                    $.alertMsg(res.suc)
                    var txtObj = obj.find('.sgz ')
                    if ($(txtObj).html() == '已關注') {
                        $(txtObj).html('+關注')
                    }else{
                        $(txtObj).html('已關注')
                    }
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // var ty = $('#Aload').find('a.active').attr('data-d')
                }else{
                    $.alertMsg(res.err)
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()  
                }
            }
        })
    }
    homeObj.getDatass = function (ty,sx) {
      // console.log(ty)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:ty,
            page:'1',
            rows:'10',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/index', 
            // url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    homeObj.ajaxkaij = res.info
                    homeObj.createBanner(res.info.banner)
                    homeObj.ajaxSuccessFun();
                    homeObj.ajahtm(homeObj.ajaxkaij,ty)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()  
                }
            }
        })
        /*function updatePageho(msg){
            if (msg.ok == true) {
                msg.info = $.parseJSON(Global.crypt(msg.result));
                homeObj.ajaxkaij = msg.info;
                homeObj.ajaxSuccessFun();
                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {}
                if (msg.info.analysis_cate_id) {
                    ConfigObj.analysis_cate_id = msg.info.analysis_cate_id
                }
            } else {
                $.alertMsg(msg.err);
            }
        }
        var postData ={
            state:'1',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
            'info' : Global.encrypt(postData)
        };
        Global.getDataPrefCache('/Video/label_list', secretData, function (req) {
          updatePageho(req);
        }, function (req) {
          updatePageho(req);
        }, 1);*/
    }
    homeObj.RefreshObj = function(ty){
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            token:ConfigObj.token,
            imei:ConfigObj.Iemid,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/personal',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    ConfigObj.anchor = res.info.basic.anchor_no
                    ConfigObj.mename = res.info.basic.nickname;   //名字
                    ConfigObj.meId = res.info.basic.anchor_id;   //id
                    ConfigObj.status = res.info.basic.auth_status //是否认证
                    ConfigObj.satype = res.info.basic.type //认证状态
                    ConfigObj.mypice = res.info.basic.avatar_url
                    ConfigObj.IManch = 'zb'+res.info.basic.anchor_no;
                    toldType(ConfigObj.status,ConfigObj.satype) //认证状态
                    if (ty != '1') {
                        Global.Permission()
                    }
                    chatoTouNam()
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    homeObj.onloadExecution = function(){
        $("#home_appName").html(ConfigObj.appName);
        setTimeout(function(){
            // console.log(moreWatch)
            if (ConfigObj.share == 'N') {
                // $('#p_match').html('剩餘觀看次數'+moreWatch)
            }
        },500)
        this.createDomObj();
        this.getDatass('1')
        // this.hobannerObj()
        this.createEvent();
        this.createBannerHeight();
        // this.updateMoneyEvent()
    }
  
  
  homeObj.init = function(){
      /*homeObj.onloadExecution();
      homeObj.setDefConfig();*/
  }
