import {Quote} from './Quote.js';

export class Game {
    currentStep = 0;
    lastStep = 7;

    quotes = [
        {
          text: "harry potter",
          category: "A literary work ",
        },
        {
          text: "the lord of the ring",
          category: "A movie",
        },
        {
          text: "matrix",
          category: "A movie",
        },
        {
          text: "a shadow of the wind",
          category: "A literary work ",
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
        if(this.quote.guess(letter)){
            this.drawQuote();
        } else {
            this.currentStep++;
            document.querySelectorAll('.step')[this.currentStep].style.opacity = 1;
            if(this.currentStep == this.lastStep){
                this.loosing();
            }
        }
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
        if(!content.includes('_')){
            this.wining();
        }
    }

    start(){
        document.querySelectorAll('.step')[this.currentStep].style.opacity = 1;
        this.drawLetters();
        this.drawQuote();
    }

    wining(){
        this.wordWrapper.innerHTML = 'CONGRATULATIONS! You have won.';
        this.lettersWrapper.innerHTML = '';
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    loosing(){
        this.wordWrapper.innerHTML = 'Unfortunately! Mission failed.';
        this.lettersWrapper.innerHTML = '';
    }
}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')
});

game.start();