import { SmallWeapon } from "./SmallWeapon";
import Point from "../shape/Point";
import { bulletImg, smgImg, smgSound } from "../constants";
import { player } from "../game";

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
}