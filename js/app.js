/*
 *  Global Variables
 */
// Create a list that holds all of cards icons
let cardIcons = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb',
];
cardIcons = [
    ...cardIcons,
    ...cardIcons
];

// variables hold DOM elements
const cardsContainer = document.querySelector('.deck'),
      timerContainer = document.querySelector('.timer'),
      movesContainer = document.querySelector('.moves'),
      starsContainer = document.querySelector('.stars'),
      stars = document.querySelectorAll('.stars li'),
      restart = document.querySelector('.restart'),

// modal elements
      modal = document.querySelector('.modal'),
      cancel = document.querySelector('.cancel'),
      close = document.querySelector('.close'),
      play =  document.querySelector('.play'),
      modalTime = document.querySelector('.modal-time'),
      modalMoves = document.querySelector('.modal-move'),
      modalStars = document.querySelector('.modal-star');

// global
// variables counts time items
let sec = 0;
let min = 0;
let hr = 0;
let time;
let timerOff = true;

// counts number of moves
let moves = 0;

// array that hold the two opened cards to be compared if they match or not
let openedCards = [];

// counts number of matched cards
let totalMatchedCards = 0;


/*
* functions for dealing with class of an element
*/
// Adding class to an element
function addClass(elem, ...classToAdd) {
    const styles = [...classToAdd];
    for (const style of styles) {
        elem.classList.add(style);
    }
}

// Removing class from an element
function removeClass(elem, ...classToRemove) {
    const styles = [...classToRemove];
    for (const style of styles) {
        elem.classList.remove(style);
    }
}

// Toggle class for an element
function toggleClass(elem, classToToggle) {
    elem.classList.toggle(classToToggle);
}

// Check an element contain class
function containClass(elem, classToCheck) {
   return elem.classList.contains(classToCheck);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
* TODO: Build and display cards with its shuffled icons
* cardsContainer - The container that will contians the cards
* cardIcons - An array  that holds all of cards icons
*/
function displayCards(cardsContainer, cardIcons) {
    // using DocumentFragment to improve performance
    const fragment = document.createDocumentFragment();
    // shuffle card icons
    const icons = shuffle(cardIcons);
    // loop and create cards elements
    for (const icon of icons) {
        const card = document.createElement('li');
        addClass(card, 'card');
        card.innerHTML = `<i class="${icon}"></i>`;
        fragment.appendChild(card);
    }
    cardsContainer.appendChild(fragment);
    return cardsContainer;
}


/*
* Functions for the game Status (time, number of moves and star rating)
*/

/*
* Setup the timer
*/
// set time
function timeIncrement() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hr++;
        }
    }
    // display time
    displayTimer();
    // repeating
    startTimer();
}

// displaying time in formate 00 : 00 : 00
function displayTimer() {
    let hrDisplay = (hr <= 9) ? `0${hr}` : hr;
    let minDisplay = (min <= 9) ? `0${min}` : min;
    let secDisplay = (sec <= 9) ? `0${sec}` : sec;
    timerContainer.textContent = `${hrDisplay} : ${minDisplay} : ${secDisplay}`;
}

// Start the timer
function startTimer() {
    time = setTimeout(timeIncrement, 1000);
}

// Stop the timer
function stopTimer() {
    clearTimeout(time);
}


/*
* Setup moves counter
*/
// Increment moves and display it
function incrementMoves() {
    moves++;
    movesContainer.textContent = `${moves}`;
}


/*
* Setup stars rating
*/
// Count star depending on number of moves when moves 14 or 20 the player lose a star
 function countStars(moves) {
    const lastStar = starsContainer.lastElementChild;
    const preStar = lastStar.previousElementSibling;
    // using style color for star element that is lost
    if (moves === 14 || moves === 20) {
       if (containClass(lastStar, 'star-color-lose')) {
           addClass(preStar, 'star-color-lose');
       } else {
            addClass(lastStar, 'star-color-lose');
       }
    }
 }


/*
* Reset functions
*/
// Reset openCards array
function resetOpenedCards(array) {
    array.length = 0;
}

// Reset timer items
function resetTimer() {
    stopTimer();
    timerOff = true;
    sec = 0;
    min = 0;
    hr = 0;
    displayTimer();
}

// Reset moves counter
function resetMoves() {
    moves = 0;
    movesContainer.textContent = `${moves}`;
}

// Reset stars rating
function resetStars(stars) {
    for (const star of stars) {
        if (containClass(star, 'star-color-lose')) {
            removeClass(star, 'star-color-lose');
        }
    }
}


