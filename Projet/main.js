//import {login} from "./components/login.js";
//trop de problèmes avec les modules

//Classes
class Player {
  constructor(x, y, mov_x, mov_y, color) {
    this.x = x;
    this.y = y;
    this.mov_x = mov_x;
    this.mov_y = mov_y;
    this.color = color;
    this.alive = true;
  }
  move() {
    this.x += this.mov_x;
    this.y += this.mov_y;
  }
  setColor(color) {
    this.color = color; 
  }
}


var create2DArray = function(numColumns, numRows){
    var array = [];
    for (var c = 0; c < numColumns; c++){
        array.push([]); 
        for (var r = 0; r < numRows; r++){
            array[c].push(0); 
        }
    }
    return array;
}
var canvas = document.getElementById("myCanvas");
var C = canvas.getContext("2d"); 
var canvas_rectangle = canvas.getBoundingClientRect();

var cellSize = 5;

var NUM_CELLS_HORIZONTAL = canvas.width / cellSize; 
var NUM_CELLS_VERTICAL = canvas.height / cellSize;
var x0 = (canvas.width - NUM_CELLS_HORIZONTAL * cellSize) / 2; 
var y0 = (canvas.height - NUM_CELLS_VERTICAL * cellSize) / 2;

var grid = create2DArray(NUM_CELLS_HORIZONTAL, NUM_CELLS_VERTICAL);

var CELL_EMPTY = 0;
var CELL_OCCUPIED = 1;
var CELL_OCCUPIED2 = 2;

const player1 = new Player(
  Math.floor(NUM_CELLS_HORIZONTAL / 2),
  NUM_CELLS_VERTICAL - 2,
  0,
  -1,
  "#ff0000"
);

const player2 = new Player(
  Math.floor(NUM_CELLS_HORIZONTAL / 2),
  1,
  0,
  1,
  "#00ff00"
);

var colorPicker1 = document.getElementById("couleur1");
colorPicker1.addEventListener("input", function() {
  player1.color = this.value;
});

var colorPicker2 = document.getElementById("couleur");
colorPicker2.addEventListener("input", function() {
  player2.color = this.value;
});


function keyDownHandler(e) {
  if (e.keyCode === 38) { // up arrow
    player1.mov_x = 0;
    player1.mov_y = -1;
  } else if (e.keyCode === 40) { // down arrow
    player1.mov_x = 0;
    player1.mov_y = 1;
  } else if (e.keyCode === 37) { // left arrow
    player1.mov_x = -1;
    player1.mov_y = 0;
  } else if (e.keyCode === 39) { // right arrow
    player1.mov_x = 1;
    player1.mov_y = 0;
  }else if (e.type === "mousedown") { // mouse drag
     mouseDrag = true;
    startX = e.clientX;
    startY = e.clientY;
  } else if (e.type === "mouseup") { // end of mouse drag
    if ( mouseDrag) {
      var deltaX = e.clientX - startX;
      var deltaY = e.clientY - startY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) { // horizontal drag
        if (deltaX > 0) { // to the right
          player1.mov_x = 1;
          player1.mov_y = 0;
        } else { // to the left
          player1.mov_x = -1;
          player1.mov_y = 0;
        }
      } else { // vertical drag
        if (deltaY > 0) { // downwards
          player1.mov_x = 0;
          player1.mov_y = 1;
        } else { // upwards
          player1.mov_x = 0;
          player1.mov_y = -1;
        }
      }
       mouseDrag = false;
    }
  } 

  if (e.keyCode === 87) { // W key
    player2.mov_x = 0;
    player2.mov_y = -1;
  } else if (e.keyCode === 83) { // S key
    player2.mov_x = 0;
    player2.mov_y = 1;
  } else if (e.keyCode === 65) { // A key
    player2.mov_x = -1;
    player2.mov_y = 0;
  } else if (e.keyCode === 68) { // D key
    player2.mov_x = 1;
    player2.mov_y = 0;
  }
}

