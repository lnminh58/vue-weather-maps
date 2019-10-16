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
        >
          <GmapMarker :position="coords" :clickable="true" :draggable="true" />
        </gmap-map>
      </div>
    </div>
    <div class="row bg mt-3 50%">
      <div class="col xs-12 sm-8 md-6 lg-4">
        <div class="form-control currentWeather">
          <h4>Location: {{ _.get(this.currentWeather, "name")}}</h4>
          <p>Weather: {{ _.get(this.currentWeather, "weather.slice(1).main")}}</p>
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
  name: "currentWeather",
  data() {
    return {
      coords: INIT_COORDS,
      INIT_COORDS
    };
  },
  computed: {
    ...mapState({
      requesting: state =>
        get(state, "currentWeather.currentWeather.requesting")
    }),
    ...mapGetters({
      currentWeather: "currentWeather"
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
      console.log('dataComp', this.currentWeather)
    }
  },
  showPosition: position => {
    console.log(position.coords.latitude, position.coords.longitude);
  }
};
</script>

<style scoped>
.google-map {
  height: 450px;
}
.currentWeather {
  height: 100%;
  width: 30%;
  text-align: left;
  background-image: linear-gradient( rgb(8, 247, 247), rgb(10, 241, 191));
}
</style>
