    var zbrzoneObj = new PageController({
	   'name': 'zbrzone',
	   'tpl' : 'template/register/zbrzone.html'
    });
    zbrzoneObj.createDomObj = function(){
    	this.ClickObj = $(".oneFan");
        this.hedsetObj = $("#zbrzone")
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                zbrzoneObj.show();
            }
            signUpObj.show();
        })*/
    }
    zbrzoneObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            zbrzoneObj.goBack()
            removeItemObj()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            zbrzoneObj.sectionEvent(e);
        });
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });

        timeObj()
        wapObg()
    }
    function wapObg(){
        var area1 = new LArea();
        area1.value=[1,13];//控制初始位置，注意：该方法并不会影响到input的value
        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data]
        });
    }
    function timeObj(){
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy/mm/dd',
            lang: 'zh',
            showNow: true,
            // nowText: "今天",
            startYear: currYear - 50, //开始年份
            endYear: currYear - 18 //结束年份
        };
        $("#USER_AGE").mobiscroll($.extend(opt['date'], opt['default']));
    }
    zbrzoneObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                case "gotwo" : zbrzoneObj.gotwoObj();return true; //密码显示*
            }
        }


        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "portraits" : zbrzoneObj.goportraits();return true; //上传照片头像
                case "liName" : zbrzoneObj.goliName();return true;  //用户昵称
                case "gxqm" : zbrzoneObj.gogxqm();return true;  //各性签名 
                case "lixb" : zbrzoneObj.golixb();return true;  //性别 
                case "lixqah" : zbrzoneObj.golixqah();return true;  //兴趣爱好  
                case "gqzk" : zbrzoneObj.gogqzk();return true;  //感情状况  
            }
        }
    }
    zbrzoneObj.gotwoObj = function(){
        // localStorage.setItem("yhtxId", $('#yhtxUrl').attr('src'));
        console.log($('#USER_AGE').val())
        localStorage.setItem("yhxbId",$('#sp_man').html());
        if ($('#yhtxUrl').attr('src') == 'images/register/toux.png' || $('#yhtxUrl').attr('src') == '') {
            $.alertMsg('请選擇頭像');
            return false;
        }
        if ($('#sp_yhxm').html() == '響亮的名字' || $('#sp_yhxm').html() == '') {
            $.alertMsg('請輸入暱稱');
            return false;
        }
        if ($('#demo2').val() == '北京' || $('#demo2').val() == '') {
            $('#demo2').val('北京市')
            localStorage.setItem("szdId", '北京市');
        }
        if ($('#sp_xq').html() == '暫未填寫' || $('#sp_xq').html() == '') {
            $.alertMsg('請選擇興趣愛好')
            return false;
        }
        if ($('#USER_AGE').val() == '2001/06/26' || $('#USER_AGE').val() == '') {
            $.alertMsg('請選擇生日')
            return false;
        }
        
        if ($('#sp_gxqm').html() == '一條有個性的簽名' || $('#sp_gxqm').html() == '') {
            localStorage.setItem("gxqmId",'一條有個性的簽名')
        }
        if ($('#sp_man').html() == '女' || $('#sp_man').html() == '') {
            localStorage.setItem("yhxbId",'女')
        }
        if ($('#sp_gqzt').html() == '保密' || $('#sp_gqzt').html() == '') {
            localStorage.setItem("gqzkId",'保密')
        }
        zbrztwoObj.goBack = function(){
            zbrztwoObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj()
            });
        }
        
        zbrztwoObj.show(true,function(){
            zbrztwoObj.rzlabelObj(labeLists)
        });
    }

    zbrzoneObj.goportraits = function(){
        nextportraitObj.goBack = function(urls){
            nextportraitObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj(urls)
            });
            // console.log(urls)
        }
        nextportraitObj.show(true,function(){
            nextportraitObj.urlNam($('#yhtxUrl').attr('src'))
            // nextportraitObj.urlNam()
        });
    }
    zbrzoneObj.goliName = function(){
        nextNameObj.goBack = function(){
            nextNameObj.destroy();
            zbrzoneObj.show(true,function(){  
                zbrzoneObj.xinxiOBj()
            });
           
        }
        nextNameObj.show(true,function(){
            nextNameObj.nameObj($('#sp_yhxm').html())
        });
    }
    zbrzoneObj.gogxqm = function(){
        nextAutographObj.goBack = function(){
            nextAutographObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj()
            });
        }
        nextAutographObj.show(true);
    }
    zbrzoneObj.golixb = function(){
        nextGenderObj.goBack = function(tex){
            nextGenderObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj()
            });
        }
        nextGenderObj.show(true);
    }  
    zbrzoneObj.golixqah = function(){
        nextHobbyObj.goBack = function(obj){
            // console.log(obj)
            nextHobbyObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj()
            });
        }
        nextHobbyObj.show(true,function(){
            nextHobbyObj.hobList(hobbyList)
        });
    } 
    zbrzoneObj.gogqzk = function(){
        nextFeelingObj.goBack = function(tex){
            nextFeelingObj.destroy();
            zbrzoneObj.show(true,function(){
                zbrzoneObj.xinxiOBj()
            });
        }
        nextFeelingObj.show(true);
    }

    zbrzoneObj.xinxiOBj = function(urls){
        var userImgUrl = localStorage.getItem("userImgUrl")
        var yhtxs = localStorage.getItem("yhtxId")
        // console.log(yhtxs) 
        $('#yhtxUrl').attr('src',userImgUrl)
        var yhmcs = localStorage.getItem("yhmcId")
        $('#sp_yhxm').html(yhmcs)
        var gxqms = localStorage.getItem("gxqmId")
        $('#sp_gxqm').html(gxqms)
        var gqzks = localStorage.getItem("gqzkId")
        $('#sp_gqzt').html(gqzks)
        var yhxbs = localStorage.getItem("yhxbId")
        $('#sp_man').html(yhxbs) 
        var xqahs = localStorage.getItem("xqahId")
        $('#sp_xq').html(xqahs) 
        // zbrzoneObj.setItemObj()
        var szds = localStorage.getItem("szdId")
        // console.log(szds)
        $('#demo2').val(szds) 
        var yhsrs = localStorage.getItem("yhsrId")

        $('#USER_AGE').val(yhsrs) 
        if ($('#demo2').val() == '北京' || $('#demo2').val() == '') {
            $('#demo2').val('北京市') 
            localStorage.setItem("szdId", '北京市');
        }
        if ($('#yhtxUrl').attr('src') == 'images/register/toux.png' || $('#yhtxUrl').attr('src') == '') {
            $('#yhtxUrl').attr('src','images/register/toux.png')
            localStorage.setItem("yhtxId","images/register/toux.png")
        }
        if ($('#sp_gxqm').html() == '一條有個性的簽名' || $('#sp_gxqm').html() == '') {
            $('#sp_gxqm').html('一條有個性的簽名')
            localStorage.setItem("gxqmId",'一條有個性的簽名')
        }
        console.log($('#sp_man').html())
        if ($('#sp_man').html() == '女' || $('#sp_man').html() == '') {
            $('#sp_man').html('女') 
            localStorage.setItem("yhxbId",'女')
        }

        if ($('#sp_gqzt').html() == '保密' || $('#sp_gqzt').html() == '') {
            $('#sp_gqzt').html('保密')
            localStorage.setItem("gqzkId",'保密')
        }
    }
    /*zbrzoneObj.setItemObj = function(){ yhtxUrl
        console.log($('#demo2').val() + '这个是所在地') //gotwo
        localStorage.setItem("szdId", $('#demo2').val());
        localStorage.setItem("yhsrId", $('#USER_AGE').val());
    }*/

    zbrzoneObj.renhoObj = function(){ 
        console.log($('#USER_AGE').val())
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
            url : ConfigObj.localSite+'/anchor/authenticate',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                if(!obj.err){
                    obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    hobbyList  = obj.info.hobby_list
                    labeLists  = obj.info.label.data
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
    zbrzoneObj.onloadExecution = function(){
    	zbrzoneObj.createDomObj()
        zbrzoneObj.createEvent()
        zbrzoneObj.renhoObj()
        // zbrzoneObj.setItemObj()

    }
    zbrzoneObj.init = function(){
	 	zbrzoneObj.onloadExecution()
    }