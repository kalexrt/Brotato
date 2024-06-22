import { ctx, backgroundMusic, canvas, walkSound } from "./constants";
import { offsetX, offsetY } from "./entities/Player";

export function handleGameOver() {
    walkSound.pause();
    backgroundMusic.pause(); // Pause background music
    drawGameOverScreen(); // Display game over screen
}

// Function to draw the game over screen
function drawGameOverScreen() {
    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(-offsetX, -offsetY, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px "Anybody"';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2 - offsetX, canvas.height / 2 - offsetY);
    ctx.font = '24px "Anybody"';
    ctx.fillText('Press R to Restart', canvas.width / 2 - offsetX, canvas.height / 2 + 50 - offsetY);
}