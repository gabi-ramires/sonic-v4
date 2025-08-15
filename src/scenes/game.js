import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";

export default function game() {
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  k.setGravity(2800); // Reduzido de 3100 para 2800 para pulos mais responsivos
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  const sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  const controlsText = k.add([
    k.text("Pressione Espaço/Clique/Toque para Pular!", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  const dismissControlsAction = k.onButtonPress("jump", () => {
    k.destroy(controlsText);
    dismissControlsAction.cancel();
  });

  const scoreText = k.add([
    k.text("PONTUAÇÃO : 0", { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);
  let score = 0;
  let scoreMultiplier = 0;
  let gameWon = false; // Flag para controlar se o jogo já foi vencido
  
  // Verificar se o score atingiu o máximo de 50
  const checkScoreLimit = () => {
    if (score >= 10 && !gameWon) {
      gameWon = true; // Marca que o jogo foi vencido
      k.setData("current-score", score);
      k.go("victory", citySfx);
    }
  };
  
  sonic.onCollide("ring", (ring) => {
    if (gameWon) return; // Não processar colisões se o jogo já foi vencido
    
    k.play("ring", { volume: 0.5 });
    k.destroy(ring);
    score++;
    scoreText.text = `PONTUAÇÃO : ${score}`;
    sonic.ringCollectUI.text = "+1";
    k.wait(1, () => {
      sonic.ringCollectUI.text = "";
    });
    checkScoreLimit();
  });
  
  sonic.onCollide("enemy", (enemy) => {
    if (gameWon) return; // Não processar colisões se o jogo já foi vencido
    
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `PONTUAÇÃO : ${score}`;
      if (scoreMultiplier === 1)
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = "";
      });
      checkScoreLimit();
      return;
    }

    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score);
    k.go("gameover", citySfx);
  });

  let gameSpeed = 250; // Velocidade inicial aumentada de 200 para 250 para ser mais dinâmico
  k.loop(2.5, () => { // Aumenta a cada 2.5 segundos para ser um pouco mais rápido
    gameSpeed += 25; // Aumenta 25 em vez de 20 para ser mais desafiador
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773));
    motobug.onUpdate(() => {
      if (gameSpeed < 1200) { // Reduzido de 1500 para 1200 para ser mais equilibrado
        motobug.move(-(gameSpeed + 100), 0); // Reduzido de 150 para 100 para ser menos agressivo
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(2.5, 5.5); // Aumentado significativamente para 2.5-5.5 segundos para menos inimigos

    k.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug();

  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    const waitTime = k.rand(1.2, 4.0); // Ajustado para 1.2-4.0 segundos para equilibrar com menos inimigos

    k.wait(waitTime, spawnRing);
  };

  spawnRing();

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  k.onUpdate(() => {
    if (sonic.isGrounded()) scoreMultiplier = 0;

    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    // for jump effect
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
