import { global } from "../global";
import { generateEnemy } from "../elements/generateEnemy";
import { canvas } from "../constants";
import { getRandomInt } from "../utils/common";

export function spawnEnemiesBasedOnWave() {
    if (global.enemySpawnTimer >= Math.max(100,1200 - (global.wave * 175))) {
        let enemyTypes;
        switch(global.wave) {
            case 1:
                //melee and eye enemy
                enemyTypes = 2;
                break;
            case 2:
                // old wave + range and head
                enemyTypes = 4;
                break;
            case 3:
                // old wave + speedy and mouth
                enemyTypes = 6;
                break;
            case 4:
                // old wave + big
                enemyTypes = 7;
                break;
            case 5:
                //old wave + boss
                enemyTypes = 7;
                break;
            default:
                // all enemies
                enemyTypes = 7;
                break;
        }

        // generate a random enemy from the available types for the current wave
        let enemyindex = getRandomInt(0, enemyTypes);
        generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), enemyindex);

        if (!global.bossSpawned && global.wave > 4) {
            setTimeout(()=>{
                generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), 7);
            },5000)
            global.bossSpawned = true; // ensure the boss only spawns once
        }

        global.enemySpawnTimer = 0; // reset the timer
    }
}
