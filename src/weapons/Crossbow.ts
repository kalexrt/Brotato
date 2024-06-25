import { crossbowImg, crossbowSound } from "../constants";
import { player } from "../game";
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
}