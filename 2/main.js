const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  alert('Разрешение экрана: ' + window.screen.width + 'x' + window.screen.height);
})