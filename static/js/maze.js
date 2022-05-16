/* TODO:
-i think algo works well enough so... ✓
-draw actual maze using final grid ✓
-Add player + movement ✓
-finish function checkIfValid ✓
-fin?
*/

/*
-each cell: 50x50
-each cell contains a denary integer, when converted to binary will show which
walls are present.
*/

//Prevents arrow key scrolling:
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//LOGIC (maze):
let visited = {} //object that holds visited cells, acts as global var
function generateMaze() {
  var grid = [
  // 0   1   2   3   4   5   6   7   8   9
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //0
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //1
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //2
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //3
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //4
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //5
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //6
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //7
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //8
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], //9
  ]; // acts as global (due to 'var')
  let initial = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
  let key = initial[0].toString()+initial[1].toString();
  visited[parseInt(key)] = true;
  backtracker(initial, grid);
  return grid;
};

function backtracker(current, grid) {
  let unvisitedCells = unvisited(current);
  while (unvisitedCells.length > 0) {
    let randChoice = Math.floor(Math.random()*unvisitedCells.length);
    let chosen = unvisitedCells.splice(randChoice, 1);
    chosen = chosen[0];
    let tmpCheck = (chosen[0]).toString()+(chosen[1]).toString();
    if (visited[parseInt(tmpCheck)] !== true) {
      removeWall(current, chosen, grid);
      let tmpKey = (chosen[0]).toString()+(chosen[1]).toString();
      visited[parseInt(tmpKey)] = true;
      backtracker(chosen, grid);
    };
  };
};

//e.g. unvisited([5, 4], dict)
function unvisited(cell) { // returns an array of unvisited cells/indexes (empty if all visited)
  let out = [];
  if (cell[0] !== 0) { //if cell not at the top of grid
    let tmpKey = (cell[0]-1).toString()+(cell[1]).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0]-1,cell[1]]);
    };
  };
  if (cell[1] !== 9) { //if cell not at right edge of grid
    let tmpKey = (cell[0]).toString()+(cell[1]+1).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0],cell[1]+1]);
    };
  };
  if (cell[0] !== 9) { //if cell not at bottom of grid
    let tmpKey = (cell[0]+1).toString()+(cell[1]).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0]+1,cell[1]]);
    };
  };
  if (cell[1] !== 0) { //if cell not at left edge of grid
    let tmpKey = (cell[0]).toString()+(cell[1]-1).toString();
    if (visited[parseInt(tmpKey)] !== true) {
      out.push([cell[0],cell[1]-1]);
    };
  };
  return out;
};

function removeWall(current, chosen, grid) {
  if (chosen[0] > current[0]) { //i.e. if chosen is below current
    grid[current[0]][current[1]] -= 4;
    grid[chosen[0]][chosen[1]] -= 1;
  } else if (chosen[0] < current[0]) { //i.e. if chosen is above current
    grid[current[0]][current[1]] -= 1;
    grid[chosen[0]][chosen[1]] -= 4;
  } else if (chosen[1] < current[1]) { //i.e. if chosen is to left of current
    grid[current[0]][current[1]] -= 8;
    grid[chosen[0]][chosen[1]] -= 2;
  } else if (chosen[1] > current[1]) { //i.e. if chosen is to right of current
    grid[current[0]][current[1]] -= 2;
    grid[chosen[0]][chosen[1]] -= 8;
  };
};

function fourBitBinary(number) {
  let tmp = number.toString(2);
  while (tmp.length < 4)  {
    tmp = "0" + tmp;
  }
  return tmp;
} // returns a four bit binary number (as a string)

//VISUALS:
//some global scope variables:
let playerX = 25;
let playerY = 25;
let gridLogic; // array that holds grid
let won = false;

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.parent("mazeCanvas");
  rect(0, 0, 500, 500);
  noLoop(); //draw does not repeatedly execute
};

function draw() {
  background(254);
  gridLogic = generateMaze();
  let x = 0;
  let y = 0;
  for (let array of gridLogic) {
    for (let num of array) {
      let binStr = fourBitBinary(num);
      if (binStr[3] === "1") {
        line(x, y, (x+50), y);
      }
      if (binStr[0] === "1") {
        line(x, y, x, (y+50));
      }
      x += 50;
    }
    x = 0;
    y += 50;
  }
  line(500, 0, 500, 500);
  line(0, 500, 500, 500);
  fill('red');
  circle(playerX, playerY, 25);
  fill('green');
  triangle(475, 490, 460, 470, 490, 470);
};

function keyPressed() {
  if (keyCode === 32) { //if spacebar was pressed:
    won = false;
    playerX = 25;
    playerY = 25;
    visited = {};
    clear();
    redraw();
  } else if (won) {
    return;
  } else if (keyCode === RIGHT_ARROW && checkIfValid(2)) { //move right
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerX += 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === LEFT_ARROW && checkIfValid(4)) { //move left
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerX -= 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === UP_ARROW && checkIfValid(1)) { //move up
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerY -= 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === DOWN_ARROW && checkIfValid(3)) { //move down
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerY += 50;
    circle(playerX, playerY, 25);
  }
  let distance = dist(playerX, playerY, 475, 490);
  if (distance <= 30) {
    textSize(32);
    text('You win!', 55, 180);
    text('(Press space to play again)', 55, 230);
    won = true;
  }
}

//MOVEMENT CHECKS:
function checkIfValid(num) { //1 - up, 2 - right, 3 - down, 4 - left,
  let xIndex = (playerX+25)/50 - 1;
  let yIndex = (playerY+25)/50 - 1;
  let binaryStr = fourBitBinary(gridLogic[yIndex][xIndex]);
  console.log(xIndex, yIndex, gridLogic[yIndex][xIndex], binaryStr);
  if (num === 1) {
    if (binaryStr[3] === "1") {
      return false;
    } else {
      return true;
    }
  } else if (num === 2) {
    if (binaryStr[2] === "1") {
      return false;
    } else {
      return true;
    }
  } else if (num === 3) {
    if (binaryStr[1] === "1") {
      return false;
    } else {
      return true;
    }
  } else if (num === 4) {
    if (binaryStr[0] === "1") {
      return false;
    } else {
      return true;
    }
  }
}

//Simulate a key press on button press.
function simulateKey(keyCode) {
  if (keyCode === "SPACEBAR") { //if spacebar was pressed:
    won = false;
    playerX = 25;
    playerY = 25;
    visited = {};
    clear();
    redraw();
  } else if (won) {
    return;
  } else if (keyCode === "RIGHT_ARROW" && checkIfValid(2)) { //move right
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerX += 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === "LEFT_ARROW" && checkIfValid(4)) { //move left
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerX -= 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === "UP_ARROW" && checkIfValid(1)) { //move up
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerY -= 50;
    circle(playerX, playerY, 25);
  } else if (keyCode === "DOWN_ARROW" && checkIfValid(3)) { //move down
    noStroke();
    fill(255);
    circle(playerX, playerY, 30);
    stroke(1);
    fill('red');
    playerY += 50;
    circle(playerX, playerY, 25);
  }
  let distance = dist(playerX, playerY, 475, 490);
  if (distance <= 30) {
    textSize(32);
    text('You win!', 55, 180);
    text('(Press space to play again)', 55, 230);
    won = true;
  }
}
