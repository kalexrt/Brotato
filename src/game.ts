import bgimg from '/background/large_map_image.png'
import { Player } from './entities/Player';
import { keys } from './elements/input';
import { Enemy } from './entities/Enemy';
import { canvas,ctx } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './elements/healthbar';
import { drawPaused } from './elements/pause';

const background =  new Image();
background.src = bgimg;

const player = new Player('/character/Carl.png', canvas.width / 2, canvas.height / 2);
const enemy1 = new Enemy('/enemies/melee.png', 0,0);
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
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    drawHealthBar(ctx,player.currHealth,player.maxHealth);

    player.update(keys, ctx, canvas);
    enemy1.update(player.x, player.y, ctx);
  
    if(isColliding(enemy1,player)){
        player.drawHitEffect();
        player.currHealth--;
        player.hitEffect(timestamp);
    }


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
