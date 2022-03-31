import Vue from 'vue'
import UI from './components'
import App from './index.vue'

export * from './components'

// 热更新
module?.hot?.accept()

new Vue({
  el: '#app',
  render: h => h(App),
})

export default UI
