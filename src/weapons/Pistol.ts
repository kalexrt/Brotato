import { bulletImg, pistolImg, pistolSound } from "../constants";
import { SmallWeapon } from "./SmallWeapon";
import { player } from "../game";
import Point from "../shape/Point";

export class Pistol extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = pistolImg;
        this.name = 'Pistol';
        this.sound = pistolSound;
        this.damage = (this.tier * 10) * player.damageIncrease;
        this.fireRate = (1000 - this.tier*50) - player.attackSpeed;
        this.range = 300;
        this.projectile = bulletImg;
    }
}