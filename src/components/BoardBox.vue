<template>
  <div>
    <div id="boardBox" class="boxWrapper">
      <div class="boardBox" :style="boardBoxClass">
        <div v-for="(row, rowIndex) in squares" :key="row.id">
          <div v-for="(square, columnIndex) in row" :key="square.id" class="square">
            <div class="flipper">
              <div class="front" v-on:click="selectSquare(square)"
                :class="[(square.isSelected ? 'background-selected' : 'background-default'), (square.isPossibleMove ? 'background-possibleMove' : '')]">
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
export default {
  name: 'BoardBox',
  data: function () {
    return {
      status: '',
      squares: [],
      lastSquareSelected: null,
      lastPossibleMoves: []
    }
  },
  //Only for dev purpose
  mounted: function () {
    this.status = 'INIT';
  },
  computed: {
    //Define the size of the squares
    boardBoxClass() {
      const nSquare = Math.sqrt(25); // square nombers
      const boxSize = `${40 * nSquare}px`; // 40 = square width ( width + margin 2 * 2 )
      return {
        width: boxSize,
        height: boxSize
      };
    }

  },
  watch: {
    //Status of the app
    status() {
      if (this.status == 'INIT') {
        this.squares = this.generateSquares();
        this.status = 'FIRST CLICK';
      }
    }
  },
  methods: {

    // When a square is clicked
    selectSquare: function (square) {
      // Remove the first piece clicked
      if (this.status == 'FIRST CLICK') {
        square.isOccupied = false;
        this.status = 'IN GAME';
        return true;
      }
      if (this.status == 'IN GAME') {
        // Refresh the square currently selected
        if (this.lastSquareSelected != null) {
          this.squares[this.lastSquareSelected.x_axis][this.lastSquareSelected.y_axis].isSelected = false;
        }
        this.lastSquareSelected = square;
        if (square.isOccupied == true) {
          square.isSelected = true;
          this.showPossibleMoves(square);
        }
      }

    },
    showPossibleMoves: function (square) {
      // Reset possible move from last click if there was 
      if(this.lastPossibleMoves.length > 0){
        this.lastPossibleMoves.forEach(square => {
          console.log(square);
          this.squares[square.x_axis][square.y_axis].isPossibleMove = false;
        });
      }
      this.lastPossibleMoves = [];
      // If x-axis +2 exist AND is not occupied
      if (Array.isArray(this.squares[square.x_axis + 2]) && typeof this.squares[square.x_axis + 2][square.y_axis] != undefined && this.squares[square.x_axis + 2][square.y_axis].isOccupied == false) {
        this.squares[square.x_axis + 2][square.y_axis].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis + 2][square.y_axis]);
      }
      // If x-axis -2 exist AND is not occupied
      if (Array.isArray(this.squares[square.x_axis - 2]) && typeof this.squares[square.x_axis - 2][square.y_axis] != undefined && this.squares[square.x_axis - 2][square.y_axis].isOccupied == false) {
        this.squares[square.x_axis - 2][square.y_axis].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis - 2][square.y_axis]);
      }
      // If y-axis +2 exist AND is not occupied
      if (this.squares[square.x_axis][square.y_axis + 2] != undefined && this.squares[square.x_axis][square.y_axis + 2].isOccupied == false) {
        this.squares[square.x_axis][square.y_axis + 2].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis][square.y_axis + 2]);
      }
      // If y-axis -2 exist AND is not occupied
      if (this.squares[square.x_axis][square.y_axis - 2] != undefined && this.squares[square.x_axis][square.y_axis - 2].isOccupied == false) {
        this.squares[square.x_axis][square.y_axis - 2].isPossibleMove = true;
        this.lastPossibleMoves.push(this.squares[square.x_axis][square.y_axis - 2]);
      }
    },
    generateSquares: function () {
      let squares = new Array();
      let count = 0; // To remove if square.id is not used in the program
      for (let i = 0; i < 5; i++) {
        squares[i] = new Array();
        for (let j = 0; j < 5; j++) {
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
.boxWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 476px;
}
.boardBox {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: -10px;
  padding: 10px;
  background: #3a2a25;
  transition: all .2s ease-out;
}
.square {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2px;
  perspective: 1000px;
}
.square .flipper {
	position: relative;
  width: 36px;
  height: 36px;
  transition: 0.5s;
	transform-style: preserve-3d;
}

.square .flipper .front {
	position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
	top: 0;
	left: 0;
  backface-visibility: hidden;
}
.square .front {
  z-index: 2;
  display:flex;
  transform: rotateX(0deg);
  
}

.background-default {
  background: #714a43;
}

.background-selected {
  background: orange;
}

.background-possibleMove {
  background: green;
}

.square .front .piece {
  border-radius: 50%;
  width: 50%;
  height: 50%;
  margin:auto;
  background: white;
}

/* @media (hover:hover) {
 .square .front:hover {
    background: #9e7063;
  }
} */

</style>
