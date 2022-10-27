import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import axios from "axios"


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = token ? `${token}` : "";
  config.headers["x-api-key"] = "smkyaj";
  return config;
})
Vue.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueSidebarMenu)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')