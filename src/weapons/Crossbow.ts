import { crossbowImg, crossbowSound } from "../constants";
import Point from "../shape/Point";
import { MediumWeapon } from "./MediumWeapon";

export class Crossbow extends MediumWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = crossbowImg;
        this.sound = crossbowSound;
        this.damage = this.tier * 30;
        this.fireRate = 1500 - this.tier*50;
        this.range = 400;
        this.projectile = crossbowImg;
    }
}