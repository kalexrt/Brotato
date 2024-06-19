import { SCREEN, ctx, maxOffsetX, maxOffsetY, minOffsetX, minOffsetY } from "../constants";
import { drawFlippedImage } from "../utils/ImgFlip";

export var offsetX = 0;
export var offsetY = 0;
export class Player {
    image: HTMLImageElement;
    x: number;
    y: number;
    currHealth:number;
    maxHealth:number;
    height:number;
    speed: number;
    moveAudio: HTMLAudioElement;
    currentFrame:number;
    numOfFrames:number;
    lastAnimationFrame:number;
    hitImg:HTMLImageElement;
    isFlipped:boolean;

    constructor(imageSrc: string, x: number, y: number,health:number = 10, height:number = 40, speed: number = 4) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.currHealth = health;
        this.maxHealth = health;
        this.height = height;
        this.speed = speed;
        this.moveAudio = document.getElementById('char-walk') as HTMLAudioElement;
        this.moveAudio.loop = true; //for continuosly playing walk sound
        this.moveAudio.volume = 0.2;    //for low volume while walking
        this.currentFrame = 0;
        this.numOfFrames = 3;
        this.lastAnimationFrame = 0;
        this.hitImg = new Image();
        this.hitImg.src ='/hit_effect/hit-effect.png'
        this.isFlipped = false;
    
        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(keys: { [key: string]: boolean }) {
        let moved = false;
        console.log(offsetX,offsetY);
        // Move up
        if (keys['w'] || keys['ArrowUp']) { 
            this.y -= this.speed;
            if(offsetY < maxOffsetY){
                ctx.translate(0,this.speed); 
                offsetY += this.speed; 
            }
            moved = true;
        } 
        // Move left
        if (keys['a'] || keys['ArrowLeft']) { 
            this.x -= this.speed; 
            if(offsetX < maxOffsetX){
                ctx.translate(this.speed,0); 
                offsetX += this.speed; 
            }
            moved = true; 
            if (!this.isFlipped) this.isFlipped = true; 
        } 
        // Move down
        if (keys['s'] || keys['ArrowDown']) { 
            this.y += this.speed; 
            if(offsetY > minOffsetY){
                ctx.translate(0,-this.speed); 
                offsetY -= this.speed; 
            }
            moved = true; 
        } 
        // Move right
        if (keys['d'] || keys['ArrowRight']) { 
            this.x += this.speed; 
            if(offsetX > minOffsetX ){
                ctx.translate(-this.speed,0); 
                offsetX -= this.speed;  
            }
            moved = true; 
            if (this.isFlipped) this.isFlipped = false; 
        } 


        // Boundary checks
        this.x = Math.max(0, Math.min(SCREEN.width - this.height, this.x));
        this.y = Math.max(0, Math.min(SCREEN.height - this.height, this.y));

        if (moved) {
            if (this.moveAudio.paused) {
                this.moveAudio.play();
            }
        } else {
            if (!this.moveAudio.paused) {
                this.moveAudio.pause();
                this.moveAudio.currentTime = 0; // Reset audio to the start
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'red'; // Set the color of the rectangle
        ctx.lineWidth = 2; // Set the width of the rectangle border
        ctx.strokeRect(this.x, this.y, this.height, this.height); // Draw the rectangle

        if(this.isFlipped) drawFlippedImage(ctx,this.image,this.x,this.y,this.height,this.height);
        else ctx.drawImage(this.image, this.x , this.y, this.height,this.height);
    }

    update(keys: { [key: string]: boolean }, ctx: CanvasRenderingContext2D) {
        this.move(keys);
        this.draw(ctx);
    }

    hitEffect(timestamp:number){
        if(!this.lastAnimationFrame){
            this.lastAnimationFrame = timestamp;
        }
        const animationDeltaTime = timestamp - this.lastAnimationFrame;
        if (animationDeltaTime > 200){
            this.currentFrame = (this.currentFrame + 1) % this.numOfFrames;
            this.lastAnimationFrame = timestamp
        }
    }
    drawHitEffect(){
        ctx.drawImage(this.hitImg,256*this.currentFrame,0,256,256,this.x - 40,this.y - 40,this.height*3,this.height*3);
    }    
}