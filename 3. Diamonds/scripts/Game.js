import { Common, VISIBLE_SCREEN } from './Common.js';
import { DATALOADED_EVENT_NAME, loader } from './Loader.js';
import { gameLevels } from './gameLevels.js';
import { canvas } from './Canvas.js';
import { Diamond } from './Diamond.js';
import { media } from './Media.js';

const gameState = {
    pointsToWin: 7000,
    getPlayerPoints: ()=>1000,
    getLeftMovement: ()=> 30
}

class Game extends Common {
    constructor(){
        super();
    }

    playLevel(level){
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)
        const levelInfo = gameLevels[level - 1];
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.diamond = new Diamond(50, 50, 1, 1, 2, media.diamondsSprite);
        this.animate();
    }

    animate(){
        canvas.drawGameOnCanvas(gameState);
        this.diamond.draw();
        this.animationFrame = window.requestAnimationFrame(()=>{this.animate()})
    }
}

export const game = new Game();