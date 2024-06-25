import { global } from "../globals/global";
import { player } from "../ui/characterSelection";
import { gameLoop } from "./game";
import { backgroundMusic, canvas } from "../globals/constants";
import { resetWave } from "../elements/reset";

export function startGame() {
    global.level = player.level;
    if(global.gameOver){
        //reset only if gameover
        global.wave = 1; //reset waves
        global.level = 1; //reset level
        global.levelsGained = 0;
        player.currExp = 0; // Reset player experience
        global.enemySpawnTimer = 1200; //reset enemy spawn
    } 
    global.gameOver = false;
    global.bossSpawned = false;
    global.waveTimeRemaining = 60 * 1000;
    //reset player positions
    player.x = canvas.width/2;
    player.y = canvas.height/2; 
    resetWave();
    backgroundMusic.play(); // Start playing the background music
    requestAnimationFrame(gameLoop);
}