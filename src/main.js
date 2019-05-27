import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import CoverScreen from './components/CoverScreen.vue'
import BoardBox from './components/BoardBox.vue'

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
    }
    
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
