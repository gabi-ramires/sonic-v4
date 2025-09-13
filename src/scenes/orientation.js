import k from "../kaplayCtx";

export default function orientation() {
  let hasTransitioned = false;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Se não for mobile, vai direto para o disclaimer
  if (!isMobile) {
    k.go("disclaimer");
    return;
  }

  // Se for mobile e já estiver em modo paisagem, vai direto para o disclaimer
  const initialIsLandscape = window.innerWidth > window.innerHeight;
  if (isMobile && initialIsLandscape) {
    k.go("disclaimer");
    return;
  }

  // Adiciona fundo escuro
  k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.fixed(),
  ]);

  // Cria os elementos de orientação (visíveis apenas em modo retrato)
  const phoneIcon = k.add([
    k.text("📱", { size: 200 }), // Ícone do celular
    k.anchor("center"),
    k.pos(k.width() / 2, k.height() * 0.35), // Posição ajustada
    k.fixed(),
    k.rotate(0),
  ]);

  phoneIcon.onUpdate(() => {
    phoneIcon.angle += 0.02;
  });

  const mainTextObj = k.add([
    k.text("VIRE O CELULAR", {
      font: "mania", // Mantemos "mania" aqui, ou trocamos para "DMSans" se já carregada
      size: 140,
      color: k.rgb(255, 255, 0),
      outline: { width: 6, color: k.rgb(0, 0, 0) },
      width: k.width() * 0.9,
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, k.height() * 0.7), // Posição ajustada
    k.fixed(),
  ]);

  // Função para esconder elementos e transicionar
  const hideOrientationElementsAndGo = () => {
    if (hasTransitioned) return;
    hasTransitioned = true;
    phoneIcon.destroy();
    mainTextObj.destroy();
    k.go("disclaimer");
  };

  // Verifica periodicamente se a orientação está correta
  const checkOrientation = () => {
    if (hasTransitioned) return;

    const currentIsLandscape = window.innerWidth > window.innerHeight;

    // Se for mobile e a orientação mudar para paisagem, esconde os elementos e avança
    if (isMobile && currentIsLandscape) {
      hideOrientationElementsAndGo();
    }
  };

  // Checa logo ao entrar
  checkOrientation();

  // Verifica a cada 500ms
  const interval = setInterval(checkOrientation, 500);

  // Limpa o intervalo quando a cena é destruída
  k.onDestroy(() => {
    clearInterval(interval);
  });

  // Evento de redimensionamento da janela (com debounce)
  let resizeTimeout;
  k.onResize(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkOrientation, 300);
  });
}
