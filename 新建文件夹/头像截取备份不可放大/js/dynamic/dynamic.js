    var dynamicObj = new PageController({
	   'name': 'dynamic',
	   'tpl' : 'template/dynamic/dynamic.html'
    });
    dynamicObj.createDomObj = function(){
    	// this.ClickObj = $(".wholeFan");
        this.hedsetObj = $("#dynamic") 
        this.secntObj = $("#sec_cent") 
        // var imag = Math.floor((document.documentElement.clientWidth )/2)

        // $('.hebfb').css('height',imag)
        // $('.diNul').css('height',imag)
        /*this.ClickObj.unbind('tap').tap(function(e){ //返回
            dynamicObj.goBack()
        })*/
    }

    
    dynamicObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            dynamicObj.sectionEvent(e);
        });
        /*this.secntObj.unbind('touchmove').tap(function(){
            console.log(24)
        })*/
        var startPosition, endPosition, moveLenvid;  
        $(document).bind('touchstart', function(e){  
            var touch = e.touches[0];  
            // console.log(touch)
            startPosition = {  
                x: touch.pageX 
            }
        }) .bind('touchmove', function(e){  
            var touch = e.touches[0];  
            endPosition = {  
                x: touch.pageX
            };  
            moveLenvid = endPosition.x - startPosition.x;
            // console.log(moveLenvid)
            dynamicObj.vidpauseObj()
        });
        /*$('#sec_cent').swipeDown(function(){
            dynamicObj.vidpauseObj()
        })*/
        var page = 1;
        var size = 10;
        $('#dynamic').dropload({ 
            scrollArea : window,
            distance : 100,
            loadUpFn:function(me){
                dynamicObj.pullLoad = me;
                // var 
                Global.channelId()
                dynamicObj.updatePlay()
                me.resetload(); 
            },
            loadDownFn:function(me){
                dynamicObj.pullLoad = me
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
                    token:ConfigObj.token
                } 
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/anchor/enclosure',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (!res.err) {
                            // res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            dynamicObj.loadObj(res)
                        }else{
                           $.alertMsg(res.err) 
                           if (res.code == '1000') {
                                tekenLOgin()
                            }
                            // token:ConfigObj.token  tekenLOgin()
                        }
                    },
                    error:function(xhr, type){
                        dynamicObj.pullLoad.resetload();
                    }
                })
              // sowingObj.pullLoad = me; titlist
              // homeObj.getData(2)
            }
        }); 
    }
    dynamicObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            dynamicObj.show();
            Global.fixd()

        }
        searchObj.show(2);
    }
    dynamicObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "user_detail" : dynamicObj.goxxi(thisObj);return true; //详细动态  
                case "Apublish" : dynamicObj.goApublish(thisObj);return true; //   
                case "gorenzs" : dynamicObj.gorenzs(thisObj);return true; //去認證    
                case "zlsx" : dynamicObj.gozlsx(thisObj);return true; //去認證     
                case "Aremovdt" : dynamicObj.goAremovdt(thisObj);return true; //刪除動態     
                case "dyquxiao" : dynamicObj.godyquxiao(thisObj);return true; //取消刪除     
                case "dyquedin" : dynamicObj.godyquedin(thisObj);return true; //確定刪除     
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                case "img_deta" : dynamicObj.goimgDetass(thisObL);return true; //* 
            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : dynamicObj.goimgDetass(thisObL);return true; //* 

            }
        }
    }
    
    dynamicObj.goxxi = function(obj){
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            dynamicObj.show(true);
            Global.fixd()
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN)
        });
    }
    dynamicObj.goApublish = function(obj){
        publishObj.goBack = function(){
            publishObj.destroy();
            dynamicObj.show(true);
            // dynamicObj.scrTops()
            Global.fixd()
        }
        publishObj.show(true);
    }
    dynamicObj.gorenzs = function(obj){
        myuserxin()
        /*zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            dynamicObj.show();
            Global.fixd()
        }
        zbrzoneObj.show(true);*/
    }
    dynamicObj.goAremovdt = function(obj){
        thisObj = obj
        $('.dynamRemov').show(500)
        thisD = obj.attr('data-d')
        //   動態id和主播id
    }
    dynamicObj.godyquxiao = function(){
        $('.dynamRemov').hide(500)
    }
    dynamicObj.godyquedin = function(){
        $('.dynamRemov').hide(500)
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:thisD,
            token:ConfigObj.token
        } 
        // console.log(postData)
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
                   $(thisObj).parents('div.div_namic').hide()
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
    dynamicObj.gozlsx = function(){
        $.alertMsg('認證資料正在審核中')
        // return false;
    }
    dynamicObj.goimgDetass = function(obj){
        var offTotyt = obj[0].offsetTop
        console.log(offTotyt)
        // return false;
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        nodisturbObj.goBack = function(){
            dynamicObj.show(false);
            nodisturbObj.destroy();
            // dynamicObj.scrTops(offTotyt)
            Global.fixd()
        }
            // dynamicObj.scrTops(offTotyt)
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTotyt,thisZ)
        });
    }

    dynamicObj.scrTops = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp)
        },100)
    }

    dynamicObj.updatePlay = function(){
        console.log()
        if (ConfigObj.status == '0') {
            $('.pWzhidao').show().siblings('.pGquren').hide()
            $('#A_fdt_wez').html('認證審核中')
            $('#renconten').html('資料正在審核中')
            $('.dynafabu').hide()
            $('.pWzhidao').find('a').attr('data-l','2')
            $('#A_fdt_wez').attr('data-t','zlsx')
        }else if (ConfigObj.status == '2') {
            $('.pGquren').show().siblings('.pWzhidao').hide()
            $('.gozbrz').show()
            $('#renconten').html('該功能需要認證成為主播')
            $('.dynafabu').hide()
            $('#A_fdt_wez').html('去認證')
            $('.pGquren').find('a.ArzLVN').attr('data-l','2')
            $('.pGquren').find('a.Axiaci').attr('data-l','2')
            $('#A_fdt_wez').attr('data-t','gorenzs')
        }else{
            $('#A_fdt_wez').html('發動態')
            $('.dynafabu').show()
            // $('#pweirzen').find('a.ArzLVN').attr('data-l','2')
            // $('#pweirzen').find('a.Axiaci').attr('data-l','2')
            $('#A_fdt_wez').attr('data-t','Apublish')
        }
        // return false;
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            page:'1',
            rows:'10',
            token:ConfigObj.token
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/enclosure',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    // dynamicObj.centerObj(res.info)
                    dynamicObj.centerObj(res)
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
    dynamicObj.centerObj = function(obj){
        var tims = obj.time
        var res = $.parseJSON(Global.crypt(obj.result));
        if (res.length != '0') {
            $('.div_cent_con').hide()
        }
        var html = ''
        for (var i = 0; i < res.length; i++) {  
            var re = res[i]
            var str = re.images;
            var tyl = res[i].reply_list
            var img = str.split(',');
            dynamicObj.timeObj(tims,re.created_date)
            // console.log(timeDay)
            html += '<div class="div_namic">\
                <div class="p_user">\
                    <a class="link w86" href="javascript:void(0)">\
                        <img class="img_user fl" src="'+ re.avatar_url+'" alt="#">\
                        <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                        <p class="p_lx">'+ re.craft +'</p>\
                    </a>\
                    <a data-t="Aremovdt" data-d="'+ re.id +'" class="link w12 colGray" href="javascript:void(0)">··</a>\
                </div>\
                <div><p class="texCent">'+ re.message +'</p></div>';
                if (re.video != '') {
                    // console.log(re.video) 
                    html += '<video id="dy_video"  class="vid_puase" poster="'+ re.poster +'" controls="true"  src="'+ re.video +'"></video>'
                    // html += '<embed style="width:100%;" src="'+ re.video +'" width="200" height="200">'
                }
                if (img.length == '1' && img != '') {
                        var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/dynam1.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"><p></p>\
                                    <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
                    }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;"><p></p>\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;"><p></p>\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                </ul>'
                    }else if(img.length >= '3'){
                        var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                        html += '<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/dynam1.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                    <li class="w28">\
                                        <p data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i> </p>\
                                        <p style="height: .7rem;"></p>\
                                        <p data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                    </li>\
                                </ul>'
                    }
                html += '<p class="bot_A">\
                    <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="w60" href="javascript:void(0)">\
                        <img src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn>\
                    </a>\
                    <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="w20" href="javascript:void(0)">\
                        <img src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn>\
                    </a><a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="w20" href="javascript:void(0)"><img src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                </p>\
                <div class="pinglun" style="display:'+(tyl.length == '0' ? 'none': 'inline-block')+'">'
                for (var j = 0; j < tyl.length; j++) {
                    html +='<p class="pLine"><span class="spName">'+ tyl[j].nickname +'：</span><span>'+ tyl[j].message+'</span></p>'
                }
                html += '</div></div>'
        }
        $('#sec_cent').html(html)
        dynamicObj.webresi()
    }

    dynamicObj.loadObj = function(obj){
        var dat = $.parseJSON(Global.crypt(obj.result));
        // res.info = $.parseJSON(Global.crypt(res.result));
        var tims = obj.time
        var re = dat
        console.log(re)
        var arrLen = dat.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                // var tim = re[i].created_date.substring(11,19)
                var str = re[i].images;
                var img = str.split(',');
                var tyl = re[i].reply_list
                dynamicObj.timeObj(tims,re[i].created_date)
                result += '<div class="div_namic">\
                    <div class="p_user">\
                        <a class="link w86" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re[i].avatar_url+'" alt="#">\
                            <p class="p_font">'+ re[i].nickname +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                            <p class="p_lx">'+ re[i].craft +'</p>\
                        </a>\
                        <a data-t="Aremovdt" data-d="'+ re[i].id +'" class="link w12 colGray" href="javascript:void(0)">··</a>\
                    </div>\
                    <div><p class="texCent">'+ re[i].message +'</p></div>';
                    if (re[i].video != '') {
                        result += '<video id="dy_video"  class="vid_puase" poster="'+ re[i].poster +'" controls="true"  src="'+ re[i].video +'"></video>'
                    }
                    if (img.length == '1' && img != '') {
                        var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        result +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
                    }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        result +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam1.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                    <li data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
                    }else if(img.length >= '3'){
                        var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                        result += '<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                    <li class="w28">\
                                        <p data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam1.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                        <p style="height: .7rem;"></p>\
                                        <p data-t="img_deta" data-m="'+ re[i].id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                    </li>\
                                </ul>'
                    }
                    result += '<p class="bot_A">\
                        <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="w60" href="javascript:void(0)">\
                            <img src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re[i].view +'</sapn>\
                        </a>\
                        <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="w20" href="javascript:void(0)">\
                            <img src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re[i].reply +'</sapn>\
                        </a><a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="w20" href="javascript:void(0)"><img src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].thumbs +'</sapn></a>\
                    </p>\
                    <div class="pinglun" style="display:'+(tyl.length == '0' ? 'none': 'inline-block')+'">'
                        for (var j = 0; j < tyl.length; j++) {
                            result +='<p class="pLine"><span class="spName">'+ tyl[j].nickname +'：</span><span>'+ tyl[j].message+'</span></p>'
                        }
                    result += '</div></div>'
            }
        }else{
            dynamicObj.pullLoad.lock();
            $('#dyna_hide').show()
            $.alertMsg('已經到底了，沒有更多視頻了')
        }
            $('#sec_cent').append(result);
            dynamicObj.webresi()
            // var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
            // $('#wh_ul img').css('height',imag)
            // $('#ul_zxp i.opactiy').css('height',imag)
            dynamicObj.pullLoad.resetload();
    }
    dynamicObj.timeObj = function(time,over){
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
    dynamicObj.webresi = function(vid){ 
        var testLi=document.getElementById('sec_cent').getElementsByTagName('video');
         for(var i=0;i<testLi.length;i++) {
            testLi[i].addEventListener('play', function(num){
                // num.target.play()
            });
            testLi[i].addEventListener('resize', function(){
            });
            /*testLi[i].addEventListener("timeupdate",function(num){
                var timeDisplay;
                timeDisplay = Math.floor(num.path[0].currentTime);
            },false);*/
            testLi[i].addEventListener('playing', function(num){
                console.log(num.target.offsetTop)
                var this1=this;
                this.play();
                for(var b=0;b<testLi.length;b++){
                    var this2=testLi[b];
                    if(this1!==this2){
                        this2.pause();
                    }
                }
            });
            testLi[i].addEventListener('canplay', function(num){
                // var gif = num.target.nextElementSibling
                // $(gif).show()
            });
        }
    }
    dynamicObj.vidpauseObj = function(){ 
        var testLi=document.getElementById('sec_cent').getElementsByTagName('video');
        for(var i=0;i<testLi.length;i++) {
            // console.log(testLi[i])
            testLi[i].pause()
        }
    }
    dynamicObj.onloadExecution = function(){
    	dynamicObj.createDomObj()
        dynamicObj.createEvent()
        dynamicObj.updatePlay()
    }
    dynamicObj.init = function(){
	 	dynamicObj.onloadExecution()
    }