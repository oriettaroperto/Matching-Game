/*
 * Create a list that holds all of your cards
 */
    let cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
    "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-leaf", "fa fa-leaf"];

    //shortened variables and selectors
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    totalCard = cards.length / 2,
    stars3 = 14,
    stars2 = 16,
    star1 = 20;

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

  function newGame() {
    let allCards = shuffle(cards);
    $deck.empty();
    match = 0;
    moves = 0;
    $moves.text('0');
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    // Resets time to 0
    resetTimer();
    second = 0;
    $timer.text(`${second}`)
    initTime();
    }

//starts rating
function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return {score: rating};
}

// Boostrap modal alert window
function gameOver(moves, score) {
    $('#winnerText').text(`You've completed the game in ${second} second with a total of ${moves} moves and a score of ${score}.`);
    $('#winnerModal').modal('toggle');
}

// Restarts the game
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        newGame();
    }
});

//Matching the cards
let addCardListener = function () {
    $deck.find('.card').bind('click', function () {
        let $this = $(this);
        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }
        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                });
                match++;
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, 700);
            }

            allOpen = [];
            moves++;
            rating(moves);
            $moves.html(moves);
        }

        //
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            });
        }
    });
}

// Timer
const timerContainer = document.querySelector(".timer");
let liveTimer, totalSeconds = 0;

function initTime() {
    liveTimer = setInterval(function () {
        $timer.text(`${second}`)
        second++;
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer() {
        clearInterval(liveTimer);
    }

newGame();
