    var proRecordObj = new PageController({
	   'name': 'proRecord',
	   'tpl' : 'template/user/proRecord.html',
       'pullDistance': 220
    });

    proRecordObj.createDomObj = function(){
    	this.ClickObj = $(".recoFan");
        this.hedsetObj = $("#proRect");
    }
    
    proRecordObj.withdList = function(obj){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            anchor_id:ConfigObj.meId,
            token:ConfigObj.token,
            client:client,
            // status:obj,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/promote_users', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    proRecordObj.datList(res.info)
                }else{

                   $.alertMsg(res.err) 
                }
            }
        })
    }
    proRecordObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            proRecordObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            proRecordObj.goBack()
        })
    }
    proRecordObj.sectionEvent = function(e){
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "AlistWith" : proRecordObj.AlistWith(thisObL);return true; //性别取消 
            }
        }
    }
    proRecordObj.AlistWith = function(obj){
        obj.addClass('active').siblings().removeClass('active')
        var thisL = obj.attr('data-l')
        proRecordObj.withdList(thisL)
    }
    proRecordObj.datList = function(dat) {
        var html = ''
        for (var i = 0; i < dat.length; i++) {
            // console.log(dat[i])
            var ret = dat[i]
            // console.log(ret.mobile)
            var tim = ret.created_date.substr(0,10).replace(/\-/g,'/')
            html += '<ul class="ul_cen_list">\
                        <li class="li_contlst">'+ tim +'</li>\
                        <li class="li_contlst">'+ (ret.role == 'user' ? '用户' : '主播')+'</li>\
                        <li class="li_contlst">'+ ret.nickname +'</li>\
                        <li class="li_contlst">'+ (ret.mobile == '' ? '-' : ret.mobile) +'</li>\
                    </ul>'
        }
        $('.div_cont_ul').html(html)
        gifNonelive()
    }
    proRecordObj.onloadExecution = function(){
    	proRecordObj.createDomObj()
        proRecordObj.createEvent()
        proRecordObj.withdList('-1')
        gifJsonlive()
        // proRecordObj.createBannerHeight()
    }
    proRecordObj.init = function(){
	 	proRecordObj.onloadExecution()
    }