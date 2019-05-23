<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <BoardBox msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import BoardBox from './components/BoardBox.vue'

export default {
  name: 'app',
  components: {
    BoardBox
  }
}
</script>

<style>

</style>
