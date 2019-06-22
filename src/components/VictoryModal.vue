<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container d-flex justify-content-center align-items-center flex-column">
          <div class="modal-header">
            <h3 class="ribbon">
              <strong class="ribbon-inner">Victoire !</strong>
            </h3>
          </div>
          <div class="modal-body">
            <p>
              <span class="icon-timer icon"></span><span>{{ chrono.toString }}</span><br>
              <span class="icon-star icon"></span><span>+ 100</span>
            </p>
          </div>
          <div class="modal-footer d-flex flex-row">
            <button @click="restartGame"
              :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">Rejouer</button>
            <a v-bind:href=" 'market://details?id=' + pkgname" ><button style="margin-left:30px"
              :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">Noter
              l'app</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex';
import confetti from 'canvas-confetti';

export default {
  name: 'VictoryModal',
  data: function () {
    return {
      idIntervalConfetti: null, //to stop confetti when leaving the modal
      pkgname:null
    }
  },
  computed: {
    ...mapState([
      'chrono',
      'status',
      'userInterface',
    ])
  },
  methods: {
    ...mapMutations([
      'setStatus',
      'resetChrono'
    ]),
    restartGame: function () {
      this.setStatus('INIT');
      this.resetChrono();
      clearInterval(this.idIntervalConfetti);
    },
  },
  mounted: function () {
    let end = Date.now() + (15 * 1000);
    this.idIntervalConfetti = setInterval(function () {
      if (Date.now() > end) {
        return clearInterval(this.idIntervalConfetti);
      }
      confetti({
        startVelocity: 25,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      });
    }, 200);
    cordova.getAppVersion.getPackageName(pkgname => {
      // com.companyname.appname
      this.pkgname = pkgname;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* RIBBON */

.ribbon {
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  font-size: 20px !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 70%;
  position: relative;
  background: #f35b5b;
  color: #fff;
  text-align: center;
  padding: 1em 2em;
  margin: 1em auto 2em
}

.ribbon:after,
.ribbon:before {
  content: "";
  position: absolute;
  display: block;
  bottom: -1em;
  border: 1.5em solid #d74545;
  z-index: -1
}

.ribbon:before {
  left: -2em;
  border-right-width: 1.5em;
  border-left-color: transparent
}

.ribbon:after {
  right: -2em;
  border-left-width: 1.5em;
  border-right-color: transparent
}

.ribbon .ribbon-inner:after,
.ribbon .ribbon-inner:before {
  content: "";
  position: absolute;
  display: block;
  border-style: solid;
  border-color: #b23232 transparent transparent;
  bottom: -1em
}

.ribbon .ribbon-inner:before {
  left: 0;
  border-width: 1em 0 0 1em
}

.ribbon .ribbon-inner:after {
  right: 0;
  border-width: 1em 1em 0 0
}

/* </RIBBON> */

.icon {
  margin-right: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  height: 100%;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 3em;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  width: 100%;
}

.modal-body {
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  font-size: 1.5em;
  color: #ffffff;
  text-align: left;
}

.modal-footer {
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
}

.modal-container button {
  padding: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  text-shadow: none;
  background-color: #bd9b8f;
  color: #fff;
  border: 1px solid #ccc;
  border-width: 0 0 2px 0;
  border-radius: 4px;
  border-bottom-color: #5e4238;
  outline: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-top: 35px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
