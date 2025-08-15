import k from "../kaplayCtx";

export default function victory(citySfx) {
  citySfx.paused = true;
  const currentScore = k.getData("current-score");

  k.add([
    k.text("🎉 VOCÊ VENCEU! 🎉", { font: "mania", size: 96 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 300),
  ]);
  
  k.add([
    k.text(`PONTUAÇÃO FINAL : ${currentScore}/50`, {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x - 400, k.center().y - 200),
  ]);
  
  k.add([
    k.text("PARABÉNS!", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x + 400, k.center().y - 200),
  ]);

  // Caixa do convite (lado esquerdo)
  const inviteBox = k.add([
    k.rect(400, 400, { radius: 4 }),
    k.color(255, 255, 255), // Branco
    k.area(),
    k.anchor("center"),
    k.outline(6, k.Color.fromArray([255, 20, 147])), // Borda rosa
    k.pos(k.center().x - 400, k.center().y + 50),
  ]);

  inviteBox.add([
    k.text("🎂", { font: "mania", size: 60 }),
    k.anchor("center"),
    k.pos(0, -120),
  ]);

  inviteBox.add([
    k.text("CONVITE", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, -60),
  ]);

  inviteBox.add([
    k.text("DE", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, -20),
  ]);

  inviteBox.add([
    k.text("ANIVERSÁRIO", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, 20),
  ]);

  inviteBox.add([
    k.text("6 ANOS", { font: "mania", size: 50 }),
    k.anchor("center"),
    k.pos(0, 60),
  ]);

  inviteBox.add([
    k.text("OUTUBRO", { font: "mania", size: 45 }),
    k.anchor("center"),
    k.pos(0, 100),
  ]);

  // Caixa dos detalhes (lado direito)
  const detailsBox = k.add([
    k.rect(400, 400, { radius: 4 }),
    k.color(255, 255, 255), // Branco
    k.area(),
    k.anchor("center"),
    k.outline(6, k.Color.fromArray([255, 20, 147])), // Borda rosa
    k.pos(k.center().x + 400, k.center().y + 50),
  ]);

  detailsBox.add([
    k.text("🕐 15:00h", { font: "mania", size: 50 }),
    k.anchor("center"),
    k.pos(0, -120),
  ]);

  detailsBox.add([
    k.text("📍 Minha casa", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, -60),
  ]);

  detailsBox.add([
    k.text("Você está", { font: "mania", size: 35 }),
    k.anchor("center"),
    k.pos(0, -20),
  ]);

  detailsBox.add([
    k.text("convidado!", { font: "mania", size: 35 }),
    k.anchor("center"),
    k.pos(0, 20),
  ]);

  detailsBox.add([
    k.text("Espero", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, 60),
  ]);

  detailsBox.add([
    k.text("você lá!", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(0, 100),
  ]);

  k.wait(1, () => {
    k.add([
      k.text("Pressione Espaço/Clique/Toque para Jogar Novamente", {
        font: "mania",
        size: 64,
      }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y + 350),
    ]);
    k.onButtonPress("jump", () => k.go("game"));
  });
} 