document.onkeydown = keyDownHandler;
document.onmousedown = keyDownHandler;
document.onmouseup = keyDownHandler;


var redraw = function() {
  C.clearRect(0, 0, canvas.width, canvas.height);
  C.fillStyle = "#008CFF"; // blue
  C.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < NUM_CELLS_HORIZONTAL; ++i) {
    for (var j = 0; j < NUM_CELLS_VERTICAL; ++j) {
      if (grid[i][j] === CELL_OCCUPIED || grid[i][j] === CELL_OCCUPIED2) {
        C.fillStyle = grid[i][j] === CELL_OCCUPIED ? player1.color : player2.color;
        C.fillRect(
          x0 + i * cellSize + 1,
          y0 + j * cellSize + 1,
          cellSize - 2,
          cellSize - 2
        );
      }
    }
  }

  // Draw player 1's head
  if (player1.alive) {
    C.fillStyle = "#ffffff"; // white
    C.fillRect(
      x0 + player1.x * cellSize,
      y0 + player1.y * cellSize,
      cellSize,
      cellSize
    );
  }

  // Draw player 2's head
  if (player2.alive) {
    C.fillStyle = "#ffffff"; // white
    C.fillRect(
      x0 + player2.x * cellSize,
      y0 + player2.y * cellSize,
      cellSize,
      cellSize
    );
  }
};

var advance = function() {
  if (player1.alive && player2.alive) {
      player1.move();
      player2.move();

    // Check for collision with grid boundaries and with trail
    if (
      player1.x < 0 ||
      player1.x >= NUM_CELLS_HORIZONTAL ||
      player1.y < 0 ||
      player1.y >= NUM_CELLS_VERTICAL ||
      grid[player1.x][player1.y] === CELL_OCCUPIED ||
      grid[player1.x][player1.y] === CELL_OCCUPIED2
    ) {
      player1.alive = false;
    } else {
      grid[player1.x][player1.y] = CELL_OCCUPIED;
    }

    if (
      player2.x < 0 ||
      player2.x >= NUM_CELLS_HORIZONTAL ||
      player2.y < 0 ||
      player2.y >= NUM_CELLS_VERTICAL ||
      (grid[player2.x][player2.y] === CELL_OCCUPIED ||
        grid[player2.x][player2.y] === CELL_OCCUPIED2)
    ) {
      player2.alive = false;

    } else {
      grid[player2.x][player2.y] = CELL_OCCUPIED2;
    }
  }
  gestionFinTour();
};

var player1_score = 0;
var player2_score = 0;
var round = 1;

  counter1.innerHTML = "Player 1 Score: " + player1_score;
  counter2.innerHTML = "Player 2 Score: " + player2_score;
  counterRound.innerHTML = "Round: " + round;



var resetRound = function() {
  // réinitialiser la grille
  grid = create2DArray(NUM_CELLS_HORIZONTAL, NUM_CELLS_VERTICAL);

  // réinitialisation du joueur 1
  player1.x = Math.floor(NUM_CELLS_HORIZONTAL / 2);
  player1.y = NUM_CELLS_VERTICAL - 2;
  player1.mov_x = 0;
  player1.mov_y = -1;
  player1.alive = true;
  grid[player1.x][player1.y] = CELL_OCCUPIED;

  // réinitialisation du joueur 2
  player2.x = Math.floor(NUM_CELLS_HORIZONTAL / 2);
  player2.y = 1;
  player2.mov_x = 0;
  player2.mov_y = 1;
  player2.alive = true;
  grid[player2.x][player2.y] = CELL_OCCUPIED2;

  // incrémente le nombre de tours
  round++;
  // mettre à jour l'affichage du score
  actualiserScore();
};


