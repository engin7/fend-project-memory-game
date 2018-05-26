/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"]; 

// All other variables,const,let etc.
const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const playAgain = document.querySelector(".playAgain");
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modalText");
let openedCards = [];  let matches = [];
let numberOfMoves = moves.textContent;
let numberOfStars = 3;
let timer = document.querySelector(".timer");
let seconds = 0; 

//Restart func
function restart() {
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        deck.appendChild(card);
        //playing event
        play(card);
    }
  
    matches = [];
    moves.innerHTML = 0;

    // Reset rating&timer
     for (var i = 0; i < 3; i++) {
    stars.innerHTML += star;
}
    stopTimer();
    isFirstClick = true;
    timer.innerHTML = seconds + "s";
}

//Restart button
restart.addEventListener("click", function() {
    // Delete ALL cards
    deck.innerHTML = "";
    // Reset and start the game 
    restart();
});

/////// (Re)start the game 
restart();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
