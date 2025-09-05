import k from "../kaplayCtx";

export default function orientation() {
  // Flag para evitar múltiplas transições de cena
  let hasTransitioned = false;

  // Verifica se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // --- NOVO AJUSTE DE LÓGICA ---
  // Verifica se já está em modo paisagem no início
  const initialIsLandscape = window.innerWidth > window.innerHeight;

  // Se não for mobile OU se for mobile E já estiver em paisagem, vai direto para o disclaimer
  if (!isMobile || (isMobile && initialIsLandscape)) {
    k.go("disclaimer");
    return;
  }
  // --- FIM DO NOVO AJUSTE ---

  // Adiciona fundo escuro
  k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.fixed(),
  ]);

  // Variáveis para guardar as referências dos elementos que podem ser destruídos
  let phoneIcon, mainTextObj; // Removido secondaryTextObj, skipBtn, skipTextObj
  
  // Não há mais elementos de tela cheia ou de botão pular para referenciar

  // --- Criação dos elementos de Orientação (visíveis APENAS em modo retrato, pois já filtramos acima) ---
  // A variável currentY gerencia o posicionamento vertical dos elementos
  let currentY = k.height() * 0.25; // Ajustando para um pouco mais baixo

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
  // Não precisamos de currentY para mais nada abaixo, pois o botão pular foi removido.

  // --- Função para esconder elementos de orientação ---
  let orientationElementsHidden = false;
  const hideOrientationElements = () => {
    if (orientationElementsHidden) return; // Já escondido

    // Destroi os elementos de orientação
    phoneIcon.destroy();
    mainTextObj.destroy();
    // secondaryTextObj, skipBtn, skipTextObj foram removidos

    orientationElementsHidden = true;
  };

  // --- Funções e Eventos ---
  // Botão pular e eventos de tela cheia foram removidos.

  // Verifica periodicamente se a orientação está correta
  const checkOrientation = () => {
    if (hasTransitioned) return;

    const currentIsLandscape = window.innerWidth > window.innerHeight;

    // Se for mobile e a orientação mudar para paisagem, esconde os elementos e avança
    if (isMobile && currentIsLandscape && !orientationElementsHidden) {
      hideOrientationElements();
      if (!hasTransitioned) { // Garante que a transição ocorra apenas uma vez
        hasTransitioned = true;
        k.go("disclaimer");
      }
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