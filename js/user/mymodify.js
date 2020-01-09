    var mymodifyObj = new PageController({
	   'name': 'mymodify',
	   'tpl' : 'template/user/mymodify.html'
    });
    mymodifyObj.createDomObj = function(){
    	this.ClickObj = $(".modifyFan");
        this.hedsetObj = $("#mymodify") 
        this.butOkObj = $(".but_ok")// 
        this.loadsubObj = $("#uploadBtt")// video_xiug 
        this.videosubObj = $("#i_xcsub")// 是否上傳視頻 
    }
    mymodifyObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            mymodifyObj.goBack()
        })
        this.butOkObj.unbind('tap').tap(function(){
            mypageObj.show(true)
            $('.div_tk').hide()
            Global.fixd()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            mymodifyObj.sectionEvent(e);
        });
        this.videosubObj.unbind('tap').tap(function(){
            $("#i_xcsub").find('i.i_wei').toggleClass('i_but')
        })
        this.loadsubObj.unbind('tap').tap(function(e){
            if ($('#uploadBtt input.uploadImg').attr('type') == 'button') {
                $.alertMsg('最多可傳9張圖片')
            }
            var $input = $("#file");
            $input.on("change" , function(){
                // console.log(this)
                var files = this.files;
                chansunb(files)
                var length = files.length;
                $.each(files,function(key,value){
                    var div = document.createElement("li"),
                        A = document.createElement("a"),
                        img = document.createElement("img");
                    // div.getAttr = "li_xg"; 
                    $(A).attr('data-t','imgRemove')
                    div.className = "li_img_xg";
                    img.className = "img_xga";
                    var fr = new FileReader();
                    fr.onload = function(){
                        img.src=this.result;
                        div.appendChild(A);
                        div.appendChild(img);
                        $('#li_anchImg').append(div);
                    }
                    fr.readAsDataURL(value);
                })

            })
            $input.removeAttr("id");
            var newInput = '<input class="uploadImg test" type="file" name="file" multiple id="file">';
        })
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.18)
        // console.log(imag)
        $('li.li_xc_img').css({"height":imag,"line-height":imag+'px'})
    }
    
    function ongepicxg(index) {
        gifJsonlive()
        // console.log(ConfigObj.localSite)
        var fileObj = document.getElementById("onfi1").files[0]; // js 获取文件对象
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
        form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            // console.log(obj.currentTarget.response)
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // localStorage.setItem("onuId1", obj.url);
            imgPraY = obj.url
            var reads= new FileReader();
            fvid=document.getElementById('onfi1').files[0];
            console.log(fvid)
            reads.readAsDataURL(fvid);
            reads.onload=function (e) {
                $('#onsh1').attr('src',this.result)
                $('#onsh1').addClass('img_sc')
                // $('#im_fm').hide().siblings('#onsh1').show()
                gifNonelive()
            }
        };
        xhr.send(form);
    }

    function chansunb(fileObj) {
        if ($('#li_anchImg').find('li').length >= 8) {
            $('#uploadBtt').find('input.uploadImg').attr('type','')
            $.alertMsg('最多可傳9張圖片')
            // return false;
        }
        gifJsonlive()
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
        form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj[0]);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // console.log(obj.url)
            $('#p_noImg').append('<span style="display:none;">'+ obj.url +'</span>')
            gifNonelive()
        }
        xhr.send(form);
    }
    mymodifyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                case "myxuigai" : mymodifyObj.myxuigai();return true; 
                case "Asub" : mymodifyObj.goAsub();return true; //认证上传图片的 
                case "imgRemove" : mymodifyObj.imgRemoveObj(thisObj);return true; 
            }
        }
    }
    mymodifyObj.goAsub = function(){
      
    }
    mymodifyObj.imgRemoveObj = function(obj){
        // var thisI = obj.attr('data-i')
        $(obj).parent('li').remove()
        $('#uploadBtt input.uploadImg').attr('type','file')
    }
    mymodifyObj.xgrzObj = function(res,typ){
        leityp = typ
        videoRequired = res.video_required
        imgPran = res.info.avatar_url
        imgPraX = res.info.cover_x
        imgPraY = res.info.cover_y
        imgArrY = res.info.images
        myvideo = res.info.auth_video
        vidpicUrl = res.info.poster
        // myvideo = '' myvideo  vidpicUrl
        console.log(imgPraY)
        if (videoRequired == '1') {
            $('#i_xcsub').hide()
        }
        console.log(myvideo)
        if (myvideo != undefined) {
            if (myvideo != '') {
                $('#im_vid_xg').hide().siblings('#video_xiug').show()
                $('#video_xiug').attr('src',myvideo)
                $('#video_xiug').attr('poster',vidpicUrl)
                $('#video_xiug').attr('controls','false')
            }
        }
        if (imgArrY != '') {
            var imgaGes = res.info.images.split(',')
            $('#xgportr').attr('src',imgPran)
            $('#onsh1').attr('src',imgPraY)
            // console.log(imgaGes)
            if (imgaGes.length == '9') {
                $('#uploadBtt input.uploadImg').attr('type','button')
            }
            if (imgaGes != '') {
                if (imgaGes.length =='1' && imgaGes == '') {
                    $('#li_anchImg').html('<li class="li_img_xg"><a data-t="imgRemove" data-i="'+ i +'" href="javascript:void(0)"></a><img class="img_xga" src="'+ res.images +'" alt="#"></li>')
                    // $('#p_noImg').append('<span style="display:none;" data-i="'+ i +'">'+ res.images +'</span>')
                }else{
                    var html = ''
                    // var htm2 = ''
                    for (var i = 0; i < imgaGes.length; i++) {
                        html += '<li class="li_img_xg"><a data-t="imgRemove" data-i="'+ i +'" href="javascript:void(0)"></a><img class="img_xga" src="'+ imgaGes[i] +'" alt="#"></li>'
                        // htm2 += '<span style="display:none;" data-i="'+ i +'">'+ imgaGes[i] +'</span>'

                    }
                    // $('#p_noImg').append(htm2)
                    $('#li_anchImg').html(html)
                }
            }
        }
    }
    mymodifyObj.myxuigai = function(){
        console.log(videoRequired)
        if (videoRequired == '1') {
            if ($('#video_xiug').attr('src') == '') {
                $.alertMsg('請上傳視頻');
                return false; 
            }
        }else{
            var hacls = $("#i_xcsub").find('i.i_wei').hasClass('i_but')
            if(hacls){
                vidUrl = ''
            }else{
                if ($('#video_xiug').attr('src') == '') {
                    $.alertMsg('請上傳視頻');
                    return false; 
                }
            }
        }
        var spappen =  $('#li_anchImg').find('img')
        // var imgPraX = localStorage.getItem("onuId1")
        var arImg = []
        for (var i = 0; i < spappen.length; i++) {
            // console.log(spappen[i])
            // var title = $(spappen[i]).html()
            var title = $(spappen[i]).attr('src')
            arImg[i] = title
        }
            var imgArrY = arImg.join(',')
        console.log(imgArrY)
        // return false
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            nickname:'',
            avatar_url:imgPran,
            mold:leityp,
            cover_x:'',
            cover_y:imgPraY,
            images:imgArrY,
            auth_video:myvideo,
            handle:'after',
            poster:vidpicUrl
        } 
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/update_authenticate',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    $.alertMsg(res.suc) 
                    mypageObj.show(true)
                    Global.fixd()
                    // dynamicObj.centerObj(res.info)
                    // dynamicObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  dynamicObj.titlist
            }
        })
    }
    // 上传视频
    function xiugladFile() {
        gifJsonlive()
        var fileObj = document.getElementById("fixiugvid").files[0]; // js 获取文件对象
        if(fileObj.name){
            $(".el-upload-list").css("display","block");
            $(".el-upload-list li").css("border","1px solid #20a0ff");
            $("#videoName").text(fileObj.name);
            subxiuga()
        }else{
            alert("请选择文件");
        }
    }
    function subxiuga(){
        var fileObj = document.getElementById("fixiugvid").files[0]; // js 获取文件对象
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
        xhr.onload = uploadCompxiug; //请求完成
        xhr.onerror = uploadFaixiug; //请求失败
        xhr.upload.onprogress = xiugessFunction; //【上传进度调用方法实现】
        xhr.upload.onloadstart = function() { //上传开始执行方法
            ot = new Date().getTime(); //设置上传开始时间
            oloaded = 0; //设置上传开始时，以上传的文件大小为0
        };
        xhr.send(form); //开始上传，发送form数据
    }

    function xiugessFunction(evt) { 
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if(evt.lengthComputable) {
            $(".el-progress--line").css("display","block");
            /*进度条显示进度*/
            $(".el-progress-bar__inner").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
            $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100)+"%");   
        }
        // var time = document.getElementById("time");
        var time = $('#time_xiug,#vid_my_none');
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
        $(time).html('上传速度：' + speed + units + ',剩余时间：' + resttime + 's')
        if(bspeed == 0)
            // time.innerHTML = '上传已取消';
            $(time).html('上传已取消')
    }

    function uploadCompxiug(evt) {
        //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
        if(evt.target.responseText){
            var info = JSON.parse(evt.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            // var urlimss = 'http://38.27.103.12'+obj.url
            // localStorage.setItem("onurlId"+index, obj.url); imageUpload
            // $('.div_log').hide()
            myvideo = obj.url
            console.log(obj.domain)
            vieoUrl = obj.domain
            // vieoUrl = ConfigObj.localSite.replace(/\/v3/, "")
            console.log(vieoUrl)
            // $('#p_vid_ship').html('<span style="display:none">'+ obj.url +'</span>')
            $('#im_vid_xg,#fixiugvid').hide()
            $('#video_xiug').show()
            // $.alertMsg("上传成功了！");
            $('#video_xiug').attr('src',vieoUrl+myvideo)
            var deoEle = document.getElementById('video_xiug')
            deoEle.addEventListener("loadeddata", function(){
                var canvas = document.createElement("canvas");
                canvas.width = $(deoEle)[0].videoWidth ;
                canvas.height = $(deoEle)[0].videoHeight ;
                canvas.getContext('2d').drawImage(deoEle, 0, 0, canvas.width, canvas.height);
                imgSrc = canvas.toDataURL("image/png");
                // console.log(imgSrc)
                mymodifyObj.videoUrlObj(imgSrc)
                // $('#viddt').attr('poster',imgSrc)
            })
        }else{
            $.alertMsg("上传失败");
        }
    }
    //上传失败
    function uploadFaixiug(evt) {
        $.alertMsg("上传失败！");
    }
    mymodifyObj.videoUrlObj = function(url){
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
                vidpicUrl = obj.info.url
                $('#video_xiug').attr('poster',obj.info.domain+obj.info.url)
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
    mymodifyObj.onloadExecution = function(){
    	mymodifyObj.createDomObj()
        mymodifyObj.createEvent()
        mymodifyObj.imgjiet()
    }
    mymodifyObj.init = function(){
	 	mymodifyObj.onloadExecution()
    }

    mymodifyObj.imgjiet = function(){
        // alert(ConfigObj.localSite)  // 打包测试 去掉弹框打印 
        var relativeUrl= "/common/avatarUpload"; //你不要在后面加斜杠，系统会自动给你加上斜杠，不信看下面！   
        relativeUrl = relativeUrl.replace(/(^\s*)|(\s*$)/g, "");//去掉相对路径的所有空格
        relativeUrl === "" || (relativeUrl += "/");//在相对地址后面加斜框，不需要用户自己加
        var publicRelat= document.getElementById("relat");     //"relat"对像     
        var publicRelatImg=publicRelat.getElementsByTagName("img");  //"relat"下的两张图片对像   
        var Shear = new ShearPhoto;
        console.log(document.body.clientWidth)
        var clientWidthObj = document.body.clientWidth - 32
        Shear.config({
            relativeUrl:relativeUrl,  
            traverse:true,
            translate3d:false,  
            HTML5:true,
            HTML5MAX:clientWidthObj, 
            HTML5Quality:0.9, 
            HTML5FilesSize:50,     
            HTML5Effects:false,
            HTML5ZIP:[900,0.9],
            preview:false,
            url:ConfigObj.localSite+'/common/avatarUpload',  
            scopeWidth:clientWidthObj,                 //可拖动范围宽  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致  
            scopeHeight:clientWidthObj,                //可拖动范围高  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致      
            proportional:[1,100,133],   
            Min:50,                 
            Max:clientWidthObj,                
            backgroundColor:"#000",   //遮层色
            backgroundOpacity:0.6, //遮层透明度-数字0-1 可选
            Border:0,               //截框的边框大小 0代表动态边框。大于0表示静态边框，大于0时也代表静态边框的粗细值
            BorderStyle:"solid",    //只作用于静态边框，截框的边框类型，其实是引入CSS的border属性，和CSS2的border属性是一样的
            BorderColor:"#09F",  //只作用于静态边框，截框的边框色彩
            relat:publicRelat,              //请查看 id:"relat"对象 
            scope:document.getElementById("main"),//main范围对象 
            ImgDom:publicRelatImg[0],         //截图图片对象（小）  
            ImgMain:publicRelatImg[1],         //截图图片对象（大）
            black:document.getElementById("black"),//黑色遮层对象
            form:document.getElementById("smallbox"),//截框对象
            ZoomDist:document.getElementById("ZoomDist"),//放大工具条,可从HTML查看此对象，不作详细解释了
            ZoomBar:document.getElementById("ZoomBar"), //放大工具条，可从HTML查看此对象
            to:{
                BottomRight:document.getElementById("BottomRight"),//拉伸点中右
                TopRight:document.getElementById("TopRight"),//拉伸点上右，下面如此类推，一共8点进行拉伸,下面不再作解释
                Bottomleft:document.getElementById("Bottomleft"),
                Topleft:document.getElementById("Topleft"),
                Topmiddle:document.getElementById("Topmiddle"),
                leftmiddle:document.getElementById("leftmiddle"),
                Rightmiddle:document.getElementById("Rightmiddle"),
                Bottommiddle:document.getElementById("Bottommiddle")
            },
            Effects:document.getElementById("shearphoto_Effects") || false,
            DynamicBorder:[document.getElementById("borderTop"),document.getElementById("borderLeft"),document.getElementById("borderRight"),document.getElementById("borderBottom")],
            SelectBox:document.getElementById("SelectBox"),         //选择图片方式的对象
            Shearbar:document.getElementById("Shearbar"),          //截图工具条对象
            UpFun:function() {                   //鼠标健松开时执行函数
                Shear.MoveDiv.DivWHFun();   //把截框现时的宽高告诉JS    
            }
        });
        Shear.complete=function(serverdata) {//截图成功完成时，由shearphoto.php返回数据过来的成功包
            gifJsonlive()
            var sinfo = $.parseJSON(Global.crypt(serverdata.result));
            var point = this.arg.scope.childNodes[0];
            point.className === "point" && this.arg.scope.removeChild(point);
            var complete = document.createElement("div");
            complete.className = "complete";
            complete.style.height = this.arg.scopeHeight + "px";
            this.arg.scope.insertBefore(complete, this.arg.scope.childNodes[0]);
                console.log(sinfo)
                $('#xgportr').attr('src','images/register/toux.png')
                setTimeout(function () {
                    $('#xgportr').attr('src',sinfo.domain + sinfo.url)
                    gifNonelive()
                },3000)
                imgPran = sinfo.url
                // alert(imgPran)
                // console.log(ConfigObj.localSite.replace(/v2/g,'') + sinfo.url)
                $('#modifImage').find('input').hide()
                $('#LiCrop,#shearphoto_main').hide()
                // localStorage.setItem("yhtxId",sinfo.url);
                // localStorage.setItem("userImgUrl", sinfo.domain + sinfo.url);
            this.HTML5.EffectsReturn();
            this.HTML5.BOLBID   &&   this.HTML5.URL.revokeObjectURL(this.HTML5.BOLBID);
            var this_ = this;
            this_.preview.close_();
        }  
        // var photoalbum = document.getElementById("photoalbum");//相册对象
        var ShearPhotoForm = document.getElementById("myShearPhotoForms");//FORM对象
        ShearPhotoForm.UpFile.onclick=function(){return false}//一开始时先不让用户点免得事件阻塞
        var up = new ShearPhoto.frameUpImg({
            FORM:ShearPhotoForm,                         //FORM对象传到设置
           
            UpType:new Array("jpg", "jpeg", "png", "gif"),//图片类限制，上传的一定是图片，你就不要更改了
           HTML5:Shear.HTML5,                       //切匆改动这句，不然你他妈又问为什么出错
            HTML5FilesSize:Shear.arg.HTML5FilesSize,//切勿改动这句 如果是HTML5切图时，选择的图片不能超过 单位M，设太大话，如果客户端HTML5加截超大图片时，会卡爆的
            HTML5ZIP:Shear.arg.HTML5ZIP,      //切勿改动这句, 把压缩设置转移到这里
            erro:function(msg) {
                Shear.pointhandle(3e3, 10, msg, 0, "#f82373", "#fff");
            },
            fileClick:function(){//先择图片被点击时，触发的事件
                Shear.pointhandle(-1);//关闭提示，防止线程阻塞事件冒泡 againIMG
            },
            preced:function(fun) { //点击选择图，载入图片时的事件
                try{
                    photoalbum.style.display = "none"; //什么情况下都关了相册
                    camClose.onclick(); //什么情况下都关了视频
                }catch (e){console.log("在加载图片时，发现相册或拍照的对象检测不到，错误代码："+e);}
                Shear.pointhandle(0, 10, "正在为你加载图片，请你稍等哦......", 2, "#307ff6", "#fff",fun);
            }
        });
        up.run(function(data,True) {//upload.php成功返回数据后
            //alert(data);你可以调试一下这个返回包
            True ||  (data = ShearPhoto.JsonString.StringToJson(data));
            if (data === false) {
                Shear.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff",  true,true);
                return;
            }
            if (data["erro"]) {
                Shear.SendUserMsg("错误：" + data["erro"], 5e3, 0, "#f4102b", "#fff",  true,true);
                return;
            }
            Shear.run(data["success"],true);
        });
        Shear.addEvent(document.getElementById("saveShear"), "click", function() { //按下截图事件，提交到后端的shearphoto.php接收
            Shear.SendPHP({shearphoto:"我要传参数到服端",mingge:"我要传第二个参数到服务器"});
        });
        /*Shear.addEvent(document.getElementById("againIMG"), "click", function() {     //重新选择事件
           Shear.preview.close_();
           Shear.again();
           Shear.HTML5.EffectsReturn();
           Shear.HTML5.BOLBID   &&   Shear.HTML5.URL.revokeObjectURL(Shear.HTML5.BOLBID);
           Shear.pointhandle(3e3, 10, "已取消！重新选择", 2, "#fbeb61", "#3a414c");
        });*/
        var shearphoto_loading=document.getElementById("shearphoto_loading");
        var shearphoto_main=document.getElementById("shearphoto_main");
        shearphoto_loading && shearphoto_loading.parentNode.removeChild(shearphoto_loading);
        shearphoto_main.style.visibility="visible";
    }

    
