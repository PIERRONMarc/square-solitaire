<template>
  <div class="container-fluid rankedBoard" style="height:100%">

    <div class="row NavBar d-flex justify-content-between align-items-center" :style="{background: userInterface.pDarkColor}">
      <div>
        <router-link to="/"><span class="icon-keyboard_arrow_left back"></span></router-link>
      </div>
      <div class="title">
        Mes records
      </div>
    </div>
    <div v-if="rank != null">
      <div class="row" style="margin-top:8%;">
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
          :class="{ 'background-first' : index == 0, 'background-second' : index == 1, 'background-third': index == 2}" :style="[index > 2 ? {background: userInterface.pDarkColor}:null]">
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
    <div v-else style="height:100%;" class="d-flex flex-column justify-content-center align-items-center">
      <p style="text-transform:none;">Tu n'as toujours pas gagné..</p>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'RankedBoard',
  data: function () {
    return {
      rank: []
    }
  },
  computed: {
    ...mapState([
      'userInterface'
    ])
  },
  mounted: function () {
    if(localStorage.rank != null){
      this.rank = JSON.parse(localStorage.rank);
      this.rank.sort(function(a, b) {
        if(a.chrono.minutes < b.chrono.minutes){
          return -1;
        }else if(a.chrono.minutes > b.chrono.minutes){
          return 1;
        }else if(a.chrono.seconds < b.chrono.seconds){
          return -1;
        }else if(a.chrono.seconds > b.chrono.seconds){
          return 1;
        }else{
          return 0;
        }
      });
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

.background-first{
  background: #ffd700;
}

.background-second{
  background: #C0C0C0;
}

.background-third{
  background: #cd7f32;
}

.background-default{
  background: #bd9b8f;
}
.rankedBoard{
  color:white;
  text-transform: uppercase;
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  /* font-weight:normal; */
}

.record{
  padding:4px;
  margin:7px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius:3px;
}

.NavBar {
    /* width: 100%; */
    height: 40px;
    background: #5e4238;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.back {
  margin-left:10px;
  font-size: 2em; 
  color:white;
}
a{
  text-decoration: none;
}
</style>
