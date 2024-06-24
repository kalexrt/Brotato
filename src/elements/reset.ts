import { player } from "../game";
import { projectileArray } from "../game";
import { materialArray } from "../entities/Material";
import { enemyArray } from "../entities/Enemy";

export function resetWave(){
    player.currHealth = player.maxHealth; // Reset player health
    enemyArray.splice(0, enemyArray.length); // Clear enemies
    projectileArray.splice(0, projectileArray.length); // Clear projectiles
    materialArray.splice(0, materialArray.length); // Clear materials
}