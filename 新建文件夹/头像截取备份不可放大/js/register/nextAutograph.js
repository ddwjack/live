    var nextAutographObj = new PageController({
	   'name': 'nextAutograph',
	   'tpl' : 'template/register/nextAutograph.html'
    });
    nextAutographObj.createDomObj = function(){
    	this.ClickObj = $(".autoFan");
        this.hedsetObj = $("#nextAutograph") 
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextAutographObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextAutographObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextAutographObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextAutographObj.sectionEvent(e);
        });
        
    }
    nextAutographObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "autqued" : nextAutographObj.goautqued();return true; //密码显示*  
            }
        }
    }
    nextAutographObj.goautqued = function(){
        if ($('#text_gxqmrz').val() == '') {$.alertMsg('请填写您的个性签名');return false;}
        if ($('.autoFan').attr('data-l') == '2') {
            var arrNm = {'craft':$('#text_gxqmrz').val()}
            Global.usNoetu(arrNm,nextAutographObj)
        }else{
            localStorage.setItem("gxqmId", $('#text_gxqmrz').val());
            nextAutographObj.goBack()
        }
            // var gxqms = localStorage.getItem("gxqmId")
    }
    /*function changepic() {
        var reads= new FileReader();
        f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            console.log(this.result)
            document.getElementById('show').src=this.result;
        }
    }*/
    nextAutographObj.onloadExecution = function(){
    	nextAutographObj.createDomObj()
        nextAutographObj.createEvent()
        // nextAutographObj.submitlogin()
    }
    nextAutographObj.init = function(){
	 	nextAutographObj.onloadExecution()
    }