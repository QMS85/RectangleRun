const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const groundHeight = 50;
const dinoHeight = 30;
const dinoWidth = 20;
const obstacleWidth = 20;
const obstacleHeight = 30;
const gravity = 0.5;
const jumpHeight = 10;

let dino = {
  x: 10,
  y: canvas.height - groundHeight - dinoHeight,
  vy: 0,
  jumping: false,
};

let obstacles = [];

let score = 0;
let gameOver = false;

function createObstacle() {
  const x = canvas.width;
  const y = canvas.height - groundHeight - obstacleHeight;
  obstacles.push({
    x,
    y,
  });
}

function drawDino() {
  ctx.fillStyle = 'green';
  ctx.fillRect(dino.x, dino.y, dinoWidth, dinoHeight);
}

function drawObstacles() {
  ctx.fillStyle = 'brown';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  });
}

function drawGround() {
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function updateDino() {
  dino.vy += gravity;
  dino.y += dino.vy;

  if (dino.y + dinoHeight > canvas.height - groundHeight) {
    dino.y = canvas.height - groundHeight - dinoHeight;
    dino.vy = 0;
    dino.jumping = false;
  }
}

function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= 5;

    if (obstacle.x + obstacleWidth < 0) {
      obstacles.splice(index, 1);
      score++;
    }
  });
}

function checkCollision() {
  obstacles.forEach(obstacle => {
    if (
      dino.x < obstacle.x + obstacleWidth &&
      dino.x + dinoWidth > obstacle.x &&
      dino.y < obstacle.y + obstacleHeight &&
      dino.y + dinoHeight > obstacle.y
    ) {
      gameOver = true;
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateDino();
  updateObstacles();
  checkCollision();

  drawDino();
  drawObstacles();
  drawGround();
  drawScore();

  if (gameOver) {
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 70, canvas.height / 2);
    return;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !dino.jumping) {
    dino.vy = -jumpHeight;
    dino.jumping = true;
  }
});

createObstacle();

setInterval(() => {
  createObstacle();
}, 1500);

gameLoop();
