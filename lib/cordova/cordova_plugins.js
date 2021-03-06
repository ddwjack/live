cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [

    {
        "file": "plugins\\org.apache.cordova.core.device\\www\\device.js",
        "id": "org.apache.cordova.core.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.device-motion\\www\\Acceleration.js",
        "id": "org.apache.cordova.device-motion.Acceleration",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.device-motion\\www\\accelerometer.js",
        "id": "org.apache.cordova.device-motion.accelerometer",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.network-information\\www\\network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.network-information\\www\\Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.vibration\\www\\vibration.js",
        "id": "org.apache.cordova.vibration.notification",
		//"merges" : [
//            "navigator.notification"
//        ]  //zhangw todo 
		"merges" : [
            "navigator.notification"
        ]
    } 
	 
]
});