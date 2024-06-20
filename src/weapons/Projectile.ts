import { bulletHeight, bulletImg, bulletSpeed, bulletWidth } from "../constants";

export const projectileArray: Projectile[] = [];

export class Projectile {
    image:HTMLImageElement;
    width: number;
    height: number;
    x: number;
    y: number;
    speed: number;
    direction: number;
    damage: number;

    constructor(x: number, y: number, direction: number, damage: number) {
        this.image = bulletImg;
        this.x = x;
        this.y = y;
        this.width = bulletWidth;
        this.height = bulletHeight;
        this.speed = bulletSpeed;
        this.direction = direction; // in radians
        this.damage = damage;
    }

    update() {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);
        ctx.drawImage(bulletImg,-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}