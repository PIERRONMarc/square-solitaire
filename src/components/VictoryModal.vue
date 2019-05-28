<template>
        <div class="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <p>You win</p>
                        </div>
                        <div class="modal-body">
                            Temps : <span style="margin-left:30px">00 : 00</span>
                        </div>
                        <div class="modal-footer">
                            <button @click="restartGame">Rejouer</button>
                            <button style="margin-left:30px">Noter l'app</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</template>

<script>

export default {
  name: 'VictoryModal',
  methods: {
    restartGame: function () {
        this.$emit('restart-game');
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
  margin: 0px auto;
  padding: 20px 30px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 3em;
  color: #ffffff;
  text-align:center;
  text-transform: uppercase;
  font-weight:bold;
}

.modal-body {
  font-size: 2em;
  color: #ffffff;
  text-align:center;
}

.modal-footer {
  color: #ffffff;
  text-align:center;
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
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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
