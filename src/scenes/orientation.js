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

  // Variável para gerenciar o posicionamento vertical dos elementos
  let currentY = k.height() * 0.15; // Começa a 15% da altura da tela

  // Ícone de rotação do celular com animação (BEM maior)
  const phoneIcon = k.add([
    k.text("📱", { size: 200 }), // Tamanho do ícone
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
    k.rotate(0),
  ]);
  currentY += 200 + 50; // Altura do ícone + espaçamento

  // Animação de rotação do ícone
  phoneIcon.onUpdate(() => {
    phoneIcon.angle += 0.02;
  });

  // Texto principal (Ainda MAIOR e com cor/contorno)
  k.add([
    k.text("VIRE O CELULAR", { // Texto em maiúsculas para maior impacto
      font: "mania",
      size: 140, // Ajustado para garantir que caiba em larguras menores
      color: k.rgb(255, 255, 0), // Amarelo vibrante
      outline: { width: 6, color: k.rgb(0, 0, 0) }, // Contorno preto grosso
      width: k.width() * 0.9, // Garante que caiba na tela
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);
  currentY += 140 + 40; // Altura aproximada do texto + espaçamento

  // Texto secundário (Maior e com cor/contorno)
  k.add([
    k.text("PARA UMA MELHOR EXPERIÊNCIA,\nVIRE O CELULAR PARA PAISAGEM\n(OU TOQUE NO BOTÃO PARA TELA CHEIA)", { // Texto em maiúsculas
      font: "mania",
      size: 60, // Ajustado para garantir que caiba
      color: k.rgb(173, 216, 230), // Azul claro
      outline: { width: 3, color: k.rgb(0, 0, 139) }, // Contorno azul escuro
      width: k.width() * 0.8, // Garante que caiba na tela
      lineSpacing: 10, // Adiciona um pouco de espaçamento entre as linhas
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);
  currentY += (60 * 3) + (10 * 2) + 60; // Altura aproximada do texto de 3 linhas + espaçamento

  // Botão para ativar tela cheia (BEM maior)
  const fullscreenBtn = k.add([
    k.rect(k.width() * 0.7, 100, { radius: 20 }), // Largura responsiva, altura fixa
    k.color(0, 100, 200), // Cor azul inicial
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
    k.area(),
  ]);

  // Texto do botão de tela cheia (Maior)
  k.add([
    k.text("TELA CHEIA", { font: "mania", size: 40 }), // Tamanho do texto do botão
    k.anchor("center"),
    k.pos(k.width() / 2, currentY), // Mesma posição do botão
    k.fixed(),
  ]);
  currentY += 100 + 30; // Altura do botão + espaçamento

  // Texto de instrução (Maior)
  k.add([
    k.text("TOQUE ACIMA PARA ATIVAR A TELA CHEIA", { // Texto em maiúsculas
      font: "mania",
      size: 30, // Tamanho da instrução
      color: k.rgb(200, 200, 200), // Cinza claro para contraste
      width: k.width() * 0.8, // Garante que caiba na tela
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
  ]);
  currentY += 30 + 60; // Altura do texto + espaçamento

  // Botão para pular a tela de orientação (Maior)
  const skipBtn = k.add([
    k.rect(k.width() * 0.5, 70, { radius: 15 }), // Largura responsiva, altura fixa
    k.color(100, 100, 100), // Cor cinza inicial
    k.anchor("center"),
    k.pos(k.width() / 2, currentY),
    k.fixed(),
    k.area(),
  ]);

  // Texto do botão pular (Maior)
  k.add([
    k.text("PULAR", { font: "mania", size: 30 }), // Tamanho do texto do botão
    k.anchor("center"),
    k.pos(k.width() / 2, currentY), // Mesma posição do botão
    k.fixed(),
  ]);
  // currentY += 70; // Não precisa de mais espaçamento depois do último elemento

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
      // Se falhar, pelo menos verifica se está na orientação correta
      checkOrientation();
    }
  }

  // Evento de clique no botão de tela cheia
  fullscreenBtn.onClick(() => {
    requestFullscreen();
  });

  // Efeito hover no botão de tela cheia
  fullscreenBtn.onHover(() => {
    fullscreenBtn.color = k.rgb(0, 150, 255); // Azul mais claro no hover
    k.setCursor("pointer"); // Muda o cursor para indicar interatividade
  });

  fullscreenBtn.onHoverEnd(() => {
    fullscreenBtn.color = k.rgb(0, 100, 200); // Retorna à cor original
    k.setCursor("default");
  });

  // Efeito hover no botão pular
  skipBtn.onHover(() => {
    skipBtn.color = k.rgb(150, 150, 150); // Cinza mais claro no hover
    k.setCursor("pointer");
  });

  skipBtn.onHoverEnd(() => {
    skipBtn.color = k.rgb(100, 100, 100); // Retorna à cor original
    k.setCursor("default");
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

  // Verifica a cada 500ms (mais frequente para melhor resposta)
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