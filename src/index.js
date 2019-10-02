import keyboard from "./keyboard.js";

const GAME_BOARD_HEIGHT = 500;
const GAME_BOARD_WIDTH = 850;
const COLOR_BACKGROUND = 0x1e415c;
const COLOR_ORANGE = 0xff921e;
const COLOR_WHITE = 0xffffff;
const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};
const SPEED = 10;
const CIRCLE_RADIUS = 4;
const TARGET_RADIUS = 10;

// Create app instance
let app = new PIXI.Application({ antialias: true });

// Adding app.view / canvas to DOM
document.getElementById('gameContainer').appendChild(app.view);

app.renderer.backgroundColor = COLOR_BACKGROUND;
app.renderer.resize(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);


let currentDirection = DIRECTIONS.RIGHT;
let innitLogo;
let player;
let logoWhiteDot;
let logoOrangeDot;
let gameIsRunning = false;
let target;
let targetIsWhite = true;


// <Insert game>

function movePlayer() {
  switch (currentDirection) {
    case DIRECTIONS.RIGHT: {
      if (player.x + SPEED >= GAME_BOARD_WIDTH) {
        player.x = 0;
      } else {
        player.x += SPEED;
      }
      break;
    }
    case DIRECTIONS.DOWN: {
      if (player.y + SPEED >= GAME_BOARD_HEIGHT) {
        player.y = 0;
      } else {
        player.y += SPEED;
      }
      break;
    }
    case DIRECTIONS.LEFT: {
      if (player.x - SPEED <= 0) {
        player.x = GAME_BOARD_WIDTH;
      } else {
        player.x -= SPEED;
      }
      break;
    }
    case DIRECTIONS.UP: {
      if (player.y - SPEED <= 0) {
        player.y = GAME_BOARD_HEIGHT;
      } else {
        player.y -= SPEED;
      }
    }
  }
}

function playerHitTarget() {
  let point = new PIXI.Point(player.x, player.y);
  if (target.containsPoint(point)) {
    return true;
  }
  return false;
}

function setupKeyListeners() {
  //Capture the keyboard arrow keys
  let left = keyboard("ArrowLeft");
  let up = keyboard("ArrowUp");
  let right = keyboard("ArrowRight");
  let down = keyboard("ArrowDown");
  let space = keyboard(" ");

  space.press = () => {
    gameIsRunning = !gameIsRunning;
  };
  left.press = () => {
    currentDirection = DIRECTIONS.LEFT;
  };
  up.press = () => {
    currentDirection = DIRECTIONS.UP;
  };
  right.press = () => {
    currentDirection = DIRECTIONS.RIGHT;
  };
  down.press = () => {
    currentDirection = DIRECTIONS.DOWN;
  };
}

function placeLogo() {
  innitLogo.x = Math.floor((Math.random() * (GAME_BOARD_WIDTH - innitLogo.width)));
  innitLogo.y = Math.floor(((Math.random() * GAME_BOARD_HEIGHT - innitLogo.height) + 50));
  logoWhiteDot.x = innitLogo.x + 5;
  logoWhiteDot.y = innitLogo.y + 7;
  logoOrangeDot.x = innitLogo.x + 95;
  logoOrangeDot.y = innitLogo.y + 7;

  if (targetIsWhite) {
    target.x = innitLogo.x + 6;
    target.y = innitLogo.y + 7;
  } else {
    target.x = innitLogo.x + 95;
    target.y = innitLogo.y + 5;
  }
}
