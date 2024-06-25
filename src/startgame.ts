import { global } from "./global";
// import { player } from "./ui/characterSelection";
import { player } from "./game";
import { gameLoop } from "./game";
import { backgroundMusic, canvas } from "./constants";
import { resetWave } from "./elements/reset";

export function startGame() {
    if(global.gameOver){
        //reset only if gameover
        global.wave = 1; //reset waves
        global.level = 1; //reset level
        global.levelsGained = 0;
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
    resetWave();
    backgroundMusic.play(); // Start playing the background music
    requestAnimationFrame(gameLoop);
}