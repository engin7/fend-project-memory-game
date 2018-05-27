const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
const deck = document.querySelector(".deck");
const myMoves = document.querySelector(".moves");
const myStars = document.querySelector(".stars");
const myTimer = document.querySelector(".timer");
const restartB = document.querySelector(".restart");
let modal = document.getElementById('modal');
let modalText = document.querySelector('h2');


let opened = [];
let matches = [];
let myRating;
let numberOfStars = 3;
//Initialize the game
function init() {
        shuffle(cards);
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="fa ${cards[i]}"></i>`;
        deck.appendChild(card);
        play(card);
    }
}
//play event
function play(card) {
//prevent clicking opened cards
    card.addEventListener("click", function() {
        // Card Click Event
      if (!card.classList.contains('open') || !card.classList.contains('show')){
        const currentCard = this;
        const previousCard = opened[0];
        // if we opened a card
        if(opened.length === 1) {
            card.classList.add("open", "show", "disable");
            opened.push(this);
            compare(currentCard, previousCard);
        }
        else {
        // no opened cards (first start)
            currentCard.classList.add("open", "show", "disable");
            opened.push(this);
        }
    }});
}
function compare(currentCard, previousCard) {
    // There is a Match!
    if(currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matches.push(currentCard, previousCard);
        //clear opencards slot
        opened = [];
        // Check if all matched
        GameOver();
    } else {
        // close cards when there is no match temporarily flash red
        setTimeout(function() {
           currentCard.classList.add("unmatch");
           previousCard.classList.add("unmatch");
        }, 300);
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable","unmatch");
            previousCard.classList.remove("open", "show", "disable","unmatch");
        }, 1200);
        //clear opencards slot
        opened = [];
    }
    addMove();
}

//Add move number
let moves = 0;
myMoves.innerHTML = 0;
function addMove() {
    moves++;
    if (moves === 1){
           startTimer();
         };
    myMoves.innerHTML = moves;
    rating();
}
//Rating...
const star = `<li><i class="fa fa-star"></i></li>`;
myStars.innerHTML = star + star + star;
function rating() {
    if( moves < 20) {
        myStars.innerHTML = star + star + star;
        myRating = 'Excellent job!';
        numberOfStars = 3;
    } else if( moves < 30) {
        myStars.innerHTML = star + star;
        myRating = 'Not bad.';
        numberOfStars = 2;
    } else {
        myStars.innerHTML = star;
        myRating = 'Fish memory?';
        numberOfStars = 1;
    }
}

// Check if GameOver
function GameOver() {
    if(matches.length === 2) {
        stopTimer();
        modalText = 'Game Over! \r\n' + myRating  +   '\r\nYour stars: \u00A0' + numberOfStars +   '\r\nTime passed: \u00A0'+ totalSeconds + 'seconds' + '\r\nPlease close this window and press restart button to play again.';
        modal.style.display = 'block';
        // Stop  timer

    }
}

//Timer...
let time, totalSeconds = 0;
myTimer.innerHTML = '\u00A0\u00A0\u00A0\u00A0' + 'Time:' + '\u00A0' + totalSeconds + 's';
 function startTimer() {
    time = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        myTimer.innerHTML = '\u00A0\u00A0\u00A0\u00A0' + 'Time:' + '\u00A0' + totalSeconds + 's';
    }, 1000);
}
// The clearInterval() method clears a timer set with the setInterval() method.
function stopTimer() {
    clearInterval(time);
}
//Restart Button...
restartB.addEventListener("click", function() {
    // Delete cards in the deck
    deck.innerHTML = "";
    // create and shuffle new cards
    init();
    // Reset the game
    reset();
});
function reset() {
    matches = [];
    moves = 0;
    myMoves.innerHTML = moves;
    // give back my stars
    myStars.innerHTML = star + star + star;
    stopTimer();
    totalSeconds = 0;
    myTimer.innerHTML = '\u00A0\u00A0\u00A0\u00A0' + 'Time:' + '\u00A0' + totalSeconds + 's';
}
// Initialize the game
init();
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
