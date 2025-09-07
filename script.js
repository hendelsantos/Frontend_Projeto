// Radial menu: posicionar itens em círculo

// Menu Linear (Carrossel de Ícones)
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  const title = document.getElementById('carousel-title');
  const desc = document.getElementById('carousel-desc');
  let selected = 2; // Começa no item do meio

  function updateSelection(idx) {
    items.forEach((item, i) => {
      item.classList.toggle('selected', i === idx);
    });
    title.textContent = items[idx].dataset.title;
    desc.textContent = items[idx].dataset.desc;
    // Scroll suave para o item selecionado
    items[idx].scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
  }

  // Mouse interatividade
  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => {
      updateSelection(i);
      selected = i;
      // Efeito sonoro opcional
      if(window.Audio) {
        const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b2.mp3');
        audio.volume = 0.13;
        audio.play();
      }
    });
    item.addEventListener('click', (e) => {
      // Efeito ripple
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const rect = item.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      item.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      goToByIndex(i);
    });
  });

  // Teclado: esquerda/direita
  document.addEventListener('keydown', (e) => {
    if(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if(e.key === 'ArrowRight') {
      selected = (selected + 1) % items.length;
      updateSelection(selected);
    } else if(e.key === 'ArrowLeft') {
      selected = (selected - 1 + items.length) % items.length;
      updateSelection(selected);
    } else if(e.key === 'Enter') {
      goToByIndex(selected);
    }
  });

  function goToByIndex(idx) {
    const item = items[idx];
    if(item && item.onclick) item.onclick();
  }

  // Inicialização
  updateSelection(selected);
});

function goTo(modulo) {
  window.location.href = '/' + modulo;
}

// Navegação
function goTo(modulo) {
  window.location.href = '/' + modulo;
}
