import Vue from 'vue'
import Vuex from 'vuex'

import currentWeather from './currentWeather'
import forecastWeather from './forecastWeather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentWeather,
    forecastWeather
  }
})
