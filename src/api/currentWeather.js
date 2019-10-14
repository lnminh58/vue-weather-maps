import http from '../service/http';

export default class CurrentWeather {
  static getCurrentWeather(lat, lng) {
    return http.get (`weather?${lat}&${lng}`)
  }
}
