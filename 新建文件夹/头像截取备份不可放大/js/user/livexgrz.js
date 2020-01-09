    var livexgrzObj = new PageController({
	   'name': 'livexgrz',
	   'tpl' : 'template/user/livexgrz.html',
    });

    livexgrzObj.createDomObj = function(){
    	this.ClickObj = $(".xgrzFan");
        this.hedsetObj = $("#livexgrz");
        // this.stupObj = $("#gosetup");
    }

    //ajax返回数据 
    livexgrzObj.ajaxData = new Object();
    livexgrzObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            livexgrzObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            livexgrzObj.goBack()
        })
    }
    livexgrzObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Ashz" : livexgrzObj.goAshz(thisObj);return true; //审核中 
                case "Aweirz" : livexgrzObj.goAweirz(thisObj);return true; //未认证 
                case "Axgr" : livexgrzObj.goAxgr(thisObj);return true; //修改认证
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "yhxy" : livexgrzObj.goyhxy(thisObL);return true; //用户协议
                case "jcgx" : Global.checkUpdate(true);return true; //检查更新
                case "xttz" : livexgrzObj.goxttz(thisObL);return true; //系统通知
            }
        }
    }

    livexgrzObj.goAshz = function(obj){
        /*mymodifyObj.goBack = function(){
            mymodifyObj.destroy();
            livexgrzObj.show(true);
        }
        mymodifyObj.show(true);*/
        $.alertMsg('资料正在审核中')
    }
    livexgrzObj.goAweirz = function(obj){
        // localStorage.setItem("anchor_id", obj.info.anchor_id);
        zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            livexgrzObj.show(true);
        }
        zbrzoneObj.show(true,function(){
            zbrzoneObj.xinxiOBj()
        });
    }
    livexgrzObj.goAxgr = function(obj){
        var thisL = obj.attr('data-l')
        // console.log(livexgrzObj.ajaxData)
        mymodifyObj.goBack = function(){
            mymodifyObj.destroy();
            livexgrzObj.show(true);
        }
        mymodifyObj.show(true,function(){
            mymodifyObj.xgrzObj(livexgrzObj.ajaxData,thisL)
        });
        // $.alertMsg('修改认证资料')
    }
    livexgrzObj.renzhengxObj = function(){ //登录 getUserInfo 
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            nickname: '',
            avatar_url: '',
            mold:'',
            cover_x: '',
            cover_y: '',
            images:'',
            auth_video:'',
            handle: 'before'
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/anchor/update_authenticate',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
            // obj.info = $.parseJSON(Global.crypt(obj.result));
              if(!obj.err){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info)
                livexgrzObj.ajaxData = obj.info
                livexgrzObj.singleobj(obj.info.mold.single)
                livexgrzObj.multipleobj(obj.info.mold.multiple)
                // alert(obj.info.anchor_id)
                }
            }
        })
    }
    livexgrzObj.multipleobj = function(res){
        // console.log(res)
        var html = ''
        var multip = res
        // var single = res
        /*verify  1  是更新资料  
        verify  0  是未认证
        verify  0  status 0 是审核中  
        verify  0  status 1 不存在
        verify  0  status 2 已拒绝，重新修改
        verify  1  status 0 是更新资料  
        verify  1  status 1 已通过，重新修改
        verify  1  status 2 已通过，修改被拒
        */
        if (multip.verify == '0') {//grayImg Aweirz  opactImg
            console.log(133)
            $('#ALVNImg').html('<img class="w100 opactImg" src="images/register/zbj.png" alt="">')
            $('#LVN').html('<a data-t="Axgr" data-l="1VN" class="Agray" href="javascript:void(0)">去認證</a>')
            if (multip.status == '0') {
                $('#LVN').html('<a data-t="Ashz" class="Agray" href="javascript:void(0)">審核中</a>')
            }else if(multip.status == '2'){
                $('#ALVNImg').html('<img class="w100 opactImg" src="images/register/zbj.png" alt="">')
                $('#LVN').html('<a data-t="Axgr" data-l="1VN" class="Agray" href="javascript:void(0)">已拒絕</a>')
            }
        }else{
            if (multip.status == '0') {
                $('#LVN').html('<a data-t="Ashz" class="Ayrz" href="javascript:void(0)">更新中</a>')
            }else if(multip.status == '1'){
                $('#LVN').html('<a data-t="Axgr" data-l="1VN" class="Ayrz" href="javascript:void(0)">已認證</a>')
            }else{
                $('#LVN').html('<a data-t="Axgr" data-l="1VN" class="Ayrz" href="javascript:void(0)">已認證</a>')
            }
        }
    }
    livexgrzObj.singleobj = function(res){
        console.log(150)
        var html = ''
        var single = res
        if (single.verify == '0') {//grayImg
            $('#ALVLImg').html('<img class="w100 opactImg" src="images/register/1v1.png" alt="">')
            $('#LVL').html('<a data-t="Axgr" data-l="1V1" class="Agray" href="javascript:void(0)">去認證</a>')
            if (single.status == '0') {
                $('#LVL').html('<a data-t="Ashz" class="Agray" href="javascript:void(0)">審核中</a>')
            }else if(single.status == '2'){
                $('#ALVLImg').html('<img class="w100 opactImg" src="images/register/1v1.png" alt="">')
                $('#LVL').html('<a data-t="Axgr" data-l="1V1" class="Agray" href="javascript:void(0)">已拒絕</a>')
            }
        }else{
            if (single.status == '0') {
                $('#LVL').html('<a data-t="Ashz" class="Ayrz" href="javascript:void(0)">更新中</a>')
            }else if(single.status == '1'){
                $('#LVL').html('<a data-t="Axgr" data-l="1V1" class="Ayrz" href="javascript:void(0)">已認證</a>')
            }else{
                $('#LVL').html('<a data-t="Axgr" data-l="1V1" class="Ayrz" href="javascript:void(0)">已認證</a>')
            }
        }
    }
    /*livexgrzObj.golive = function(obj){
        var thisL = obj.attr('data-l')
        obj.addClass('activ').siblings().removeClass('activ')
        if (thisL == 'lvl') {
            console.log(1)
            $('.live_LVL').show().siblings('.div_live').hide()
            var ighe = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
            $('img.imHeig').css('height',ighe)
        }else{
            $('.div_live').show().siblings('.live_LVL').hide()
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.6)
            $('img.img_nam').css('height',imag)
        }
    }*/
    livexgrzObj.onloadExecution = function(){
    	livexgrzObj.createDomObj()
        livexgrzObj.createEvent()
        livexgrzObj.renzhengxObj()
        // livexgrzObj.createBannerHeight()
    }
    livexgrzObj.init = function(){
	 	livexgrzObj.onloadExecution()
    }