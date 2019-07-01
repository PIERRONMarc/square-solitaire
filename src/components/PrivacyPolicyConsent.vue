<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container d-flex justify-content-center align-items-center flex-column">
          <div class="modal-body">
            <p>
                La politique de confidentialité est disponible à l'adresse suivante : <br><br>
             <a href="http://pierron.ma.free.fr/squaresolitaire/privacy.html">http://pierron.ma.free.fr/squaresolitaire/privacy.html</a> 
             <br><br>
             Si vous êtes d'accord, cliquez sur le bouton ci-dessous pour continuer
            </p>
          </div>
          <div class="modal-footer d-flex flex-row">
            <button @click="accept"
              :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
  name: 'PrivacyPolicyConsent',
  computed: {
    ...mapState([
      'userInterface',
    ])
  },
  methods: {
    accept: function () {
      localStorage.PrivacyPolicyConsent = true;
      const bannerConfig = {
        id: 'ca-app-pub-8942917782695946/9712013613', //real id
        // id: 'ca-app-pub-3940256099942544/6300978111', //test id
        // isTesting: true,
        autoShow: true,
        bannerAtTop: true
      }
      admob.banner.config(bannerConfig);
      admob.banner.prepare();
      this.$emit("accepted");
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
  font-size: 0.8em;
  color: #ffffff;
  text-align: center;
  margin:10%;
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
</style>
