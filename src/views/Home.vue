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
        <div class="row currentWeather pt-4">
          <div class="col-lg-4">
            <h4>Location: {{ _.get(currentWeather, 'name') }}</h4>

            <p>Weather: {{ _.get(weather, 'main') }}</p>
            <img
              style="height: 64px; width: 64px"
              alt="light rain"
              v-if="_.get(weather, 'icon')"
              :src="`http://openweathermap.org/img/wn/${_.get(weather, 'icon')}@2x.png`"
            />
            <p>Detail: {{ _.get(weather, 'description') }}</p>
            <p>
              Temprature:
              {{ (_.get(currentWeather, 'main.temp', 0) - 273).toFixed(2) }}
              &#x2103;
            </p>
          </div>
          <div class="col-lg-4  ml-auto">
            <div class="input-group">
              <gmap-autocomplete
                :value="searchText"
                ref="autoCompleteRef"
                class="form-control border-light transparent-bg"
                @place_changed="onPlaceChange"
              ></gmap-autocomplete>
              <div class="input-group-append">
                <button
                  class="btn btn-outline-light text-secondary transparent-bg"
                  type="button"
                  @click="searchText = ''"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { INIT_COORDS } from '@/constants/defaultValues';
import { mapState, mapGetters } from 'vuex';
import { get } from 'lodash';

export default {
  name: 'City',
  data() {
    return {
      coords: INIT_COORDS,
      center: INIT_COORDS,
      INIT_COORDS,
      searchText: '',
    };
  },
  computed: {
    ...mapState({
      requestingCurrentWeather: state => get(state, 'currentWeather.currentWeather.requesting'),
      requestingCityWeather: state => get(state, 'currentWeather.cityWeather.requesting'),
    }),
    ...mapGetters({
      currentWeather: 'currentWeather',
      weather: 'weather',
    }),
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
    async onMapClick(coords) {
      const lat = coords.latLng.lat();
      const lng = coords.latLng.lng();
      this.coords = { lat, lng };
      await this.$store.dispatch('getCurrentWeatherByCoord', { lat, lng });
      // this.$router.push({ path: "/home", query: { lat, lng } });
    },
    showPosition: position => {
      console.log(position.coords.latitude, position.coords.longitude);
    },

    async onPlaceChange(place) {
      console.log(place);
      const { geometry } = place;
      const lat = get(geometry, 'location.lat')();
      const lng = get(geometry, 'location.lng')();
      const coords = { lat, lng };
      this.searchText = get(place, 'formatted_address');
      await this.$store.dispatch('getCurrentWeatherByCoord', coords);
      this.$refs.mapRef.panTo(coords);
      this.coords = coords;
    },

    async searchCity() {
      await this.$store.dispatch('getCurrentWeatherByCity', this.searchText);
      const lat = get(this.currentWeather, 'coord.lat');
      const lng = get(this.currentWeather, 'coord.lon');
      this.$refs.mapRef.panTo({ lat, lng });
      this.coords = { lat, lng };
    },
  },
};
</script>

<style scoped>
.google-map {
  height: 450px;
}
.currentWeather {
  color: aliceblue;
  height: 350px;
  text-align: left;
  background-image: url('https://cdn.pixabay.com/photo/2017/01/19/23/46/panorama-1993645_960_720.jpg');
  background-size: cover;
  background-position: center center;
}
.transparent-bg {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
