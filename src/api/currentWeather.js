import http from '../service/http';

const APPID = process.env.VUE_APP_WEATHER_KEY_API

export default class CurrentWeather {
  static getCurrentWeather(lat, lng,) {
    return http.get (`weather?lat=${lat}&lon=${lng}&appid=${APPID}`)
  };
  static getCityWeather(location) {
    return http.get(`weather?q=${location}`)
  }
}
