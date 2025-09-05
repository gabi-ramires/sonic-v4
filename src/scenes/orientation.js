import k from "../kaplayCtx";

export default function orientation() {
  // Flag para evitar múltiplas transições de cena
  let hasTransitioned = false;

  // Verifica se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Se não for mobile, vai direto para o disclaimer
  if (!isMobile) {
    k.go("disclaimer");
    return;
  }

  // Adiciona fundo escuro
  k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.fixed(),
  ]);

  // Variáveis para guardar as referências dos elementos que podem ser destruídos
  let phoneIcon, mainTextObj, secondaryTextObj, skipBtn, skipTextObj;
  
  // Referências para os elementos da tela cheia que serão reposicionados
  let fullscreenBtn, fullscreenTextObj, instructionTextObj;

  // --- Criação dos elementos de Orientação (visíveis em modo retrato) ---
  // A variável currentY gerencia o posicionamento vertical dos elementos
  let currentY = k.height() * 0.15; // Inicia a 15% da altura da tela

  phoneIcon = k.add([
    k.text("📱", { size: 200 }), // Ícone do celular
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
    k.rotate(0),
  ]);
  currentY += 200 + 60; // Altura do ícone + espaçamento

  // Animação de rotação do ícone
  phoneIcon.onUpdate(() => {
    phoneIcon.angle += 0.02;
  });

  mainTextObj = k.add([
    k.text("VIRE O CELULAR", {
      font: "mania",
      size: 140,
      color: k.rgb(255, 255, 0),
      outline: { width: 6, color: k.rgb(0, 0, 0) },
      width: k.width() * 0.9,
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);
  currentY += 140 + 50; // Altura aproximada do texto + espaçamento

  secondaryTextObj = k.add([
    k.text("PARA UMA MELHOR EXPERIÊNCIA,\nVIRE O CELULAR PARA PAISAGEM", {
      font: "mania",
      size: 60,
      color: k.rgb(173, 216, 230),
      outline: { width: 3, color: k.rgb(0, 0, 139) },
      width: k.width() * 0.8,
      lineSpacing: 10,
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);
  currentY += (60 * 2) + (10 * 1) + 70; // Altura aproximada do texto de 2 linhas + espaçamento

  // --- Criação dos elementos do Botão de Tela Cheia ---
  // Posição inicial dos elementos de tela cheia (visível em ambos os modos)
  let fullscreenBtnInitialY = currentY + 30;
  let instructionTextInitialY = fullscreenBtnInitialY + 100 + 40;

  fullscreenBtn = k.add([
    k.rect(k.width() * 0.7, 100, { radius: 20 }),
    k.color(0, 100, 200),
    k.anchor("center"),
    k.pos(k.width() / 2, fullscreenBtnInitialY),
    k.fixed(),
    k.area(),
  ]);

  fullscreenTextObj = k.add([
    k.text("TELA CHEIA", { font: "mania", size: 40 }),
    k.anchor("center"),
    k.pos(k.width() / 2, fullscreenBtnInitialY),
    k.fixed(),
  ]);

  instructionTextObj = k.add([
    k.text("TOQUE ACIMA PARA ATIVAR A TELA CHEIA", {
      font: "mania",
      size: 30,
      color: k.rgb(200, 200, 200),
      width: k.width() * 0.8,
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, instructionTextInitialY),
    k.fixed(),
  ]);
  currentY = instructionTextInitialY + 30 + 60; // Atualiza currentY para o próximo elemento

  // --- Criação do Botão Pular (visível apenas em modo retrato) ---
  skipBtn = k.add([
    k.rect(k.width() * 0.5, 70, { radius: 15 }),
    k.color(100, 100, 100),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
    k.area(),
  ]);

  skipTextObj = k.add([
    k.text("PULAR", { font: "mania", size: 30 }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);

  // --- Função para esconder elementos de orientação e reposicionar o botão de tela cheia ---
  let orientationElementsHidden = false;
  const hideOrientationElements = () => {
    if (orientationElementsHidden) return; // Já escondido

    // Destroi os elementos de orientação
    phoneIcon.destroy();
    mainTextObj.destroy();
    secondaryTextObj.destroy();
    skipBtn.destroy();
    skipTextObj.destroy();

    orientationElementsHidden = true;

    // Reposiciona os elementos de tela cheia para o centro da tela
    const centerX = k.width() / 2;
    const centerY = k.height() / 2;
    const spacing = 120; // Espaçamento entre o botão e a instrução

    fullscreenBtn.pos = k.vec2(centerX, centerY - spacing / 2);
    fullscreenTextObj.pos = k.vec2(centerX, centerY - spacing / 2);
    instructionTextObj.pos = k.vec2(centerX, centerY + spacing / 2);
  };

  // --- Verificação inicial se já está em modo paisagem ---
  const initialIsLandscape = window.innerWidth > window.innerHeight;
  if (initialIsLandscape) {
    hideOrientationElements();
  }

  // --- Funções e Eventos ---

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
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) { // Safari
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) { // Firefox
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        await element.msRequestFullscreen();
      }
    } catch (error) {
      console.log("Erro ao ativar tela cheia:", error);
      // Se falhar, pelo menos permite a transição
    }
  }

  // Evento de clique no botão de tela cheia
  fullscreenBtn.onClick(async () => {
    await requestFullscreen(); // Tenta ativar tela cheia
    if (!hasTransitioned) { // Só avança se ainda não tiver feito a transição
      hasTransitioned = true;
      k.go("disclaimer");
    }
  });

  // Efeitos hover nos botões
  fullscreenBtn.onHover(() => {
    fullscreenBtn.color = k.rgb(0, 150, 255);
    k.setCursor("pointer");
  });
  fullscreenBtn.onHoverEnd(() => {
    fullscreenBtn.color = k.rgb(0, 100, 200);
    k.setCursor("default");
  });

  skipBtn.onHover(() => {
    skipBtn.color = k.rgb(150, 150, 150);
    k.setCursor("pointer");
  });
  skipBtn.onHoverEnd(() => {
    skipBtn.color = k.rgb(100, 100, 100);
    k.setCursor("default");
  });

  // Verifica periodicamente se a orientação está correta
  const checkOrientation = () => {
    if (hasTransitioned) return;

    const currentIsLandscape = window.innerWidth > window.innerHeight;

    if (currentIsLandscape && !orientationElementsHidden) {
      hideOrientationElements();
    }
  };

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