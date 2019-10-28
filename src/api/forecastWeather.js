import http from '../service/http';

const APPID = process.env.VUE_APP_WEATHER_KEY_API;
const CNT = 7;

export default class ForecastWeather {
  static getForecastWeather(lat, lng) {
    return http.get(`forecast/daily?lat=${lat}&lon=${lng}&cnt=${CNT}&appid=${APPID}`);
  }
}
