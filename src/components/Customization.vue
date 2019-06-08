<template>
  <div class="container-fluid" style="height:100%">
    <div id="customizationPage" style="height:100%">
      <NavBar typeNavBar="customizationBar"/>
      <div class="d-flex justify-content-center align-items-center flex-column" style="height:80%">
        <div class="boardBox d-flex" :style="[boardBoxClass, {background: userInterface.boardBackground}]">
          <div v-for="(row) in squares" :key="row.id" class="d-flex">
            <div v-for="(square) in row" :key="square.id" class="squareBox">
              <div class="square d-flex background-default" :style="{background: userInterface.squareBackground}">
                <div class="piece"></div>
              </div>
            </div>
          </div>
        </div>
        <vueper-slides @slide="onSlideChange" class="no-shadow" :bullets="false" style="width: 80%;max-width: 100%;" :dragging-distance="10" transition-speed="250" ref="vueperSlides">
          <vueper-slide v-for="(customization, name) in customizations" :key="name" :content="name"></vueper-slide>
        </vueper-slides>
        <div>
          <div v-if="currentUi.state === 'unlocked' || currentUi.state === 'currentlyUsed'" @click="selectUi()">
            <div class="container test" :style="{background: userInterface.pLightColor, 'border-bottom-color': userInterface.pDarkColor}" :class="{active : currentUi.state == 'currentlyUsed'}">
              <span class="text">Appliquer</span>
              <span class="icon-check ok"></span>
            </div>
          </div>
          <div v-else-if="currentUi.state === 'locked'">
            <button class="btn" style="background:#e94948;border-bottom-color:#b00020">
              {{ customizations[currentUi.name].starsRequired}} étoiles requises <span class="icon icon-lock" style="color:white;font-size:1em"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import {
  mapState,
  mapMutations
} from 'vuex'
import {
  customization
} from '../customization.js'
import {
  VueperSlides,
  VueperSlide
} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'Customization',
  data: function () {
    return {
      squares: [],
      lastSquareSelected: null,
      lastPossibleMoves: [],
      pieceNumber: 25,
      pieceLeft: null,
      customizations: customization,
      currentUi: {
        state: '',
        name: ''
      }
    }
  },
  mounted: function () {
    this.squares = this.generateSquares();
    this.$refs.vueperSlides.goToSlide(this.userInterface.index);
    this.currentUi.state = 'currentlyUsed'
  },
  components: {
    VueperSlides,
    VueperSlide,
    NavBar
  },
  computed: {
    //Define the size of the squares
    boardBoxClass() {
      const nSquare = Math.sqrt(this.pieceNumber); // square nombers
      const boxSize = `${44 * nSquare}px`; // 40 = square width ( width + margin 2 * 2 )
      return {
        width: boxSize,
        height: boxSize
      };
    },
    ...mapState([
      'userInterface',
      'stars'
    ])

  },
  methods: {
    ...mapMutations([
      'setUserInterface'
    ]),
    selectUi: function () {
      let ui = JSON.stringify(this.userInterface);
      localStorage.userInterface = ui;
      this.currentUi.state = 'currentlyUsed';
    },
    onSlideChange: function (eventName, params) {
      let ui = customization[params.currentSlide.content];
      let localStorageUi = JSON.parse(localStorage.userInterface);
      this.setUserInterface(ui);
      this.currentUi.state = '';
      if (ui.index == localStorageUi.index) {
        this.currentUi.state = 'currentlyUsed'
        this.currentUi.name = params.currentSlide.content;
      } else if (this.stars < customization[params.currentSlide.content].starsRequired) {
        this.currentUi.state = 'locked';
        this.currentUi.name = params.currentSlide.content;
      } else if (this.stars >= customization[params.currentSlide.content].starsRequired) {
        this.currentUi.state = 'unlocked';
        this.currentUi.name = params.currentSlide.content;
      }
    },
    generateSquares: function () {
      let squares = new Array();
      let count = 0; // To remove if square.id is not used in the program
      for (let i = 0; i < Math.round(Math.sqrt(this.pieceNumber)); i++) {
        squares[i] = new Array();
        for (let j = 0; j < Math.round(Math.sqrt(this.pieceNumber)); j++) {
          squares[i][j] = {
            id: count,
            y_axis: j,
            x_axis: i,
            isOccupied: true,
            isSelected: false,
            isPossibleMove: false
          }
          count++;
        }
      }
      return squares;
    }

  },
  destroyed: function () {
    //cause of a "bug" causing slide event to trigger when going to coverScreen
    this.setUserInterface(JSON.parse(localStorage.userInterface));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#customizationPage {
  color: white;
  text-transform: uppercase;
  font-family: 'Montserrat', 'Arial', 'Helvetica', 'sans-serif';
}

.title {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

.NavBar {
  height: 40px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.back {
  margin-left: 10px;
  font-size: 2em;
  color: white;
}

a {
  text-decoration: none;
}

.boxWrapper {
  width: 100%;
  height: 476px;
}

.boardBox {
  flex-wrap: wrap;
  border-radius: 5%;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.squareBox {
  margin: 2px;
  perspective: 1000px;
  width: 36px;
  height: 36px;

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

.btn {
  padding: .650rem 1.5rem;
  border: 1px solid #ccc;
  border-width: 0 0 2px 0;
  border-radius: 4px;
  border-bottom-color: #5e4238;
  color: #fff;
  background-color: #bd9b8f;
  text-transform: uppercase;
  text-align: center;
  text-shadow: none;
  line-height: 1.5;
  letter-spacing: 1px;
  box-shadow: inset 0 -2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  height: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

}

.container {
  align-items: center;
  background-color: #bd9b8f;
  border-bottom-color: #5e4238;
  color: #fff;
  text-transform: uppercase;
  line-height: 1.5;
  letter-spacing: 1px;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: center;
  width: 150px;
  height: 50px;
  animation-fill-mode: forwards;

}

.text {
  color: white;
  position: absolute;
  transition: opacity 300ms;
  user-select: none;
  -moz-user-select: none;
  animation-fill-mode: forwards;
}

.ok {
  opacity: 0;
  animation-fill-mode: forwards;
}

.active.container {
  animation: 1.5s Container;
  animation-fill-mode: forwards;
}

.active .text {
  opacity: 0;
  animation: 1.5s Text forwards;
}

.active .ok {
  opacity: 1;
  animation: 1.5s Ok forwards;
}

@keyframes Container {
  0% {
    width: 150px
  }

  6% {
    width: 53px;
    border-radius: 40px;
  }

  6% {
    transform: scale(1);
  }

  12% {
    transform: scale(1.2);
  }

  20% {
    transform: scale(1);
  }

  100% {
    width: 53px;
    border-radius: 40px;
  }
}

@keyframes Text {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  6% {
    opacity: 0;
    transform: scale(0.5);
  }

  94% {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes Ok {
  0% {
    opacity: 0
  }

  12% {
    opacity: 1;
    transform: scale(1.5);
  }

  20% {
    opacity: 1;
    transform: scale(1);
  }

  93% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
