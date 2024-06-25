import { crateDropChance, ctx,defaultImg } from "../globals/constants";
import { drawFlippedImage } from "../utils/ImgFlip";
import { Cross } from "../interfaces/Cross";
import { Material, materialArray } from "./Material";
import { Crate, crateArray } from "./Crate";


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
    damage:number

    constructor(x: number, y: number) {
        this.image = defaultImg;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.height = 40;
        this.width = 40;
        this.speed = 2;
        this.health = 20;
        this.damage = 1;
        this.isFlipped = false;

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
        if(this.dx < 0) drawFlippedImage(ctx,this.image, this.x , this.y,this.height,this.height);
        else ctx.drawImage(this.image, this.x , this.y,this.height,this.height);
    }

    update(playerX: number, playerY: number, ctx: CanvasRenderingContext2D) {
        if (this.health <= 0) {
            //drop material if enemy dies
            materialArray.push(new Material(this.x + this.width/2, this.y + this.height/2));

            //chance to also drop crate
            if (Math.random() < crateDropChance) {
                crateArray.push(new Crate(this.x + this.width/2, this.y + this.height/2));
            }
            
            // remove the enemy from the array if health is zero or less
            const index = enemyArray.indexOf(this);
            if (index > -1) {
                enemyArray.splice(index, 1); //number remoes 1 element from array
            }
            return; // exit the method if the enemy is removed
        }
        this.move(playerX, playerY);
        this.draw(ctx);
    }
}
