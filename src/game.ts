import { global } from './global';
import { handleGameOver } from './gameover';
import { keys } from './elements/input';
import { enemyArray } from './entities/Enemy';
import { SCREEN, canvas,ctx, materialPickup, background, levelupSound } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './ui/healthbar';
import { drawPaused } from './elements/pause';
import { addRemoveCross } from './elements/spawneffect';
import { BaseWeapon } from './weapons/BaseWeapon';
import { Projectile } from './weapons/Projectile';
import { addToDamageTextArray, updateDrawDamageText } from './ui/enemydamagetext';
import { materialArray } from './entities/Material';
import { updateDrawExpBar } from './ui/expbar';
import { drawWaveInfo, handleWaves } from './elements/waves';
import { handleHitEffect } from './elements/hiteffect';
import { pauseSet } from './constants';
import { handleShop } from './elements/shop';
import {player } from './ui/characterSelection';
import { RangeEnemy } from './enemies/RangeEnemy';
import { spawnEnemiesBasedOnWave } from './enemies/spawner';
import { crateArray } from './entities/Crate';

export let enemyProjectileArray:Projectile[] = [];
export let projectileArray: Projectile[] = [];

export const weaponArray: BaseWeapon[] = [];
let invulnerability = 0; // invulnerability timer accumulator
export let lastFrame = 0;


export function gameLoop(timestamp:number) {
    if (global.gameOver) {
        handleGameOver();
        return;
    }

    if (pauseSet.has('p')|| global.shopActive) {
        lastFrame = timestamp;
        if(global.shopActive) handleShop();
        else drawPaused();
        
        requestAnimationFrame(gameLoop);
        return;
    }

    const deltaTime = Math.min(200,timestamp - lastFrame); //calculate time difference between last frame and current frame
    lastFrame = timestamp;
    //count invulnerability and enemyspawn time
    global.enemySpawnTimer += deltaTime;
    invulnerability += deltaTime;

    //update waves
    handleWaves(deltaTime);
    
    // spawn enemy depending on wave
    spawnEnemiesBasedOnWave();

    ctx.clearRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,SCREEN.width,SCREEN.height);
    
    //draw the cross that appears before enemy spawn or remove if it's expired
    addRemoveCross(timestamp);

    //render materials
    for (let index = materialArray.length - 1; index >= 0; index--) {
        let material = materialArray[index];
        material.update(deltaTime);
        material.draw();
        if (isColliding(material, player.pickupRange)) {
            materialPickup.play();
            player.currExp += 1;
            materialArray.splice(index, 1);
        }
    }

    //render crates
    for (let index = crateArray.length-1; index>=0; index--){
        let crate = crateArray[index];
        crate.draw();
        if(isColliding(crate,player.pickupRange)){
            global.levelsGained += 1;
            levelupSound.play();
            crateArray.splice(index,1);
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
        if(enemy instanceof RangeEnemy) enemy.updateAndFire(player.x,player.y,ctx,timestamp)
        else enemy.update(player.x, player.y, ctx);
        if(isColliding(enemy,player) && invulnerability > 400){
            invulnerability = 0;
            global.hitEffect = true;
            handleHitEffect(player,timestamp);
            player.currHealth -= Math.max(0, enemy.damage - player.armor);
        }
        //checkprojectile and enemy collision
        projectileArray.forEach(projectile =>{
            if(isColliding(enemy,projectile)){
                addToDamageTextArray(enemy.x + enemy.width/2, enemy.y + enemy.height/2, projectile.damage, timestamp);
                global.hitEffect = true;
                handleHitEffect(enemy,timestamp);
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

    //enemy projectile array
    for (let i = enemyProjectileArray.length - 1; i >= 0; i--) {
        let projectile = enemyProjectileArray[i];
        projectile.update();
        projectile.draw(ctx);
        if (isColliding(projectile, player)) {
            invulnerability = 0; //reset invulnerability
            global.hitEffect = true;
            handleHitEffect(player, timestamp); //hit animation
            player.currHealth -= Math.max(0, projectile.damage - player.armor);
            enemyProjectileArray.splice(i, 1); // remove the projectile from the array
        } else if (projectile.isOutOfRange()) {
            enemyProjectileArray.splice(i, 1); // remove the projectile if it's out of range
        }
    }
    //for health bar
    drawHealthBar(ctx,player.currHealth,player.maxHealth);
    //for exp bar
    updateDrawExpBar(ctx,player.currExp,player.expNeeded);
    //draw wave info
    drawWaveInfo();
    //next frame
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
        window.location.reload();
    }
});