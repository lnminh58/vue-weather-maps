import http from '../service/http'

const APPID = process.env.VUE_APP_WEATHER_KEY_API

export default class ForecastWeather {
  static getForecastWeather(lat, lng) {
    return http.get(`forecast/daily?lat=${lat}&lon=${lng}&cnt=16&appid=${APPID}`)
  }
}
