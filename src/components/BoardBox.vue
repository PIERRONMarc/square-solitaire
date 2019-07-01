<template>
  <div class="container-fluid">
    <transition name="modal">
      <VictoryModal v-if="showVictoryModal" />
      <PauseModal v-if="showPauseModal" />
    </transition>
    <div id="gamePage" :class="{ blur : showVictoryModal || showPauseModal}">
      <NavBar typeNavBar="gameBar"/>
      <div class="d-flex justify-content-center align-items-center flex-column boardWrapper">
         <transition name="router-anim" mode="out-in" enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut">
      <div v-show="status == 'LOST'" class="lost">Aucune solutions possibles..</div>
    </transition>
        <div class="boardBox d-flex" :style="[boardBoxClass, {background: userInterface.boardBackground}]">
          <div v-for="(row) in squares" :key="row.id" class="d-flex">
            <div v-for="(square) in row" :key="square.id" class="squareBox">
              <div class="square d-flex" @click="selectSquare(square)"
                :style="[square.cannotMove ? {'background': '#e94948'}:square.isSelected ? {'background': '#ffbb33'}:{'background': userInterface.squareBackground},square.isPossibleMove ? {'background': '#00C851'}:'' ]">
                <div :class="{ piece : square.isOccupied}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import VictoryModal from './VictoryModal.vue'
