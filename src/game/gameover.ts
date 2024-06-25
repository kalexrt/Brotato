import { ctx, backgroundMusic, canvas, walkSound } from "../globals/constants";
import { global } from "../globals/global";
export function handleGameOver() {
    walkSound.pause();
    backgroundMusic.pause(); // Pause background music
    drawGameOverScreen(); // Display game over screen
}

// Function to draw the game over screen
function drawGameOverScreen() {
    ctx.clearRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px "Anybody"';
    ctx.textAlign = 'center';
    if(global.win) ctx.fillText('Congrats!, You win', canvas.width / 2 - global.offsetX, canvas.height / 2 - global.offsetY); //if win
    else ctx.fillText('Game Over', canvas.width / 2 - global.offsetX, canvas.height / 2 - global.offsetY); //if lose
    ctx.font = '24px "Anybody"';
    ctx.fillText('Press R to Replay', canvas.width / 2 - global.offsetX, canvas.height / 2 + 50 - global.offsetY);
}