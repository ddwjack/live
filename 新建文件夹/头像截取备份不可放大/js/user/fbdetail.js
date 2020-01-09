    var fbdetailObj = new PageController({
	   'name': 'fbdetail',
	   'tpl' : 'template/user/fbdetail.html'
    });
    fbdetailObj.createDomObj = function(){
    	this.ClickObj = $(".fbdet_fan");
        this.hedsetObj = $("#fbdetail") 
    }
   
    fbdetailObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            fbdetailObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回  
            fbdetailObj.goBack()
        })
    }
    fbdetailObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "Liyjfk" : fbdetailObj.goLiyjfk();return true; //意見反饋
                case "Liwdfk" : fbdetailObj.goLiwdfk();$('.i_festate').hide();return true; //我的反饋
            }
        }
    }
    
    fbdetailObj.fbdetaxq = function(obj){
        fbdetailObj.gofkdetail(obj)
    }
    fbdetailObj.gofkdetail = function(id){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/notice_detail',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    fbdetailObj.fkcontentObj(res.info)
                }else{
                   $.alertMsg(res.err)
                    if (res.code == '1000') {
                        tekenLOgin()
                    } 
                }
            }
        })
    }
    fbdetailObj.fkcontentObj = function(res){
        var imga = res.images
        var imgs = imga.split(',')
        var html = ''
        for (var i = 0; i < imgs.length; i++) {
            html += '<li class="li_img_fk"><img class="fk_img" src="'+ imgs[i] +'" alt=""></li>'
        }
        $('#ul_img_fkjl').html(html)
        $('#fk_cont').html(res.content)
        if (res.answer == '') {
            $('#hf_cont').html('平台暫未回復，請耐心等待...')
        }else{
            $('#hf_cont').html(res.content)
        }
    }
    fbdetailObj.onloadExecution = function(){
    	fbdetailObj.createDomObj()
        fbdetailObj.createEvent()
    }
    fbdetailObj.init = function(){
	 	fbdetailObj.onloadExecution()
    }