"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var cards = document.querySelectorAll('.memory-card');
var flipCounterTextContainer = document.querySelector('#flip-counter-text');
var flipCounterText = document.querySelector('#flip-counter-text').firstElementChild.textContent;
var board = document.querySelector('#image-container');
var imageNodes = document.querySelectorAll('.front-face');
var flipCounterSVGCopy = document.querySelector('.svg-text');
var bestScore = Infinity;
var flipCount = 0;
var cardIsFlipped = false;
var firstCard, secondCard;
var lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  flipCount++;
  document.querySelector('#flip-counter-text').firstElementChild.textContent = flipCount;

  if (!cardIsFlipped) {
    // first click
    cardIsFlipped = true;
    firstCard = this;
    return;
  } // second click


  cardIsFlipped = false;
  secondCard = this;
  checkForMatch();

  if (checkWin()) {
    flipCounterSVGCopy.classList.add('win-text');
    flipCounterTextContainer.classList.removeProperty('fill');
    setBestScore();
  }
}

function checkForMatch() {
  var isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableFlipCard() : unflipCards();
}

function disableFlipCard() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetPairs();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(function () {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetPairs();
  }, 1000);
}

function resetPairs() {
  cardIsFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle(array) {
  var imagesCopy = _toConsumableArray(array);

  var shuffled = [];

  while (imagesCopy.length > 0) {
    var randomIndex = Math.floor(Math.random() * imagesCopy.length);
    var _imagesCopy$splice$ = imagesCopy.splice(randomIndex, 1)[0],
        src = _imagesCopy$splice$.src,
        alt = _imagesCopy$splice$.alt;
    shuffled.push({
      src: src,
      alt: alt
    });
  }

  return shuffled;
}

function getAndSetBestScore() {
  var storedBestScore = window.localStorage.getItem('bestScore');

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
  var shuffledImages = shuffle(imageNodes);

  _toConsumableArray(imageNodes).forEach(function (imageNode, index) {
    imageNode.src = shuffledImages[index].src;
    imageNode.alt = shuffledImages[index].alt;
    imageNode.parentElement.dataset.image = shuffledImages[index].alt;
    imageNode.parentElement.classList.add('flip');
  });

  flipCount = 0;
  document.querySelector('#flip-counter-text').firstElementChild.textContent = 0;
  resetPairs();
  flipCounterSVGCopy.classList.remove('win-text');
  cards.forEach(function (card) {
    return card.addEventListener('click', flipCard);
  });
}

function checkWin() {
  return _toConsumableArray(imageNodes).every(function (imageNode) {
    return imageNode.parentElement.classList.contains('flip');
  });
}

document.querySelector('.btn').addEventListener('click', startGame);

window.onload = function () {
  startGame();
  getAndSetBestScore();
};

cards.forEach(function (card) {
  return card.addEventListener('click', flipCard);
});
//# sourceMappingURL=main.js.map
