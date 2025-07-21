window.addEventListener('load', () => {
  const container = document.getElementById('container');
  setTimeout(() => {
    container.classList.remove('start');
  }, 100);
});
