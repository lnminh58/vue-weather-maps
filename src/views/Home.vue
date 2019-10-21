<template>
  <div class="home container">
    <div class="row bg-dark py-3 50%">
      <div class="col sm-10 md-8 lg-6">
        <gmap-map
          ref="mapRef"
          :center="INIT_COORDS"
          :zoom="8"
          map-type-id="terrain"
          class="google-map"
          @click="onMapClick"
          style="text-align: center"
        >
          <GmapMarker :position="coords" :clickable="true" :draggable="true" />
        </gmap-map>
      </div>
    </div>
    <div class="row bg mt-3 50%">
      <div class="col xs-12 sm-8 md-6 lg-3">
        <div class="row">
          <div class="form-control currentWeather">
            <div class="col-lg-3 pl-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="searchText"
                  placeholder="Search for location"
                />
                <span class="input-group-btn">
                  <button
                    class="btn btn-default"
                    type="button"
                    @click="searchCity"
                  >
                    Search
                  </button>
                </span>
              </div>
            </div>
            <h4>Location: {{ this.name }}</h4>

            <p>Weather: {{ this.main }}</p>
            <img
              style="height: 64px; width: 64px"
              alt="light rain"
              v-if="_.get(this.weather, 'main') === 'Rain'"
              src="http://ssl.gstatic.com/onebox/weather/64/rain_light.png"
            />
            <img
              style="height: 64px; width: 64px"
              alt="clear sky"
              v-else-if="_.get(this.weather, 'main') === 'Clouds'"
              src="http://ssl.gstatic.com/onebox/weather/64//cloudy.png"
            />
            <img
              style="height: 64px; width: 64px"
              alt="clear sky"
              v-else-if="_.get(this.weather, 'main') === 'Clear'"
              src="http://ssl.gstatic.com/onebox/weather/64//sunny.png"
            />
            <img
              style="height: 64px; width: 64px"
              alt="clear sky"
              v-else-if="_.get(this.weather, 'main') === 'Mist'"
              src="http://ssl.gstatic.com/onebox/weather/64//mist.png"
            />
            <img
              style="height: 64px; width: 64px"
              alt="clear sky"
              v-else
              src="http://ssl.gstatic.com/onebox/weather/64//fog.png"
            />
            <p>Detail: {{ this.description }}</p>
            <p>
              Temprature: {{ this.temp - 273 }} *C
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { INIT_COORDS } from "@/constants/defaultValues";
import { mapState, mapGetters } from "vuex";
import { get } from "lodash";

export default {
  name: "City",
  data() {
    return {
      coords: INIT_COORDS,
      INIT_COORDS,
      weather: {},
      searchText: "",
      name: '',
      main: '',
      description: '',
      temp: 273,
      icon: ''
    };
  },
  computed: {
    ...mapState({
      requestingCurrentWeather: state =>
        get(state, "currentWeather.currentWeather.requesting"),
      requestingCityWeather: state =>
        get(state, "currentWeather.cityWeather.requesting")
    }),
    ...mapGetters({
      currentWeather: "currentWeather",
      cityWeather: "cityWeather"
    })
  },
  mounted() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log(position);
    // });
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   map.panTo({ lat: 16.047, lng: 108.17 });
    // });
  },
  methods: {
    onMapClick(coords) {
      const lat = coords.latLng.lat();
      const lng = coords.latLng.lng();
      this.coords = { lat, lng };
      this.$store.dispatch("getCurrentWeatherByCoord", { lat, lng });
      this.weather = this.currentWeather.weather[0];
      this.name = get(this.currentWeather, "name")
      this.main= get(this.weather, "main");
      this.description = get(this.weather, "description");
      this.temp = get(this.currentWeather, "main.temp");
      this.icon = get(this.weather, "icon");
      // this.$router.push({ path: "/home", query: { lat, lng } });
    },
    showPosition: position => {
      console.log(position.coords.latitude, position.coords.longitude);
    },
    async searchCity() {
      await this.$store.dispatch("getCurrentWeatherByCity", this.searchText);
      const lat = get(this.cityWeather, "coord.lat");
      const lng = get(this.cityWeather, "coord.lon");
      this.coords = { lat, lng };
      this.weather = this.cityWeather.weather[0];
      this.name = get(this.cityWeather, "name")
      this.main= get(this.weather, "main");
      this.description = get(this.weather, "description");
      this.temp = get(this.cityWeather, "main.temp");
      this.icon = get(this.weather, "icon");
    }
  }
};
</script>

<style scoped>
.google-map {
  height: 450px;
}
.currentWeather {
  color: aliceblue;
  height: 350px;
  width: 100%;
  text-align: left;
  background-image: url("https://cdn.pixabay.com/photo/2017/01/19/23/46/panorama-1993645_960_720.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
