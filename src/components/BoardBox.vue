<template>
  <div>
    <p>KAKTUS LA TRUITE</p>
    <div id="boardBox" class="boxWrapper">
      <div class="boardBox" :style="boardBoxClass">
        <div v-for="(row, rowIndex) in squares" :key="row.id">
          <div v-for="(column, columnIndex) in row" :key="column.id" class="square">
            <div class="flipper">
              <div class="front">{{columnIndex}}</div>
              <div class="back">
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
  computed : {
    boardBoxClass () {
      const nSquare = Math.sqrt(25); // square nombers
      const boxSize = `${40 * nSquare}px`; // 40 = square width ( width + margin 2 * 2 )
      return { width: boxSize, height: boxSize };
    },
    squares : function () {
      let squares = new Array();
      for (let i = 0; i < 5; i++) {
        squares[i] = new Array();
        for (let j = 0; j < 5; j++) {
          squares[i][j] = true;
        }
      }
      return squares;
    }
    
  },
  props: {
    square: Array
    
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
.square .flipper.isSelected {
  transform: rotateX(180deg);
}
.square .flipper .front, .square .flipper .back {
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
  transform: rotateX(0deg);
  background: #714a43;
}
.square .back {
  transform: rotateX(180deg);
}
.square .back .result {
  width: 100%;
  height: 100%;
}
.square .back .result.correct {
  background: #4eafb5;
}
.square .back .result.wrong {
  background: #ff7000;
}
.square .back .result.endCorrect {
  background: #51a729;
}
.square .back svg {
  padding: 8px;
  font-size: 20px;
  color: #feffff;
}
@media (hover:hover) {
 .square .front:hover {
    background: #9e7063;
  }
}

</style>
