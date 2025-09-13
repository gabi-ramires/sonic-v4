import k from "../kaplayCtx";

export default function disclaimer() {
  k.add([
    k.text(
      `
        Sonic é propriedade da SEGA.
        Criado por Gabriela Ramires
      `,
      { font: "mania", size: 32 }
    ),
  ]);

  k.add([
    k.text("Toque para Iniciar o jogo", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  // Função para ativar tela cheia
  async function requestFullscreen() {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { // Safari
        await elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        await elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        await elem.msRequestFullscreen();
      }
    } catch (error) {
      console.log("Erro ao ativar tela cheia no disclaimer:", error);
      // Não bloqueia o jogo se a tela cheia falhar
    }
  }

  k.onButtonPress("jump", async () => { // Tornar o handler assíncrono
    await requestFullscreen(); // Tenta ativar tela cheia
    k.go("main-menu");
  });
}
