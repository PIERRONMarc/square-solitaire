<template>
  <div id="app" style="height:100%" :style="{background: userInterface.primaryColor}">
      <!-- <transition name="router-anim" mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight"> -->
      <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <!-- <transition name="fade" mode="out-in"> -->
        <router-view />
      </transition>
    </div>
  
</template>

<script>

import {mapMutations, mapState} from 'vuex'
import {customization} from './customization.js'

function addEventListener(el, done) {
  el.addEventListener('animationend', function () {
    done();
  })
}

export default {
  name: 'app',
  computed: {
    ...mapState([
      'userInterface'
    ])
  },
  methods: {
    ...mapMutations([
      'addStars',
      'setUserInterface'
    ]),
    enter(el, done) {
      addEventListener(el, done);
      if (this.$route.name == "CoverScreen") {
        el.classList.add("animated", "fadeInLeft")
      } else {
        el.classList.add("animated", "fadeInRight")
      }
    },
    leave(el, done) {
      addEventListener(el, done)
      if (this.$route.name == "CoverScreen") {
        el.classList.add("animated", "fadeOutRight")
      } else {
        el.classList.add("animated", "fadeOutLeft")
      }
    },
  },
  mounted: function () {
    if (localStorage.stars != null) {
      this.addStars(JSON.parse(localStorage.stars));
    }
    if (localStorage.userInterface == null) {
      let ui = JSON.stringify(customization.default)
      localStorage.userInterface = ui;
    }
    this.setUserInterface(JSON.parse(localStorage.userInterface));
  },
}
</script>

<style>
@import './assets/css/bootstrap-grid.min.css';
@import './assets/css/animate.css';
@import './assets/fonts/roboto/roboto-font.css';
@import './assets/fonts/icomoon.css';
@import './assets/fonts/montserrat/montserrat-font.css';

.animated{
   /* -webkit-animation-duration: 0.3s; */
   animation-duration: 0.2s;
   /* -webkit-animation-fill-mode: both;
   animation-fill-mode: both; */
}

#app {
  /* font-family: 'Roboto', 'Arial', 'Helvetica', 'sans-serif'; */
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  height:100%;
  -webkit-tap-highlight-color: transparent;
}

html, body {
    margin: 0px;
    height: 100%;
    width: 100%;
    /* background: #8c6d62; */
}


 
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
/* Prevent landscape mode which is not designed yet */
/* @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
  html {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }
} */

</style>
