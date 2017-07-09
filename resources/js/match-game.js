$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

var MatchGame = {};

/*
Sets up a new game after HTML document has loaded.
Renders a 4x4 board of cards.
*/

/*
Generates and returns an array of matching card values.
*/

MatchGame.generateCardValues = function () {
  var numbers = new Array();
  for (var i = 1; i < 9; i++) {
    numbers.push(i);
    numbers.push(i);
  };
  // return numbers;
  var random = new Array();
  while (numbers.length > 0) {
    var index = Math.floor(Math.random() * numbers.length);
    random.push(numbers[index]);
    numbers.splice(index, 1);
  }
  return random;
};

/*
Converts card values to jQuery card objects and adds them to the supplied game
object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var flippedCards = new Array();
  $game.data('flippedCards',flippedCards);
  var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $game.empty();
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colors[cardValues[i]-1]);
    $game.append($card);
    $card.on('click', function () {
      (MatchGame.flipCard($(this), $game))
    });
  };

};

/*
Flips over a given card and checks to see if two cards are flipped over.
Updates styles on flipped cards depending whether they are a match or not.
*/

MatchGame.flipCard = function($card, $game) {
  var flippedCardsArray = $game.data('flippedCards');
  if ($card.data('flipped')) {
    return;
  } else if($card.data('flipped') === false) {
    $card.css('background-color',$card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
    flippedCardsArray.push($card);
    console.log(flippedCardsArray);
    $game.data('flippedCards', flippedCardsArray);
    console.log($game.data('flippedCards'));
  };
  console.log(flippedCardsArray.length);

  if (flippedCardsArray.length > 1) { //If more than one car is flipped over
    console.log('more than one card is flipped')
    if ((flippedCardsArray[0].data('value')) === (flippedCardsArray[1].data('value'))) {
      setTimeout (function () {
        flippedCardsArray[0].css('background-color','rgb(153, 153, 153)');
        flippedCardsArray[0].css('color','rgb(204, 204, 204)');
        flippedCardsArray[1].css('background-color','rgb(153, 153, 153)');
        flippedCardsArray[1].css('color','rgb(204, 204, 204)');
      }, 500);
    }
    else {
      setTimeout(function () {
        for (var i = 0; i < 2; i++) {
          flippedCardsArray[i].css('background-color','rgb(32, 64, 86)');
          flippedCardsArray[i].text('');
          flippedCardsArray[i].data('flipped',false);
        }
      }, 500);
    };
    $game.data('flippedCards', []);
  };
};
