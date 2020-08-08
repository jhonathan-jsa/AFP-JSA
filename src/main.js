import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'  //Globally import VTextField

Vue.component('v-text-field', VTextField)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(
  VCurrencyField, {
  locale: 'pt-BR',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0
}
);

const { rotas } = require('./backend/utils/U-Navegacao.js')
const router = new VueRouter({
  routes: rotas
})

new Vue({
  store: new Vuex.Store({
    state: {
      perfil: null,
      btnAdicionar: {
        nome: "",
        icone: "",
        comando: ""
      }
    },
    mutations: {
      SET_PERFIL(store, perfil) {
        store.perfil = perfil
      },
      SET_BTN_ADICIONAR (store, btn) {
        store.btnAdicionar = btn
      }
    },
  }),
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
