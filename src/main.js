import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store.js'

import CoverScreen from './components/CoverScreen.vue'
import BoardBox from './components/BoardBox.vue'
import RankedBoard from './components/RankedBoard.vue'
import Customization from './components/Customization.vue'
import Rules from './components/Rules.vue'

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
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    }

  ]
})

//register the previous route
router.beforeEach((to, from, next) => {
  store.state.prevRoute = from.name
  next()
})

const vueApp = new Vue({
  render: h => h(App),
  router,
  store,
  methods: {
    onDeviceReady: function () {
      // lock the device orientation because landscape is badly supported
      screen.orientation.lock('portrait')
      if(localStorage.PrivacyPolicyConsent == 'true')
      {
        this.showBannerAds();
      }
    },
    showBannerAds: function () {
      const bannerConfig = {
        id: 'insert real id here', //real id
        // isTesting: true,
        autoShow: true,
        bannerAtTop:true
      }
      admob.banner.config(bannerConfig);

      admob.banner.prepare();


    }
  }
}).$mount('#app')

document.addEventListener(
  'deviceready',
  function () {
    vueApp.onDeviceReady();
  },
  false
)
