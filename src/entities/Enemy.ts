import { ctx } from "../constants";
import { drawFlippedImage } from "../utils/ImgFlip";

export class Enemy {
    image: HTMLImageElement;
    x: number;
    y: number;
    dx:number;
    dy:number;
    height: number;
    speed: number;
    isFlipped: boolean;

    constructor(imageSrc: string, x: number, y: number, height: number = 40, speed: number = 2) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.height = height;
        this.speed = speed;
        this.isFlipped = false;

        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(playerX: number, playerY: number) {
        // Calculate the direction vector
        this.dx = playerX - this.x;
        this.dy = playerY - this.y;
        const distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // Normalize the direction vector and move the enemy
        this.x += (this.dx / distance) * this.speed;
        this.y += (this.dy / distance) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'blue'; // Set the color of the rectangle
        ctx.lineWidth = 2; // Set the width of the rectangle border
        ctx.strokeRect(this.x, this.y, this.height, this.height); // Draw the rectangle
        if(this.dx < 0) drawFlippedImage(ctx,this.image, this.x , this.y,this.height,this.height);
        else ctx.drawImage(this.image, this.x , this.y,this.height,this.height);
    }

    update(playerX: number, playerY: number, ctx: CanvasRenderingContext2D) {
        this.move(playerX, playerY);
        this.draw(ctx);
    }
}