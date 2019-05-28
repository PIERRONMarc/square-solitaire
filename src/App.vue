<template>
  <div id="app">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
@import './assets/css/bootstrap-grid.min.css';
@import './assets/fonts/roboto/roboto-font.css';
@import './assets/fonts/icomoon.css';
@import './assets/fonts/montserrat/montserrat-font.css';

#app {
  /* font-family: 'Roboto', 'Arial', 'Helvetica', 'sans-serif'; */
  font-family: 'Roboto', 'Arial', 'Helvetica', 'sans-serif';
}

html, body {
    margin: 0px;
    height: 100%;
    width: 100%;
    background: #8c6d62;
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
</style>
