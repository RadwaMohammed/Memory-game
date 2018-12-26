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

// global
// variables counts time items
let sec = 0;
let min = 0;
let hr = 0;
let time;
let timerOff = true;


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
* Functions for the game Status (timer)
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

displayCards(cardsContainer, cardIcons);