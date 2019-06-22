<template>
  <div class="container-fluid rankedBoard">
    <NavBar typeNavBar="rankedBar" title="Mes records" />
    <div v-if="rank !== null">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h2></h2>
        </div>
        <div class="col d-flex justify-content-center">
          <p>Date</p>
        </div>
        <div class="col d-flex justify-content-center">
          <p>Temps</p>
        </div>
      </div>
      <div v-for="(r, index) in rank" :key="r.id">
        <div class="row record"
          :class="{ 'background-first' : index == 0, 'background-second' : index == 1, 'background-third': index == 2}"
          :style="[index > 2 ? {background: userInterface.pDarkColor}:null]">
          <div class="col d-flex justify-content-center">
            #{{index + 1}}
          </div>
          <div class="col d-flex justify-content-center">
            {{r.date}}
          </div>
          <div class="col d-flex justify-content-center">
            {{r.chrono.toString}}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="rankedBoard d-flex flex-column justify-content-center align-items-center">
      <p style="text-transform:none;">Tu n'as toujours pas gagné..</p>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import NavBar from './NavBar.vue';

export default {
  name: 'RankedBoard',
  data: function () {
    return {
      rank: []
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState([
      'userInterface'
    ])
  },
  mounted: function () {
    if (localStorage.rank != null) {
      this.rank = JSON.parse(localStorage.rank);
      //sort ranks by best time
      this.rank.sort(function (a, b) {
        if (a.chrono.minutes < b.chrono.minutes) {
          return -1;
        } else if (a.chrono.minutes > b.chrono.minutes) {
          return 1;
        } else if (a.chrono.seconds < b.chrono.seconds) {
          return -1;
        } else if (a.chrono.seconds > b.chrono.seconds) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.rank = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

.background-first {
  background: #ffd700;
}

.background-second {
  background: #C0C0C0;
}

.background-third {
  background: #cd7f32;
}

.rankedBoard {
  height: 100%;
  text-transform: uppercase;
}

.record > div {
  padding: 0 2px;
}
.record {
  padding: 4px;
  margin: 7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
}

</style>
