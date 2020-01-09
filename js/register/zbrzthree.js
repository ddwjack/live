    var zbrzthreeObj = new PageController({
	   'name': 'zbrzthree',
	   'tpl' : 'template/register/zbrzthree.html'
    });
    zbrzthreeObj.createDomObj = function(){
    	this.ClickObj = $(".threeFan");
        this.hedsetObj = $("#zbrzthree") 
        this.butOkObj = $(".but_ok")// 
        this.loadbutObj = $('#uploali_img') 
        // this.spvidObj = $('#sp_vid_ed') 
        var xhr;//异步请求对象
        var ot; //时间
        var oloaded;//大小
        vidprcoUrl = ''
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                zbrzthreeObj.show();
            }
            signUpObj.show();
        })*/
    }
    zbrzthreeObj.submitlogin = function(onurl1,imgArr){ //登录 getUserInfo 
        // console.log(imgArr)
        var yhtxs = localStorage.getItem("yhtxId")
        var yhmcs = localStorage.getItem("yhmcId")
        var gxqms = localStorage.getItem("gxqmId")
        var gqzks = localStorage.getItem("gqzkId")
        var yhxbs = localStorage.getItem("yhxbId")
        var xqahs = localStorage.getItem("xqahId")
        var szds = localStorage.getItem("szdId")
        var yhsrs = localStorage.getItem("yhsrId")
        var typs = localStorage.getItem("typId")
        var rzbqs = localStorage.getItem("rzbqId")
        var jzhId = $('#in_jzh').val()
        // console.log(vidUrl)
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            nickname:yhmcs, //用户昵称
            avatar_url:yhtxs, //用户头像 
            craft:gxqms, //个性签名 
            sex:yhxbs, //性别 
            region:szds, //地区 
            hobby:xqahs, //爱好  
            birthday:yhsrs, //生日  
            emotion:gqzks, //情感  
            invitation_code:jzhId, //家族  
            mold:typs, //类型  
            label:rzbqs, //标签   
            cover_x:'', //横圖    
            cover_y:onurl1, //豎圖   
            images:imgArr, //照片墙     
            auth_video:vidUrl, //认证视频     
            handle:'after', //步骤 1是提交 0是默认
            poster:vidprcoUrl     
        }
        /*var yhtxs = localStorage.getItem("yhtxId")
        $('#yhtxUrl').attr('src',yhtxs)
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
        var szds = localStorage.getItem("szdId")
        console.log(szds)
        $('#demo2').val(szds) 
        var yhsrs = localStorage.getItem("yhsrId")
        $('#USER_AGE').val(yhsrs) */
        console.log(postData)
        // return false;
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/anchor/authenticate',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                if(obj.err == undefined){
                    // obj.info = $.parseJSON(Global.crypt(obj.suc));
                    // $.alertMsg(obj.suc)
                    $('.div_tk').show()
                    // localStorage.removeItem('yhtxId')
                    removeItemObj() // 删除缓存
                    zbrzoneObj.destroy()
                    zbrztwoObj.destroy()
                }else{
                    $.alertMsg(obj.err)
                    if (obj.code == '1000') {
                        tekenLOgin()
                    }
                    // token:ConfigObj.token  tekenLOgin()
                }
            },
            error : function(obj){
                alert('请求失败，请重新提交')
            }
        });
    }
    zbrzthreeObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            zbrzthreeObj.goBack()
        })
        this.butOkObj.unbind('tap').tap(function(){
            $('#onfile1,#file,#filevid').attr('disabled','disabled')
            event.stopPropagation()
            // $('#vidrz').attr('controls','false')
            Global.checkUpdate(1)
            mypageObj.show(true)
            $('.div_tk').hide(400)
            setTimeout(function(){
                $('#sec_renz').css('pointer-events', 'auto');
                Global.fixd()
            }, 400);
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            zbrzthreeObj.sectionEvent(e);
        });
        $('#sp_vid_ed').tap(function(){
            $('#sp_vid_ed').find('i.fl').toggleClass('i_but')
            var addt = $('#sp_vid_ed').find('i.fl')
            if ($(addt).hasClass('i_but')) {
                $('#vid_no_but').hide()
            }else{
                $('#vid_no_but').show()
            }
        })
        /*this.spvidObj.unbind('tap').tap(function(){

        })*/
        this.loadbutObj.unbind('tap').tap(function(e){
            var $input = $("#file");
            $input.on("change" , function(){
                // console.log(this)
                var files = this.files;
                chanrenz(files)
                var length = files.length;
                $.each(files,function(key,value){
                    var div = document.createElement("li"),
                        img = document.createElement("img");
                    div.className = "li_img_xg";
                    img.className = "img_xga";
                    var fr = new FileReader();
                    fr.onload = function(){
                        img.src=this.result;
                        div.appendChild(img);
                        $('#li_ul_Img').append(div);
                    }
                    fr.readAsDataURL(value);
                })

            })
            $input.removeAttr("id");
            var newInput = '<input class="uploadImg test" type="file" name="file" multiple id="file">';
        })
        /*$(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });*/
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.18)
        // console.log(imag)
        $('li.li_xc_img').css({"height":imag,"line-height":imag+'px'})
    }
    
    function ongepic(index) {
        // $('.div_log').show()
        gifJsonlive()
        // console.log($(this))
        var fileObj = document.getElementById("onfile"+index).files[0]; // js 获取文件对象
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
        var secretData = {
          'info' : Global.encrypt(postData),
          'file':fileObj
        };
        var form = new FormData();
        form.append("type", "video");                        // 可以增加表单数据
        // console.log(fileObj)
        form.append("file", fileObj);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // document.getElementById('onshows'+index).src= 'http://38.27.103.12'+obj.url
            // var urlimss = 'http://38.27.103.12'+obj.url
            localStorage.setItem("onurlId"+index, obj.url);
            $('#onshows'+index).addClass('img_sc')
            // $('.div_log').hide()
            gifNonelive()
        };
        xhr.send(form);

        var reads= new FileReader();
        f=document.getElementById("onfile"+index).files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            namUrl = this.result
            document.getElementById('onshows'+index).src=this.result;
            $('#onshows'+index).addClass('img_sc')
        }
    }
    
    function chanrenz(fileObj) {
        if ($('#li_ul_Img').find('li').length >= 8) {
            $('#uploali_img').find('input.loadImg').attr('type','')
            $.alertMsg('最多可傳9張圖片')
        }
        // $('.div_log').show()
        gifJsonlive()
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
        var form = new FormData();
        form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj[0]);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // console.log(obj.url)
            $('#p_li_Img').append('<span style="display:none;">'+ obj.url +'</span>')
            // $('.div_log').hide()
            gifNonelive()
        }
        xhr.send(form);
    }
    zbrzthreeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Asub" : zbrzthreeObj.goAsub();return true; //密码显示*
            }
        }
    }
    zbrzthreeObj.goAsub = function(){
        console.log(263)
        var onurl1 = localStorage.getItem("onurlId1")
        var spappen =  $('#p_li_Img').find('span')
        var arrImg = []
        for (var i = 0; i < spappen.length; i++) {
            var title = $(spappen[i]).html()
            arrImg[i] = title
        }
        var imgArr = arrImg.join(',')
        if (!$('#onshows1').hasClass('img_sc')) {
            $.alertMsg('請上傳認證圖片');
            return false;
        }
        console.log($('#li_ul_Img').find('li').length)
        if ($('#li_ul_Img').find('li').length==0) {
            $.alertMsg('請上傳相冊圖片');
            return false; 
        }
        console.log(videodai)
        // var videodai = 2
        if (videodai == '1') {
            // console.log($('#vidrz').attr('src'))
            if ($('#vidrz').attr('src') == '') {
                $.alertMsg('請上傳認證視頻');
                return false; 
            }else{

            }
        }else{
            var hacls = $('#sp_vid_ed').find('i').hasClass('i_but')
            if(hacls){
                vidUrl = ''
            }else{
                if ($('#vidrz').attr('src') == '') {
                    $.alertMsg('請上傳認證視頻');
                    return false; 
                }
            }
        }
        console.log(vidUrl)
        zbrzthreeObj.submitlogin(onurl1,imgArr)
        // $('.div_tk').show()
    }

    function UpladFile() {
        gifJsonlive()
        var fileObj = document.getElementById("filevid").files[0]; // js 获取文件对象
        if(fileObj.name){
            $(".el-upload-list").css("display","block");
            $(".el-upload-list li").css("border","1px solid #20a0ff");
            $("#videoName").text(fileObj.name);
            sub()
        }else{
            alert("请选择文件");
        }
    }
    function sub(){
        var fileObj = document.getElementById("filevid").files[0]; // js 获取文件对象
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
        var url = ConfigObj.localSite+"/common/upload"; // 接收上传文件的后台地址 
        var form = new FormData(); // FormData 对象
        form.append("file", fileObj);                           // 文件对象
        form.append("info", Global.encrypt(postData));  
        xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = uploadComplete; //请求完成
        xhr.onerror = uploadFailed; //请求失败
        xhr.upload.onprogress = progressFunction; //【上传进度调用方法实现】
        xhr.upload.onloadstart = function() { //上传开始执行方法
            ot = new Date().getTime(); //设置上传开始时间
            oloaded = 0; //设置上传开始时，以上传的文件大小为0
        };
        xhr.send(form); //开始上传，发送form数据
    }

    function progressFunction(evt) { 
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if(evt.lengthComputable) {
            $(".el-progress--line").css("display","block");
            /*进度条显示进度*/
            $(".el-progress-bar__inner").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
            $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100)+"%");   
        }
        // var time = document.getElementById("time");
        var time = $('#time,#vid_sp_none');
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
        // time.innerHTML = '上传速度：' + speed + units + ',剩余时间：' + resttime + 's';
        $(time).html('上传：' + speed + units + ',剩余：' + resttime + 's')
        if(bspeed == 0)
            // time.innerHTML = '上传已取消';
            $(time).html('上传已取消')
    }

    function uploadComplete(evt) {
        //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
        if(evt.target.responseText){
            var info = JSON.parse(evt.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            urlimss = obj.domain
            // urlimss = ConfigObj.localSite.replace(/\/v3/, "")
            console.log(obj)
            // $('.div_log').hide() 
            vidUrl = obj.url
            gifNonelive()
            $('#im_vid_no,#filevid').hide()
            $('#vidrz').show()
            // $.alertMsg("上传成功！");
            $('#vidrz').attr('src',urlimss+vidUrl)
            // $('#vidrz').attr('src','images/video.mp4')
            var deoEle = document.getElementById('vidrz')
            deoEle.addEventListener("loadeddata", function(){
                var canvas = document.createElement("canvas");
                canvas.width = $(deoEle)[0].videoWidth ;
                canvas.height = $(deoEle)[0].videoHeight ;
                canvas.getContext('2d').drawImage(deoEle, 0, 0, canvas.width, canvas.height);
                imgSrc = canvas.toDataURL("image/png");
                // console.log(imgSrc)
                zbrzthreeObj.videoUrlObj(imgSrc)
                // $('#viddt').attr('poster',imgSrc)
            })
            /*var reads= new FileReader();
            fvid=document.getElementById('filevid').files[0];
            console.log(fvid)
            reads.readAsDataURL(fvid);
            reads.onload=function (e) {
                $('#vidrz').attr('src',this.result)
                $('#vidrz').attr('poster','images/my/video.png')*/
                // console.log(img.src)
                /*var videoEle = document.getElementById('vidrz')
                videoEle.addEventListener("loadeddata", function(){
                    var canvas = document.createElement("canvas");
                    canvas.width = 350 ;
                    canvas.height = 350 ;
                    canvas.getContext('2d').drawImage(videoEle, 0, 0, canvas.width, canvas.height);
                    imgSrc = canvas.toDataURL("image/png");
                    $('#vidrz').attr('poster',imgSrc)
                })*/
            // }
        }else{
            $.alertMsg("上传失败");
        }
    }
    //上传失败
    function uploadFailed(evt) {
        $.alertMsg("上传失败！");
    }
    zbrzthreeObj.viderequ = function(obj){
        videodai = obj
        if (obj == '1') {
            $('#sp_vid_ed').hide()
        }
    }
    zbrzthreeObj.videoUrlObj = function(url){
        console.log(449)
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:'anchor',
        }
        var secretData = {
            'info' : Global.encrypt(postData),
            'img':url
        };
        // console.log(secretData)
        $.ajax({
            url : ConfigObj.localSite+'/common/imageUpload',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
              if(obj.ok == true){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info)
                // postUrls =  
                vidprcoUrl = obj.info.url
                $('#vidrz').attr('poster',urlimss+obj.info.url)
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
    zbrzthreeObj.onloadExecution = function(){
    	zbrzthreeObj.createDomObj()
        zbrzthreeObj.createEvent()
    }
    zbrzthreeObj.init = function(){
	 	zbrzthreeObj.onloadExecution()
    }