import { ctx, defaultAudio, defaultImg } from "../constants";
import Point from "../shape/Point";
import { drawFlippedImage } from "../utils/ImgFlip";
import { Projectile } from "./Projectile";
import { projectileArray } from "../game";


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
    angle:number;
    lastFireTime: number;
    sound: HTMLAudioElement;
    tier:number;
    projectile:HTMLImageElement;

    constructor(weaponPositions: Point[]) {
        this.image = defaultImg;
        this.name = '';
        this.damage = 0;
        this.fireRate = 0;
        this.range = 0;
        this.position = BaseWeapon.currentPosition;
        this.height = 0;
        this.width = 0;
        this.targetEnemy = null;
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.angle = 0;
        this.lastFireTime = 0;
        this.sound = defaultAudio;
        this.tier = 1;
        this.projectile = defaultImg;

        // increase and wrap around the position index
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
            this.angle = Math.atan2(dy, dx);
            
            ctx.save()
            ctx.translate(weaponCenterX, weaponCenterY);
            if(this.angle > -1.5708 && this.angle < 1.5708){  //between -90 and 90 degrees i.e. left side
                ctx.rotate(this.angle);
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            }else{ //right side
                ctx.scale(-1, 1);
                ctx.rotate(-this.angle + Math.PI); //-angle to adjust for flipping of image and adding pi for same reason
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            }
            ctx.restore();
        }else{ //if there is no enemy in range
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

        for (let enemy of enemies) { //loop through enemy array 
            const distance = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy; //set target enemy to closest enemy
            }
        }
        if (closestEnemy) {
            this.targetEnemy = closestEnemy;
        } else {
            this.targetEnemy = null;

        }
    }

    fireWeapon(currentTime: number) {
        if (this.targetEnemy && currentTime - this.lastFireTime >= this.fireRate) {
            this.sound.currentTime = 0;
            this.sound.play();
            projectileArray.push(new Projectile(this.projectile,this.x+this.width,this.y+this.height/2,this.angle,this.damage,this.range))
            this.lastFireTime = currentTime;
        }
    }
}

