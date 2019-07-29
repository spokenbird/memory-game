const cards = document.querySelectorAll('.memory-card');
const flipCounterP = document.querySelector('#flip-count');
const board = document.querySelector('#image-container');
const imageNodes = document.querySelectorAll('.front-face');
let bestScore = Infinity;

let flipCount = 0;
let cardIsFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  flipCount++;
  flipCounterP.textContent = flipCount;

  if (!cardIsFlipped) {
    // first click
    cardIsFlipped = true;
    firstCard = this;

    return;
  }
    // second click
    cardIsFlipped = false;
    secondCard = this;

    checkForMatch();
    if (checkWin()) {
      setBestScore();
    } 
}

function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableFlipCard() : unflipCards();
}

function disableFlipCard() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetPairs();
} 

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetPairs(); 
  }, 1000)
}

function resetPairs() {
[cardIsFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle(array) {
  const imagesCopy = [...array];
  const shuffled = [];

  while (imagesCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * imagesCopy.length);
    const { src, alt } = imagesCopy.splice(randomIndex, 1)[0]
    shuffled.push({ src, alt });
    
  }

  return shuffled;
}

function getAndSetBestScore() {
  const storedBestScore = window.localStorage.getItem('bestScore');
  if (storedBestScore && storedBestScore < bestScore) {
    bestScore = storedBestScore;
    document.querySelector('.best-score').textContent = bestScore;
  }
}

function setBestScore() {
  if (flipCount < bestScore) {
    bestScore = flipCount;
    window.localStorage.setItem('bestScore', flipCount);
    document.querySelector('.best-score').textContent = flipCount;
  }
}

function startGame() {
  const shuffledImages = shuffle(imageNodes);
  [...imageNodes].forEach((imageNode, index) => {
    imageNode.src = shuffledImages[index].src;
    imageNode.alt = shuffledImages[index].alt;
    imageNode.parentElement.dataset.image = shuffledImages[index].alt;
    imageNode.parentElement.classList.remove('flip');
  });

  resetPairs();
  flipCount = 0;
  flipCounterP.textContent = flipCount;
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function checkWin() {
  return [...imageNodes].every(imageNode => imageNode.parentElement.classList.contains('flip'));
}

document.querySelector('.btn').addEventListener('click', startGame);


window.onload = function() {
  startGame();
  getAndSetBestScore();
}



cards.forEach(card => card.addEventListener('click', flipCard));
