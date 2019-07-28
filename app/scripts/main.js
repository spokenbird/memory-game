const cards = document.querySelectorAll('.memory-card');
const flipCounterP = document.querySelector('#flip-count');
let flipCount = 0;


function flipCard() {
  this.classList.toggle('flip');
  flipCount++;
  flipCounterP.textContent = flipCount;
  console.log(flipCount);
}

cards.forEach(card => card.addEventListener('click', flipCard));