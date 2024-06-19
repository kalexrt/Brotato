import bgimg from '/background/large_map_image.png'
import { Player, offsetX, offsetY } from './entities/Player';
import { keys } from './elements/input';
import { enemyArray,generateEnemy } from './entities/Enemy';
import { SCREEN, canvas,ctx } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './elements/healthbar';
import { drawPaused } from './elements/pause';
import { getRandomInt } from './utils/common';
import { addRemoveCross } from './elements/spawneffect';

const background =  new Image();
background.src = bgimg;

let enemySpawnTimer = 3000; // Accumulator for enemy spawn timing

const player = new Player('/character/Carl.png', canvas.width / 2, canvas.height / 2);


let lastFrame = 0;
let pauseSet = new Set ()

export function gameLoop(timestamp:number) {
    if (pauseSet.has('p')) {
        drawPaused();
        lastFrame = timestamp;
        requestAnimationFrame(gameLoop);
        return;
    }

    const deltaTime = timestamp - lastFrame;
    lastFrame = timestamp;

    enemySpawnTimer += deltaTime;

    // span enemy every 3 seconds
    if (enemySpawnTimer >= 3000) {
        generateEnemy( getRandomInt(0,canvas.width), getRandomInt(0,canvas.height));
        enemySpawnTimer = 0; // Reset the timer
    }

    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,SCREEN.width,SCREEN.height);
    
    addRemoveCross(timestamp);

    player.update(keys, ctx);
    
    

    enemyArray.forEach(enemy => {
        enemy.update(player.x, player.y, ctx);
        if(isColliding(enemy,player)){
            player.drawHitEffect();
            player.currHealth--;
            player.hitEffect(timestamp);
        }
    });
    drawHealthBar(ctx,player.currHealth,player.maxHealth);
    requestAnimationFrame(gameLoop);
}


window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') {
        if (pauseSet.has('p')) {
            pauseSet.delete('p');
        } else {
            pauseSet.add('p');
        }
    }
});
