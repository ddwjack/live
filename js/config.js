if (ConfigObj) {
    ConfigObj.local = false;

    ConfigObj.appName = 'kedoushipin';
    ConfigObj.appEnname = '';
    ConfigObj.version = '1.0.0';	//内核版本（HTML、JS）
    ConfigObj.umengChannel = '';		//从app获取
    ConfigObj.appVersionCode = '';	//app的版本代码( ios ?)
    ConfigObj.appVersionName = '';	//app的版本名称( ios ?)
	ConfigObj.stationId='';			//从app获取
    ConfigObj.tel = "400 855 0921";
    ConfigObj.wx = "";
    ConfigObj.qq = "";
    ConfigObj.pot = "";
	ConfigObj.a1 = "";
	ConfigObj.a2 = "";
	ConfigObj.display = true;
	ConfigObj.last_time = 3; //登录错误次数
    var anchor_id = localStorage.getItem("anchor_id")
    // ConfigObj.uesId = 1;  //
    // ConfigObj.meId = 107;
    if (anchor_id ==null) {
        ConfigObj.meId = 1;  
        // ConfigObj.meId = 1;  
    }else{
        ConfigObj.meId = anchor_id;  
    }
    ConfigObj.anchor = '';   //房间号
    // ConfigObj.IManch = '';   //登录im的账号 未启用
    ConfigObj.mename = '';   //名字
    ConfigObj.iVpn = true;
    ConfigObj.iphon = '';
    ConfigObj.token = '2e868802-e660-4ef0-9eb6-147571dc95ff'
    ConfigObj.status = '' //是否认证
    ConfigObj.satype = '' //认证状态
    ConfigObj.mypice = '' //头像 
    // 分享暂未用
    ConfigObj.share_url = '' //分享地址 
    ConfigObj.share = '' //分享文字 暂时未用了
    ConfigObj.dowand = '' // 分享保存的地址
    ConfigObj.messag = '' // 分享出去的文字与地址
    // 分享暂未用
    ConfigObj.rules = '' // 主播是否可提现 
    ConfigObj.profi = '' // 推广收益 promote_profit

    //  这两处ios未添加对应的方法
    ConfigObj.bind_code = 'fH231089' //推广标识 getMyInviteCode
    ConfigObj.from_role = 'anchor' //分享来源角色anchor/user  getMyInviteRole

    
    // 正式环境接口 
    /*ConfigObj.zdid = 'JIXDDBIN238QFMNU'; //正式
    ConfigObj.appkey = 'ODSF6YTW-FCJQ-PQMUJOGHG507Z'; // 正式
    ConfigObj.localSite = 'http://120.27.68.38:9001/v2';  //ip地址  */

    ConfigObj.zdid = 'Z0635F8CEMOGQKAY'; //正式
    // ConfigObj.appkey = '480VLS-8KE2-AW5H-G6QI-5NJTHR'; // 正式
    ConfigObj.appkey = '1XV24F-WSF8-14HU-WSV1-BMQLI1'; // 测试
    // ConfigObj.localSite = 'https://jk.appjkou.xyz/v2';  //ip地址  
    ConfigObj.localSite = 'https://api.dianying4.xyz/v3';  //ip地址  
    // ConfigObj.localSite = 'https://api.sgdd02.com/v2';  //ip地址  

    ConfigObj.appDLUrl = ""; // 下载页

    ConfigObj.Iemid = '86339079994'
    ConfigObj.appDLUrl = ""; // 下载页
    if (ConfigObj.local) ConfigObj.localSite = 'p.js';
    if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
        ConfigObj.umengChannel = android_obj.getUmengChannel();	//友盟ID
        ConfigObj.version = android_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.stationId = android_obj.getStationId();
        ConfigObj.zdid = android_obj.getStationId();
        ConfigObj.Iemid = android_obj.getIMEI();
        ConfigObj.token = android_obj.getToken()
        ConfigObj.bind_code = android_obj.getMyInviteCode()
        ConfigObj.from_role = android_obj.getMyInviteRole()
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                ConfigObj.localSite = ''
            }else{
                ConfigObj.localSite = android_obj.getDoName();
            }
        ConfigObj.meId = android_obj.getUserID();
        ConfigObj.appkey = android_obj.getChannelKey();
        // ConfigObj.hrefSite = android_obj.getVideoName();//域名
    } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
        ConfigObj.umengChannel = ios_obj.getUmengChannel(); //友盟ID
        ConfigObj.version = ios_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.localSite = ios_obj.getVideoName();//域名
        ConfigObj.zdid = ios_obj.getStationId(); //1
        ConfigObj.Iemid = ios_obj.Iemid();
        ConfigObj.meId = ios_obj.getUserID(); //1
        ConfigObj.appkey = ios_obj.getChannelKey();//1   
        ConfigObj.token = ios_obj.getToken()
    }   
}
