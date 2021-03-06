import { Common, VISIBLE_SCREEN } from './Common.js';
import { DATALOADED_EVENT_NAME } from './Loader.js';
import { canvas } from './Canvas.js';
import { media } from './Media.js';
import { resultScreen } from './ResultScreen.js';
import { userData } from './UserData.js';
import { mainMenu } from './MainMenu.js';
import { Sprite } from './Sprite.js';
import { Paddle } from './Paddle.js';
import { Ball } from './Ball.js';
import { keyboardController, KEY_CODE_LEFT, KEY_CODE_PAUSE, KEY_CODE_RIGHT } from './KeyboardController.js';
import { GameState } from './GameState.js';

const PLAYER_SPEED = 10;

class Game extends Common {
    constructor(){
        super();
    }

    playLevel(level){
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);

		this.background = new Sprite(0, 33, 800, 450, media.spritesImage, 0, 0);
		this.paddle = new Paddle();
		this.ball = new Ball();
        this.gameState = new GameState(level);

        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
		this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, VISIBLE_SCREEN);
		media.isInLevel = true;
		media.playBackgroundMusic();
        this.animate();
    }

    animate(){
		this.handleKeyboardClick();
		if(!this.gameState.isGamePaused){
			this.ball.moveAndCheckCollision(this.gameState.getGameBoard());
			this.moveAndCheckCollisionBallWithPaddle();
		}
		this.drawSprites();
		this.checkEndOfGame();
    }

	handleKeyboardClick() {
		const { clickedKey: key } = keyboardController;

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

	moveAndCheckCollisionBallWithPaddle(){
		const { dx,dy } = this.ball;

		if(this.ball.dy < 0){
			return;
		}

		const vector = {dx,dy};

		if(this.ball.checkCollisionWithAnotherSprite(vector, this.paddle)){
			this.ball.dy = -(Math.floor(Math.random()*3)+3);
		}
	}

	drawSprites(){
		this.background.draw(0,1.25);
		this.gameState.getGameBoard().forEach(block => block.draw());
		this.ball.draw();
		this.paddle.draw();
	}

    checkEndOfGame(){
        if(this.ball.hadHitOnBottomEdge()){
            media.isInLevel = false;
			media.stopBackgroundMusic();
            resultScreen.viewResultScreen(false);
        } else if(!this.gameState.getGameBoard().length){
			const nextLevel = Number(this.gameState.level) + 1;
			media.isInLevel = false;
			media.stopBackgroundMusic();
			userData.addNewLevel(nextLevel);
			resultScreen.viewResultScreen(true);
		} else {
            this.animationFrame = window.requestAnimationFrame(()=>{this.animate()})
        }
    }
}

export const game = new Game();