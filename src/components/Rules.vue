<template>
  <div class="container-fluid">
    <NavBar typeNavBar="rankedBar" title="COMMENT JOUER" />
    <div class="row d-flex flex-column justify-content-center wrapper">
      <p>
        <!-- Commencez par choisir lequel de vos pions vous voulez retirer du jeu. Puis déplacez-les horizontalement ou
        verticalement dans le but de n'en avoir plus qu'un seul. -->
        Pour jouer, commencez par choisir lequel de vos pions vous voulez retirer du jeu. Pour supprimer des pions, il faut que deux pions soient adjacents et suivis d'une case vide. Le premier pion « saute » par-dessus le deuxième et rejoint la case vide. Le deuxième pion est alors retiré du plateau. Un pion ne peut sauter qu'horizontalement ou verticalement, et un seul pion à la fois. Vous gagnez quand il n'en reste plus qu'un seul.
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

.container-fluid {
  height: 100%;
}

.wrapper {
  height: 100%;
}

p {
  margin: 15px 20px 15px 20px;
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
