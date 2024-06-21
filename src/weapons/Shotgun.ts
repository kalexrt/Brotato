import { shotgunImg, shotgunSound } from "../constants";
import Point from "../shape/Point";
import { MediumWeapon } from "./MediumWeapon";

export class Shotgun extends MediumWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = shotgunImg;
        this.sound = shotgunSound;
        this.damage = this.tier * 30;
        this.fireRate = 1500 - this.tier*50;
        this.range = 300;
    }
}