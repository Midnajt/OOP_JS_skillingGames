import {Quote} from './Quote.js';

export class Game {

    quotes = [
        {
          text: "pan tadeusz",
          category: "Utwór literacki",
        },
        {
          text: "ogniem i mieczem",
          category: "Film",
        },
        {
          text: "w pustyni i w puszczy",
          category: "Film",
        },
        {
          text: "dzieci z bullerbyn",
          category: "Utwór literacki",
        },
      ];

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper
    }){
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text,category} = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess(letter,event){
        event.target.disabled = true;
        this.quote.guess(letter)
        this.drawQuote();
    }

    drawLetters(){
        for(let i =0; i<26; i++){
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event)=> this.guess(label,event))
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote(){
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
    }

    start(){
        this.drawLetters();
        this.drawQuote();
    }
}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')
});