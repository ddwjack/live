    var nextportraitObj = new PageController({
	   'name': 'nextportrait',
	   'tpl' : 'template/register/nextportrait.html'
    });
    nextportraitObj.createDomObj = function(){
    	this.ClickObj = $(".portraitFan");
        this.hedsetObj = $("#nextportrait") 
        this.butOkObj = $(".but_ok")// 
    }
    nextportraitObj.urlNam = function(obj){
        $('#show').attr('src',obj)  //  
    }
    nextportraitObj.createEvent = function(){
        // namUrl = 'images/register/toux.png'
        this.ClickObj.unbind('tap').tap(function(){
            // localStorage.setItem("yhtxId", $('#show').attr('src'));
            nextportraitObj.goBack()
        })
        this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            nextportraitObj.sectionEvent(e);
        });
        $("#saveportra").unbind('tap').tap(function(){
                // var urls = imageportas($imgs);
                /*namUrl = urls
                $("#show").attr('src',urls);
                // nextportraitObj.submitlogin(urls)
                localStorage.setItem("userImgUrl", urls);
                $('#portrCrop,#saveportra').hide()*/
        });
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.23)
        console.log(imag)
        $('.porti_li').css({"height":imag,"line-height":imag+'px'})
    }
    nextportraitObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Asub" : nextportraitObj.goAsub();return true; //密码显示*
            }
        }
    }
    nextportraitObj.goAsub = function(){
        $('.div_tk').show()
    }
    nextportraitObj.submitlogin = function(url){ 
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
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData),
          'img' : url
        };
        $.ajax({
            url : ConfigObj.localSite+'/common/imageUpload',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
              if(obj.ok == true){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info.url)
                gifNonelive()
                urlourl = ConfigObj.localSite.replace(/\/v2/, "")

                localStorage.setItem("userImgUrl", urlourl + obj.info.url);
                localStorage.setItem("yhtxId",obj.info.url);
              }else{
                $.alertMsg(obj.err)
                if (obj.code == '1000') {
                    tekenLOgin()
                }
              }
              }
        });
    }
    nextportraitObj.onloadExecution = function(){
    	nextportraitObj.createDomObj()
        nextportraitObj.createEvent()
        nextportraitObj.imgjiet()
        // nextportraitObj.submitlogin()
    }
    nextportraitObj.init = function(){
	 	nextportraitObj.onloadExecution()
    }

    nextportraitObj.imgjiet = function(){
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
                document.getElementById('filetg').addEventListener("change", t.handleFiles, false);

                document.getElementById('save_button').onclick = function() {
                    t.editPic.height = t.sHeight;
                    t.editPic.width = t.sWidth;
                    var ctx = t.editPic.getContext('2d');
                    var images = new Image();
                    images.src = t.imgUrl;

                    images.onload = function(){
                        ctx.drawImage(images,t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth); 
                        document.getElementById('show_pic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
                        // console.log(t.editPic.toDataURL())
                        nextportraitObj.submitlogin(t.editPic.toDataURL())
                    }
                    $('#portatouxa').hide()
                };
            },

            handleFiles: function() {
                $('#portatouxa').show()
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


                document.getElementById('show_edit').style.background = 'url(' + t.imgUrl + ')' + -t.sx + 'px ' + -t.sy + 'px no-repeat';
                document.getElementById('show_edit').style.height = t.sHeight + 'px';
                document.getElementById('show_edit').style.width = t.sWidth + 'px';
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
                    
                    /*if ( t.ex + (pageX - startX) < 0 ) {
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
                    t.cutImage()*/
                });
            }
        }
        postFile.init();
    }