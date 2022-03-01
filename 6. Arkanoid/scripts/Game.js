import { Common, VISIBLE_SCREEN } from './Common.js';
import { DATALOADED_EVENT_NAME } from './Loader.js';
import { gameLevels } from './gameLevels.js';
import { canvas } from './Canvas.js';
import { media } from './Media.js';
import { resultScreen } from './ResultScreen.js';
import { userData } from './UserData.js';
import { mainMenu } from './MainMenu.js';
import { Sprite } from './Sprite.js';

class Game extends Common {
    constructor(){
        super();
    }

    playLevel(level){
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)

		this.background = new Sprite(0, 33, 800, 450, media.spritesImage, 0, 0);
        // this.gameState = new GameState();
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
		this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, VISIBLE_SCREEN);
		media.isInLevel = true;
		media.playBackgroundMusic();
        this.animate();
    }

    animate(){
		this.drawSprites();
        // this.checkEndOfGame();
    }

	drawSprites(){
		// debugger;
		this.background.draw(0,1.25);
	}

    checkEndOfGame(){
        if(!this.gameState.getLeftMovement() && !this.gameState.getIsMoving() && !this.gameState.getIsSwaping()){
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