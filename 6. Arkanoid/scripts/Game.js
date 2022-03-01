import { Common, VISIBLE_SCREEN } from './Common.js';
import { DATALOADED_EVENT_NAME } from './Loader.js';
import { gameLevels } from './gameLevels.js';
import { canvas } from './Canvas.js';
import { media } from './Media.js';
import { resultScreen } from './ResultScreen.js';
import { userData } from './UserData.js';
import { mainMenu } from './MainMenu.js';
import { Sprite } from './Sprite.js';
import { Paddle } from './Paddle.js';
import { keyboardController, KEY_CODE_LEFT, KEY_CODE_PAUSE, KEY_CODE_RIGHT } from './KeyboardController.js';

const PLAYER_SPEED = 10;

class Game extends Common {
    constructor(){
        super();
    }

    playLevel(level){
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)

		this.background = new Sprite(0, 33, 800, 450, media.spritesImage, 0, 0);
		this.paddle = new Paddle();
        this.gameState = { isGamePaused:false };
        // this.gameState = new GameState();

        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
		this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, VISIBLE_SCREEN);
		media.isInLevel = true;
		media.playBackgroundMusic();
        this.animate();
    }

    animate(){
		this.handleKeyboardClick();
		this.drawSprites();
		this.checkEndOfGame();
    }

	handleKeyboardClick() {
		// console.log('handleKeyboardClick()');
		const { clickedKey: key } = keyboardController;
		// const key = keyboardController.clickedKey;
		// console.log(key);

		if (!key) {
			return;
		}

		if (key === KEY_CODE_PAUSE) {
			this.gameState.isGamePaused = !this.gameState.isGamePaused;
			keyboardController.clickedKey = null;
			return;
		}

		if (!this.gameState.isGamePaused && key === KEY_CODE_LEFT) {
			for (let i = PLAYER_SPEED; this.paddle.movePlayerLeft() && i; i--);
			keyboardController.clickedKey = null;
			return;
		}

		if (!this.gameState.isGamePaused && key === KEY_CODE_RIGHT) {
			for (let i = PLAYER_SPEED; this.paddle.movePlayerRight() && i; i--);
			keyboardController.clickedKey = null;
			return;
		}
	}

	drawSprites(){
		this.background.draw(0,1.25);
		this.paddle.draw();
	}

    checkEndOfGame(){
        if(false){
            media.isInLevel = false;
			media.stopBackgroundMusic();

			const isPlayerWinner = this.gameState.isPlayerWinner();
			const currentLevel = Number(this.gameState.level);

            if(isPlayerWinner && gameLevels[currentLevel]){
                if(!userData.checkAvailabilityLevel(currentLevel + 1)){
					userData.addNewLevel(currentLevel +1);
				}
            }

			if(userData.getHighScores(currentLevel) < this.gameState.getPlayerPoints()){
				userData.setHighScore(currentLevel, this.gameState.getPlayerPoints());
			}

            resultScreen.viewResultScreen(isPlayerWinner, this.gameState.getPlayerPoints(), currentLevel);

        } else {
            this.animationFrame = window.requestAnimationFrame(()=>{this.animate()})
        }
    }

	swap(firstDiamond, secondDiamond) {
		[
			firstDiamond.kind,
			firstDiamond.alpha,
			firstDiamond.match,
			firstDiamond.x,
			firstDiamond.y,
			secondDiamond.kind,
			secondDiamond.alpha,
			secondDiamond.match,
			secondDiamond.x,
			secondDiamond.y,
		] = [
			secondDiamond.kind,
			secondDiamond.alpha,
			secondDiamond.match,
			secondDiamond.x,
			secondDiamond.y,
			firstDiamond.kind,
			firstDiamond.alpha,
			firstDiamond.match,
			firstDiamond.x,
			firstDiamond.y,
		];

		this.gameState.setIsMoving(true);
	}
}

export const game = new Game();