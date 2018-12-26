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
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
