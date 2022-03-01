import { canvas } from './Canvas.js';

export class Sprite {
    constructor(spriteX,spriteY, width, height, spritesImage, x, y, numberOfSprites = 1, offset = {x: 0, y: 0}){
        this.alpha = 255;
        this.height = height;
        this.numberOfSprites = numberOfSprites;
        this.offset = {...offset};
        this.spritesImage = spritesImage;
        this.spritesStartX = spriteX;
        this.spritesStartY = spriteY;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    draw(numberOfSprites = 0, ratio = 1){
        if(numberOfSprites > this.numberOfSprites){
            return;
        }

        if(this.alpha !== 255){
            canvas.context.globalAlpha = this.alpha / 255;
        }

        const startPointToDrowX = (numberOfSprites * this.width) + this.spritesStartX;

        canvas.context.drawImage(
            this.spritesImage,
            startPointToDrowX,
            this.spritesStartY,
            this.width,
            this.height,
            this.x + this.offset.x,
            this.y + this.offset.y,
            this.width * ratio,
            this.height * ratio
        );

        if(this.alpha !== 255){
            canvas.context.globalAlpha = 1;
        }
    }
}