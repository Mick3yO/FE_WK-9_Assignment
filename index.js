// Represents a playing card with a value, suit, and name
class Card {
  static Suit = {
    CLUBS: 'Clubs',
    DIAMONDS: 'Diamonds',
    HEARTS: 'Hearts',
    SPADES: 'Spades'
  };

  constructor(value, suit) {
    // Initialize card with a numerical value and suit
    this.value = value;
    this.suit = suit;
    // Set the name of the card based on its value and suit
    this.name = this.setName();
  }

  // Getter method for the numerical value of the card
  getValue() {
    return this.value;
  }

  // Method to set the name of the card based on its value and suit
  setName() {
    const valStr =
      this.value === 11
        ? 'Jack'
        : this.value === 12
        ? 'Queen'
        : this.value === 13
        ? 'King'
        : this.value === 14
        ? 'Ace'
        : String(this.value);

    return `${valStr} of ${this.suit}`;
  }

  // Method to get the name of the card
  describe() {
    return this.name;
  }
}

// Represents a deck of playing cards
class Deck {
  constructor() {
    // Initialize the deck with all 52 cards
    this.cards = [];
    for (let value = 2; value <= 14; value++) {
      for (let suit in Card.Suit) {
        // Create a new card and add it to the deck
        this.cards.push(new Card(value, Card.Suit[suit]));
      }
    }
  }

  // Shuffle the cards in the deck randomly
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  // Remove and return the top card from the deck
  draw() {
    return this.cards.shift();
  }
}

// Represents a player in the game with a hand, score, and name
class Player {
  constructor(name) {
    // Initialize player with an empty hand, score, and name
    this.hand = [];
    this.score = 0;
    this.name = name;
  }

  // Print out the player's hand and score
  describe() {
    console.log(`${this.name}'s hand:`);
    this.hand.forEach(card => console.log(card.describe()));
    console.log(`${this.name}'s score: ${this.score}`);
  }

  // Remove and return the top card of the player's hand
  flip() {
    return this.hand.shift();
  }

  // Take a deck as an argument, draw a card, and add it to the player's hand
  draw(deck) {
    const card = deck.draw();
    if (card) {
      this.hand.push(card);
      console.log(`${this.name} drew ${card.describe()}.`);
    } else {
      console.log(`${this.name} attempted to draw, but the deck is empty.`);
    }
  }

  // Increment the player's score by 1
  incrementScore() {
    this.score++;
  }

  // Return the player's score
  getScore() {
    return this.score;
  }

  // Return the player's name
  getName() {
    return this.name;
  }
}

// Represents the main game with a deck and two players
class Game {
  constructor() {
    // Initialize the game with a deck and two players
    this.deck = new Deck();
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
  }

  // Play a round of the game, compare cards, and determine the winner
  playRound() {
    const card1 = this.player1.flip();
    const card2 = this.player2.flip();

    console.log(`${this.player1.getName()} plays: ${card1.describe()}`);
    console.log(`${this.player2.getName()} plays: ${card2.describe()}`);

    if (card1.getValue() > card2.getValue()) {
      this.player1.incrementScore();
      console.log(`${this.player1.getName()} wins the round!`);
    } else if (card2.getValue() > card1.getValue()) {
      this.player2.incrementScore();
      console.log(`${this.player2.getName()} wins the round!`);
    } else {
      console.log('It\'s a tie!');
    }
  }

  // Play the entire game, including dealing cards and determining the winner
  playGame() {
    this.deck.shuffle();

    // Deal cards to each player
    for (let i = 0; i < 26; i++) {
      this.player1.draw(this.deck);
      this.player2.draw(this.deck);
    }

    // Play rounds until all cards are used
    for (let i = 0; i < 26; i++) {
      this.playRound();
    }

    // Determine the winner based on the final scores
    this.determineWinner();
  }

  // Determine and display the winner of the game
  determineWinner() {
    const score1 = this.player1.getScore();
    const score2 = this.player2.getScore();

    console.log(`Final Score - ${this.player1.getName()}: ${score1}, ${this.player2.getName()}: ${score2}`);

    if (score1 > score2) {
      console.log(`${this.player1.getName()} wins the game!`);
    } else if (score2 > score1) {
      console.log(`${this.player2.getName()} wins the game!`);
    } else {
      console.log('It\'s a tie!');
    }
  }
}

// Run the game
const warGame = new Game();
warGame.playGame();
