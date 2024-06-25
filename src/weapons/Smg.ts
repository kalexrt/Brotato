import { SmallWeapon } from "./SmallWeapon";
import Point from "../shape/Point";
import { bulletImg, smgImg, smgSound } from "../constants";
// import { player } from "../game";
import { player } from "../ui/characterSelection";

export class Smg extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = smgImg;
        this.name = 'Smg';
        this.sound = smgSound;
        this.damage = (this.tier * 7) * player.damageIncrease;
        this.fireRate = (300 - this.tier*20) - player.attackSpeed;
        this.range = 300;
        this.projectile = bulletImg;
    }
    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.damage = Math.floor((this.tier * 7) * player.damageIncrease);
        this.fireRate = (300 - this.tier*20) - player.attackSpeed;
    }
}