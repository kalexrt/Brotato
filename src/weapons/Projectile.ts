import { bulletHeight, bulletSpeed, bulletWidth } from "../constants";

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

    constructor(
        image:HTMLImageElement ,
        x: number, 
        y: number, 
        direction: number, 
        damage: number,
        range: number,
        width:number = bulletWidth, 
        height:number = bulletHeight,
        speed:number = bulletSpeed
    ) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.startX = x; //keep track of bullet start to remove it when out of range
        this.startY = y; //keep track of bullet start to remove it when out of range
        this.x = x;
        this.y = y;
        this.speed = speed;
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
        ctx.drawImage(this.image,-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}