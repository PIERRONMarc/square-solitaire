<template>
    <div>
        <div v-if="typeNavBar == 'gameBar'" class="navBar row d-flex justify-content-between align-items-center" :style="{background: userInterface.pDarkColor}">
            <div>
                <router-link to="/"><span class="icon-keyboard_arrow_left back" @click="stopChrono"></span>
                </router-link>
            </div>
            <div class="title">
                <p>{{ chrono.toString }} <span style="margin: 0px 10px 0px 10px">|</span> {{ stars }} <span class="icon icon-star"></span></p>
            </div>
            <div>
                <span class="icon-pause pause" @click="pause()"></span>
                <span class="icon-refresh restart" style="color:white" @click="restartGame"></span>
            </div>
        </div>
        <div v-if="typeNavBar == 'rankedBar' " class="row navBar d-flex justify-content-between align-items-center" :style="{background: userInterface.pDarkColor}">
            <div>
                <router-link to="/"><span class="icon-keyboard_arrow_left back"></span></router-link>
            </div>
            <div class="title">
                Mes records
            </div>
        </div>
        <div v-if="typeNavBar == 'customizationBar'"
            class="row navBar d-flex justify-content-between align-items-center" :style="{background: userInterface.pDarkColor}">
            <div>
                <router-link to="/"><span class="icon-keyboard_arrow_left back"></span></router-link>
            </div>
            <div class="title">
                Customisation
            </div>
            <div style="margin-right:10px">
                {{ stars }} <span class="icon icon-star"></span>
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
  name: 'NavBar',
  computed: {
    ...mapState([
      'status',
      'chrono',
      'stars',
      'userInterface',
      
    ])
  },
  props: ['typeNavBar'],
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

.title {
  color: white;
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

a{
  text-decoration: none;
}

.navBar{
    height:40px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
/* .gameBar {
    width: 100%;
    height: 40px;
    background: #5e4238;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
} */
</style>
