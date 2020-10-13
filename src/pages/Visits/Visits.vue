<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <small>The Lucky One</small>
      </small>
    </h1>
    <!-- <b-row>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> USERBASE GROWTH </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Overall Growth</h6>
              <p class="value">76.38%</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Montly</h6>
              <p class="value">10.38%</p>
            </div>
            <div class="stat-item">
              <h6 class="name">24h</h6>
              <p class="value">3.38%</p>
            </div>
          </div>
          <b-progress variant="success" :value="60"
            :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-angle-up" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;17% higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> TRAFFIC VALUES </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Overall Values</h6>
              <p class="value">17 567 318</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Montly</h6>
              <p class="value">55 120</p>
            </div>
            <div class="stat-item">
              <h6 class="name">24h</h6>
              <p class="value">9 695</p>
            </div>
          </div>
          <b-progress variant="danger"
            :value="60" :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-angle-down" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8% lower</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> RANDOM VALUES </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name fs-sm">Overcome T.</h6>
              <p class="value">104.85%</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">Takeoff Angle</h6>
              <p class="value">14.29&deg;</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">World Pop.</h6>
              <p class="value">7,211M</p>
            </div>
          </div>
          <b-progress variant="primary" :value="60"
            :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-plus" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8 734 higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';

export default {
  name: 'Visits',
  components: {
    // Widget, AnimatedNumber
  },
  data() {
    return {
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
    };
  },

  created () {
    let me = this;
  }
};
</script>

<style src="./Visits.scss" lang="scss" />
