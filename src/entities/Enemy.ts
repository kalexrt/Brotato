import { ctx } from "../main";

export class Enemy {
    image: HTMLImageElement;
    x: number;
    y: number;
    height: number;
    speed: number;

    constructor(imageSrc: string, x: number, y: number, height: number = 40, speed: number = 2) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.height = height;
        this.speed = speed;

        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(playerX: number, playerY: number) {
        // Calculate the direction vector
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector and move the enemy
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.rect(this.x , this.y,this.height,this.height);
        ctx.drawImage(this.image, this.x , this.y,this.height,this.height);
    }

    update(playerX: number, playerY: number, ctx: CanvasRenderingContext2D) {
        this.move(playerX, playerY);
        this.draw(ctx);
    }
}