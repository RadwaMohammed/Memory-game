/*
 *  Global Variables
 */
 // Create a list that holds all of cards icons
const cardIcons = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-anchor',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-diamond',
    'fa fa-bomb',
    'fa fa-leaf',
    'fa fa-bomb',
    'fa fa-bolt',
    'fa fa-bicycle',
    'fa fa-paper-plane-o',
    'fa fa-cube'
];

// variables hold DOM elements
const cardsContainer = document.querySelector('.deck');
const timerContainer = document.querySelector('.timer');
const movesContainer = document.querySelector('.moves');
const starsContainer = document.querySelector('.stars');
const stars = document.querySelectorAll('.stars li');

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
    //using DocumentFragment to improve performance
    const fragment = document.createDocumentFragment();
    //shuffle card icons
    const icons = shuffle(cardIcons);
    //loop and create cards elements
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
* Functions for the game Status (timer, counting moves)
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
//Count star depending on number of moves when moves 14 or 20 the player lose a star
 function countStars(moves) {
    const lastStar = starsContainer.lastElementChild;
    const preStar = lastStar.previousElementSibling;
    //using style color for star element that is lost
    if (moves === 14 || moves === 20) {
       if (containClass(lastStar, 'star-color-lose')) {
           addClass(preStar, 'star-color-lose');
       } else {
            addClass(lastStar, 'star-color-lose');
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



        }
    }
}

displayCards(cardsContainer, cardIcons);
cardsContainer.addEventListener('click', revealCard);
