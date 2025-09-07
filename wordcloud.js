// Nuvem de palavras animada concentrada no canto esquerdo (0-25vw, 15-70vh)
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
  minSpeed: 5, // segundos
  maxSpeed: 12,
  areaPadding: 6 // %
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
  // Posição inicial aleatória restrita ao canto esquerdo (0-28vw) e faixa vertical (8-85vh)
  el.style.left = randomBetween(cloudConfig.areaPadding, 28 - cloudConfig.areaPadding) + 'vw';
  el.style.top = randomBetween(8, 85) + 'vh';
  // Animação de flutuação
  const duration = randomBetween(cloudConfig.minSpeed, cloudConfig.maxSpeed);
  el.style.setProperty('--float-x', randomBetween(-14, 14) + 'px');
  el.style.setProperty('--float-y', randomBetween(-14, 14) + 'px');
  el.style.animationDuration = duration + 's';
  // Efeito de explosão ao clicar
  el.addEventListener('click', function(e) {
    e.stopPropagation();
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width/2 - container.getBoundingClientRect().left;
    const y = rect.top + rect.height/2 - container.getBoundingClientRect().top;
    createParticles(x, y, 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(44,83,100,0.13) 100%)', container);
    el.style.transition = 'opacity 0.4s, filter 0.4s';
    el.style.opacity = 0;
    el.style.filter = 'blur(8px)';
    setTimeout(() => el.remove(), 400);
  });
  return el;
}

function spawnWordCloud() {
  container = document.getElementById('wordcloud-container');
  container.innerHTML = '';
  // Embaralha as palavras
  const shuffled = palavras.slice().sort(() => Math.random() - 0.5);
  shuffled.forEach(word => {
    const el = createWordCloudElement(word);
    container.appendChild(el);
  });
}

// Inicializa e atualiza a nuvem a cada 30s
let container;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    spawnWordCloud();
    setInterval(spawnWordCloud, 30000);
  });
} else {
  spawnWordCloud();
  setInterval(spawnWordCloud, 30000);
}
