import { global } from './global';
import { startGame } from './startgame';
import { handleGameOver } from './gameover';
import { Player, offsetX, offsetY } from './entities/Player';
import { keys } from './elements/input';
import { enemyArray,generateEnemy } from './entities/Enemy';
import { SCREEN, canvas,ctx, hitEffect, materialPickup, background } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './elements/healthbar';
import { drawPaused } from './elements/pause';
import { getRandomInt } from './utils/common';
import { addRemoveCross } from './elements/spawneffect';
import { BaseWeapon } from './weapons/BaseWeapon';
import { Projectile } from './weapons/Projectile';
import { addToDamageTextArray, updateDrawDamageText } from './ui/enemydamagetext';
import { materialArray } from './entities/Material';
import { Pistol } from './weapons/Pistol';
import { Smg } from './weapons/Smg';
import { Minigun } from './weapons/Minigun';
import { Shotgun } from './weapons/Shotgun';
import { updateDrawExpBar } from './ui/expbar';
import { Crossbow } from './weapons/Crossbow';

export let projectileArray: Projectile[] = [];

const weaponArray: BaseWeapon[] = [];

let enemySpawnTimer = 3000; // Accumulator for enemy spawn timing

export const player = new Player('/character/Carl.png', canvas.width / 2, canvas.height / 2);
global.level = player.level;
let weapon1 = new Pistol(player.weaponPositions);
let weapon2 = new Smg(player.weaponPositions);
let weapon3 = new Minigun(player.weaponPositions);
let weapon4 = new Shotgun(player.weaponPositions);
let weapon5 = new Crossbow(player.weaponPositions);

weaponArray.push(weapon1);
weaponArray.push(weapon2);
weaponArray.push(weapon3);
weaponArray.push(weapon4);
weaponArray.push(weapon5);

let invulnerability = 0; // invulnerability timer accumulator
export let lastFrame = 0;
let pauseSet = new Set ()

export function gameLoop(timestamp:number) {
    if (global.gameOver) {
        handleGameOver();
        return;
    }
    if (pauseSet.has('p')) {
        drawPaused();
        lastFrame = timestamp;
        requestAnimationFrame(gameLoop);
        return;
    }

    const deltaTime = timestamp - lastFrame; //calculate time difference between last frame and current frame
    lastFrame = timestamp;
    
    //count invulnerability and enemyspawn time
    enemySpawnTimer += deltaTime;
    invulnerability += deltaTime;

    // spawn enemy every 3 seconds
    if (enemySpawnTimer >= 200) {
        generateEnemy( getRandomInt(0,canvas.width), getRandomInt(0,canvas.height));
        enemySpawnTimer = 0; // Reset the timer
    }

    ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,SCREEN.width,SCREEN.height);
    
    //draw the cross that appears before enemy spawn or remove if it's expired
    addRemoveCross(timestamp);

    //render materials
    for (let index = materialArray.length - 1; index >= 0; index--) {
        let material = materialArray[index];
        material.draw();
        if (isColliding(material, player.pickupRange)) {
            materialPickup.play();
            player.currExp += 1;
            materialArray.splice(index, 1);
        }
    }

    //move and update player
    player.update(keys, ctx);

    //weapon operations
    weaponArray.forEach(weapon =>{
        weapon.updateWeapon(player.weaponPositions);
        weapon.findClosestEnemy(enemyArray);
        weapon.fireWeapon(timestamp);
        weapon.drawWeapon(player.isFlipped);
    })
    
   //enemy array operations
    enemyArray.forEach(enemy => {
        enemy.update(player.x, player.y, ctx);
        if(isColliding(enemy,player) && invulnerability > 400){
            invulnerability = 0;
            hitEffect.active = true;
            player.currHealth--;
        }
        //checkprojectile and enemy collision
        projectileArray.forEach(projectile =>{
            if(isColliding(enemy,projectile)){
                addToDamageTextArray(enemy.x + enemy.width/2, enemy.y + enemy.height/2, projectile.damage, timestamp)
                enemy.health -= projectile.damage;
            }
        })
    });

    //draw the damage text
    updateDrawDamageText(timestamp);

    //projectile operations
    projectileArray.forEach(projectile => {
        projectile.update();
        projectile.draw(ctx);
    })

    //remove elements that are out of weapon's range
    projectileArray = projectileArray.filter(projectile => !projectile.isOutOfRange());

    //check hit effect 
    if(hitEffect.active){
        player.drawHitEffect();
        player.hitEffect(timestamp);
    }
    //for health bar
    drawHealthBar(ctx,player.currHealth,player.maxHealth);
    //for exp bar
    updateDrawExpBar(ctx,player.currExp,player.expNeeded);
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
    if (e.code === 'KeyR' && global.gameOver) {
        startGame();
    }
});
