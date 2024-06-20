import { ctx } from "../constants";
import Point from "../shape/Point";
import { drawFlippedImage } from "../utils/ImgFlip";


export class BaseWeapon {
    static currentPosition: number = 0;
    static maxPositions: number = 4;

    image: HTMLImageElement;
    name: string;
    damage: number;
    fireRate: number;
    range: number;
    position: number;
    width:number;
    height:number;
    targetEnemy: any;
    x:number;
    y:number;

    constructor(image: HTMLImageElement, name: string, damage: number, fireRate: number, range: number,weaponPositions: Point[]) {
        this.image = image;
        this.name = name;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;
        this.position = BaseWeapon.currentPosition;
        this.height = 0;
        this.width = 0;
        this.targetEnemy = null;
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;

        // Increment and wrap around the position index
        BaseWeapon.currentPosition = (BaseWeapon.currentPosition + 1) % BaseWeapon.maxPositions;
    }
    drawWeapon(facingLeft:boolean) {
        if(this.targetEnemy){
            const weaponCenterX = this.x + this.width / 2;
            const weaponCenterY = this.y + this.height / 2;
            const enemyCenterX = this.targetEnemy.x + this.targetEnemy.height / 2;
            const enemyCenterY = this.targetEnemy.y + this.targetEnemy.height / 2;
            const dx = enemyCenterX - weaponCenterX;
            const dy = enemyCenterY - weaponCenterY;
            const angle = Math.atan2(dy, dx);
            ctx.save()
            ctx.translate(weaponCenterX, weaponCenterY);
            if(angle > -1.5708 && angle < 1.5708){
                ctx.rotate(angle);
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            }else{
                ctx.scale(-1, 1);
                ctx.rotate(-angle + Math.PI);
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            }
            ctx.restore();
        }else{
            if(facingLeft) drawFlippedImage(ctx,this.image,this.x,this.y,this.width,this.height);
            else ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
    }

    findClosestEnemy(enemies: any[]) {
        let closestEnemy = null;
        let closestDistance = this.range;

        for (let enemy of enemies) {
            const distance = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }
        if (closestEnemy) {
            this.targetEnemy = closestEnemy;
        } else {
            this.targetEnemy = null;

        }
    }
}

