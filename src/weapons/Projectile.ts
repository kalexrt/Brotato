import { bulletHeight, bulletImg, bulletSpeed, bulletWidth } from "../constants";

export class Projectile {
    image:HTMLImageElement;
    width: number;
    height: number;
    x: number;
    y: number;
    startX:number;
    startY:number;
    speed: number;
    direction: number;
    damage: number;
    range:number;

    constructor(x: number, y: number, direction: number, damage: number,range: number) {
        this.image = bulletImg;
        this.width = bulletWidth;
        this.height = bulletHeight;
        this.startX = x; //keep track of bullet start to remove it when out of range
        this.startY = y; //keep track of bullet start to remove it when out of range
        this.x = x;
        this.y = y;
        this.speed = bulletSpeed;
        this.direction = direction; // in radians
        this.damage = damage; //damage and range are taken from the gun.
        this.range = range;
    }

    update() {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
    }
    isOutOfRange(): boolean {
        const distance = Math.sqrt((this.x - this.startX) ** 2 + (this.y - this.startY) ** 2);
        return distance > this.range;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);
        ctx.drawImage(bulletImg,-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}