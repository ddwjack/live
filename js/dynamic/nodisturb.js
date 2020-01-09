    var nodisturbObj = new PageController({
       'name': 'nodisturb',
       'tpl' : 'template/dynamic/nodisturb.html',
       'pullDistance': 220
    });
    nodisturbObj.defBannerImgProportion = 640/280;

    nodisturbObj.createBannerHeight = function(){
        var bodyWidth = $("body").width();
        var height= bodyWidth/this.defBannerImgProportion ;
        this.bannerImgObj.css("height",height+"px");
        this.bannerDivObj.css("height",height+"px");
    }

    nodisturbObj.createBanner = function (typ,ig,ind) {
        // console.log(ind)
        var data = typ;
        var imgHtml = [];
        var navHtml = [];
            if (ind != '1') {
                imgHtml.push('<li style="" ><img src="'+ ig +'" alt="#" /></li>');
            }
        data.forEach(function (v, i) {
            var url = v['jump_url'];
            var html = ''
            // html += '<li style="height:70%;" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ ig +')no-repeat center;background-size:cover;height:70%;width:100%;"><p></li>'
            imgHtml.push('<li style="" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/dynam1.png)no-repeat center;background-size:cover;min-height:200px;width:100%;" src="'+ v +'" alt="" /></li>');
            navHtml.push('<a data-l="'+ (i+1) +'" class="dot' + (i === 0 ? " on" : "") + '"></a>');
        });
        this.bannerImgObj.html(imgHtml.join(''));
        var narWrapObj = $('#distu_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNonelive()
        // $('#ch_img_number').html($('#distu_NavWarpObj').find('a.on').attr('data-l')+'/'+ $('#distu_NavWarpObj').find('a').length)
        // delete this.ajaxData.bannel;  <p style="background:url('+ v +')no-repeat center;background-size:cover;height:70%;width:100%;"><p>
    }

    nodisturbObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: true,
            speed: 3000,
            lazyLoad: false,
            autoSwipe:false,
            callback : function(i){
                nodisturbObj.bannerNavObj.removeClass('on');
                nodisturbObj.bannerNavObj.eq(i).addClass('on');
                var znum = $('#distu_NavWarpObj').find('a').length
                var dnum = $('#distu_NavWarpObj').find('a.on').attr('data-l')
                if (dnum == undefined) {
                    var dnumb = $('#distu_NavWarpObj').find('a').length
                }else{
                    var dnumb = dnum
                }
                // $('#ch_img_number').html(dnumb+'/'+znum)
            }
        });
    }

    nodisturbObj.Imgdetail = function(){
        gifJsonlive()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            role:'anchor',
            page:'1',
            enclosure_id:thisDat
        }
