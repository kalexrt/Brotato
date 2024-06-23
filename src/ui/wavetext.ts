import { global } from "../global";
import { ctx, canvas } from "../constants";
import { offsetX, offsetY } from "../entities/Player";

export function handleWaves(deltaTime:number){
    global.waveTimeRemaining -= deltaTime;

    if (global.waveTimeRemaining <= 0) {
        global.wave++; // Increment wave number
        global.waveTimeRemaining = 60 * 1000; // Reset wave timer to 60 seconds
    }
}

export function drawWaveInfo() {
    ctx.fillStyle = 'white';
    ctx.font = '32px "Anybody"';
    ctx.textAlign = 'center';
    const timeInSeconds = Math.ceil(global.waveTimeRemaining / 1000);
    ctx.fillText(`Wave: ${global.wave}`, canvas.width / 2 - offsetX, 30 - offsetY);
    ctx.font = '24px "Anybody"';
    ctx.fillText(`Time Remaining: ${timeInSeconds}`, canvas.width / 2 - offsetX, 60 - offsetY)
}