    var protocolObj = new PageController({
	   'name': 'protocol',
	   'tpl' : 'template/user/protocol.html'
    });
    protocolObj.createDomObj = function(){
    	this.ClickObj = $(".pro_fan");
        this.hedsetObj = $("#protoco")

        this.ClickObj.tap(function(e){ //返回
            protocolObj.goBack()
        })
    }

    protocolObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            protocolObj.sectionEvent(e);
        });
    }
    protocolObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol 
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : protocolObj.accountRecord();return true; //账户管理
            }
        }
    }

    protocolObj.onloadExecution = function(){
    	protocolObj.createDomObj()
        // protocolObj.createEvent()
    }
    protocolObj.init = function(){
	 	protocolObj.onloadExecution()
    }