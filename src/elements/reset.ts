import { enemyProjectileArray } from "../game/game";
import { projectileArray } from "../game/game";
import { materialArray } from "../entities/Material";
import { enemyArray } from "../entities/Enemy";
import { player } from "../ui/characterSelection";

export function resetWave(){
    player.currHealth = player.maxHealth; // reset player health
    enemyArray.splice(0, enemyArray.length); // clear enemies
    projectileArray.splice(0, projectileArray.length); // clear projectiles
    materialArray.splice(0, materialArray.length); // clear materials
    enemyProjectileArray.splice(0,enemyProjectileArray.length) //clear enemy projectile
}