function gestionFinTour(){
  if(!player1.alive && !player2.alive){
    alert("Match nul!")
    round--;
    resetRound();
    
  }
  else if(!player1.alive){
    p2Gagne();
  }
  else if(!player2.alive){
    p1Gagne();
  }
}


var p1Gagne = function() {
    player1_score++;
  resetRound();

};

var p2Gagne = function() {
    player2_score++;
  resetRound();

};

var actualiserScore = function() {
  var counter1 = document.getElementById("counter1");
  var counter2 = document.getElementById("counter2");
  var counterRound = document.getElementById("counterRound");

  counter1.innerHTML = "Player 1 Score: " + player1_score.toString();
  counter2.innerHTML = "Player 2 Score: " + player2_score.toString();
  counterRound.innerHTML = "Round: " + round.toString();
};

//permet de render la page, pause immédiatement, pour que le joueur puisse perser sur le bouton play
var isPaused = false;
setTimeout(function(){
  isPaused = !isPaused;
  pausePlayToggle.innerHTML = isPaused=true ? "Play" : "Pause";
}, 150);

var pausePlayToggle = document.getElementById("pauseButton");
pausePlayToggle.addEventListener("click", function() {
  isPaused = !isPaused;
  pausePlayToggle.innerHTML = isPaused ? "Play" : "Pause";
});

var roundReset = document.getElementById("resetRound");
roundReset.addEventListener("click", function() {
  console.log("resetRound");
  round--;
  resetRound();
  //s'assurer que le reset fonctionne aussi lorsque le jeu est en pause
  if(isPaused=true){
    isPaused = !isPaused;
    pausePlayToggle.innerHTML = isPaused ? "Play" : "Pause";
  }
});

var resetJeu = document.getElementById("resetButton");
resetJeu.addEventListener("click", function() {
  console.log("resetButton");
  player1_score = 0;
  player2_score = 0;
  round=0;
  speed=100;
  resetRound();
  //s'assurer que le reset fonctionne aussi lorsque le jeu est en pause
  if(isPaused=true){
    isPaused = !isPaused;
    pausePlayToggle.innerHTML = isPaused ? "Play" : "Pause";
  }

});

// setInterval(function() {
//   if (!isPaused) {
//     redraw();
//     advance();
//   }
// }, 100);

// var rungame = setTimeout(function() {
//   if (!isPaused) {
//     redraw();
//     advance();
//   }
//   rungame = setTimeout(arguments.callee, 100 - round*Math.log(5000));
// }, 100 - round*Math.log(5000)); //le jeu accélère à chaque ronde

var speed = 100;
var minSpeed=10;
var roundStartTime = new Date().getTime();


var rungame = setTimeout(function() {
  if (!isPaused) {
    redraw();
    advance();
    
    // Met à jour la vitesse du jeu
    var currentTime = new Date().getTime();
    var roundDuration = currentTime - roundStartTime;
    if (roundDuration >= 1000) { 
      speed *= 0.85; 
      roundStartTime = currentTime;
    }
  }
  
  rungame = setTimeout(arguments.callee, Math.max(minSpeed,speed));
}, Math.max(minSpeed,speed)*1.1);


document.getElementById('formConnexion').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Obtenir les valeurs de l'email et du mot de passe
  const email = document.getElementById('courriel').value;
  const password = document.getElementById('password').value;

  // Récupérer les données JSON du fichier loginInfo.json
  const response = await fetch('public/json/loginInfo.json');
  const loginInfo = await response.json();

  // Vérifier si l'email et le mot de passe correspondent aux valeurs du fichier JSON
  if (email === loginInfo.email && password === loginInfo.password) {
    // Cacher le formulaire de connexion
    document.getElementById('form-container').style.display = 'none';

    // Afficher les éléments du jeu
    document.getElementById('canvasContainer').style.display = 'flex';
  } else {
    // Afficher un message d'erreur si les informations d'identification sont incorrectes
    alert('usager ou mot de passe incorrect');
  }
});






