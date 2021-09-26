import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.resetgame=this.resetgame.bind(this);
    this.disablebtns= this.disablebtns.bind(this);
    this.hasWon=this.hasWon.bind(this);
  }
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  resetgame()
  {
    this.setState(st=>({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }))
  }
  disablebtns()
  {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button 
        key={ltr}
        value={ltr}
        disabled
        >
          {ltr}
        </button>
    ));
  }
  hasWon()
  {
    var c=0;
    this.state.answer.split("").map(ltr =>(
     c=c + (this.state.guessed.has(ltr) ? 1 : 0) 
    ))
    return c;
  };
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`Stage ${this.state.nWrong}/${this.props.maxWrong}`} />
        <h2> {this.state.nWrong < this.props.maxWrong ? `Incorrect Gusses: ${this.state.nWrong}` : `You Lose, Correct Answer:` }</h2>
        <h2>{this.hasWon()=== this.state.answer.length ? "You Won. To Continue Playing Click The Reset Button" :''}</h2>
        <p className='Hangman-word'>
        {this.state.nWrong < this.props.maxWrong ? this.guessedWord() : this.state.answer}
        </p>
        <p className='Hangman-btns'>
          {this.state.nWrong < this.props.maxWrong ? this.generateButtons():  this.disablebtns()}
        </p>
        <button onClick={this.resetgame} className='Resetbtn'>RESET</button>
      </div>
    );
  }
}

export default Hangman;

