const cards = document.querySelectorAll('.memory-card')

function flipCard() {
  console.log('click!')
  this.classList.toggle('flip');
  console.log(this);
}

cards.forEach(card => card.addEventListener('click', flipCard));