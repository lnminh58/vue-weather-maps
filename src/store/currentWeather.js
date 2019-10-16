import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import {
  GET_CURRENT_WEATHER_BY_COORD_REQUEST,
  GET_CURRENT_WEATHER_BY_COORD_SUCCESS,
  GET_CURRENT_WEATHER_BY_COORD_FAIL
} from '../constants/mutationTypes';

import CurrentWeather from '../api/currentWeather';

const state = {
  currentWeather: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
};

const actions = {
  async getCurrentWeatherByCoord({ commit } , { lat, lng } ) {
    commit(GET_CURRENT_WEATHER_BY_COORD_REQUEST);
    try {
      const res = await CurrentWeather.getCurrentWeather(lat, lng);
      const data = get(res, 'data');
      console.log('data: ', data);
      commit(GET_CURRENT_WEATHER_BY_COORD_SUCCESS, data);
    } catch (error) {
      commit(GET_CURRENT_WEATHER_BY_COORD_FAIL, { error: serializeError(error) });
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
  }
};

const getters = {
  currentWeather: state => {
    state, 'currentWeather.result';
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
