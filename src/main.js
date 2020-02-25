import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uploader from 'vue-simple-uploader'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

store.$events = {}
store.$on = function (evt, fn) {
  store.$events['$' + evt] = fn
}
store.$off = function (evt) {
  store.$events['$' + evt] = null
}

store.$emit = function (evt, data) {
  console.log('emit!!!!!!')
  if (!this.$events['$' + evt]) return
  this.$events['$' + evt](data)
  this.commit('SET_EVENT', evt) // 将事件evt当成payload提交给mutation
}

Vue.use(uploader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
