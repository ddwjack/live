    var zbrztwoObj = new PageController({
	   'name': 'zbrztwo',
	   'tpl' : 'template/register/zbrztwo.html'
    });
    zbrztwoObj.createDomObj = function(){
    	this.ClickObj = $(".twoFan");
        this.hedsetObj = $("#zbrztwo")
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                zbrztwoObj.show();
            }
            signUpObj.show();
        })*/
    }
    
    zbrztwoObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            zbrztwoObj.goBack()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            zbrztwoObj.sectionEvent(e);
        });
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
    }
    zbrztwoObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "gothree" : zbrztwoObj.gothreeobj();return true; //密码显示*
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account   li_grayImg
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "ligrayImg" : zbrztwoObj.gograyImg(thisObj);return true; //选择认证类型 
                case "two_bq" : zbrztwoObj.gotwobq(thisObj);return true; //选择认证类型 
            }
        }
    }
    zbrztwoObj.gograyImg = function(obj){
        obj.addClass('li_grayImg').siblings().removeClass('li_grayImg')
        localStorage.setItem("typId", obj.attr('data-v'));
        // var typs = localStorage.getItem("typId")
    }
    zbrztwoObj.gotwobq = function(obj){
        obj.toggleClass('active')
        var arry = []
        var thing = $('li.active')
        if (thing.length <= '3') {
            for (var i = 0; i < thing.length; i++) {
                var title = $(thing[i]).attr('data-v')
                arry[i] = title
            }
            var numArr = arry.join(',')
            localStorage.setItem("rzbqId", numArr);
            // var rzbqs = localStorage.getItem("rzbqId")
        }else{
            $.alertMsg('只能选择三个')
            obj.removeClass('active')
            return false;
        }
    }
    zbrztwoObj.gothreeobj = function(){
        if (!$('#filter li').hasClass('li_grayImg')) {
            $.alertMsg('请选择认证类型');
            return false;
        }
        if (!$('#ul_rzbq li').hasClass('active')) {
            $.alertMsg('请选择认证标签');
            return false;
        }
        zbrzthreeObj.goBack = function(){
            zbrzthreeObj.destroy();
            zbrztwoObj.show();
        }
        zbrzthreeObj.show(true,function(){
            zbrzthreeObj.viderequ(videoEd)
        });
    }
    zbrztwoObj.rzlabelObj = function(res){
        var html = ''
        for (var i in res) {
            html += '<li data-t="two_bq" data-v="'+ res[i]+'" class="li_bq"><span class="sp_bq">'+ res[i] +'</span></li>'
        }
        $('#ul_rzbq').html(html)
    }
    zbrztwoObj.renzhengxObj = function(){ 
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
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
              if(!obj.err){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info)
                videoEd = obj.info.video_required
                    /*var multip = obj.info.mold.multip
                    var single = obj.info.mold.single*/
                    zbrztwoObj.singleobj(obj.info.mold.single)
                    zbrztwoObj.multipleobj(obj.info.mold.multiple)
                }else{
                    $.alertMsg(obj.err);
                    if (obj.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
            }
        })
    }
    zbrztwoObj.singleobj = function(res){
        if (res.verify == 0) { // opactImg   grayImg
            $('#im_LVL').html('<img  class="im_w1 opactImg" src="images/register/1v1.png" alt=""><p class="p_9B">认证1V1视频主播</p>')
        }else{
            $('#im_LVL').attr('data-t','')
            $('#im_LVL').html('<img  class="im_w1" src="images/register/1v1.png" alt=""><p class="p_9B">认证1V1视频主播</p>')
        }
    }
    zbrztwoObj.multipleobj = function(res){
        if (res.verify == 0) {
            $('#im_LVN').html('<img  class="im_w1 opactImg" src="images/register/zbj.png" alt=""><p class="p_9B">认证直播间主播</p>')
        }else{
            $('#im_LVN').attr('data-t','')
            $('#im_LVN').html('<img  class="im_w1" src="images/register/zbj.png" alt=""><p class="p_9B">认证直播间主播</p>')
        }
    }
    zbrztwoObj.onloadExecution = function(){
    	zbrztwoObj.createDomObj()
        zbrztwoObj.createEvent()
        zbrztwoObj.renzhengxObj()
    }
    zbrztwoObj.init = function(){
	 	zbrztwoObj.onloadExecution()
    }