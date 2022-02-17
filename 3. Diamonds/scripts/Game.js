import { Common, VISIBLE_SCREEN } from './Common.js';
import { DATALOADED_EVENT_NAME } from './Loader.js';
import { gameLevels, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from './gameLevels.js';
import { canvas } from './Canvas.js';
import { media } from './Media.js';
import { GameState } from './GameState.js';
import { mouseController } from './MouseController.js';
import { DIAMOND_SIZE } from './Diamond.js';

const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; //invisibile first row at the top

class Game extends Common {
    constructor(){
        super();
    }

    playLevel(level){
        const {numberOfMovements, pointsToWin, board} = gameLevels[level - 1];

        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)
        this.gameState = new GameState(level, numberOfMovements, pointsToWin, board, media.diamondsSprite);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.animate();
    }

    animate(){
        // console.log('animate()');

        this.handleMouseState();
        this.handleMouseClick();
        canvas.drawGameOnCanvas(this.gameState);
        this.gameState.getGameBoard().forEach( diamond => diamond.draw());
        this.animationFrame = window.requestAnimationFrame(()=>{this.animate()})
    }

    handleMouseState(){
        const isSwaping = !this.gameState.getIsSwaping();
        const isMoving = !this.gameState.getIsMoving();

        if(mouseController.clicked && isSwaping && isMoving){
            mouseController.state++;
        }
    }

    handleMouseClick(){
        if(!mouseController.clicked){
            return;
        }

        const xClicked = Math.floor((mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
        const yClicked = Math.floor((mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

        if(!yClicked || xClicked >= DIAMONDS_ARRAY_WIDTH || yClicked >= DIAMONDS_ARRAY_HEIGHT){
            mouseController.state = 0;
            return;
        }

        if(mouseController.state === 1){
            mouseController.firstClick = {
                x: xClicked,
                y: yClicked,
            }
        } else if (mouseController.state === 2){
            mouseController.secondClick = {
                x: xClicked,
                y: yClicked,
            }

            mouseController.state = 0;

            if(
                Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) +
                Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !==
                1
            ){
                return;
            }

            this.swapDiamonds();

            this.gameState.setIsSwaping(true);
            this.gameState.decreasePointsMovement();
            mouseController.state = 0;
        }

        mouseController.clicked = false;
    }
}

export const game = new Game();