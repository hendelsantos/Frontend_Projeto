// Nuvem de palavras animada restrita à esquerda (0-40vw) e fora do menu central
const palavras = [
  'Colaboração',
  'Pessoas',
  'Clientes',
  'Desafio',
  'Globalidade',
  'Inovação',
  'Excelência',
  'Agilidade',
  'Segurança',
  'Qualidade'
];

const cloudConfig = {
  minSize: 1.2, // rem
  maxSize: 3.2, // rem
  minOpacity: 0.10,
  maxOpacity: 0.22,
  minSpeed: 12, // segundos
  maxSpeed: 28,
  areaPadding: 8 // %
};

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function createWordCloudElement(word) {
  const el = document.createElement('div');
  el.className = 'wordcloud-word-glass';
  el.textContent = word;
  // Tamanho, opacidade aleatórios (sem rotação)
  const size = randomBetween(cloudConfig.minSize, cloudConfig.maxSize);
  el.style.fontSize = size + 'rem';
  el.style.opacity = randomBetween(cloudConfig.minOpacity, cloudConfig.maxOpacity);
  el.style.transform = 'none'; // Sempre reto
  // Posição inicial aleatória restrita à esquerda (0-40vw) e fora do centro vertical (10vh a 80vh)
  el.style.left = randomBetween(cloudConfig.areaPadding, 40 - cloudConfig.areaPadding) + 'vw';
  el.style.top = randomBetween(10, 80) + 'vh';
  // Animação de flutuação
  const duration = randomBetween(cloudConfig.minSpeed, cloudConfig.maxSpeed);
  el.style.setProperty('--float-x', randomBetween(-30, 30) + 'px');
  el.style.setProperty('--float-y', randomBetween(-30, 30) + 'px');
  el.style.animationDuration = duration + 's';
  return el;
}

function spawnWordCloud() {
  const container = document.getElementById('wordcloud-container');
  container.innerHTML = '';
  // Embaralha as palavras
  const shuffled = palavras.slice().sort(() => Math.random() - 0.5);
  shuffled.forEach(word => {
    const el = createWordCloudElement(word);
    container.appendChild(el);
  });
}

// Inicializa e atualiza a nuvem a cada 30s
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    spawnWordCloud();
    setInterval(spawnWordCloud, 30000);
  });
} else {
  spawnWordCloud();
  setInterval(spawnWordCloud, 30000);
}
