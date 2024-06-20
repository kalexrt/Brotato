import bgimg from '/background/large_map_image.png'
import { Player, offsetX, offsetY } from './entities/Player';
import { keys } from './elements/input';
import { enemyArray,generateEnemy } from './entities/Enemy';
import { SCREEN, canvas,ctx, hitEffect, minigunImg, pistolImg, smgImg } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './elements/healthbar';
import { drawPaused } from './elements/pause';
import { getRandomInt } from './utils/common';
import { addRemoveCross } from './elements/spawneffect';
import { SmallWeapon } from './entities/SmallWeapon';
import { BigWeapon } from './entities/BigWeapon';
import { BaseWeapon } from './entities/BaseWeapon';

const background =  new Image();
background.src = bgimg;
const weaponArray: BaseWeapon[] = [];

let enemySpawnTimer = 30000; // Accumulator for enemy spawn timing

const player = new Player('/character/Carl.png', canvas.width / 2, canvas.height / 2);

let weapon1 = new SmallWeapon(pistolImg,'pistol',10,10,100,player.weaponPositions);
let weapon2 = new SmallWeapon(smgImg,'smg',10,10,200,player.weaponPositions);
let weapon3 = new BigWeapon(minigunImg,'minigun',10,10,300,player.weaponPositions);
weaponArray.push(weapon1);
weaponArray.push(weapon2);
weaponArray.push(weapon3);

let invulnerability = 0;
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
    invulnerability += deltaTime;

    // span enemy every 3 seconds
    if (enemySpawnTimer >= 30000) {
        generateEnemy( getRandomInt(0,canvas.width), getRandomInt(0,canvas.height));
        enemySpawnTimer = 0; // Reset the timer
    }

    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,SCREEN.width,SCREEN.height);
    
    addRemoveCross(timestamp);

    player.update(keys, ctx);
    
    weaponArray.forEach(weapon =>{
        weapon.updateWeapon(player.weaponPositions);
        weapon.findClosestEnemy(enemyArray);
        weapon.drawWeapon(player.isFlipped);
    })
    
   
    enemyArray.forEach(enemy => {
        enemy.update(player.x, player.y, ctx);
        if(isColliding(enemy,player) && invulnerability > 400){
            invulnerability = 0;
            hitEffect.active = true;
            player.currHealth--;
            
        }
    });
    if(hitEffect.active){
        player.drawHitEffect();
        player.hitEffect(timestamp);
    }
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
