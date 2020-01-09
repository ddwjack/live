    var myfkjlObj = new PageController({
	   'name': 'myfkjl',
	   'tpl' : 'template/user/myfkjl.html'
    });
    myfkjlObj.createDomObj = function(){
    	this.ClickObj = $(".fkjl_fan");
        this.hedsetObj = $("#myfkjl") 
        // this.butUpObj = $("#butt_up")  //提交 Liwdfk
        // this.uploaImg = $('#upImgBtn')
        $('.feed_ul li').tap(function(){
            $(this).addClass('active').siblings().removeClass('active') 
        })
    }
    myfkjlObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            myfkjlObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回  
            myfkjlObj.goBack()
        })
    }
    myfkjlObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                case "Liyjfk" : myfkjlObj.goLiyjfk();return true; //意見反饋
                case "fbdeta" : myfkjlObj.gofbdeta(thisObj);return true; // 
            }
        }
    }
    
    myfkjlObj.gofbdeta = function(obj){
        var thisD = obj.attr('data-d')
        fbdetailObj.goBack = function(){
            fbdetailObj.destroy();
            myfkjlObj.show();
        }
        fbdetailObj.show(true,function(){
            fbdetailObj.fbdetaxq(thisD)
        });
    }
    myfkjlObj.goLiwdfk = function(){
        // $('#fkjl').show().siblings('#fkyj').hide()
        var postData ={
            type:'2',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            edit:'1',
            role:'anchor'
        }
        // console.log(postData)
        // edit 讀取傳1 查看有無信息傳空
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/User/notice_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    myfkjlObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    myfkjlObj.gohtmltex = function(obj){
        if (obj.length == '0') {
            $('#cen_none').show().siblings('#div_lis_fk').hide()
        }else{
            $('#cen_none').hide().siblings('#div_lis_fk').show()
            console.log(obj)
            var html = ''
            for (var i = 0; i < obj.length; i++) {
                var ob = obj[i]
                var obtime = ob.created_date.substring(0,10)
                html += '<ul class="ul_fee_list">\
                            <li data-t="fbdeta" data-d="'+ ob.id +'" class="w33 li_list_te center"><span>'+ obtime.replace(/-/g,'/')+'</span></li>\
                            <li data-t="fbdeta" data-d="'+ ob.id +'" class="w33 li_list_te center"><span class="sp_ov_hide">'+ ob.content+'</span></li>\
                            <li data-t="fbdeta" data-d="'+ ob.id +'" class="w33 li_list_te center"><span class="'+(ob.state == '1' ? 'wehuif' : 'yihuif')+'">'+(ob.state == '1' ? '未回復' : '已回復')+'</span></li>\
                        </ul>'
            }
            $('#ul_none').html(html)
        }
        gifNonelive()
    }

    myfkjlObj.onloadExecution = function(){
    	myfkjlObj.createDomObj()
        myfkjlObj.createEvent()
        myfkjlObj.goLiwdfk()
    }
    myfkjlObj.init = function(){
	 	myfkjlObj.onloadExecution()
        gifJsonlive()
    }