import PauseModal from './PauseModal.vue'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'BoardBox',
  data: function () {
    return {
      squares: [],
      lastSquareSelected: null,
      lastPossibleMoves: [],
      pieceNumber: 25,
      pieceLeft: null,
      showVictoryModal: false,
      showPauseModal: false

    }
  },
  components: {
    VictoryModal,
    PauseModal,
    NavBar
  },
  mounted: function () {
    this.setStatus('INIT');
    // this.setStatus('WIN');
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
      'status',
      'chrono',
      'stars',
      'userInterface',
    ])

  },
  watch: {
    //Status of the game
    status() {
      if (this.status == 'INIT') {
        // this.runChrono();
        this.showVictoryModal = false;
        this.squares = this.generateSquares();
        //adding reward
        if (this.pieceLeft != null) {
          let stars = this.pieceNumber - this.pieceLeft;
          if (this.pieceLeft != 1) {
            this.addStars(stars);
            this.setLastAddedStars(stars);
          }
          localStorage.stars = JSON.stringify(this.stars);
        }
        this.pieceLeft = this.pieceNumber;
        this.setStatus('FIRST CLICK');
      }
      if (this.status == 'WIN') {
        this.addStars(100);
        localStorage.stars = JSON.stringify(this.stars);
        this.showVictoryModal = true;
        //set up the rank
        let date = new Date();
        //because getMonth acts weirdly
        let month = date.getMonth() + 1;
        if(month < 10){
          month = '0' + month;
        }
        let day = date.getDate();
        if(day < 10)
        {
          day = '0' + day;
        }
        if (localStorage.rank == null) {
          let rank = [];
          rank.push({
            date: day + '/' + month + '/' + date.getFullYear(),
            chrono: {
              minutes: this.chrono.minutes,
              seconds: this.chrono.seconds,
              toString: this.chrono.toString
            }
          });
          localStorage.rank = JSON.stringify(rank);
        } else {
          let rank = JSON.parse(localStorage.rank);
          rank.push({
            date: day + '/' + month + '/' + date.getFullYear(),
            chrono: {
              minutes: this.chrono.minutes,
              seconds: this.chrono.seconds,
              toString: this.chrono.toString
            }
          });
          //sort the rank to keep the top 10
          rank.sort(function (a, b) {
            if (a.chrono.minutes < b.chrono.minutes) {
              return -1;
            } else if (a.chrono.minutes > b.chrono.minutes) {
              return 1;
            } else if (a.chrono.seconds < b.chrono.seconds) {
              return -1;
            } else if (a.chrono.seconds > b.chrono.seconds) {
              return 1;
            } else {
              return 0;
            }
          });
          rank = rank.slice(0, 10);
          localStorage.setItem("rank", JSON.stringify(rank));
        }
      }
      //set up the pause
      if (this.status == 'PAUSE') {
        this.showPauseModal = true;
        this.stopChrono();
      }
      if (this.status == 'IN GAME') {
        //set up the first piece to remove
        if (this.pieceLeft == this.pieceNumber) {
          this.setStatus('FIRST CLICK');
          //in case the game has been paused during the 'FIRST CLICK' status
          this.stopChrono();
          this.resetChrono();
        }
        this.showPauseModal = false;
        // this.runChrono();
      }
      //color all pieces background in red
      if(this.status == 'LOST'){
        this.stopChrono();
        this.squares.forEach(column => {
          column.forEach(square => {
            if(square.isOccupied == true){
              square.cannotMove = true;
            }
          })
        })
      }
    },
    pieceLeft() {
      //Check if the game is lost after a move
      if(this.status != 'FIRST CLICK'){
        this.checkLost();
      }
      //Win condition
      if (this.pieceLeft == 1) {
        this.setStatus('WIN');
        this.stopChrono();
      }
    }
  },
  methods: {
    ...mapMutations([
      'setStatus',
      'runChrono',
      'stopChrono',
      'resetChrono',
      'addStars',
      'setLastAddedStars'
    ]),
    Game: function () {
      this.setStatus('INIT');
    },
    // When a square is clicked
    selectSquare: function (square) {

      // Remove the first piece clicked
      if (this.status == 'FIRST CLICK') {
        square.isOccupied = false;
        this.pieceLeft--;
        this.setStatus('IN GAME');
        this.runChrono();
        return true;
      }
      if (this.status == 'IN GAME') {
        // Unselect the last square
        if (this.lastSquareSelected != null) {
          this.lastSquareSelected.isSelected = false;
          this.lastSquareSelected.cannotMove = false;
        }
        if (square.isOccupied == true) {
          square.isSelected = true;
          this.showPossibleMoves(square);
          this.lastSquareSelected = square;
        } else if (square.isOccupied == false && square.isPossibleMove == false) {
          this.resetPossibleMoves();
        }
        if (square.isPossibleMove == true) {
          this.makeMove(this.lastSquareSelected, square);
        }
      }
    },
    // Reset possible move from last click if there was 
    resetPossibleMoves: function () {
      if (this.lastPossibleMoves.length > 0) {
        this.lastPossibleMoves.forEach(square => {
          this.squares[square.x_axis][square.y_axis].isPossibleMove = false;
        });
      }
      this.lastPossibleMoves = [];
    },
    makeMove: function (fromSquare, toSquare) {
      fromSquare.isOccupied = false;
      toSquare.isOccupied = true;
      toSquare.isPossibleMove = false;
      // If move is vertical
      if (fromSquare.x_axis - toSquare.x_axis == 0) {
        // If move is upward
        if (fromSquare.y_axis - toSquare.y_axis == 2) {
          this.squares[toSquare.x_axis][toSquare.y_axis + 1].isOccupied = false;
          this.pieceLeft--;
        } else { // If move is downward
          this.squares[toSquare.x_axis][toSquare.y_axis - 1].isOccupied = false;
          this.pieceLeft--;
        }
      } else { // If move is horizontal
        //If move is left side
        if (fromSquare.x_axis - toSquare.x_axis == 2) {
          this.squares[toSquare.x_axis + 1][toSquare.y_axis].isOccupied = false;
          this.pieceLeft--;
        } else { // If move is right side
          this.squares[toSquare.x_axis - 1][toSquare.y_axis].isOccupied = false;
          this.pieceLeft--;
        }
      }
      this.resetPossibleMoves();
    },
    showPossibleMoves: function (square) {
      this.resetPossibleMoves();
      // If x-axis +2 exist AND is not occupied AND there is a square between them
      if (Array.isArray(this.squares[square.x_axis + 2]) && typeof this.squares[square.x_axis + 2][square.y_axis] != undefined && this.squares[square.x_axis + 2][square.y_axis].isOccupied == false && this.squares[square.x_axis + 1][square.y_axis].isOccupied == true) {
        this.squares[square.x_axis + 2][square.y_axis].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis + 2][square.y_axis]);
      }
      // If x-axis -2 exist AND is not occupied AND there is a square between them
      if (Array.isArray(this.squares[square.x_axis - 2]) && typeof this.squares[square.x_axis - 2][square.y_axis] != undefined && this.squares[square.x_axis - 2][square.y_axis].isOccupied == false && this.squares[square.x_axis - 1][square.y_axis].isOccupied == true) {
        this.squares[square.x_axis - 2][square.y_axis].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis - 2][square.y_axis]);
      }
      // If y-axis +2 exist AND is not occupied AND there is a square between them
      if (this.squares[square.x_axis][square.y_axis + 2] != undefined && this.squares[square.x_axis][square.y_axis + 2].isOccupied == false && this.squares[square.x_axis][square.y_axis + 1].isOccupied == true) {
        this.squares[square.x_axis][square.y_axis + 2].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis][square.y_axis + 2]);
      }
      // If y-axis -2 exist AND is not occupied AND there is a square between them
      if (this.squares[square.x_axis][square.y_axis - 2] != undefined && this.squares[square.x_axis][square.y_axis - 2].isOccupied == false && this.squares[square.x_axis][square.y_axis - 1].isOccupied == true) {
        this.squares[square.x_axis][square.y_axis - 2].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis][square.y_axis - 2]);
      }
      if(this.lastPossibleMoves.length == 0){
        square.cannotMove = true;
      }
    },
    //Check if the game is lost
    checkLost: function(){
      let lost = true;
      this.squares.forEach(column => {
        // if none of the moves is possible for all squares, then the game is lost
        column.forEach(square => {
          if(square.isOccupied == true){
            // If x-axis +2 exist AND is not occupied AND there is a square between them
            if (Array.isArray(this.squares[square.x_axis + 2]) && typeof this.squares[square.x_axis + 2][square.y_axis] != undefined && this.squares[square.x_axis + 2][square.y_axis].isOccupied == false && this.squares[square.x_axis + 1][square.y_axis].isOccupied == true) {
              lost = false;
            }
            // If x-axis -2 exist AND is not occupied AND there is a square between them
            if (Array.isArray(this.squares[square.x_axis - 2]) && typeof this.squares[square.x_axis - 2][square.y_axis] != undefined && this.squares[square.x_axis - 2][square.y_axis].isOccupied == false && this.squares[square.x_axis - 1][square.y_axis].isOccupied == true) {
              lost = false;
            }
            // If y-axis +2 exist AND is not occupied AND there is a square between them
            if (this.squares[square.x_axis][square.y_axis + 2] != undefined && this.squares[square.x_axis][square.y_axis + 2].isOccupied == false && this.squares[square.x_axis][square.y_axis + 1].isOccupied == true) {
              lost = false;
            }
            // If y-axis -2 exist AND is not occupied AND there is a square between them
            if (this.squares[square.x_axis][square.y_axis - 2] != undefined && this.squares[square.x_axis][square.y_axis - 2].isOccupied == false && this.squares[square.x_axis][square.y_axis - 1].isOccupied == true) {
              lost = false;
            }
          }
        })
      })
      if(lost == true){
        this.setStatus('LOST');
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
            isPossibleMove: false,
            cannotMove: false,
          }
          count++;
        }
      }
      return squares;
    }

  },
  //add reward for the current game when leaving the page
  beforeRouteLeave  (to, from, next) {
    if (this.pieceLeft != null) {
      let stars = this.pieceNumber - this.pieceLeft;
      if (this.pieceLeft != 1) {
        this.addStars(stars);
        this.setLastAddedStars(stars);
      }
      localStorage.stars = JSON.stringify(this.stars);
    }
    next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lost{
  position:absolute;
  top:0;
  margin-top:15vh;
}

#gamePage {
  height: 100%;
}

.container-fluid {
  height: 100%;
}

.boardWrapper {
  height: 100%;
}

.blur {
  filter: blur(15px);
}

.boardBox {
  flex-wrap: wrap;
  border-radius: 5%;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.squareBox {
  margin: 2px;
  width: 36px;
  height: 36px;

}

.squareBox .square {
  height: 100%;
  border-radius: 10%;
}

.background-selected {
  background: #ffbb33;
}

.background-possibleMove {
  background: #00C851;
}

.squareBox .square .piece {
  border-radius: 50%;
  width: 50%;
  height: 50%;
  margin: auto;
  background: white;
}
</style>
