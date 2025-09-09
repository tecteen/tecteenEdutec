const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 50, y: 50, size: 20, speed: 4 };
const enemy = { x: 300, y: 200, size: 20, speed: 2 };

let keys = {};
let score = 0;

// Controles
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  // Movimento do jogador
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Movimento do inimigo (segue o jogador)
  if (enemy.x < player.x) enemy.x += enemy.speed;
  if (enemy.x > player.x) enemy.x -= enemy.speed;
  if (enemy.y < player.y) enemy.y += enemy.speed;
  if (enemy.y > player.y) enemy.y -= enemy.speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Jogador
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Inimigo
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

  // Pontuação
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Pontos: " + score, 10, 20);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
