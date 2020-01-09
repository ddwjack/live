    var inquiredetaObj = new PageController({
	   'name': 'inquiredeta',
	   'tpl' : 'template/user/inquiredeta.html',
    });

    inquiredetaObj.createDomObj = function(){
    	this.ClickObj = $(".inquFan");
        this.hedsetObj = $("#inquire");
    }
    inquiredetaObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            inquiredetaObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            inquiredetaObj.goBack()
        })
    }
    inquiredetaObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "li_flowed" : inquiredetaObj.quxgzObj(thisObj);return true; //礼物柜  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "inquLi" : inquiredetaObj.golive(thisObL);return true; //類型 直播間 LVL 
            }
        }
    }
    inquiredetaObj.golive = function(obj){
        obj.addClass('activ').siblings().removeClass('activ')
        var thisL = obj.attr('data-l')
        inquiredetaObj.timsDay(thisL)
        if (thisL == '1V1') {
            console.log(1)
            $('#sp_wt_LV').show().siblings('#sp_wt_VN').hide()
        }else if(thisL == '1VN'){
            $('#sp_wt_LV').hide().siblings('#sp_wt_VN').show()
        }else{
            $('#sp_wt_LV,#sp_wt_VN').show()
        }
    }
    inquiredetaObj.gotoInquire = function(obj,typ){
        timeType = obj
        inquiredetaObj.timsDay(obj,typ)
        // console.log(inquiredetaObj.tpl)
    }
    inquiredetaObj.timsDay = function(obj,typ){
        // alert(54)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            mold:typ,
            date:timeType,
            page:'1',
            rows:'10',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/fortune_detail', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    inquiredetaObj.listTimday(res.info)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    inquiredetaObj.listTimday = function(res){
        var html = ''
        var text = res.list
        for (var i = 0; i < text.length; i++) {
            var time = text[i].created_date.substring(14,19)
            html += '<ul class="weaList_ul">\
                        <li class="center LiOverHid">'+ time+'</li>\
                        <li class="center LiOverHid">'+ text[i].mold +'</li>\
                        <li class="center LiOverHid">'+ text[i].nickname +'</li>\
                        <li class="center LiOverHid">'+ text[i].title +'</li>\
                        <li class="center LiOverHid">'+ text[i].score +'</li>\
                        <li class="center LiOverHid">'+ text[i].profit +'</li>\
                    </ul>'
        }
        $('#sp_wt_mony').html(res.total)
        $('#sp_wt_LV').html('1v1 '+res.rate_1)
        $('#sp_wt_VN').html('直播間 '+res.rate_n)
        $('#divListWeat').html(html)
    }
    inquiredetaObj.onloadExecution = function(){
    	inquiredetaObj.createDomObj()
        inquiredetaObj.createEvent()
        // inquiredetaObj.bannerObj('fens')
        // inquiredetaObj.createBannerHeight()
    }
    inquiredetaObj.init = function(){
	 	inquiredetaObj.onloadExecution()
    } 

    