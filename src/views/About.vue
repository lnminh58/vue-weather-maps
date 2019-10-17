<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { get } from "lodash";

export default {
  props: {
    lat: String,
    lng: String
  },
  mounted() {
    this.$store.dispatch("getForecastWeatherByCoord", this.lat, this.lng);
  },
  computed: {
    ...mapState({
      requesting: state =>
        get(state, "forecastWeather.forecastWeather.requesting")
    }),
    ...mapGetters({
      forecastWeather: "forecastWeather"
    })
  }
};
</script>
