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
    k.text("Parabéns! Você venceu!!", { font: "DMSans", size: 68 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 320), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Azul petróleo escuro
  ]);
  
  // Pontuação
  k.add([
    k.text(`Pontuação: ${currentScore}/${scoreMax}`, {
      font: "DMSans",
      size: 44,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 250), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // SteelBlue - um azul médio
  ]);
  
  // Texto do convite - Posicionado para aparecer antes da imagem
  k.add([
    k.text("Você está sendo convidado para meu aniversário de 6 anos!", { font: "DMSans", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 150), // Posição mais alta
    k.color(k.Color.fromHex("#FFFFFF")), // Dark blue-gray
  ]);

  k.add([
    k.text("🗓️ Data: 10 de outubro às 🕒 15h", { font: "DMSans", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 90), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Um cinza azulado suave
  ]);

  k.add([
    k.text("📍Local: Rua da paz, 10. Porto Alegre", { font: "DMSans", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 30), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Um cinza médio
  ]);

  k.add([
    k.text("Aguardo sua confirmação! 🙏", { font: "DMSans", size: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 30), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Dark blue-gray
  ]);

  /*
  // Imagem do convite (aparece após 5 segundos)
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

  // Emojis decorativos (mantendo os emojis, mas sem cores customizadas para eles)
  k.add([
    k.text("🎈", { size: 70 }),
    k.pos(k.width() * 0.1, k.height() * 0.35), // Posição Y ajustada para 0.25 (mais para baixo)
    k.z(100),
  ]);
  k.add([
    k.text("🎂", { size: 70 }),
    k.pos(k.width() * 0.8, k.height() * 0.35), // Posição Y ajustada para 0.35 (mais para baixo)
    k.z(100),
  ]);
  k.add([
    k.text("🎉", { size: 70 }),
    k.pos(k.width() * 0.2, k.height() * 0.75),
    k.z(100),
  ]);
  k.add([
    k.text("🥳", { size: 70 }),
    k.pos(k.width() * 0.7, k.height() * 0.85),
    k.z(100),
  ]);

  k.wait(1, () => { // Este wait é para o botão de jogar novamente, aparece mais rápido
    k.add([
      k.text("Pressione Espaço/Clique/Toque para Jogar Novamente", {
        font: "DMSans",
        size: 48,
      }),
      k.anchor("center"),
      k.pos(k.center().x, k.height() - 70),
      k.color(k.Color.fromHex("#5C6F88")), // Um cinza azulado escuro para o botão
    ]);
    k.onButtonPress("jump", () => k.go("game"));
  });
} 