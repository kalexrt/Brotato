import { global } from "../global";
import { generateEnemy } from "../elements/generateEnemy";
import { canvas } from "../constants";
import { getRandomInt } from "../utils/common";

export function spawnEnemiesBasedOnWave() {
    if (global.enemySpawnTimer >= Math.max(100,1200 - (global.wave * 175))) {
        let enemyTypes;
        switch(global.wave) {
            case 1:
                // Wave 1: Spawn only melee basic enemies
                enemyTypes = 1;
                break;
            case 2:
                // Wave 2: Spawn melee and ranged enemies
                enemyTypes = 2;
                break;
            case 3:
                // Wave 3: Spawn melee, ranged, and speedy enemies
                enemyTypes = 3;
                break;
            case 4:
                // Wave 4: Spawn melee, ranged, speedy, and big enemies
                enemyTypes = 4;
                break;
            case 5:
                // Wave 5: Spawn all types of enemies and boss (index 4)
                enemyTypes = 4;
                break;
            default:
                // For waves beyond 5, spawn a mix of all enemy types except boss
                enemyTypes = 4;
                break;
        }

        // generate a random enemy from the available types for the current wave
        let enemyindex = getRandomInt(0, enemyTypes);
        generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), enemyindex);

        if (!global.bossSpawned && global.wave > 4) {
            setTimeout(()=>{
                generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), 4);
            },5000)
            global.bossSpawned = true; // ensure the boss only spawns once
        }

        global.enemySpawnTimer = 0; // reset the timer
    }
}
