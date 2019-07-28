const cards = document.querySelectorAll('.memory-card');
const flipCounterDiv = document.querySelector('.flip-counter');
const flipCount = 0;

function flipCard() {
  this.classList.toggle('flip');
  flipCount++;
  console.log(flipCount);
}

cards.forEach(card => card.addEventListener('click', flipCard));