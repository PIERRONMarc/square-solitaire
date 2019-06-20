<template>
  <div class="container">
    <NavBar typeNavBar="rankedBar" title="COMMENT JOUER" />
    <div class="row d-flex flex-column justify-content-center wrapper">
      <p>
        Commencez par choisir lequel de vos pions vous voulez retirer du jeu. Puis déplacez-les horizontalement ou
        verticalement dans le but de n'en avoir plus qu'un seul.
      </p>
      <p>
        Pour chaque pion retiré du jeu vous gagné une étoile. Les étoiles servent à débloquer de nouvelles <router-link
          to="/customization" :style="{color: userInterface.pDarkColor}">personnalisations</router-link>.
      </p>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import NavBar from './NavBar.vue';

export default {
  name: 'Rules',
  computed: mapState([
    'userInterface'
  ]),
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  height: 100%;
}

.wrapper {
  height: 100%;
}

p {
  margin: 15px 20px 15px 20px;
  text-align: justify;
}

a {
  transition: all 0.5s;
  text-decoration: none;
  font-weight: bold;
}

img {
  margin: 15px;
}

</style>
