const botoes = document.querySelectorAll('.saiba-mais');
const cardsSection = document.querySelector('.cards-home');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // rola até a seção
    cardsSection.scrollIntoView({ behavior: 'smooth' });
    // muda a URL (opcional)
    window.location.hash = 'cards';
  });
});
