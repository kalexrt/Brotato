import { bulletImg, shotgunImg, shotgunSound } from "../constants";
import Point from "../shape/Point";
import { MediumWeapon } from "./MediumWeapon";
// import { player } from "../game";
import { player } from "../ui/characterSelection";

export class Shotgun extends MediumWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = shotgunImg;
        this.name = 'Shotgun'
        this.sound = shotgunSound;
        this.damage = (this.tier * 30) * player.damageIncrease;
        this.fireRate = (1500 - this.tier*50) - player.attackSpeed;
        this.range = 200;
        this.projectile = bulletImg;
    }
    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.damage = Math.floor((this.tier * 30) * player.damageIncrease);
        this.fireRate = (1500 - this.tier*50) - player.attackSpeed;
    }
}