<template>
  <div>
    <div class="map" ref="map">

    </div>
    <div class="stats">
      <h6 class="mt-1">GEO-LOCATIONS</h6>
      <p class="h3 m-0">
      <span class="mr-xs fw-normal"><AnimatedNumber value="1656843"
                                                    v-bind="animateNumberOptions"></AnimatedNumber></span>
        <i class="fa fa-map-marker"/>
      </p>
    </div>
  </div>

</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  name: 'Map',
  components: { AnimatedNumber },
  data() {
    return {
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          let number = value.toFixed(0);
          let numberAsArrayWithSapces = [];
          while (number >= 1) {
            numberAsArrayWithSapces.unshift(number % 1000);
            number = (number/1000).toFixed();
          }
          return numberAsArrayWithSapces.join(' ');
        }
      }
    }
  },
  mounted() {

  },
};
</script>

<style src="./Map.scss" lang="scss" />
