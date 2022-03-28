import Vue from 'vue'
import './components'
import App from './index.vue'

// 热更新
module && module.hot.accept()

new Vue({
  el: '#app',
  render: h => h(App),
})
