import { Common, VISIBLE_SCREEN, HIDDEN_SCREEN } from './Common.js';
import { canvas } from './Canvas.js';
import { mainMenu } from './MainMenu.js';
import { userData } from './UserData.js';
import { levelSelect } from './LevelSelect.js';
import { game } from './Game.js';

const RESULT_SCREEN_BACK_BUTTON_ID = 'js-back-to-levels';
const RESULT_SCREEN_END_SCREEN_ID = 'js-end-screen';
const RESULT_SCREEN_GAME_WIN_CLASS = 'end-screen--is-win';
const RESULT_SCREEN_HEADER_ID = 'js-game-result';
const RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID = 'js-restart-level';

class ResultScreen extends Common {
    constructor(){
        super(RESULT_SCREEN_END_SCREEN_ID);
        this.bindToElements();
    }

    bindToElements(){
        this.resultTextElement = this.bindToElement(RESULT_SCREEN_HEADER_ID);

        const backButtonElement = this.bindToElement(RESULT_SCREEN_BACK_BUTTON_ID);
        const restartButtonElement = this.bindToElement(RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID);

        backButtonElement.addEventListener('click', () => this.backButtonClick())

        restartButtonElement.addEventListener('click', () => this.resetartLevelClick())
    }

    viewResultScreen(isGameWin){
        if(isGameWin){
            this.element.classList.add(RESULT_SCREEN_GAME_WIN_CLASS);
        } else {
            this.element.classList.remove(RESULT_SCREEN_GAME_WIN_CLASS);
        }

        this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
        this.resultTextElement.textContent = isGameWin ? 'WYGRAŁEŚ !' : 'PRZEGRAŁEŚ !';
    }

    backButtonClick(){
        this.changeVisibilityScreen(canvas.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, HIDDEN_SCREEN);
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        mainMenu.showLevelScreen();
    }

    resetartLevelClick(){
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        levelSelect.loadLevel(game.gameState.level)
    }
}

export const resultScreen = new ResultScreen();