<template>
  <div class="container-fluid" style="height:100%">
    <transition name="modal">
      <VictoryModal v-if="showVictoryModal"/>
      <PauseModal v-if="showPauseModal" />
    </transition>
    <div id="gamePage" :class="{ blur : showVictoryModal || showPauseModal}" style="height:100%">
      <div class="row">
        <GameBar/>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column" style="height:80%">
          
       
            <div class="boardBox d-flex" :style="boardBoxClass">
              <div v-for="(row) in squares" :key="row.id" class="d-flex">
                <div v-for="(square) in row" :key="square.id" class="squareBox">
                  <div class="square d-flex" @click="selectSquare(square)"
                    :class="[(square.isSelected ? 'background-selected' : 'background-default'), (square.isPossibleMove ? 'background-possibleMove' : '')]">
                    <div :class="{ piece : square.isOccupied}"></div>
                  </div>
                </div>
              </div>
            </div>
          
          <!-- <div class="d-flex ">

         
            
            <span class="icon-pause_circle_outline pause" @click="pause()"></span>
          
          </div> -->

      </div>
      
        
    </div>
  </div>
</template>

<script>
import GameBar from './GameBar.vue'
import VictoryModal from './VictoryModal.vue'
import PauseModal from './PauseModal.vue'
import {mapState, mapMutations} from 'vuex'

// const admob = require("nativescript-admob);
// import adMob from 'nativescript-admob'

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
    GameBar,
    VictoryModal,
    PauseModal
  },
  //Only for dev purpose
  mounted: function () {
    this.setStatus('INIT');
//     admob.createBanner({
//     // if this 'view' property is not set, the banner is overlayed on the current top most view
//     // view: ..,
//     testing: true, // set to false to get real banners
//     size: size, // anything in admob.AD_SIZE, like admob.AD_SIZE.SMART_BANNER
//     // iosBannerId: "ca-app-pub-XXXXXX/YYYYYY", // add your own
//     androidBannerId: "ca-app-pub-8942917782695946~1887641711", // add your own
//     // Android automatically adds the connected device as test device with testing:true, iOS does not
//     // iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
//     margins: {
//     // if both are set, top wins
//     //top: 10
//     bottom: 50
//     },
//     keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
//     }).then(
//     function() {
//     console.log("admob createBanner done");
//     },
//     function(error) {
//     console.log("admob createBanner error: " + error);
//     }
// )
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
      'chrono'
    ])

  },
  watch: {
    //Status of the app
    status() {
      if (this.status == 'INIT') {
        this.runChrono();
        this.showVictoryModal = false;
        this.squares = this.generateSquares();
        this.pieceLeft = this.pieceNumber;
        this.setStatus('FIRST CLICK');
      }
      if(this.status == 'WIN'){
        this.showVictoryModal = true;
        let date = new Date();
        if (localStorage.rank == null) {
          let rank = [];
          rank.push({
            date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
            chrono: {
              minutes: this.chrono.minutes,
              seconds: this.chrono.seconds,
              toString: this.chrono.toString
            }
          });
          // localStorage.setItem("rank", JSON.stringify(rank));
          localStorage.rank = JSON.stringify(rank);
        } else {
          let rank = JSON.parse(localStorage.rank);
          rank.push({
            date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
            chrono: {
              minutes: this.chrono.minutes,
              seconds: this.chrono.seconds,
              toString: this.chrono.toString
            }
          });
          // console.log(rank)
          localStorage.setItem("rank", JSON.stringify(rank));
        }
      }
      if(this.status == 'PAUSE'){
        this.showPauseModal = true;
        this.stopChrono();
      }
      if(this.status == 'IN GAME'){
        if(this.pieceLeft == this.pieceNumber){
          this.setStatus('FIRST CLICK');
        }
        this.showPauseModal = false;
        this.runChrono();
      }
    },
    pieceLeft(){
      if(this.pieceLeft == 1){
        this.setStatus('WIN');
        this.stopChrono();
       
      }
    }
  },
  methods: {
   ...mapMutations([
     'setStatus',
     'runChrono',
     'stopChrono'
   ]),
  //  pause: function() {
  //    this.setStatus('PAUSE');
  //  },
    restartGame: function(){
      this.setStatus('INIT');
    },
    // When a square is clicked
    selectSquare: function (square) {
     
      // Remove the first piece clicked
      if (this.status == 'FIRST CLICK') {
        square.isOccupied = false;
        this.pieceLeft--;
        this.setStatus('IN GAME');
        return true;
      }
      if (this.status == 'IN GAME') {
        // Unselect the last square
        if (this.lastSquareSelected != null) {
          this.lastSquareSelected.isSelected = false;
        }
        if (square.isOccupied == true) {
          square.isSelected = true;
          this.showPossibleMoves(square);
          this.lastSquareSelected = square;
        } else if(square.isOccupied == false && square.isPossibleMove == false){
          this.resetPossibleMoves();
        }
        if(square.isPossibleMove == true){
          this.makeMove(this.lastSquareSelected, square);
        }
      }
    },
    resetPossibleMoves: function () {
      // Reset possible move from last click if there was 
      if(this.lastPossibleMoves.length > 0){
        this.lastPossibleMoves.forEach(square => {
          this.squares[square.x_axis][square.y_axis].isPossibleMove = false;
        });
      }
      this.lastPossibleMoves = [];
    },
    makeMove: function(fromSquare, toSquare){
      fromSquare.isOccupied = false;
      toSquare.isOccupied = true;
      toSquare.isPossibleMove = false;
      // If move is vertical
      if(fromSquare.x_axis - toSquare.x_axis == 0 ){
        // If move is upward
        if(fromSquare.y_axis - toSquare.y_axis == 2){
          this.squares[toSquare.x_axis][toSquare.y_axis + 1].isOccupied = false;
          this.pieceLeft--;
        } else { // If move is downward
          this.squares[toSquare.x_axis][toSquare.y_axis - 1].isOccupied = false;
          this.pieceLeft--;
        } 
      } else { // If move is horizontal
        //If move is left side
        if(fromSquare.x_axis - toSquare.x_axis == 2){
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.blur {
  filter:blur(15px);
  /* transition-duration: .3s ease; */
}

.pause {
  color:white;
  font-size:5em;
  text-align:center;
}

.boxWrapper {
  width: 100%;
  height: 476px;
}
.boardBox {
  flex-wrap: wrap;
  /* background: #5e4238; */
  /* background: url("../assets/wood.png"); */
  background: url("../assets/wood/1.jpg");
  border-radius:5%;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.squareBox {
  margin: 2px;
  perspective: 1000px;
  width: 36px;
  height: 36px;
  
}
.squareBox .square {
  height: 100%;
  border-radius:10%;
}
.background-default {
  /* background: #bd9b8f; */
  background: url("../assets/wood/1.1.jpg");
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
  margin:auto;
  background: white;
}
</style>
