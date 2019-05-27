<template>
  <div class="gameBar container-fluid">
    <div class="row d-flex justify-content-between align-items-center" style="height:100%">
      <div>
        <router-link to="/"><span class="icon-keyboard_arrow_left back"></span></router-link>
      </div>
      <div class="chrono">
        {{ chrono.toString }}
      </div>
      <div>
        <span class="icon-refresh restart" style="color:white" @click="restartGame"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers';
export default {
  name: 'GameBar',
  data: function () {
    return {
      chrono: {
        minutes: 0,
        seconds: 0,
        toString: '00 : 00',
      }
    }
  },
  mounted: function () {
    // Start the chronometer
    setInterval(() => {
      this.chrono.seconds+=1;
      if (this.chrono.seconds === 60) {
          this.chrono.seconds = 0;
          this.chrono.minutes = this.chrono.minutes + 1;
      }
      this.chronoToString();
    }, 1000);
  },
  methods: {
    restartGame: function () {
      this.$emit('restart-game');
      this.chrono.seconds = 0;
      this.chrono.minutes = 0;
      this.chrono.toString = '00 : 00'
    },
    chronoToString: function () {
      let minutes = this.chrono.minutes;
      let seconds = this.chrono.seconds;

      this.chrono.toString = minutes + ' : ' + seconds;
      
      if(minutes < 10){
        this.chrono.toString = '0' + minutes + ' : ' + seconds;
      }
      if(seconds < 10){
        this.chrono.toString = minutes + ' : 0' + seconds;
      }
      if(seconds < 10 && minutes < 10){
        this.chrono.toString = '0' + minutes + ' : 0' + seconds;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
