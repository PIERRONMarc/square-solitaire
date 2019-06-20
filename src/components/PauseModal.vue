<template>
  <div>
    <div class="modal">
      <div class="modal-mask">
        <div class="chronoWrapper row d-flex align-items-center">
          <div class="chrono">
            <p>{{ chrono.toString }} <span class="pipe">|</span> {{ stars }} <span class="icon icon-star"></span></p>
          </div>
        </div>
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <span class="icon-play_circle_outline" @click="back()"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {
  name: 'PauseModal',
  computed: {
    ...mapState([
      'chrono',
      'stars'
    ])
  },
  methods: {
    ...mapMutations([
      'setStatus',
    ]),
    back: function () {
      this.setStatus('IN GAME');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pipe {
  margin: 0px 10px 0px 10px;
}

.chrono {
  color: white;
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

.chronoWrapper {
  bottom: 0;
  width: 100%;
  height: 40px;
  position: fixed;
  opacity: 1;
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
  margin: 0px auto;
  padding: 20px 30px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 3em;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.modal-body {
  font-size: 10em;
  color: #ffffff;
  text-align: center;
}

.modal-footer {
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
}

.modal-container button {
  margin-top: 35px;
  width: 150px;
  height: 50px;
  border: 1px solid #ccc;
  border-width: 0 0 2px 0;
  border-radius: 4px;
  border-bottom-color: #5e4238;
  color: #fff;
  background-color: #bd9b8f;
  text-transform: uppercase;
  text-align: center;
  text-shadow: none;
  line-height: 50px;
  letter-spacing: 1px;
  box-shadow: inset 0 -2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
