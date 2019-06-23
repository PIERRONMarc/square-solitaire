<template>
  <div class="coverScreen">
    <PrivacyPolicyConsent v-if="showPrivacyPolicyConsent" v-on:accepted="accepted"/>
    <div :class="{ blur : showPrivacyPolicyConsent}">
      <div class="squareBox">
        <div class="square d-flex" :style="{'background': userInterface.squareBackground}">
          <div class="piece"></div>
        </div>
      </div>
      <span class="title">Square Solitaire</span>
    </div>
    <div class="wrapper d-inline-flex justify-content-around flex-column" :class="{ blur : showPrivacyPolicyConsent}">
      <router-link to="/board" class="btn" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
        Nouvelle partie <span class="icon-keyboard_arrow_right icon"></span>
      </router-link>
      <router-link to="/ranked" class="btn" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
        Mes records <span class="icon-keyboard_arrow_right icon"></span>
      </router-link>
      <router-link to="/customization" class="btn" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
        Personnalisation <span class="icon-keyboard_arrow_right icon"></span>
      </router-link>
      <router-link to="/rules" class="btn" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">
        Comment jouer <span class="icon-keyboard_arrow_right icon"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import PrivacyPolicyConsent from './PrivacyPolicyConsent.vue'

  export default {
    name: 'CoverScreen',
    data: function(){
      return{
        showPrivacyPolicyConsent: null
      }
    },
    computed: {
      ...mapState([
        'userInterface'
      ])
    },
    components:{
      PrivacyPolicyConsent
    },
    mounted:function(){
      if(localStorage.PrivacyPolicyConsent == null){
        this.showPrivacyPolicyConsent = true;
      }
    },
    methods: {
      accepted:function(){
        this.showPrivacyPolicyConsent = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.blur {
  filter: blur(15px);
}

.icon {
  float: right;
}

.wrapper {
  padding-top: 10%;
  height:90%;
}

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
  

}

.squareBox .square {
  height: 100%;
  border-radius: 10%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
  padding-bottom: 10%;
  padding-top: 10%;
  /* display:inline-flex; */
}

a {
  text-decoration: none;
  color: #ffffff;
}

.btn {
  /* font-family:arial; */
  padding: 1rem;
  font-size: 13px;
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
}

span {
  font-size: 1.1em;
}
</style>