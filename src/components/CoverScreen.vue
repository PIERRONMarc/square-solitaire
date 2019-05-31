<template>
  <div class="coverScreen d-flex justify-content-center flex-column">
    <div>
      <p>Titre</p>
    </div>
    <div>
      <router-link to="/board">
        <button>
          Nouvelle partie
        </button>
      </router-link>
    </div>
    <div>
      <router-link to="/ranked">
        <button>
          Mes records
        </button>
      </router-link>
    </div>
    <div>
      <router-link to="/rules">
        <button>
          Comment jouer
        </button>
      </router-link>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoverScreen'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .coverScreen {
    color: #ffffff;
    text-align: center;
    height:100%;
  }

  .vertical-center {
    min-height: 100%;
    /* Fallback for browsers do NOT support vh unit */
    min-height: 100vh;
    /* These two lines are counted as one :-)  */

    display: flex;
    align-items: center;
  }

  .title {
    margin-bottom: 10%;
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }

  .coverScreen button {
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

  .coverScreen button:hover {
    background-color: #F2744A;
  }
</style>