import { crossbowImg, crossbowSound } from "../globals/constants";
// import { player } from "../game";
import { player } from "../ui/characterSelection";
import Point from "../shape/Point";
import { MediumWeapon } from "./MediumWeapon";

export class Crossbow extends MediumWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.name = 'Crossbow';
        this.image = crossbowImg;
        this.sound = crossbowSound;
        this.damage = (this.tier * 30) * player.damageIncrease;
        this.fireRate = (1500 - this.tier*50) - player.attackSpeed;
        this.range = 400;
        this.projectile = crossbowImg;
    }
    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.damage = Math.floor((this.tier * 30) * player.damageIncrease);
        this.fireRate = (1500 - this.tier*50) - player.attackSpeed;
    }
}