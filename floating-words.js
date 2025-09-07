// Palavras-chave para animar
const palavras = [
  'Colaboração',
  'Pessoas',
  'Clientes',
  'Desafio',
  'Globalidade'
];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function createFloatingWord(word) {
  const el = document.createElement('div');
  el.className = 'floating-word-glass';
  el.textContent = word;
  // Posição aleatória fora do menu central
  el.style.left = randomBetween(5, 85) + 'vw';
  el.style.top = randomBetween(8, 85) + 'vh';
  // Tamanho e rotação aleatórios
  el.style.fontSize = randomBetween(1.2, 2.6) + 'rem';
  el.style.transform = `rotate(${randomBetween(-18, 18)}deg)`;
  // Animação
  el.style.animationDuration = randomBetween(3, 7) + 's';
  return el;
}

function spawnFloatingWord() {
  const container = document.getElementById('floating-words-container');
  const word = palavras[Math.floor(Math.random() * palavras.length)];
  const el = createFloatingWord(word);
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 1200);
  }, randomBetween(2200, 4200));
}

setInterval(spawnFloatingWord, 1200);
// Inicializa container
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 3; i++) setTimeout(spawnFloatingWord, i * 800);
  });
} else {
  for (let i = 0; i < 3; i++) setTimeout(spawnFloatingWord, i * 800);
}
