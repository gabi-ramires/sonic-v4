import k from "../kaplayCtx";

export default function victory(citySfx) {
  citySfx.paused = true;
  const currentScore = k.getData("current-score");
  const scoreMax = k.getData("current-score-max");

  // Define a cor de fundo Baby Blue
  k.add([
    k.rect(k.width(), k.height()),
    k.color(137, 207, 240), // Baby Blue
    k.pos(0, 0),
  ]);

  // Certifique-se de que a imagem esteja na pasta 'public/images/' do seu projeto
  k.loadSprite("convite", "/public/images/convite.png");

  // Título da vitória
  k.add([
    k.text("🎉 Parabéns! Você venceu!! 🎉", { font: "DMSans", size: 80 }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.15), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);
  
  // Pontuação
  k.add([
    k.text(`Pontuação: ${currentScore}/${scoreMax}`, {
      font: "DMSans",
      size: 60, // Tamanho aumentado
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.28), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);
  
  // Texto do convite - Posicionado para aparecer antes da imagem
  k.add([
    k.text("Você está sendo convidado para meu aniversário de 6 anos!", { font: "DMSans", size: 42 }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.42), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  k.add([
    k.text("🗓️ Data: 10 de outubro às 🕒 15h", { font: "DMSans", size: 42 }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.52), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  k.add([
    k.text("📍Local: Rua da paz, 10. Porto Alegre", { font: "DMSans", size: 42 }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.62), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  k.add([
    k.text("Aguardo sua confirmação! 🙏", { font: "DMSans", size: 42 }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.72), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  /*
  // Imagem do convite (aparece após 5 segundos) - COMENTADO NO SEU ÚLTIMO CÓDIGO
  k.wait(5, () => {
    if (k.getSprite("convite")) {
      k.add([
        k.sprite("convite"),
        k.anchor("center"),
        k.scale(0.8), // Ajuste o tamanho conforme necessário
        k.pos(k.center().x, k.center().y + 220), // Posição centralizada Y ajustada para a imagem
        k.z(50), // Garante que a imagem fique acima do fundo
      ]);
    }
  });
  */

  // Emojis decorativos
  k.add([
    k.text("🎈", { size: 70 }),
    k.anchor("center"), // Adicionado anchor
    k.pos(k.width() * 0.1, k.height() * 0.15), // Posição ajustada
    k.z(100),
  ]);
  k.add([
    k.text("🎂", { size: 70 }),
    k.anchor("center"), // Adicionado anchor
    k.pos(k.width() * 0.9, k.height() * 0.15), // Posição ajustada
    k.z(100),
  ]);
  k.add([
    k.text("🎉", { size: 70 }),
    k.anchor("center"), // Adicionado anchor
    k.pos(k.width() * 0.2, k.height() * 0.9), // Posição ajustada
    k.z(100),
  ]);
  k.add([
    k.text("🥳", { size: 70 }),
    k.anchor("center"), // Adicionado anchor
    k.pos(k.width() * 0.8, k.height() * 0.9), // Posição ajustada
    k.z(100),
  ]);

  k.wait(1, () => { // Este wait é para o botão de jogar novamente, aparece mais rápido
    k.add([
      k.text("Pressione Espaço/Clique/Toque para Jogar Novamente", {
        font: "DMSans",
        size: 56, // Tamanho aumentado
      }),
      k.anchor("center"),
      k.pos(k.center().x, k.height() - 70),
      k.color(k.Color.fromHex("#FFFFFF")), // Branco
    ]);
    k.onButtonPress("jump", () => k.go("game"));
  });
} 