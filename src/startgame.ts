import { global } from "./global";
import { player } from "./game";
import { enemyArray } from "./entities/Enemy";
import { projectileArray,gameLoop } from "./game";
import { backgroundMusic, canvas } from "./constants";
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
    //reset player positions
    player.x = canvas.width/2;
    player.y = canvas.height/2; 
    //reset offset //fix reset offset in a while
    // global.offsetX = 0;
    // global.offsetY = 0;
    player.currHealth = player.maxHealth; // Reset player health
    enemyArray.splice(0, enemyArray.length); // Clear enemies
    projectileArray.splice(0, projectileArray.length); // Clear projectiles
    materialArray.splice(0, materialArray.length); // Clear materials
    backgroundMusic.play(); // Start playing the background music
    requestAnimationFrame(gameLoop);
}