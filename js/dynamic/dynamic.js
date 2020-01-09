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
            gifNonelive()
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
                    rows:'12',
                    role:'anchor',
                    token:ConfigObj.token
                } 
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/enclosure/home',
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
                case "user_detail" : dynamicObj.goxxi(thisObj);return true; //详细动态  
                case "Apublxx" : dynamicObj.goApublxx(thisObj);return true; //   
                case "gorenzs" : dynamicObj.gorenzs(thisObj);return true; //去認證    
                case "zlsx" : dynamicObj.gozlsx(thisObj);return true; //去認證     
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                case "imgDetail" : dynamicObj.imgDetail(thisObL);return true; //* 
                case "Lipublxx" : dynamicObj.goApublxx(thisObj);return true; //   
                
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
    dynamicObj.goApublxx = function(obj){
        publishObj.goBack = function(){
            publishObj.destroy();
            dynamicObj.show(true);
            Global.fixd()
            // dynamicObj.scrTops()
        }
        publishObj.show(true);
    }
    dynamicObj.gorenzs = function(obj){
        myuserxin()
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
    dynamicObj.gozlsx = function(){
        $.alertMsg('認證資料正在審核中')
    }
    dynamicObj.imgDetail = function(obj){
        var offTotyt = obj[0].offsetTop
        console.log(offTotyt)
        // return false;
        var thisH = obj.attr('data-h') 
        var thisZ = obj.attr('data-z') 
        var thisG = obj.attr('data-g') 
        var thisM = obj.attr('data-m') 
        var thisX = obj.attr('data-x') 
        var thisV = obj.attr('data-v') 
        var thisD = obj.attr('data-d') 
        // console.log(thisH + ','+ thisZ+','+thisG+','+thisN+','+thisM+','+thisX+','+thisV)
        nodisturbObj.goBack = function(){
            console.log($("#viewVideo"))
            if ($("#hom_div_vid").css("display")=='none') {
                dynamicObj.show(false);
                nodisturbObj.destroy();
                Global.fixd()
            }else{
                $("#hom_div_vid").hide()
                var myVide = $('#viewVideo')
                myVide[0].pause();
            }
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.dataTxtObj(thisH,thisZ,thisG,thisM,thisX,thisV,thisD)
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
            $('#A_fdt_wez').attr('data-t','Apublxx')
        }
        // return false;
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            page:'1',
            rows:'12',
            role:'anchor',
            token:ConfigObj.token
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/enclosure/home',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res) 
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
        var dat = $.parseJSON(Global.crypt(obj.result));
        console.log(dat)
        if (dat.length == '0') {
            console.log(261)
            console.log($('.dynafabu'))
            $('.dynafabu').hide()
            // $('.div_cent_con').show()
            gifNonelive()
            return false;
        }

        var res = dat.list
        // console.log(dat)
        if (res.length != '0') {
            $('.div_cent_con').hide()
            $('.dynafabu').show()
        }
        var html = ''
        for (var i = 0; i < res.length; i++) {  
            mathlabelObj()
            var re = res[i]
            var imag = Math.floor((document.documentElement.clientWidth * 0.3233 )/.75)
            // console.log(re)
            var tim = re.created_date.substring(0,10).replace(/-/g,'/')
            // var img = str.split(',');
            // console.log(re.poster)
            // dynamicObj.timeObj(tims,re.created_date)
            // console.log(re.thumbs)
            if (re.thumbs < 1000) {
                var numb = re.thumbs
            }else{
                var numb = (re.thumbs/1000).toFixed(1)/1+'K'
            }
            html += '<li class="w32" data-t="imgDetail" data-d="'+ re.id +'" data-h="'+ re.reply +'" data-z="'+ re.thumbs +'" data-g="'+ (re.poster == '' ? 'images/channel/dynam1.png' : re.poster) +'" data-m="'+ tim +'" data-x="'+ re.message +'" data-v="'+ re.video +'">\
                        <p class="p_title_ig"><img class="img_zan" src="images/dynamic/dianzan.png" alt=""><span>'+ numb +'</span></p>\
                        <img class="w100" style="background:url('+ labImg +');background-size:100% 100%;height:'+ imag +'px;" src="'+ re.poster+'" onerror="javascript:this.src='+"\'"+labImg+"\'"+'" alt="">\
                        <p class="w100 center p_bot_time">'+ tim +'</p>\
                    </li>'            
        }
        $('#sec_cent').html(html)
        gifNonelive()
    }

    dynamicObj.loadObj = function(obj){
        var dat = $.parseJSON(Global.crypt(obj.result));
        // res.info = $.parseJSON(Global.crypt(res.result));
        var tims = obj.time
        var re = dat.list
        console.log(dat)
        if (dat.length == '0') {
            var arrLen = dat.length;
        }else{
            var arrLen = dat.list.length;
        }
        // var arrLen = dat.list.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                mathlabelObj()
                console.log(300)
                var redaA = re[i]
                var imag = Math.floor((document.documentElement.clientWidth * 0.3233 )/.75)
                var tim = redaA.created_date.substring(0,10).replace(/-/g,'/')
                if (redaA.thumbs < 1000) {
                    var Anumb = redaA.thumbs
                }else{
                    var Anumb = (redaA.thumbs/1000).toFixed(1)/1+'K'
                }
                // var tim = re[i].created_date.substring(11,19)
                result += '<li class="w32" data-t="imgDetail" data-d="'+ redaA.id +'" data-h="'+ redaA.reply +'" data-z="'+ redaA.thumbs +'" data-g="'+ (redaA.poster == '' ? 'images/channel/dynam1.png' : redaA.poster) +'" data-m="'+ tim +'" data-x="'+ redaA.message +'" data-v="'+ redaA.video +'">\
                            <p class="p_title_ig"><img class="img_zan" src="images/dynamic/dianzan.png" alt=""><span>'+ Anumb +'</span></p>\
                            <img class="w100" style="background:url('+ labImg +');background-size:100% 100%;height:'+ imag +'px;" src="'+ redaA.poster+'" onerror="javascript:this.src='+"\'"+labImg+"\'"+'" alt="">\
                            <p class="w100 center p_bot_time">'+ tim +'</p>\
                        </li>'
            }
        }else{
            dynamicObj.pullLoad.lock();
            // $('#dyna_hide').show()
            $.alertMsg('已經到底了，沒有更多了')
        }
            $('#sec_cent').append(result);
            // var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
            // $('#wh_ul img').css('height',imag)
            // $('#ul_zxp i.opactiy').css('height',imag)
            dynamicObj.pullLoad.resetload();
    }
    dynamicObj.vidpauseObj = function(){ 
        var testLi=document.getElementById('sec_cent').getElementsByTagName('video');
        for(var i=0;i<testLi.length;i++) {
            // console.log(testLi[i])
            testLi[i].pause()
        }
    }
    function mathlabelObj() {
        var tex = [
            'images/channel/dynam1.png',
            'images/channel/dynam2.png',
            'images/channel/dynam3.png',
        ]
        return labImg = tex[Math.floor(Math.random()*tex.length)]
    }
    dynamicObj.onloadExecution = function(){
    	dynamicObj.createDomObj()
        dynamicObj.createEvent()
        dynamicObj.updatePlay()
        gifJsonlive()
    }
    dynamicObj.init = function(){
	 	dynamicObj.onloadExecution()
    }