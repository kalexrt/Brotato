import { bulletImg, shotgunImg, shotgunSound } from "../constants";
import Point from "../shape/Point";
import { MediumWeapon } from "./MediumWeapon";
import { player } from "../game";

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
}