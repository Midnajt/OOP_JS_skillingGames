import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.js';
import { levelSelect } from './LevelSelect.js';

const SCALE_PROPERTY = '--scale-value';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';
const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';

class MainMenu extends Common {
    constructor(){
        super(START_SCREEN_ID);
        this.bindToGameElement();
        this.resizeGameWindow();
        window.addEventListener('resize', () => this.resizeGameWindow())
    }

    bindToGameElement(){
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);

        gameStartButton.addEventListener('click', () => this.showLevelScreen());
        gameSettingsButton.addEventListener('click', () => this.showSettingsScreen());
    };

    showLevelScreen(){
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(levelSelect.element, VISIBLE_SCREEN);
        console.log('showLevelScreen()');
    }

    showSettingsScreen(){
        console.log('showSettingsScreen()');
    }

    resizeGameWindow(){
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / 640, height / 480);

        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }
}

export const mainMenu = new MainMenu();