<template>
  <div>

    
    <div class="title lastAddedStars">
      <transition name="router-anim" mode="out-in" enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutDown">
        <p v-show="lastAddedStars.show">+ {{lastAddedStars.number}}</p>
      </transition>
    </div>
    <div v-if="typeNavBar == 'gameBar'" class="navBar row d-flex justify-content-between align-items-center"
      :style="{background: userInterface.pDarkColor}">
      <div>
        <router-link to="/"><span class="icon-keyboard_arrow_left back" @click="stopChrono"></span>
        </router-link>
      </div>
      <div class="title">
        <p>{{ chrono.toString }} <span class="pipe">|</span> {{ stars }} <span class="icon icon-star"></span></p>
      </div>
      <div>
        <span class="icon-pause pause" @click="pause()"></span>
        <span class="icon-refresh restart" @click="restartGame"></span>
      </div>
    </div>


    <div v-if="typeNavBar == 'rankedBar' " class="row navBar d-flex justify-content-between align-items-center"
      :style="{background: userInterface.pDarkColor}">
      <div>
        <router-link to="/"><span class="icon-keyboard_arrow_left back"></span></router-link>
      </div>
      <div class="title">
        {{title}}
      </div>
    </div>


    <div v-if="typeNavBar == 'customizationBar'" class="row navBar d-flex justify-content-between align-items-center"
      :style="{background: userInterface.pDarkColor}">
      <div>
        <span class="icon-keyboard_arrow_left back" @click="$router.go(-1)"></span>
      </div>
      <div class="title">
        {{title}}
      </div>
      <div style="margin-right:10px">
        {{ stars }} <span class="icon icon-star"></span>
      </div>
    </div>


  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'NavBar',
  data: function () {
    return {
      showLastAddedStars: false
    }
  },
  computed: {
    ...mapState([
      'chrono',
      'stars',
      'userInterface',
      'lastAddedStars'

    ])
  },
  props: ['typeNavBar', 'title'],
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pipe {
  margin: 0px 10px 0px 10px;
}

.lastAddedStars {
  margin-bottom:50px;
  padding-left:65px;
  bottom:0;
}

.pause {
  font-size: 2em;
}

.back {
  margin-left: 10px;
  font-size: 2em;
  color: white;
}

.restart {
  margin-right: 10px;
  font-size: 2em;
}

.title {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

a {
  text-decoration: none;
}

p{
  margin:0;
}

.navBar {
  height: 40px;
  box-shadow: 0 -3px 6px -4px rgba(0, 0, 0, 0.16), 0 -3px 6px -2px rgba(0, 0, 0, 0.23);
  bottom: 0;
  position:fixed;
  width:100%;
}

</style>
