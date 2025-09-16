const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const winScreen = document.getElementById("winScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn1 = document.getElementById("restartBtn1");
const restartBtn2 = document.getElementById("restartBtn2");

// Imagens
const playerImage = new Image();
playerImage.src = "Cópia de jogo EDUTEC.png";

const phoneImage = new Image();
phoneImage.src = "Cópia de jogo EDUTEC (1).png";

// Jogador
const player = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 150,
  width: 120,
  height: 120,
  speed: 7,
};

// Celulares
let phones = [];
let phoneSpeed = 3;

// Estado do jogo
let lives = 3;
let score = 0;
let gameOver = false;
let gameStarted = false;

// Controles
let leftPressed = false;
let rightPressed = false;
let dragging = false;

// ===== CONTROLES TECLADO =====
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

// ===== CONTROLES MOUSE =====
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= player.x &&
    mouseX <= player.x + player.width &&
    mouseY >= player.y &&
    mouseY <= player.y + player.height
  ) {
    dragging = true;
  }
});
canvas.addEventListener("mouseup", () => (dragging = false));
canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    player.x = mouseX - player.width / 2;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
  }
});

// ===== JOGO =====
function spawnPhone() {
  const x = Math.random() * (canvas.width - 40);
  phones.push({ x: x, y: 0, width: 60, height: 60 });
}

function update() {
  if (!gameStarted || gameOver) return;

  if (leftPressed && player.x > 0) player.x -= player.speed;
  if (rightPressed && player.x + player.width < canvas.width) player.x += player.speed;

  for (let i = 0; i < phones.length; i++) {
    let phone = phones[i];
    phone.y += phoneSpeed;

    // Colisão
    if (
      phone.x < player.x + player.width &&
      phone.x + phone.width > player.x &&
      phone.y < player.y + player.height &&
      phone.y + phone.height > player.y
    ) {
      phones.splice(i, 1);
      i--;
      score++;
      if (score >= 15) {
        winGame();
      }
      continue;
    }

    // Se cair no chão
    if (phone.y > canvas.height) {
      phones.splice(i, 1);
      i--;
      lives--;
      if (lives <= 0) {
        endGame();
      }
    }
  }
}

function draw() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Jogador
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Celulares
  phones.forEach((phone) => {
    ctx.drawImage(phoneImage, phone.x, phone.y, phone.width, phone.height);
  });

  // Vidas e Pontos
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Vidas: " + lives, 10, 25);
  ctx.fillText("Pegos: " + score + "/15", 360, 25);
}

function endGame() {
  gameOver = true;
  canvas.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
}

function winGame() {
  gameOver = true;
  canvas.classList.add("hidden");
  winScreen.classList.remove("hidden");
}

function resetGame() {
  lives = 3;
  score = 0;
  phones = [];
  gameOver = false;
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 150;
  canvas.classList.remove("hidden");
}

// ===== BOTÕES =====
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  canvas.classList.remove("hidden");
  gameStarted = true;
});

restartBtn1.addEventListener("click", () => {
  resetGame();
  gameOverScreen.classList.add("hidden");
});

restartBtn2.addEventListener("click", () => {
  resetGame();
  winScreen.classList.add("hidden");
});

// ===== LOOP PRINCIPAL =====
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

setInterval(() => {
  if (!gameOver && gameStarted) spawnPhone();
}, 2000);

// ===== INICIAR =====
Promise.all([
  new Promise((resolve) => (playerImage.onload = resolve)),
  new Promise((resolve) => (phoneImage.onload = resolve)),
]).then(() => {
  gameLoop();
});
