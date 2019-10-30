<template>
  <div class="container">
    <h1 class="title">
      {{ _.get(forecastWeather, 'city.name') }}
    </h1>
    <div class="scrollbar" id="style-1">
      <ul>
        <li v-for="item in _.get(forecastWeather, 'list')" :key="item">
          {{ formatTime(item.dt) }}
          <br />
          <img
            style="height: 64px; width: 64px"
            :src="`http://openweathermap.org/img/wn/${_.get(item, 'weather[0].icon')}@2x.png`"
          />
          {{ (_.get(item, 'temp.day', 0) - 273).toFixed(2) }}&#x2103;
          <br />
          {{ item.weather[0].main }}
          <br />
          <br />
          <div class="forecast-detail">
            <img
              src="https://cdn1.iconfinder.com/data/icons/weather-forecast-31/650/cloud-clouds-forecast-512.png"
            />
            {{ item.clouds }}
          </div>
          <div class="forecast-detail">
            <img src="https://cdn1.iconfinder.com/data/icons/weather-4/512/wind-512.png" />
            {{ item.speed }}
          </div>
          <div class="forecast-detail">
            <img src="https://www.flaticon.com/premium-icon/icons/svg/1975/1975488.svg" />
            {{ item.humidity }}%
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { get } from 'lodash';
import moment from 'moment';

export default {
  async mounted() {
    const lat = this.currentWeather.coord.lat;
    const lng = this.currentWeather.coord.lon;
    await this.$store.dispatch('getForecastWeatherByCoord', { lat, lng });
  },
  computed: {
    ...mapState({
      requesting: state => get(state, 'forecastWeather.forecastWeather.requesting'),
    }),
    ...mapGetters({
      currentWeather: 'currentWeather',
      forecastWeather: 'forecastWeather',
    }),
  },
  methods: {
    formatTime(s) {
      // s not ms
      // h is same
      return moment(s * 1000).format('dddd');
    },
  },
};
</script>

<style scoped>
.container {
  color: white;
  height: 600px;
  background-image: url('http://file.vforum.vn/hinh/2015/09/vforum-hinh-nen-mua-thu-2016-by-telasm-7.jpg');
}
.scrollbar ul {
  height: 260px;
  width: 2500px;
  margin-top: 10px auto;
  padding: 10px;
  list-style: none;
}
.scrollbar li {
  color: white;
  height: 240px;
  width: 150px;
  float: left;
  margin-right: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.scrollbar {
  height: 300px;
  width: 475px;
  overflow-x: auto;
  margin: 30px auto;
}
.forecast-detail {
  float: left;
  clear: both;
  margin-left: 5px;
}
.forecast-detail img {
  height: 30px;
  width: 30px;
}
.title {
  font-size: 100px;
}
</style>


