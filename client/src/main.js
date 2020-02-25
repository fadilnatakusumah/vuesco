import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueToastify from 'vue-toastify'
import { Plugin } from 'vue-fragment'

import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// graphql setup
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  onError: (onError) => console.log("TCL: request error message: ", onError),
  request: async operation => {
    if (!localStorage.getItem('token_vuesco')) {
      localStorage.setItem('token_vuesco', '');
    }
    // await localStorage.getItem('token_vuesco')
    // console.log("TCL: localStorage.getItem('token_vuesco')", localStorage.getItem('token_vuesco'))
    operation.setContext({
      headers: {
        authorization: await localStorage.getItem('token_vuesco')
      }
    });
  },
  // for adding token to header for every request
});

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false
Vue.use(Buefy);
Vue.use(VueApollo);
Vue.use(VueToastify);
Vue.use(Plugin);

import { mapGetters } from 'vuex'

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch('getCurrentUser');
  },
}).$mount('#app')
