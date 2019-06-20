<template>
  <div class="coverScreen d-flex justify-content-center flex-column">
    <div>
      <div class="squareBox">
        <div class="square d-flex" :style="{'background': userInterface.squareBackground}">
          <div class="piece"></div>
        </div>
      </div>
      <span class="title">Square Solitaire</span>
    </div>
    <div>
      <router-link to="/board">
        <button :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
          Nouvelle partie <span class="icon-keyboard_arrow_right"></span>
        </button>
      </router-link>
    </div>
    <div>
      <router-link to="/ranked">
        <button :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
          Mes records <span class="icon-keyboard_arrow_right"></span>
        </button>
      </router-link>
    </div>
    <div>
      <router-link to="/customization">
        <button :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
          Customisation <span class="icon-keyboard_arrow_right"></span>
        </button>
      </router-link>
    </div>
    <div>
      <router-link to="/rules">
        <button :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
          Comment jouer <span class="icon-keyboard_arrow_right"></span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {
    name: 'CoverScreen',
    computed: {
      ...mapState([
        'userInterface'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-left: 10px;
  font-size: 2em;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
    0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;


}

.squareBox {
  display: inline-block;
  margin: 2px;
  width: 36px;
  height: 36px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

}

.squareBox .square {
  height: 100%;
  border-radius: 10%;
}

.squareBox .square .piece {
  border-radius: 50%;
  width: 50%;
  height: 50%;
  margin: auto;
  background: white;
}

.coverScreen {
  color: #ffffff;
  text-align: center;
  height: 100%;
}

a {
  text-decoration: none;
  color: #ffffff;
}

.coverScreen button {
  margin-top: 35px;
  width: 170px;
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
  outline: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

span {
  font-size: 1.1em;
}

</style>