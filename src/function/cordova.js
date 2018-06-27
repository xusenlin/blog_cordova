import MintUi from 'mint-ui'

let Func = {
    exit: function () {
        navigator.app.exitApp();
    },
    backButtonEvent: function () {
        document.addEventListener("backbutton", Func.onBackKeyDown, false);
    },
    onBackKeyDown: function () {
        Func.toast('再按一次退出','bottom',-200);
        document.removeEventListener("backbutton", Func.onBackKeyDown, false); // 注销返回键
        document.addEventListener("backbutton", Func.exit, false);//绑定退出事件
        // 3秒后重新注册
        let intervalID = window.setInterval(function() {
            window.clearInterval(intervalID);
            document.removeEventListener("backbutton", Func.exit, false); // 注销返回键
            document.addEventListener("backbutton", Func.onBackKeyDown, false); // 返回键
        }, 2500);
    },
    toast: function (message,position,addPixelsY) {

        addPixelsY = addPixelsY ? addPixelsY : 0;
        if(!Func.isCordova()){
            MintUi.Toast({
                message: message,
                position: 'bottom',
                duration: 500
            });
        }
        else {
            window.plugins.toast.showWithOptions({
                message: message,
                duration: 2000, // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                position: position,
                addPixelsY: addPixelsY, // added a negative value to move it up a bit (default 0)
                styling: {
                    opacity: 0.8, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                    textSize: 13, // Default is approx. 13.
                    horizontalPadding: 50, // iOS default 16, Android default 50
                    verticalPadding: 30 // iOS default 12, Android default 30
                }
            });
        }

    },
    alert: function (title,message) {
        if (navigator.notification) {
            navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    title, // title
                    '确定'        // buttonName
            );
        }else {
            MintUi.MessageBox.alert(message, title);

        }
    },
    isCordova: function () {
        return __CORDOVA__;
    },
    statusBar: function (color) {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString(color);
        }
    }
};

export default Func;
