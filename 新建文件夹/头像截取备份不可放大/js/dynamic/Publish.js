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
            var $input = $("#file");
            $input.on("change" , function(){ // li_usImg  uploadImgBtn
                gifJsonlive()
                var files = this.files;
                var length = files.length;
                console.log(files)
                if (length == '0') {
                    gifNonelive()
                    return false;
                }
                replapub = files[0].type.substring(0,5)
                console.log(replapub)
                if (replapub == 'image') {
                    $('#uploadImgBtn').find('input').attr('accept','image/*')
                    $.each(files,function(key,value){
                    chanpubils(files)
                        var div = document.createElement("li"),
                            img = document.createElement("img");
                        div.className = "liColo center";
                        var fr = new FileReader();
                        fr.onload = function(){
                            img.src=this.result;
                            div.appendChild(img);
                            $('#li_usImg').append(div);
                        }
                        fr.readAsDataURL(value);
                    })

                    $input.removeAttr("id");
                    var newInput = '<input class="uploadImg test" type="file" accept="image/*" name="file" multiple id="file">';
                    $('#pubAvid').attr('data-l','image')
                }else{
                    pubsubvid(files)
                    $('#uploadImgBtn').hide()
                    $('#pubAvid').attr('data-l','video')
                    $('#uploadImgBtn').find('input').attr('disabled','disabled')
                }
            })
        })
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
        var thisL = obj.attr('data-l')
        var spappen =  $('#p_noneImg').find('span')
        var teval = $('.sec_pubil').find('textarea#text_gxqm').val()
        var imgAr = ''
        var vids = ''
        if (teval == '') {
            $.alertMsg('請輸入內容');
            return false;
        }
        if (thisL == 'video') {
            if (spappen.length == 0) {
                $.alertMsg('視頻正在上傳中')
                return false;
            }else{
                var vids = $(spappen).html()
            }
        }else{
            var arrImg = []
            for (var i = 0; i < spappen.length; i++) {
                var title = $(spappen[i]).html()
                arrImg[i] = title
            }
            var imgAr = arrImg.join(',')
        }
        publishObj.goupdynamic(teval,imgAr,vids)
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
            images:img,
            video:vid,
            poster:vidprcoUrl
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
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    // setTimeout(function(){
                        $.alertMsg(res.suc) 
                        gifNonelive()
                        publishObj.goBack(true)
                    // },9000)
                }else{
                    $.alertMsg(res.err) 
                    if (res.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
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

    function chanpubils(fileObj) {
        vidprcoUrl = ''
        var FileController = ConfigObj.localSite+"/common/upload";                    // 接收上传文件的后台地址
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:'anchor'
        }
        console.log(postData)
        var form = new FormData();
        form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj[0]);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            gifNonelive()
            // console.log(obj.url)
            $('#p_noneImg').append('<span style="display:none;">'+ obj.url +'</span>')
        }
        xhr.send(form);
    }
    function pubsubvid(fiObj){
        var fileObj = fiObj[0]; // js 获取文件对象
        if(fileObj==undefined||fileObj==""){
            alert("请选择文件");
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
        // alert(ConfigObj.localSite)
        // console.log(postData)
        // return false;
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
            // $(".el-progress--line").css("display","block");
            /*进度条显示进度*/
            // $(".el-progress-bar__inner").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
            // $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100)+"%");   
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
        // $.alertMsg(1)
        // console.log(evt)
        //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
        if(evt.target.responseText){
            $.alertMsg("上传成功");
            console.log(evt)
            // alert(evt.target.responseText)
            var info = JSON.parse(evt.target.responseText)
            console.log(info)
            var obj = $.parseJSON(Global.crypt(info.result))
            urloca = ConfigObj.localSite.replace(/\/v2/, "")
            // localStorage.setItem("onurlId"+index, obj.url);
            gifNonelive()
            vidUrl = obj.url
            $('#viddt').show(urloca)
            // $.alertMsg(urloca);
            $('#viddt').attr('src',urloca+vidUrl)
            // $('#viddt').attr('src','images/video.mp4')
            // $('#viddt').attr('poster','images/my/videoX.png')
            $('#p_noneImg').append('<span style="display:none;">'+ obj.url +'</span>')
                    var videoEle = document.getElementById('viddt')
                    videoEle.addEventListener("loadeddata", function(){
                        var canvas = document.createElement("canvas");
                        canvas.width = $(videoEle)[0].videoWidth ;
                        canvas.height = $(videoEle)[0].videoHeight ;
                        canvas.getContext('2d').drawImage(videoEle, 0, 0, canvas.width, canvas.height);
                        imgSrc = canvas.toDataURL("image/png");
                        // console.log(imgSrc)
                        publishObj.videoUrlObj(imgSrc)
                        // $('#viddt').attr('poster',imgSrc)
                    })
            /*var videoEle = document.getElementById('viddt')
            videoEle.addEventListener("loadedmetadata", function(){
                console.log($('#viddt'))
                console.log($('#viddt')[0].clientHeight)
                console.log($('#viddt')[0].clientWidth)
                if ($('#viddt')[0].clientHeight < $('#viddt')[0].clientWidth) {
                    // $(videoEle).attr('poster','')
                    var posUrl = 'images/my/video.png'
                    console.log(1)
                }else{
                    // $(videoEle).attr('poster','images/my/videoX.png')
                    var posUrl = 'images/my/videoX.png'
                }
                $(videoEle).attr('poster',posUrl)
            })*/
        }else{
            $.alertMsg("上传失败");
        }
    }
    //上传失败
    function pubupFailed(evt) {
        $.alertMsg("上传失败！");
    }
    publishObj.videoUrlObj = function(url){
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:'anchor',
        }
        var secretData = {
            'info' : Global.encrypt(postData),
            'img':url
        };
        $.ajax({
            url : ConfigObj.localSite+'/common/imageUpload',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
              if(obj.ok == true){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info)
                vidprcoUrl = obj.info.url
                $('#viddt').attr('poster',urloca+obj.info.url)
                gifNonelive()
                // localStorage.setItem("yhtxId",obj.info.url);
              }else{
                $.alertMsg(obj.err)
                if (obj.code == '1000') {
                    tekenLOgin()
                }
              }
              }
        });
    }
    publishObj.onloadExecution = function(){
    	publishObj.createDomObj()
        publishObj.createEvent()
    }
    publishObj.init = function(){
	 	publishObj.onloadExecution()
    }