<template>
  <div class="container">
    <h1 class="title">
      {{ _.get(forecastWeather, 'city.name') }}
    </h1>
    <div class="row forecast">
      <div class="form-control" v-for="item in _.get(forecastWeather, 'list')" :key="item">
        {{ formatTime(item.dt) }}
        <img
          style="height: 64px; width: 64px"
          :src="`http://openweathermap.org/img/wn/${_.get(item, 'weather[0].icon')}@2x.png`"
        />
        {{ (_.get(item, 'temp.day', 0) - 273).toFixed(2) }}&#x2103;
        <br>
        <br>
        {{ item.weather[0].main }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { get } from 'lodash';
import moment from 'moment'

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
      return moment(s*1000).format('dddd')
    }
  }
};
</script>

<style scoped>
.container {
  color: white;
  height: 600px;
  background-image: url('http://file.vforum.vn/hinh/2015/09/vforum-hinh-nen-mua-thu-2016-by-telasm-7.jpg');
}
.form-control {
  color: white;
  height: 300px;
  width: 13%;
  margin-left: 5px;
  background-color: rgba(255, 255, 255, 0.2);
}
.forecast {
  margin-top: 25px;
  padding: 5%;
}
.title{
  font-size: 100px
}
</style>
