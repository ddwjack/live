    var nextHobbyObj = new PageController({
	   'name': 'nextHobby',
	   'tpl' : 'template/register/nextHobby.html'
    });
    nextHobbyObj.createDomObj = function(){
    	this.ClickObj = $(".hobFan");
        this.hedsetObj = $("#nextHobby") 
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextHobbyObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextHobbyObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextHobbyObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextHobbyObj.sectionEvent(e);
        });
        
    }
    nextHobbyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "hobqued" : nextHobbyObj.gohobqued(thisObj);return true; //密码显示*  
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "li_xqah" : nextHobbyObj.golxq(thisObj);return true; //密码显示*  
            }
        }
    }
    nextHobbyObj.hobList = function(res){
        var html = ''
        for (var i in res) {
            html += '<li data-t="li_xqah" data-v="'+ res[i] +'" class="li_bq "><span class="sp_bq">'+ res[i] +'</span></li>'
        }
        $('#hadLab').html(html)
    }
    nextHobbyObj.gohobqued = function(obj){
        var arr = []
        var thing = $('li.active')
        // var inVal = $('#in_xqah').val()
        console.log(thing)
        if (thing.length == 0) {
         $.alertMsg('請先選擇興趣愛好')   
         return false;
        }
        for (var i = 0; i < thing.length; i++) {
            var title = $(thing[i]).attr('data-v')
            arr[i] = title
        }
        var arrObj = arr.join(',')
        if ($('.hobFan').attr('data-l') == '2') {
            var arrNm = {'hobby':arrObj}
            Global.usNoetu(arrNm,nextHobbyObj)
        }else{
            localStorage.setItem("xqahId", arrObj);
            nextHobbyObj.goBack()
        }
    }
    nextHobbyObj.golxq = function(obj){
        obj.toggleClass('active')
        var thing = $('li.active')
        // console.log(thing)
        if (thing.length <= '3') {
            
        }else{
            $.alertMsg('只能选择三个')
            obj.removeClass('active')
            return false;
        }
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
    nextHobbyObj.onloadExecution = function(){
    	nextHobbyObj.createDomObj()
        nextHobbyObj.createEvent()
        // nextHobbyObj.hobList()
        // nextHobbyObj.submitlogin()
    }
    nextHobbyObj.init = function(){
	 	nextHobbyObj.onloadExecution()
    }