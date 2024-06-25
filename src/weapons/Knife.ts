import { SmallWeapon } from "./SmallWeapon";
import { player } from "../game";
import Point from "../shape/Point";
import { defaultAudio, knifeImg } from "../constants";

export class Knife extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = knifeImg;
        this.name = 'Knife';
        this.sound = defaultAudio;
        this.damage = (this.tier * 30) * player.damageIncrease;
        this.fireRate = (400 - this.tier*50) - player.attackSpeed;
        this.range = 50;
        this.projectile = knifeImg;
        this.projectileSpeed = 4;
    }
}