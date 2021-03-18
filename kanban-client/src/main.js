import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import GSignInButton from "vue-google-signin-button";
Vue.use(GSignInButton);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
