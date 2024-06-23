import { global } from "./global";
import { player } from "./game";
import { enemyArray } from "./entities/Enemy";
import { projectileArray,gameLoop } from "./game";
import { backgroundMusic } from "./constants";
import { materialArray } from "./entities/Material";

export function startGame() {
    if(global.gameOver){
        //reset only if gameover
        global.wave = 1; //reset waves
        global.level = 1; //reset level
        player.currExp = 0; // Reset player experience
    } 
    global.gameOver = false;
    
    global.waveTimeRemaining = 60 * 1000;
    player.currHealth = player.maxHealth; // Reset player health
   
    enemyArray.splice(0, enemyArray.length); // Clear enemies
    projectileArray.splice(0, projectileArray.length); // Clear projectiles
    materialArray.splice(0, materialArray.length); // Clear materials
    backgroundMusic.play(); // Start playing the background music
    requestAnimationFrame(gameLoop);
}