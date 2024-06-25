import { bulletImg, minigunImg, minigunSound } from "../constants";
import { player } from "../game";
import Point from "../shape/Point";
import { BigWeapon } from "./BigWeapon";

export class Minigun extends BigWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.name = 'Minigun'
        this.image = minigunImg;
        this.sound = minigunSound;
        this.damage = (this.tier * 10) * player.damageIncrease;
        this.fireRate = (300 - this.tier * 30) - player.attackSpeed;
        this.range = 300;
        this.projectile = bulletImg;
    }
}