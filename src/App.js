import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numOfGuessLeft: 10,
      formInput: "",
      gameStart: false,
      score: 0,
      roundsPlayer: 0,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    console.log(this.state.currWord);
    // for...of is a string and array iterator that does not use index
    for (let inputLetter of this.state.currWord) {
      if (
        this.state.guessedLetters.includes(inputLetter) ||
        // Show full word if numGuessesLeft is 0
        this.state.numOfGuessLeft === 0
      ) {
        wordDisplay.push(inputLetter);
        //reset game once all the letters are included or the guesses left is 0
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState({ formInput: event.target.value });
  };

  handleSubmit = (event) => {
    // alert("A name was submitted: " + this.state.formInput);
    event.preventDefault();

    const inputLetter = this.state.formInput[0];
    // const inputLetter = input.toLowerCase();
    // console.log(inputLetter);
    if (this.state.numOfGuessLeft === 0) {
      this.setState({ gameStart: true });
    }
    this.setState((state) => ({
      // Concatenate the empty array with the inputs
      guessedLetters: [...state.guessedLetters, inputLetter],

      // Reduce num guesses left if the user guessed wrongly
      numOfGuessLeft: this.state.currWord.includes(inputLetter)
        ? this.state.numOfGuessLeft - 1
        : this.state.numOfGuessLeft - 1,
    }));
  };

  compareUserWord = (inputLetter) => {
    //   // Create new array with spread operator (make a copy)
    const guessedLetters = [...this.state.guessedLetters];
    console.log(guessedLetters);

    //track whether the user has guessed all letters of the word
    //and how many guesses the user has left (can start with 10).
    //If the user guesses all letters correctly, tell them they have won.
    //If the user runs out of guesses, reveal the word and tell them they have lost.
    //When the round ends, give the user an option to play again.
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    // Return true if guessedLetters contains all letters in this.state.currWord
    return true;
  };

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      numOfGuessLeft: 10,
      formInput: "",
      guessedLetters: [],
      gameStart: false,
      roundsPlayer: this.state.roundsPlayer + 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.gameStart !== prevState.gameStart) {
      this.resetGame();
    } else console.log("in progress");
    return "winner";
  }

  render() {
    const userWon = this.compareUserWord();
    const playAgainButton = (
      <button onClick={this.resetGame}>Play Again</button>
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>{this.state.numOfGuessLeft}</h3>
          <h3>Input</h3>
          {/* Button disapppears */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Letter:
              <input
                type="text"
                name="name"
                value={this.state.formInput}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {/* Output messages */}
          {userWon ? (
            <div>
              <p>Yay!</p>
              {playAgainButton}
            </div>
          ) : this.state.numOfGuessLeft === 0 || !this.compareUserWord ? (
            <div>
              <p>Sorry, please play again!</p>
              {playAgainButton}
            </div>
          ) : null}
          <p>You have played {this.state.roundsPlayer} rounds</p>
        </header>
      </div>
    );
  }
}

export default App;
