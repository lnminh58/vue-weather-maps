import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import {
  GET_CURRENT_WEATHER_BY_COORD_REQUEST,
  GET_CURRENT_WEATHER_BY_COORD_SUCCESS,
  GET_CURRENT_WEATHER_BY_COORD_FAIL,
  
  GET_CURRENT_WEATHER_BY_CITY_REQUEST,
  GET_CURRENT_WEATHER_BY_CITY_SUCCESS,
  GET_CURRENT_WEATHER_BY_CITY_FAIL
} from '../constants/mutationTypes';

import CurrentWeather from '../api/currentWeather';

const state = {
  currentWeather: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  cityWeather: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
};

const actions = {
  async getCurrentWeatherByCoord({ commit }, { lat, lng }) {
    commit(GET_CURRENT_WEATHER_BY_COORD_REQUEST);
    try {
      const res = await CurrentWeather.getCurrentWeather(lat, lng);
      const data = get(res, 'data');
      commit(GET_CURRENT_WEATHER_BY_COORD_SUCCESS, data);
    } catch (error) {
      commit(GET_CURRENT_WEATHER_BY_COORD_FAIL, { error: serializeError(error) });
    }
  },
  async getCurrentWeatherByCity({ commit },  cityName ) {
    commit(GET_CURRENT_WEATHER_BY_CITY_REQUEST);
    try {
      const res = await CurrentWeather.getCityWeather(cityName);
      const data = get(res, 'data');
      commit(GET_CURRENT_WEATHER_BY_CITY_SUCCESS, data);
    } catch (error) {
      commit(GET_CURRENT_WEATHER_BY_CITY_FAIL, { error: serializeError(error) });
    }
  }
};

const mutations = {
  [GET_CURRENT_WEATHER_BY_COORD_REQUEST](state) {
    state.currentWeather.requesting = true;
    state.currentWeather.status = '';
  },
  [GET_CURRENT_WEATHER_BY_COORD_SUCCESS](state, payload) {
    state.currentWeather.requesting = false;
    state.currentWeather.status = 'success';
    state.currentWeather.result = payload;
  },
  [GET_CURRENT_WEATHER_BY_COORD_FAIL](state, payload) {
    state.currentWeather.requesting = false;
    state.currentWeather.status = 'error';
    state.currentWeather.result = payload;
  },
  [GET_CURRENT_WEATHER_BY_CITY_REQUEST](state) {
    state.cityWeather.requesting = true;
    state.cityWeather.status = '';
  },
  [GET_CURRENT_WEATHER_BY_CITY_SUCCESS](state, payload) {
    state.cityWeather.requesting = false;
    state.cityWeather.status = 'success';
    state.cityWeather.result = payload;
  },
  [GET_CURRENT_WEATHER_BY_CITY_FAIL](state, payload) {
    state.cityWeather.requesting = false;
    state.cityWeather.status = 'error';
    state.cityWeather.result = payload;
  }
};

const getters = {
  currentWeather: state => get(state, 'currentWeather.result', {}),
  cityWeather: state => get(state, 'cityWeather.result', {})
};

export default {
  state,
  actions,
  mutations,
  getters
};
