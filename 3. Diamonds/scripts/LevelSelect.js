import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.js';
import { canvas } from './Canvas.js';
import { loader, DATALOADED_EVENT_NAME } from './Loader.js';
import { game } from './Game.js';
import { media } from './Media.js';

const gameLevels = [
    {
        level: 1,
    },
    {
        level: 2,
    },
    {
        level: 3,
    },
]

const LEVEL_SELECT_BUTTON_ID = 'level-select__button';
const LEVEL_SELECT_ID = 'js-level-select-screen';

class LevelSelect extends Common {
    constructor(){
        super(LEVEL_SELECT_ID);
        gameLevels.forEach(gameLevel => this.createButton(gameLevel.level))
    }

    createButton(value){
        const button = document.createElement('button');

        button.type = 'button';
        button.classList.add(LEVEL_SELECT_BUTTON_ID);
        button.textContent = value;
        button.value = value;
        button.addEventListener('click', event => {this.buttonOnClickHandler(event)});
        this.element.appendChild(button);
    }

    buttonOnClickHandler(event){
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.loadLevel(event.currentTarget.value);
    }

    loadLevel(level){
        media.diamondsSprite = loader.loadImage('images/diamonds-transparent.png')
        media.backgroundImage = loader.loadImage('images/levelBackground.png');
        window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level))
    }
}

export const levelSelect = new LevelSelect();