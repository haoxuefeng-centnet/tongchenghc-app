import Vue from 'vue'
import App from './App'
import { globleMixins } from './mixins/globle.js'
Vue.config.productionTip = false;
Vue.mixin(globleMixins)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
