import { SmallWeapon } from "./SmallWeapon";
import { player } from "../game";
import Point from "../shape/Point";
import { defaultAudio, screwdriverImg } from "../constants";

export class Screwdriver extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = screwdriverImg;
        this.name = 'Screwdriver';
        this.sound = defaultAudio;
        this.damage = (this.tier * 36) * player.damageIncrease;
        this.fireRate = (800 - this.tier*50) - player.attackSpeed;
        this.range = 150;
        this.projectile = screwdriverImg;
    }
}