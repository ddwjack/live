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
            var $input = $("#file");
            $input.on("change" , function(){
                console.log(this)
                var files = this.files;
                chansunb(files)
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
            console.log(obj.url)
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
            }
        }
    }
    mymodifyObj.goAsub = function(){
      
    }
    mymodifyObj.xgrzObj = function(res,typ){
        leityp = typ
        // console.log(res)
        // console.log(typ)
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
        if (myvideo != undefined) {
            $('#im_vid_xg').hide().siblings('#video_xiug').show()
            $('#video_xiug').attr('src',myvideo)
            $('#video_xiug').attr('poster',vidpicUrl)
            $('#video_xiug').attr('controls','false')
        }
        if (imgArrY != undefined) {
            var imgaGes = res.info.images.split(',')
            $('#xgportr').attr('src',imgPran)
            $('#onsh1').attr('src',imgPraY)
            // $('#onsh2').attr('src',imgPraY)
            if (imgaGes != '') {
                if (imgaGes.length =='1' && imgaGes == '') {
                    $('#li_anchImg').html('<li class="li_img_xg"><img class="img_xga" src="'+ res.images +'" alt="#"></li>')
                    // $('#p_noImg').html('<span></span>')
                    $('#p_noImg').append('<span style="display:none;">'+ res.images +'</span>')
                }else{
                    var html = ''
                    var htm2 = ''
                    for (var i = 0; i < imgaGes.length; i++) {
                        html += '<li class="li_img_xg"><img class="img_xga" src="'+ imgaGes[i] +'" alt="#"></li>'
                        htm2 += '<span style="display:none;">'+ imgaGes[i] +'</span>'

                    }
                    $('#p_noImg').append(htm2)
                    $('#li_anchImg').html(html)
                }
            }
        }
    }
    mymodifyObj.submitlogin = function(url){ 
        gifJsonlive()
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
                gifNonelive()
                imgPran = obj.info.url
              }else{
                $.alertMsg(obj.err)
                if (obj.code == '1000') {
                    tekenLOgin()
                }
              }
              }
        });
    }
    mymodifyObj.myxuigai = function(){
        // console.log(leityp)
        if (videoRequired == '1') {
            if ($('#video_xiug').attr('src') == '') {
                $.alertMsg('請上傳視頻');
                return false; 
            }
        }else{
            var hacls = $("#i_xcsub").find('i.i_wei').hasClass('i_but')
            if(!hacls){
                vidUrl = ''
            }else{
                if ($('#video_xiug').attr('src') == '') {
                    $.alertMsg('請上傳視頻');
                    return false; 
                }
            }
        }
        var spappen =  $('#p_noImg').find('span')
        // var imgPraX = localStorage.getItem("onuId1")
        // var imgPraY = localStorage.getItem("onuId1")
        var arImg = []
        for (var i = 0; i < spappen.length; i++) {
            // console.log(spappen[i])
            var title = $(spappen[i]).html()
            arImg[i] = title
        }
            var imgArrY = arImg.join(',')
        // console.log(imgPran)
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
        // console.log(postData)
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
            user_id:ConfigObj.meId,
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
            // localStorage.setItem("onurlId"+index, obj.url); p_li_Img
            // $('.div_log').hide()
            myvideo = obj.url
            vieoUrl = ConfigObj.localSite.replace(/\/v2/, "")
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
                // postUrls =  
                vidpicUrl = obj.info.url
                $('#video_xiug').attr('poster',vieoUrl+obj.info.url)
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
        var postFile = { 
            init: function() {
                var t = this;
                t.regional = document.getElementById('label');
                t.getImage = document.getElementById('get_image');
                t.editPic = document.getElementById('edit_pic');
                t.editBox = document.getElementById('cover_box');
                t.px = 0;    //background image x
                t.py = 0;    //background image y
                t.sx = 15;    //crop area x
                t.sy = 15;    //crop area y
                t.sHeight = 150;    //crop area height
                t.sWidth = 150    //crop area width 
                // document.getElementById('post_file').addEventListener("change", t.handleFiles, false);
                document.getElementById('filedify').addEventListener("change", t.handleFiles, false);

                document.getElementById('save').onclick = function() {
                    t.editPic.height = t.sHeight;
                    t.editPic.width = t.sWidth;
                    var ctx = t.editPic.getContext('2d');
                    var images = new Image();
                    images.src = t.imgUrl;

                    images.onload = function(){
                        ctx.drawImage(images,t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth); 
                        document.getElementById('divCrop').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
                        // console.log(t.editPic.toDataURL())
                        mymodifyObj.submitlogin(t.editPic.toDataURL())
                    }
                    $('#portatouxa,#save').hide()
                };
            },

            handleFiles: function() {
                $('#portatouxa,#save').show()
                var fileList = this.files[0];
                var oFReader = new FileReader();
                oFReader.readAsDataURL(fileList);
                oFReader.onload = function (oFREvent) { 
                    postFile.paintImage(oFREvent.target.result);
                };
            },

            paintImage: function(url) {
                var t = this;
                var createCanvas = t.getImage.getContext("2d");
                var img = new Image();
                img.src = url;
                img.onload = function(){
                    if ( img.width < t.regional.offsetWidth && img.height < t.regional.offsetHeight) {
                        t.imgWidth = img.width;
                        t.imgHeight = img.height;
                    } else {
                        var pWidth = img.width / (img.height / t.regional.offsetHeight);
                        var pHeight = img.height / (img.width / t.regional.offsetWidth);
                        t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
                        t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
                    }
                    t.px = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
                    t.py = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';
                    t.getImage.height = t.imgHeight;
                    t.getImage.width = t.imgWidth;
                    t.getImage.style.left = t.px;
                    t.getImage.style.top = t.py;

                    createCanvas.drawImage(img,0,0,t.imgWidth,t.imgHeight);
                    t.imgUrl = t.getImage.toDataURL();
                    t.cutImage(); 
                    t.drag();
                };
            },

            cutImage: function() {
                var t = this;
                t.editBox.height = t.imgHeight;
                t.editBox.width = t.imgWidth;
                t.editBox.style.display = 'block';
                t.editBox.style.left = t.px;
                t.editBox.style.top = t.py;

                var cover = t.editBox.getContext("2d");
                cover.fillStyle = "rgba(0, 0, 0, 0.5)";
                cover.fillRect (0,0, t.imgWidth, t.imgHeight);
                cover.clearRect(t.sx, t.sy, t.sHeight, t.sWidth);


                document.getElementById('show_edits').style.background = 'url(' + t.imgUrl + ')' + -t.sx + 'px ' + -t.sy + 'px no-repeat';
                document.getElementById('show_edits').style.height = t.sHeight + 'px';
                document.getElementById('show_edits').style.width = t.sWidth + 'px';
            },

            drag: function() {
                var t = this;
                var draging = '';
                var startX = 0;
                var startY = 0;
                t.editBox.addEventListener("touchstart",function(e){  
                    draging = true;
                    t.ex = t.sx; 
                    t.ey = t.sy;
                    startX = e.targetTouches[0].pageX - ( t.regional.offsetLeft + this.offsetLeft );
                    startY = e.targetTouches[0].pageY - ( t.regional.offsetTop + this.offsetTop );
                }); 
                t.editBox.addEventListener("touchmove",function(e){  
                    // e.preventDefault();  
                    // e.stopPropagation();  
                    var pageX = e.changedTouches[0].pageX - ( t.regional.offsetLeft + this.offsetLeft );
                    var pageY = e.changedTouches[0].pageY - ( t.regional.offsetTop + this.offsetTop );
                    // console.log(changeY + '坐標Y')
                    if ( t.ex + (pageX - startX) < 0 ) {
                        t.sx = 0;
                    } else if ( t.ex + (pageX - startX) + t.sWidth > t.imgWidth) {
                        t.sx = t.imgWidth - t.sWidth;
                    } else {
                        t.sx = t.ex + (pageX - startX);
                    };

                    if (t.ey + (pageY - startY) < 0) {
                        t.sy = 0;
                    } else if ( t.ey + (pageY - startY) + t.sHeight > t.imgHeight ) {
                        t.sy = t.imgHeight - t.sHeight;
                    } else {
                        t.sy = t.ey + (pageY - startY);
                    }
                    t.cutImage()
                }); 
                t.editBox.addEventListener("touchend",function(e){   
                    var pageX = e.changedTouches[0].pageX - ( t.regional.offsetLeft + this.offsetLeft );
                    var pageY = e.changedTouches[0].pageY - ( t.regional.offsetTop + this.offsetTop );
                    
                });
            }
        }
        postFile.init();
    }
