import k from "../kaplayCtx";

export default function orientation() {
  // Flag para evitar múltiplas transições
  let hasTransitioned = false;
  
  // Verifica se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Se não for mobile, vai direto para o disclaimer
  if (!isMobile) {
    k.go("disclaimer");
    return;
  }

  // Verifica se está em modo paisagem
  const isLandscape = window.innerWidth > window.innerHeight;

  // Se já está na orientação correta, vai para o disclaimer
  if (isLandscape) {
    k.go("disclaimer");
    return;
  }

  // Adiciona fundo escuro
  k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.fixed(),
  ]);

  // Ícone de rotação do celular com animação
  const phoneIcon = k.add([
    k.text("📱", { size: 120 }),
    k.anchor("center"),
    k.pos(k.center().sub(0, 100)),
    k.fixed(),
    k.rotate(0),
  ]);

  // Animação de rotação do ícone
  phoneIcon.onUpdate(() => {
    phoneIcon.angle += 0.02;
  });

  // Texto principal
  k.add([
    k.text("Vire o Celular", {
      font: "mania",
      size: 48,
    }),
    k.anchor("center"),
    k.pos(k.center()),
    k.fixed(),
  ]);

  // Texto secundário
  k.add([
    k.text("Para uma melhor experiência,\nvire o celular para paisagem\n(ou toque no botão para tela cheia)", {
      font: "mania",
      size: 24,
    }),
    k.anchor("center"),
    k.pos(k.center().add(0, 80)),
    k.fixed(),
  ]);

  // Botão para ativar tela cheia
  const fullscreenBtn = k.add([
    k.rect(200, 50),
    k.color(0, 100, 200),
    k.anchor("center"),
    k.pos(k.center().add(0, 180)),
    k.fixed(),
    k.area(),
  ]);

  // Texto do botão
  k.add([
    k.text("Tela Cheia", { font: "mania", size: 20 }),
    k.anchor("center"),
    k.pos(k.center().add(0, 180)),
    k.fixed(),
  ]);

  // Texto de instrução
  k.add([
    k.text("Toque no botão acima para ativar a tela cheia", {
      font: "mania",
      size: 16,
    }),
    k.anchor("center"),
    k.pos(k.center().add(0, 230)),
    k.fixed(),
  ]);

  // Botão para pular a tela de orientação
  const skipBtn = k.add([
    k.rect(150, 40),
    k.color(100, 100, 100),
    k.anchor("center"),
    k.pos(k.center().add(0, 280)),
    k.fixed(),
    k.area(),
  ]);

  // Texto do botão pular
  k.add([
    k.text("Pular", { font: "mania", size: 16 }),
    k.anchor("center"),
    k.pos(k.center().add(0, 280)),
    k.fixed(),
  ]);

  // Evento de clique no botão pular
  skipBtn.onClick(() => {
    if (!hasTransitioned) {
      hasTransitioned = true;
      k.go("disclaimer");
    }
  });

  // Função para ativar tela cheia
  async function requestFullscreen() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        await document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen();
      }
    } catch (error) {
      console.log("Erro ao ativar tela cheia:", error);
      // Se falhar, pelo menos verifica se está na orientação correta
      checkOrientation();
    }
  }

  // Evento de clique no botão de tela cheia
  fullscreenBtn.onClick(() => {
    requestFullscreen();
  });

  // Efeito hover no botão
  fullscreenBtn.onHover(() => {
    fullscreenBtn.color = k.rgb(0, 120, 240);
  });

  fullscreenBtn.onHoverEnd(() => {
    fullscreenBtn.color = k.rgb(0, 100, 200);
  });

  // Verifica periodicamente se a orientação está correta
  const checkOrientation = () => {
    if (hasTransitioned) return; // Evita múltiplas transições
    
    const currentIsLandscape = window.innerWidth > window.innerHeight;

    // Se está na orientação paisagem, permite continuar
    if (currentIsLandscape) {
      hasTransitioned = true;
      k.go("disclaimer");
    }
  };

  // Verifica a cada 1000ms (mais lento para evitar loops)
  const interval = setInterval(checkOrientation, 1000);

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