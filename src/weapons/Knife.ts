import { SmallWeapon } from "./SmallWeapon";
// import { player } from "../game";
import { player } from "../ui/characterSelection";
import Point from "../shape/Point";
import { defaultAudio, knifeImg } from "../globals/constants";

export class Knife extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = knifeImg;
        this.name = 'Knife';
        this.sound = defaultAudio;
        this.damage = (this.tier * 30) * player.damageIncrease;
        this.fireRate = (400 - this.tier*50) - player.attackSpeed;
        this.range = 125;
        this.projectile = knifeImg;
        this.projectileSpeed = 4;
    }
    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.damage = Math.floor((this.tier * 30) * player.damageIncrease);
        this.fireRate = (400 - this.tier*50) - player.attackSpeed;
    }
}