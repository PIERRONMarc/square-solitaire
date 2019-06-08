<template>

        <div class="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container d-flex justify-content-center align-items-center flex-column">
                        <div class="modal-header">
                            <p>You win !</p>
                        </div>
                        <div class="modal-body">
                            <p>Temps : <span style="margin-left:30px">{{ chrono.toString }}</span></p>
                        </div>
                        <div class="modal-footer d-flex flex-row">
                            <button @click="restartGame" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">Rejouer</button>
                            <button style="margin-left:30px" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">Noter l'app</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    
</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {
  name: 'VictoryModal',
  computed: {
    ...mapState([
      'chrono',
      'status',
      'userInterface'
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
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
  height:100%;
  /* margin: 0px auto; */
  /* padding: 20px 30px; */
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 3em;
  color: #ffffff;
  text-align:center;
  text-transform: uppercase;
  font-weight:bold;
  margin-bottom: 10%;
}

.modal-body {
  font-size: 2em;
  color: #ffffff;
  text-align:center;
  margin-bottom: 10%;
}

.modal-footer {
  color: #ffffff;
  text-align:center;
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
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); 
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