// page
// rows
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/enclosure/reply_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res.time)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    var dat = res.info.list
                    var html = ''
                    if (res.info.total == '0') {
                        html += '<p class="center" style="color:#fff;">暂无评论</p>'
                        $('#sp_pl_num').html(res.info.total+'条评论')
                        $('#div_pinglun').html(html)
                        $('.img_toux').attr('src',ConfigObj.mypice)
                        gifNonelive()
                        return false;
                    }
                    for (var i = 0; i < dat.length; i++) {
                        // console.log(dat[i])
                        var da = dat[i]
                        nodisturbObj.timeObj(res.time,da.created_date)
                        html += '<ul class="list_inp_div">\
                                    <li class="li_linkTop liOne">\
                                        <img class="img_icon_tou" src="'+ (da.avatar_url == null ? ConfigObj.mypice : da.avatar_url) +'" alt="">\
                                    </li>\
                                    <li class="li_linkTop liTwo">\
                                        <p>'+ (da.nickname == null ? ConfigObj.mename : da.nickname) +'</p>\
                                        <p><span class="span_msg">'+ da.message +'</span>'+ timeDay +'</p>\
                                    </li>\
                                    <li class="li_linkTop liThree">\
                                        <a href="javascript:void(0)" data-t="Azanpl" data-d="'+ da.id +'" data-u="'+ (da.user_id == '0' ? ConfigObj.meId : da.user_id) +'" style="color:#9B9B9B;"><img class="zan_pl" src="'+ (da.thumbed == '0' ? 'images/dynamic/dianzopy4.png' : 'images/dynamic/dianzan.png') +'" alt="">\
                                        <p>'+ da.thumbs +'K</p></a>\
                                    </li>\
                                </ul>'
                    }
                    $('#sp_pl_num').html(res.info.total+'条评论')
                    $('#div_pinglun').html(html)
                    $('.img_toux').attr('src',ConfigObj.mypice)
                    gifNonelive()
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

    nodisturbObj.timeObj = function(time,over){
        var curTime = new Date(parseInt(time) * 1000);
        var postTime = new Date(over.replace(/-/g,'/'));
        var timeDiff = curTime.getTime() - postTime.getTime();
        // 单位换算
        var min = 60 * 1000;
        var hour = min * 60;
        var day = hour * 24;
        var week = day * 7;
        // 计算发布时间距离当前时间的周、天、时、分
        var exceedWeek = Math.floor(timeDiff/week);
        var exceedDay = Math.floor(timeDiff/day);
        var exceedHour = Math.floor(timeDiff/hour);
        var exceedMin = Math.floor(timeDiff/min);
        // 最后判断时间差到底是属于哪个区间，然后return
        if(exceedWeek > 0){
            return timeDay = exceedDay + '天前'
        }else{
            if(exceedDay < 7 && exceedDay > 0){
                return timeDay = exceedDay + '天前'
            }else{
                if(exceedHour < 24 && exceedHour > 0){
                return timeDay = exceedHour+ '小時前'
                }else{
                    return timeDay = exceedMin+ '分鐘前'
                }
            }
        }
    }
    nodisturbObj.fapinglunObj = function(valu){
        // eventTop = top
        gifJsonlive()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            user_id:ConfigObj.meId,
            role:'anchor',
            message:valu,
            enclosure_id:thisDat
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/enclosure/reply',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    $.alertMsg('发送成功') 
                    $('#inp_sub_tx').val('')
                    nodisturbObj.Imgdetail()
                    $('#div_pinglun')[0].scrollTop = 0

                    gifNonelive()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    // nodisturbObj.createBanner(res.info,ig,ind)
                }else{
                    gifNonelive()
                   $.alertMsg(res.err) 
                   if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
            }
        })
    }
    nodisturbObj.createDomObj = function(){
        // this.foofaObj = $("#foot_fa"); // fseacrh 
        this.foofaObj = $("#nodisturb"); // fseacrh 
        this.ClickObj = $('.distFan');  //我的缓存
        this.bannerImgObj = $("#dists_bannerImgObj"); //轮播  hgcp 
        this.sharealtObj = $("#p_nul_hide_shar"); //关闭分享弹框
        this.bannerDivObj = this.bannerImgObj.parent(); 
        // $('#sec_fa').css('height',document.documentElement.clientHeight-135)
    }

    nodisturbObj.createEvent = function(Vd){
        var page = 1;
        var size = 10;
        this.ClickObj.unbind('tap').tap(function(){
            nodisturbObj.goBack()
        })
        this.foofaObj.unbind('tap').tap(function(e){
            nodisturbObj.vidBo(e)
        })
        this.sharealtObj.unbind('tap').tap(function(e) {
            $('.div_share_dyna').hide()
        })
        $('#inp_sub_tx').blur(function(e){
            // $(".div_inp_alt").css("position","fixed");
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        $('#inp_sub_tx').focus(function(e){
            // $(".div_inp_alt").css("position","absolute");
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        $('#div_pinglun').dropload({ 
            scrollArea : window,
            distance : 100,
            loadUpFn:function(me){
                nodisturbObj.pullLoad = me;
                console.log(222)
                nodisturbObj.Imgdetail()
                // Global.channelId()
                // nodisturbObj.updatePlay()
                me.resetload(); 
            },
            loadDownFn:function(me){
                nodisturbObj.pullLoad = me
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
                    client:client,
                    page:page,
                    rows:'10',
                    role:'anchor',
                    enclosure_id:thisDat,
                    token:ConfigObj.token
                } 
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/enclosure/reply_list',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (!res.err) {
                            // res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            nodisturbObj.loadObj(res)
                        }else{
                           $.alertMsg(res.err) 
                           if (res.code == '1000') {
                                tekenLOgin()
                            }
                            // token:ConfigObj.token  tekenLOgin()
                        }
                    },
                    error:function(xhr, type){
                        nodisturbObj.pullLoad.resetload();
                    }
                })
              // sowingObj.pullLoad = me; titlist
              // homeObj.getData(2)
            }
        }); 
        if (ConfigObj.platForm === 'android') {
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                return false;
            }
        }
    }
    nodisturbObj.vidBo = function(e){
        var AObj = $.oto_checkEvent(e,"A");
        if(AObj){
            var thisObj = $(AObj);
            var thisT = thisObj.attr("data-t");  
            console.log(thisT)  
            switch(thisT){
                // case "goroom" : nodisturbObj.goroomOb(thisObj);return true;   // 已关注   
                case "A_zan" : nodisturbObj.AzanOb(thisObj);return true;   // 点赞   
                case "A_ping" : nodisturbObj.ApingOb(thisObj);return true;   // 评论   
                case "A_share" : nodisturbObj.AshareOb(thisObj);return true;   // 分享   
                case "A_video" : nodisturbObj.AvideoOb(thisObj);return true;   // 发布   
                case "A_remover" : nodisturbObj.AremoverOb(thisObj);return true;   // 删除   
                case "videoPlay" : nodisturbObj.videoPlayOb(thisObj);return true;   // 视频播放   
                case "quxiao" : nodisturbObj.quxiaoOb(thisObj);return true;   // 取消删除   
                case "shanchu" : nodisturbObj.shanchuOb(thisObj);return true;   // 确认删除   
                case "vPause" : nodisturbObj.vPauseOb(thisObj);return true;   // 关闭视频播放   
                case "gbinp" : nodisturbObj.gbinpOb(thisObj);return true;   // 关闭发评论     
                case "fason" : nodisturbObj.fasonOb(thisObj);return true;   // 发评论     
                case "Azanpl" : nodisturbObj.AzanplOb(thisObj);return true;   // 点赞评论     
            }
            return false;
        }
        var dlObj = $.oto_checkEvent(e,"LI");
        if(dlObj){
            var thisObj = $(dlObj);
            var thisT = thisObj.attr("data-t");
            var thisV = thisObj.attr("data-v");
            switch(thisT){
                case "Lyqshar" : nodisturbObj.LyqsharObj(thisV);return true; //魅力排行榜 
            }
            return false;
        }
    }
    nodisturbObj.LyqsharObj = function(typ) {
        gifJsonlive()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            client:client,
            mold:'anchor',
            type:typ
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Video/video_comment', code_fen_ch
            url: ConfigObj.localSite+'/api/share',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    var messag = res.info.message+'?invitecode='+ConfigObj.anchor+'&inviterole=anchor'
                    sharePicObj(messag)
                    // ConfigObj.share_url = res.info.qc_url //分享地址 
                    // ConfigObj.dowand = res.info.download
                    // var dowand = res.info.download
                    /*$('#code_img_typ').attr('src',res.info.qc_url)
                    $('#A_baocun').attr('data-v',dowand)
                    $('#p_cod_yq').html(ConfigObj.anchor)
                    $('#code_fen_ch').attr('data-v',messag)*/
                    // gifNonelive()
                    // ConfigObj.userNum = res.info.users
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    nodisturbObj.godyquedin = function(){ // shanchu
        // $('.dynamRemov').hide(500)
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:thisDat,
            token:ConfigObj.token
        } 
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/remove_enclosure',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                   $.alertMsg('移除成功') 
                   dynamicObj.show(true)
                   Global.fixd()
                   // $(thisObj).parents('div.div_namic').hide()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    // dynamicObj.centerObj(res.info)
                    // dynamicObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                   if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
                // localStorage.setItem("channel", res.info.channel_id);  dynamicObj.titlist
            }
        })
    }
    nodisturbObj.loadObj = function(obj){
        var dat = $.parseJSON(Global.crypt(obj.result));
        var tims = obj.time
        var re = dat.list
        var arrLen = dat.list.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                var da = re[i]
                nodisturbObj.timeObj(tims,re[i].created_date)
                result += '<ul class="list_inp_div">\
                                <li class="li_linkTop liOne">\
                                    <img class="img_icon_tou" src="'+ (da.avatar_url == null ? ConfigObj.mypice : da.avatar_url) +'" alt="">\
                                </li>\
                                <li class="li_linkTop liTwo">\
                                    <p>'+ (da.nickname == null ? ConfigObj.mename : da.nickname) +'</p>\
                                    <p><span class="span_msg">'+ da.message +'</span>'+ timeDay +'</p>\
                                </li>\
                                <li class="li_linkTop liThree">\
                                    <a href="javascript:void(0)" data-t="Azanpl" data-d="'+ da.id +'" data-u="'+ (da.user_id == '0' ? ConfigObj.meId : da.user_id) +'" style="color:#9B9B9B;"><img class="zan_pl" src="'+ (da.thumbed == '0' ? 'images/dynamic/dianzopy4.png' : 'images/dynamic/dianzan.png') +'" alt="">\
                                    <p>'+ da.thumbs +'</p></a>\
                                </li>\
                            </ul>'
            }
        }else{
            nodisturbObj.pullLoad.lock();
            $.alertMsg('已經到底了，沒有更多了')
        }
            $('#div_pinglun').append(result)
            nodisturbObj.pullLoad.resetload();
    }
    nodisturbObj.dataTxtObj = function(thisH,thisZ,thisG,thisM,thisX,thisV,thisD) {
        console.log(thisH,thisZ,thisG,thisM,thisX,thisV)
        if (thisZ < 1000) {
            var AthsZ = thisZ
        }else{
            var AthsZ = (thisZ/1000).toFixed(1)/1+'K'
        }
        if (thisH < 1000) {
            var AthsD = thisH
        }else{
            var AthsD = (thisH/1000).toFixed(1)/1+'K'
        }
        thisDat = thisD
        var html = '<li data-v="" data-weburl="">\
                        <img class="imgUrl" style="background:url(images/channel/dynam1.png);background-size:100% 100%;height:100%;" src="'+ thisG +'" onerror="javascript:this.src='+"\'images/channel/dynam1.png\'"+'">\
                        <a data-t="videoPlay" class="A_play_ig" data-v="'+ thisV +'" data-g="'+ thisG +'" href="javascript:void(0)"><img style="width: 70px;" src="images/img/kdsp_icon_bf.png" alt=""></a>\
                        <div class="div_right">\
                            <a href="javascript:void(0)" data-t="A_zan" class="p_img_rt">\
                                <img class="img_icn" src="images/dynamic/dian.png" alt=""><br/><span class="sp_tex">'+ AthsZ+'</span>\
                            </a>\
                            <a href="javascript:void(0)" data-t="A_ping" class="p_img_rt">\
                                <img class="img_icn" src="images/dynamic/xiaoxi-2.png" alt=""><br/><span class="sp_tex">'+ AthsD+'</span>\
                            </a>\
                            <a href="javascript:void(0)" data-t="A_share" class="p_img_rt">\
                                <img class="img_icn" src="images/dynamic/shouyezhuanfa.png" alt="">\
                            </a>\
                            <a href="javascript:void(0)" data-t="A_video" class="p_img_rt">\
                                <img class="img_icn" src="images/dynamic/video.png" alt=""><br/><span class="sp_tex">发布</span>\
                            </a>\
                        </div>\
                        <div class="div_boot_msg w100">\
                            <p>昵称：'+ ConfigObj.mename +'</p>\
                            <p>'+ thisX +'</p>\
                        </div>\
                    </li>'
        $('#ch_img_number').html(thisM)
        $('#ul_msg_cont').html(html)
        // $('.A_remover').attr('data-d',)
    }
    
    nodisturbObj.AzanOb = function(obj) {
        // console.log('点赞')
        $.alertMsg('不能给自己点赞吖')
    }
    nodisturbObj.ApingOb = function(obj) {
        $('.div_inp_alt').show()
        // $(".div_inp_alt").css("position","absolute");
        nodisturbObj.Imgdetail()
    }
    nodisturbObj.AshareOb = function(obj) {
        console.log('分享')
        $('.div_share_dyna').show()
        // gifJsonlive()
        // Global.chshareObj('user')
        // sharePicObj(ConfigObj.share+ConfigObj.share_url)
    }
    nodisturbObj.AvideoOb = function(obj) {
        publishObj.goBack = function(){
            publishObj.destroy();
            nodisturbObj.show();
        }
        publishObj.show();
    }
    nodisturbObj.AremoverOb = function(obj) {
        console.log('删除')
        $('.removAlt').show()
    }
    nodisturbObj.quxiaoOb = function(obj) {
        $('.removAlt').hide()
    }
    nodisturbObj.shanchuOb = function(obj) {
        $('.removAlt').hide()
        console.log('确认删除')
        nodisturbObj.godyquedin()
    }
    nodisturbObj.videoPlayOb = function(obj) {
        console.log('播放')
        var vide = obj.attr('data-v')
        var posr = obj.attr('data-g')
        // console.log(vide)
        $('#hom_div_vid').show()
        $('#video_play').attr('poster',posr)
        $('#video_play').attr('src',vide)
        var myVide = $('#video_play')[0]
        // console.log(myVide)
        myVide.play();
    }
    nodisturbObj.vPauseOb = function(obj) {
        var myVide = $('#video_play')[0]
        // console.log(myVide)
        myVide.pause();
        $("#hom_div_vid").hide()

    }
    nodisturbObj.fasonOb = function(obj) {
        console.log(220)
        var valu = $('#inp_sub_tx').val()
        if (valu == '') {
            $.alertMsg('请输入评论内容') 
            return false;
        }
        // console.log($('#inp_sub_tx').val())
        nodisturbObj.fapinglunObj(valu)
    } 
    nodisturbObj.AzanplOb = function(obj) {
        console.log('点赞评论')
        var thisD = obj.attr('data-d')
        var thisU = obj.attr('data-u')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            user_id:thisU,
            role:'anchor',
            reply_id:thisD
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/enclosure/reply_thumbs',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (!res.err) {
                    $.alertMsg(res.suc) 
                    if (res.suc == '点赞成功') {
                    // console.log($(obj).find('img'))
                        $(obj).find('img').attr('src','images/dynamic/dianzan.png')                     
                    }
                    gifNonelive()
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
    nodisturbObj.gbinpOb = function(obj) {
        $('.div_inp_alt').hide()
        // $(".div_inp_alt").css("position","fixed");
    }
    var isVideoFullScreen = false;
   
    nodisturbObj.onloadExecution = function(){   
        nodisturbObj.createDomObj()
        this.createEvent();
    }
   
    nodisturbObj.init = function(){
        nodisturbObj.onloadExecution()
        // nodisturbObj.football() order_add
    }
  
  
  
  

  
 
  
   
  
  

    
    
   
 

