import { SCREEN, canvas, carlImg, ctx, maxOffsetX, maxOffsetY, minOffsetX, minOffsetY, playerPickupRange, walkSound, weaponOffset } from "../constants";
import { drawFlippedImage } from "../utils/ImgFlip";
import Point from "../shape/Point";
import { PickupRange } from "../interfaces/PickupRange";
import { global } from "../global";

export class Player {
    image: HTMLImageElement;
    x: number;
    y: number;
    level:number;
    currExp:number;
    expNeeded:number;
    currHealth:number;
    maxHealth:number;
    armor:number;
    attackSpeed:number;
    damageIncrease:number;
    width: number;
    height:number;
    speed: number;
    moveAudio: HTMLAudioElement;
    isFlipped:boolean;
    pickupRange: PickupRange;
    weaponPositions: Point[]

    constructor() {
        this.image = carlImg;
        this.x = canvas.width /2;
        this.y = canvas.height/2;
        this.level = 1;
        this.currExp = 0;
        this.expNeeded = 10 * (this.level * 1.5);
        this.currHealth = 10;
        this.maxHealth = 10;
        this.width = 40;
        this.height = 40;
        this.speed = 4;
        this.moveAudio = walkSound;
        this.moveAudio.loop = true; //for continuosly playing walk sound
        this.moveAudio.volume = 0.2;    //for low volume while walking
        this.attackSpeed = 0;
        this.damageIncrease = 1;
        this.armor = 0;

        this.isFlipped = false;
        this.pickupRange ={
            x: this.x - playerPickupRange/2,
            y: this.y - playerPickupRange/2,
            width: playerPickupRange,
            height: playerPickupRange
        };
        this.weaponPositions = [
            new Point(this.x - weaponOffset + this.height, this.y + this.height - weaponOffset), //bottom right
            new Point(this.x - weaponOffset, this.y + this.height - weaponOffset), //bottom left
            new Point(this.x - weaponOffset + this.height, this.y - weaponOffset), //top right
            new Point(this.x - weaponOffset, this.y - weaponOffset) //top left
        ];
    
        // ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(keys: { [key: string]: boolean }) {
        let moved = false;
        // move up
        if (keys['w'] || keys['ArrowUp']) { 
            this.y -= this.speed;
            if(global.offsetY < maxOffsetY){
                ctx.translate(0,this.speed); 
                global.offsetY += this.speed; 
            }
            moved = true;
        } 
        // move left
        if (keys['a'] || keys['ArrowLeft']) { 
            this.x -= this.speed; 
            if(global.offsetX < maxOffsetX){
                ctx.translate(this.speed,0); 
                global.offsetX += this.speed; 
            }
            moved = true; 
            if (!this.isFlipped) this.isFlipped = true; 
        } 
        // move down
        if (keys['s'] || keys['ArrowDown']) { 
            this.y += this.speed; 
            if(global.offsetY > minOffsetY){
                ctx.translate(0,-this.speed); 
                global.offsetY -= this.speed; 
            }
            moved = true; 
        } 
        // move right
        if (keys['d'] || keys['ArrowRight']) { 
            this.x += this.speed; 
            if(global.offsetX > minOffsetX ){
                ctx.translate(-this.speed,0); 
                global.offsetX -= this.speed;  
            }
            moved = true; 
            if (this.isFlipped) this.isFlipped = false; 
        } 


        // boundary checks
        this.x = Math.max(0, Math.min(SCREEN.width - this.height, this.x));
        this.y = Math.max(0, Math.min(SCREEN.height - this.height, this.y));

        this.updateWeaponPosition();

        if (moved) {
            if (this.moveAudio.paused) {
                this.moveAudio.play();
            }
        } else {
            if (!this.moveAudio.paused) {
                this.moveAudio.pause();
                this.moveAudio.currentTime = 0; // reset audio to the start
            }
        }

        //update pickup range
        this.pickupRange ={
            x: this.x - playerPickupRange/2,
            y: this.y - playerPickupRange/2,
            width: playerPickupRange,
            height: playerPickupRange
        };
    }

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.strokeStyle = 'red'; // set the color of the rectangle
        // ctx.lineWidth = 2; // set the width of the rectangle border
        // ctx.strokeRect(this.x, this.y, this.height, this.height); // draw the rectangle

        if(this.isFlipped) drawFlippedImage(ctx,this.image,this.x,this.y,this.height,this.height);
        else ctx.drawImage(this.image, this.x , this.y, this.height,this.height);
    }

    update(keys: { [key: string]: boolean }, ctx: CanvasRenderingContext2D) {
        if(this.currHealth === 0) global.gameOver = true;
        if(this.level != global.level) this.currExp = 0; //reset exp when lvl up
        this.level = global.level;  //lvl up set level
        this.expNeeded = 10 * (this.level * 1.5) //update exp needed
        this.move(keys);
        this.draw(ctx);
    }
    updateWeaponPosition(){
        this.weaponPositions = [
            new Point(this.x - weaponOffset + this.height, this.y + this.height - weaponOffset), //bottom right
            new Point(this.x - weaponOffset, this.y + this.height - weaponOffset), //bottom left
            new Point(this.x - weaponOffset + this.height, this.y - weaponOffset), //top right
            new Point(this.x - weaponOffset, this.y - weaponOffset) //top left
        ];
    }   
}