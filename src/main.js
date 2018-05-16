// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Elementui from 'element-ui'
import moment from 'moment';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Elementui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/**
* 日期格式化
* @param date 需要格式化的日期
* @param format 格式化参数 YYYY-MM-DD HH:mm:ss
*/
export function formatDate(date,format) {
  format = format || 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(format);
}
Object.defineProperty(Vue.prototype, '$formatDate', { value: formatDate });
