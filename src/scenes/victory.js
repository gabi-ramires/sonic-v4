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
  k.loadSprite("convite", "/images/convite.png");

  // Título da vitória
  k.add([
    k.text("🎉 Parabéns! Você venceu!! 🎉", {
      font: "DMSans",
      size: 90
    }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.25), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  // Pontuação
  k.add([
    k.text(`Pontos: ${currentScore}/${scoreMax}`, {
      font: "DMSans",
      size: 70, // Tamanho aumentado
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.45), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  k.add([
    k.text("Aguarde para receber um convite especial", {
      font: "DMSans",
      size: 50
    }), // Tamanho aumentado
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.60), // Posição ajustada
    k.color(k.Color.fromHex("#FFFFFF")), // Branco
  ]);

  // Imagem do convite (aparece após 5 segundos)
  k.wait(5, () => {
    // Mostra a imagem do convite
    const conviteImage = document.getElementById("convite-image");
    if (conviteImage) {
    conviteImage.style.display = "block"; // Torna a imagem visível

    }
  });

}