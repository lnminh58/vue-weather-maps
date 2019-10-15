import Vue from 'vue'
import Vuex from 'vuex'

import currentWeather from './currentWeather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentWeather
  }
})
