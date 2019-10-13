<template>
  <div class="home container">
    <div class="row bg-dark py-3">
      <div class="col sm-10 md-8 lg-6">
        <gmap-map
          ref="mapRef"
          :center="INIT_COORDS"
          :zoom="8"
          map-type-id="terrain"
          class="google-map"
          @click="onMapClick"
        >
          <GmapMarker
            :position="coords"
            :clickable="true"
            :draggable="true"
          />
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
import { INIT_COORDS } from '@/constants/defaultValues';

export default {
  name: "home",
  data() {
    return {
      coords: INIT_COORDS,
      INIT_COORDS
    }
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
      this.coords = { lat, lng }
      console.log(lat, lng);
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
</style>