/*
* Listener function to the click of each card
* Event delegation process using (evt) - Event object and its (.target) property to avoid many events
*/
function revealCard(evt) {
    const targetedCard = evt.target;
    /*
    * using (.nodeName) property (verifies target is desired element)
    * doesn't contain open class (to make sure that card not opened and user didn't click on the same card twice)
    * openedCards.length < 2 (to ensure that openedCards array has one card or no card yet)
    */
    if (targetedCard && targetedCard.nodeName === 'LI' &&
        !containClass(targetedCard, 'open') && openedCards.length < 2)
        {
        // start timer
        if (timerOff) {
            startTimer();
            timerOff = false;
        }
        // flip card
        addClass(targetedCard, 'animated', 'flipInY');
        // show the card by adding class open which we use to verify that card is opened
        setTimeout(function openCard() {
            addClass(targetedCard, 'open', 'show');
        }, 100);
        // add this card which is now opened to openedCards array
        openedCards.push(targetedCard);
        // verify if number of cards that opened in openedCards array are two to start comparing
        if (openedCards.length === 2) {
            // compare the two card
            matchCards(openedCards);
            // increment moves counter
            incrementMoves();
            // count star rating
            countStars(moves);
        }
    }
}


/*
* Function to compare between the two selected cards
*/
function matchCards(openedCardsArray) {
    const [firstCard, secondCard] = openedCardsArray;
    // using (.className) property to compare between the two card
    if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
        /*
        * If matched - keep display cards and animate
        * increment totalMatchedCards for each card
        * Check if the game is over or not
        * reset OpenedCards array
        */
        for (const card of openedCardsArray) {
            setTimeout(function () {
                    removeClass(card, 'flipInY');
                    addClass(card, 'match');
                }, 500);
            setTimeout(function () {
                addClass(card, 'flash');
            }, 700);
            // increment totalMatchedCards for each card
            totalMatchedCards++;
        }
        setTimeout(function () {
            // Reset OpenedCards array
            resetOpenedCards(openedCardsArray);
        }, 1200);
        setTimeout(function () {
            // Check if the game is over or not
            gameOver(cardIcons, totalMatchedCards);
        }, 1450);
    } else {
        /*
        * If not matched - hide cards and animate
        * reset OpenedCards array
        */
        for (const card of openedCardsArray) {
            setTimeout(function () {
                removeClass(card, 'flipInY');
            }, 500);
            setTimeout(function () {
                addClass(card, 'shake');
            }, 700);
            setTimeout(function () {
                removeClass(card, 'open', 'show', 'animated', 'shake');
            }, 1700);
        }
        // Reset OpenedCards array
        setTimeout(function () {
                resetOpenedCards(openedCardsArray);
        }, 1450);
    }
}

/*
* Display modal data - player score - (time, number of moves and star rating)
*/
function modalData() {
    // time after timer stop when game over
    const timerFinalValue = document.querySelector('.timer').textContent;
    // star rating when game over
    const starsFinalValue = document.querySelector('.stars').innerHTML;
    modalTime.textContent = `Time: ${timerFinalValue}`;
    modalMoves.textContent = `Moves: ${moves}`;
    modalStars.innerHTML = `${starsFinalValue}`;
}


/*
* Toggle modal hide or unhide
* unhide when game is over and hide when the user close the modal or to play again
*/
function toggleModal() {
    toggleClass(modal, 'hide');
    // display data of the modal
    modalData();
}


/*
* End game - when number of matched card equal number of cards
* stop timer and show modal  to congratulate the user and display game score
*/
function gameOver(cardIconsArray, totalMatchedCards) {
    if (cardIconsArray.length === totalMatchedCards) {
        stopTimer();
        toggleModal();
    }
}


/*
* Set Event handler to all parts of the game
*/
function setEvents() {
    // Add event listener to the parent of cards to manage events for child elements
    cardsContainer.addEventListener('click', revealCard);
    // Restart button - to reset game
    restart.addEventListener('click', resetGame);
    // Cancel button in modal to close the modal
    cancel.addEventListener('click', toggleModal);
    // Close button in modal to close the modal
    close.addEventListener('click', toggleModal);
    // Play again button in modal to replay
    play.addEventListener('click', playAgain);
}


/*
* Start game - display cards and set event listener
*/
function startGame(cardsContainer, cardIcons) {
    displayCards(cardsContainer, cardIcons);
    setEvents();
}


/*
* Reset game
*/
function resetGame() {
    // reset timer
    resetTimer();
    // reset moves
    resetMoves();
    // reset stars
    resetStars(stars);
    // reset matched card
    totalMatchedCards = 0;
    // reset opened cards array
    resetOpenedCards(openedCards);
    // reset card container and rebuild cards
    cardsContainer.textContent = '';
    startGame(cardsContainer, cardIcons);
}


/*
* Play again - when modal appear show the ability to play again
*/
function playAgain() {
    // hide modal
    toggleModal();
    // reset game to play again
    resetGame();
}


// TODO: start the game
startGame(cardsContainer, cardIcons);