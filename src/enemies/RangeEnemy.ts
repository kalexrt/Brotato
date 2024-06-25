import { Enemy } from "../entities/Enemy";
import { rangeEnemyImg, enemyProjectileImg } from "../constants";
import { Player } from "../entities/Player";
import { player } from "../game";
import { Projectile } from "../weapons/Projectile";
import { Material, materialArray } from "../entities/Material";
import { enemyArray } from "../entities/Enemy";
import { enemyProjectileArray } from "../game";


export class RangeEnemy extends Enemy{
    projectile:HTMLImageElement;
    range:number;
    fireRate: number;
    angle:number;
    lastFireTime: number;
    targetEnemy: Player;

    constructor(x:number,y:number){
        super(x,y);
        this.image = rangeEnemyImg;
        this.projectile = enemyProjectileImg;
        this.range = 200;
        this.damage = 3;
        this.fireRate = 2000;
        this.angle = 0;
        this.lastFireTime = 0;
        this.targetEnemy = player;
    }

    move(playerX: number, playerY: number) {
        // calculate the direction vector
        this.dx = playerX - this.x;
        this.dy = playerY - this.y;
        const distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        // if within range, stop moving and start attacking
        if (distance <= this.range) {
            this.dx = 0;
            this.dy = 0;
        } else {
            // normalize the direction vector and move the enemy
            this.x += (this.dx / distance) * this.speed;
            this.y += (this.dy / distance) * this.speed;
        }
    }

    fireWeapon(currentTime: number) {
        if (this.targetEnemy && currentTime - this.lastFireTime >= this.fireRate) {
            const weaponCenterX = this.x + this.width / 2;
            const weaponCenterY = this.y + this.height / 2;
            const enemyCenterX = this.targetEnemy.x + this.targetEnemy.width / 2;
            const enemyCenterY = this.targetEnemy.y + this.targetEnemy.height / 2;
            const dx = enemyCenterX - weaponCenterX;
            const dy = enemyCenterY - weaponCenterY;
            this.angle = Math.atan2(dy, dx);

            enemyProjectileArray.push(new Projectile(
                this.projectile, 
                this.x + this.width, 
                this.y + this.height / 2, 
                this.angle, 
                this.damage, 
                this.range,
                20,
                20,
                2
            ));
            this.lastFireTime = currentTime;
        }
    }

    updateAndFire(playerX: number, playerY: number, ctx: CanvasRenderingContext2D, currentTime: number) {
        if (this.health <= 0) {
            materialArray.push(new Material(this.x + this.width / 2, this.y + this.height / 2));

            const index = enemyArray.indexOf(this);
            if (index > -1) {
                enemyArray.splice(index, 1);
            }
            return;
        }
        this.move(playerX, playerY);
        this.draw(ctx);
        this.fireWeapon(currentTime);
    }
}