    var nextGenderObj = new PageController({
	   'name': 'nextGender',
	   'tpl' : 'template/register/nextGender.html'
    });
    nextGenderObj.createDomObj = function(){
    	this.ClickObj = $(".genFan");
        this.hedsetObj = $("#nextGender")  
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextGenderObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextGenderObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextGenderObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextGenderObj.sectionEvent(e);
        });
    }
    nextGenderObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "xbqued" : nextGenderObj.goxbqued(thisObj);return true; //密码显示*   
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "li_xzxb" : nextGenderObj.goxbzb(thisObj);return true; //密码显示*   
            }
        }
    }
    nextGenderObj.goxbqued = function(obj){
        var gensd = $('li.li_active').attr('data-x')
        if ($('.genFan').attr('data-l') == '2') {
            var arrNm = {'sex':gensd}
            Global.usNoetu(arrNm,nextGenderObj)
        }else{
            localStorage.setItem("yhxbId", gensd);
            nextGenderObj.goBack()
        }
    }
    nextGenderObj.goxbzb = function(obj){
        obj.addClass('li_active').siblings().removeClass('li_active')
        // gande = obj.attr('data-x')
    }
    
    nextGenderObj.onloadExecution = function(){
    	nextGenderObj.createDomObj()
        nextGenderObj.createEvent()
        // nextGenderObj.submitlogin()
    }
    nextGenderObj.init = function(){
	 	nextGenderObj.onloadExecution()
    }