import { ctx,enemyImagePath } from "../constants";
import { drawFlippedImage } from "../utils/ImgFlip";
import { Cross } from "../interfaces/Cross";
import { Material, materialArray } from "./Material";

export const crosses:Cross[] = [];

export const enemyArray:Enemy[] = [];
export class Enemy {
    image: HTMLImageElement;
    x: number;
    y: number;
    dx:number;
    dy:number;
    height: number;
    width: number;
    speed: number;
    isFlipped: boolean;
    health:number;

    constructor(imageSrc: string, x: number, y: number, height: number = 40, speed: number = 2, health:number = 20) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.height = height;
        this.width = height;
        this.speed = speed;
        this.isFlipped = false;
        this.health = health;

        // ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(playerX: number, playerY: number) {
        // calculate the direction vector
        this.dx = playerX - this.x;
        this.dy = playerY - this.y;
        const distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // normalize the direction vector and move the enemy
        this.x += (this.dx / distance) * this.speed;
        this.y += (this.dy / distance) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'blue'; // set the color of the rectangle
        ctx.lineWidth = 2; // set the width of the rectangle border
        ctx.strokeRect(this.x, this.y, this.height, this.height); // draw the rectangle
        if(this.dx < 0) drawFlippedImage(ctx,this.image, this.x , this.y,this.height,this.height);
        else ctx.drawImage(this.image, this.x , this.y,this.height,this.height);
    }

    update(playerX: number, playerY: number, ctx: CanvasRenderingContext2D) {
        if (this.health <= 0) {
            //drop material if enemy dies
            materialArray.push(new Material(this.x + this.width/2, this.y + this.height/2))
            
            // remove the enemy from the array if health is zero or less
            const index = enemyArray.indexOf(this);
            if (index > -1) {
                enemyArray.splice(index, 1);
            }
            return; // exit the method if the enemy is removed
        }
        this.move(playerX, playerY);
        this.draw(ctx);
    }
}

export function generateEnemy(x:number,y:number){
    crosses.push({ x, y, expireTime: Date.now() + 1000 });
    setTimeout(() => {
        const enemy = new Enemy(enemyImagePath, x, y)
        enemyArray.push(enemy)
      }, 1000);
}