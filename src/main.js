import Vue from 'vue'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/fonts/iconfont.css'


import router from './router'
import Config from './config'
import Api from './api'
import Func from './function'

import App from './App.vue';

Vue.prototype.$Api = Api;
Vue.prototype.$Config = Config;
Vue.prototype.$Func = Func;

Vue.use(MintUi);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName;

    // if (!localStorage.getItem(Config.tokenKey) && to.path != '/login') {
    //   next({path: '/login'});
    // } else {
    //   next();
    // }
    next();
});

window.globalBus = new Vue();

if (!Func.isCordova()) {

    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });

} else {

    document.addEventListener('deviceready', function () {//设备加载完成
        Func.statusBar(Config.mainColor);//设置状态栏
        Func.backButtonEvent();//再按一次退出
        new Vue({
            el: '#app',
            router,
            render: h => h(App)
        });
    }, false);

}
