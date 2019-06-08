<template>
  <div class="gameBar container-fluid" :style="{background: userInterface.pDarkColor}">
    <div class="row d-flex justify-content-between align-items-center" style="height:100%">
      <div>
        <router-link to="/"><span class="icon-keyboard_arrow_left back" @click="stopChrono"></span></router-link>
      </div>
      <div class="chrono">
        {{ chrono.toString }} | {{ stars }} <span class="icon icon-star"></span>
      </div>
      <div>
        <span class="icon-pause pause" @click="pause()"></span>
        <span class="icon-refresh restart" style="color:white" @click="restartGame"></span>
      </div>
    </div>
  </div>
</template>

<script>

import {
  mapState,
  mapMutations
} from 'vuex';

export default {
  name: 'GameBar',
  computed: {
    ...mapState([
      'status',
      'chrono',
      'stars',
      'userInterface'
    ])
  },
  methods: {
    ...mapMutations([
      'setStatus',
      'resetChrono',
      'stopChrono'
    ]),
    restartGame: function () {
      this.setStatus('INIT');
      this.resetChrono();
    },
    pause: function () {
      this.setStatus('PAUSE');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pause {
  color:white;
  font-size:2em;
}

.back {
  margin-left:10px;
  font-size: 2em; 
  color:white;
}

.restart {
  margin-right:10px;
  font-size: 2em; 
  color:white;
}

.chrono {
  color: white;
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

a{
  text-decoration: none;
}
.gameBar {
    width: 100%;
    height: 40px;
    background: #5e4238;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
