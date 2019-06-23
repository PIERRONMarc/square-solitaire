<template>
  <div id="app" :style="{background: userInterface.primaryColor}">
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

import {mapMutations, mapState} from 'vuex'
import {customization} from './customization.js'

//trigerred when animated transition end
function addEventListener(el, done) {
  el.addEventListener('animationend', function () {
    done();
  })
}

export default {
  name: 'app',
  data: function () {
    return {}
  },
  computed: {
    ...mapState([
      'userInterface',
      'prevRoute'
    ])
  },
  methods: {
    ...mapMutations([
      'addStars',
      'setUserInterface'
    ]),
    //animation when compononent enter the screen
    enter(el, done) {
      addEventListener(el, done);
      if (this.$route.name == "CoverScreen") {
        el.classList.add("animated", "fadeInLeft")
      } else if (this.prevRoute == "Customization") {
        el.classList.add("animated", "fadeInLeft")
      } else {
        el.classList.add("animated", "fadeInRight")
      }
    },
    //animation when component leave the screen
    leave(el, done) {
      addEventListener(el, done)
      if (this.$route.name == "CoverScreen") {
        el.classList.add("animated", "fadeOutRight")
      } else if (this.prevRoute == "Customization") {
        el.classList.add("animated", "fadeOutRight")
      } else {
        el.classList.add("animated", "fadeOutLeft")
      }
    },
  },
  mounted: function () {
    //load data from local storage
    if (localStorage.stars != null) {
      this.addStars(JSON.parse(localStorage.stars));
    }
    if (localStorage.userInterface == null) {
      let ui = JSON.stringify(customization.Standard)
      localStorage.userInterface = ui;
    }
    this.setUserInterface(JSON.parse(localStorage.userInterface));
  }
}
</script>

<style>
@import './assets/css/bootstrap-grid.min.css';
@import './assets/css/animate.css';
@import './assets/fonts/icomoon.css';
@import './assets/fonts/montserrat/montserrat-font.css';

.animated {
  animation-duration: 0.2s;
}

#app {
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  color: white;
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  margin: 0px;
  height: 100%;
  width: 100%;
}

</style>
