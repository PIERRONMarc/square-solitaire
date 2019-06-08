import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store.js'

import CoverScreen from './components/CoverScreen.vue'
import BoardBox from './components/BoardBox.vue'
import RankedBoard from './components/RankedBoard.vue'
import Customization from './components/Customization.vue'



Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'CoverScreen',
      component: CoverScreen
    },
    {
      path: '/board',
      name: 'BoardBox',
      component: BoardBox
    },
    {
      path: '/ranked',
      name: 'RankedBoard',
      component: RankedBoard
    },
    {
      path: '/customization',
      name: 'Customization',
      component: Customization
    }
    
  ]
})

const vueApp = new Vue({
  render: h => h(App),
  router, 
  store,
  methods: {
    onDeviceReady: function () {
      this.showBannerAds();
    },
    showBannerAds: function () {
      const bannerConfig = {
        // id: 'ca-app-pub-8942917782695946/9712013613', real id
        id: 'ca-app-pub-3940256099942544/6300978111', //test id
        isTesting: true,
        autoShow: true
      }
      admob.banner.config(bannerConfig);

      admob.banner.prepare()
        .then(() => {
          // admob.banner.show();
          // this.admob.banner.show();
          console.log('start to show the banner as..');
        })
        .catch(err => {
          console.log('show banner ads error: ', err);
        });

      
    }
  }
}).$mount('#app')

document.addEventListener(
  'deviceready',
  function() {
    vueApp.onDeviceReady();
  },
  false
)