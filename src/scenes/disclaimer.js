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
    k.text("Pressione Espaço/Clique/Toque para Iniciar o Jogo", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  k.onButtonPress("jump", () => k.go("main-menu"));
}
