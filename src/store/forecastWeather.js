import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import {
  GET_FORECAST_WEATHER_BY_COORD_REQUEST,
  GET_FORECAST_WEATHER_BY_COORD_SUCCESS,
  GET_FORECAST_WEATHER_BY_COORD_FAIL,
} from '../constants/mutationTypes'

import ForecastWeather from '../api/forecastWeather'

const state = {
  forecastWeather : {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
}

const actions = {
  async getForecastWeatherByCoord ({commit}, {lat, lng}) {
    commit(GET_FORECAST_WEATHER_BY_COORD_REQUEST);
    try {
      const res = await ForecastWeather.getForecastWeather(lat, lng);
      const data = get(res, 'data');
      commit(GET_FORECAST_WEATHER_BY_COORD_SUCCESS, data)
    } catch(error) {
      commit(GET_FORECAST_WEATHER_BY_COORD_FAIL, {error: serializeError(error)})
    }
  }
}

const mutations = {
  [GET_FORECAST_WEATHER_BY_COORD_REQUEST] (state) {
    state.forecastWeather.requesting = true;
    state.forecastWeather.status = '';
  },
  [GET_FORECAST_WEATHER_BY_COORD_SUCCESS] (state, payload) {
    state.forecastWeather.requesting = false;
    state.forecastWeather.status = 'success';
    state.forecastWeather.result = payload;
  },
  [GET_FORECAST_WEATHER_BY_COORD_FAIL] (state, payload) {
    state.forecastWeather.requesting = false;
    state.forecastWeather.status = 'error';
    state.forecastWeather.result = payload;
  }
}

const getters = {
  forecastWeather:  state => get(state, 'forecastWeather.result',{})
}

export default {
  state,
  actions,
  mutations,
  getters
}
