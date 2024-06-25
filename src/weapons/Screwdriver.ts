import { SmallWeapon } from "./SmallWeapon";
// import { player } from "../game";
import { player } from "../ui/characterSelection";
import Point from "../shape/Point";
import { defaultAudio, screwdriverImg } from "../globals/constants";

export class Screwdriver extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = screwdriverImg;
        this.name = 'Screwdriver';
        this.sound = defaultAudio;
        this.damage = (this.tier * 36) * player.damageIncrease;
        this.fireRate = (500 - this.tier*50) - player.attackSpeed;
        this.range = 125;
        this.projectile = screwdriverImg;
        this.projectileSpeed = 4;
    }
    updateWeapon(weaponPositions: Point[]){
        this.x = weaponPositions[this.position].x;
        this.y = weaponPositions[this.position].y;
        this.damage = Math.floor((this.tier * 36) * player.damageIncrease);
        this.fireRate = (500 - this.tier*50) - player.attackSpeed;
    }
}