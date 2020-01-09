    var publishObj = new PageController({
	   'name': 'Publish',
	   'tpl' : 'template/dynamic/Publish.html'
    });
    publishObj.createDomObj = function(){
    	this.ClickObj = $(".pubFan");
        this.hedsetObj = $("#publish") 
        this.uploadImg = $('#uploadImgBtn')
        var imag = Math.floor((document.documentElement.clientWidth )/2)
        $('.hebfb').css('height',imag)
        $('.diNul').css('height',imag)
        vidprcoUrl = ''
        
    }

    
    publishObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            publishObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            publishObj.goBack()
        })
        this.uploadImg.unbind('tap').tap(function(){
            // console.log(25)
            if (!$('#imgFild').hasClass('Aimg_src')) {
                $.alertMsg('请先上传封面图片');
                return false;
            }else{
                var $input = $("#file");
                var imgLenth = $('#p_noneImg').find('span').length
                $input.on("change" , function(){ // li_usImg  uploadImgBtn
                    gifJsonlive()
                    var files = this.files;
                    var length = files.length;
                    var imgLenth = $('#p_noneImg').find('span').length
                    if (length == '0') {
                        gifNonelive()
                        return false;
                    }
                    pubsubvid(files)
                    // $('#uploadImgBtn').hide()
                    // $('#pubAvid').attr('data-l','video')
                    // $('#uploadImgBtn').find('input').attr('disabled','disabled')
                })
            }
        })
    }
    /*$(window).resize(function(){
        var docheight = $(window).height();  
        if(docheight < windheight){           
            $(".div_inp_alt").css("position","absolute");
            // $(".div_inp_alt").css("position","static");
        }else{
            $(".div_inp_alt").css("position","fixed");
        }           
    });*/
    function onpenImg(index) {
        gifJsonlive()
        // console.log(ConfigObj.localSite)
        var fileObj = document.getElementById("inpfil").files[0]; // js 获取文件对象
        var FileController = ConfigObj.localSite+"/common/upload";                    // 接收上传文件的后台地址
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'anchor'
        }
        var form = new FormData();
        // form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            // console.log(obj.currentTarget.response)
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // localStorage.setItem("onuId1", obj.url);
            imgPraYs = obj.url
            var reads= new FileReader();
            fvid=document.getElementById('inpfil').files[0];
            console.log(fvid)
            reads.readAsDataURL(fvid);
            reads.onload=function (e) {
                $('#imgFild').attr('src',this.result)
                $('#imgFild').addClass('Aimg_src')
                $.alertMsg('上传成功')
                $('#file').attr('type','file')
                // $('#im_fm').hide().siblings('#onsh1').show()
                gifNonelive()
            }
        };
        xhr.send(form);
    }
    publishObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Asubfs" : publishObj.AsubfsObj(thisObj);return true; //發送動態 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "upd" : this.updateType(thisObL);return true; //* 
                case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //* 

            }
        }
    }
    publishObj.AsubfsObj = function(obj){
        // var thisL = obj.attr('data-l')
        // var spappen =  $('#p_noneImg').find('span')
        var teval = $('.sec_pubil').find('textarea#text_gxqm').val()
        if (teval == '') {
            $.alertMsg('請輸入內容');
            return false;
        }
        console.log($('#viddt').attr('src'))
        console.log($('#imgFild').hasClass('Aimg_src'))
        if (!$('#imgFild').hasClass('Aimg_src')) {
            $.alertMsg('请上传封面图片');
            return false;
        }
        if (!$('#viddt').hasClass('vidSrc')) {
            $.alertMsg('请上传视频');
            return false;
        }
        console.log(teval)
        // console.log(imgPraYs)
        publishObj.goupdynamic(teval,imgPraYs,vidUrls)
    }
    publishObj.goupdynamic = function(tex,img,vid){
        gifJsonlive()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            message:tex,
            images:'',
            video:vid,
            poster:img
        }
        console.log(postData)
        // return false;
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/add_enclosure', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // gifJsonlive()
                if (res.err == undefined) {
                        $.alertMsg(res.suc) 
                        gifNonelive()
                        publishObj.goBack(true)
                    // },9000)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                }
            }
        })
    }
    publishObj.goxxi = function(obj){
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            publishObj.show(true);
            Global.fixd()
        }
        userdetailsObj.show(true);
    }

    function pubsubvid(fiObj){
        var fileObj = fiObj[0]; // js 获取文件对象
        console.log(fileObj)
        if(fileObj==undefined||fileObj==""){
            alert("请选择文件!");
            return false;
        };
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:'anchor'
        }
        var secretData = {
            'info' : Global.encrypt(postData),
            'file' : fileObj
        };
        var url = ConfigObj.localSite+"/common/upload"; // 接收上传文件的后台地址 
        var form = new FormData(); // FormData 对象
        form.append("file", fileObj);                           // 文件对象
        form.append("info", Global.encrypt(postData));  
        xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = pubupComplete; //请求完成
        xhr.onerror = pubupFailed; //请求失败
        xhr.upload.onprogress = progressFuncpub; //【上传进度调用方法实现】
        xhr.upload.onloadstart = function() { //上传开始执行方法
            ot = new Date().getTime(); //设置上传开始时间
            oloaded = 0; //设置上传开始时，以上传的文件大小为0
        };
        xhr.send(form); //开始上传，发送form数据
    }
    function progressFuncpub(evt) { 
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if(evt.lengthComputable) {
        }
        var timepub = document.getElementById("times");
        var timepub = $('#times,#fottimes');
        var nt = new Date().getTime(); //获取当前时间
        var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
        ot = new Date().getTime(); //重新赋值时间，用于下次计算
        var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b 
        oloaded = evt.loaded; //重新赋值已上传文件大小，用以下次计算
        //上传速度计算
        var speed = perload / pertime; //单位b/s
        var bspeed = speed;
        var units = 'b/s'; //单位名称
        if(speed / 1024 > 1) {
            speed = speed / 1024;
            units = 'k/s';
        }
        if(speed / 1024 > 1) {
            speed = speed / 1024;
            units = 'M/s';
        }
        speed = speed.toFixed(1);
        //剩余时间
        var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
        // timepub.innerHTML = '上传速度：' + speed + units + ',剩余时间：' + resttime + 's';
        $(timepub).html('上传：' + speed + units + ',剩余：' + resttime + 's')
        if(bspeed == 0)
        $(timepub).html('上传已取消')
            // timepub.innerHTML = '上传已取消';
    }

    function pubupComplete(evt) {
        //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
        if(evt.target.responseText){
            $.alertMsg("上传成功");
            console.log(evt)
            var info = JSON.parse(evt.target.responseText)
            console.log(info)
            if (info.err) {
                $.alertMsg(info.err)
                gifNonelive()
                return false;
            }
            var obj = $.parseJSON(Global.crypt(info.result))
            urloca = ConfigObj.localSite.replace(/\/v3/, "")
            gifNonelive()
            vidUrls = obj.url
            console.log(imgPraYs)
            // imgPraYs
            $('#viddt').show(urloca)
            $('#viddt').attr('src',urloca+vidUrls)
            $('#viddt').attr('poster',urloca+imgPraYs)
            $('#viddt').addClass('vidSrc')

        }else{
            $.alertMsg("上传失败");
        }
    }
    //上传失败
    function pubupFailed(evt) {
        $.alertMsg("上传失败！");
    }
    publishObj.onloadExecution = function(){
    	publishObj.createDomObj()
        publishObj.createEvent()
    }
    publishObj.init = function(){
	 	publishObj.onloadExecution()
    }