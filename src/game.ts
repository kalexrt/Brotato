import { global } from './global';
import { startGame } from './startgame';
import { handleGameOver } from './gameover';
import { keys } from './elements/input';
import { generateEnemy } from './elements/generateEnemy';
import { enemyArray } from './entities/Enemy';
import { SCREEN, canvas,ctx, materialPickup, background } from './constants';
import { isColliding } from './utils/collision';
import { drawHealthBar } from './ui/healthbar';
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
import { drawWaveInfo, handleWaves } from './elements/waves';
import { handleHitEffect } from './elements/hiteffect';
import { pauseSet } from './constants';
import { handleShop } from './elements/shop';
// import {player } from './ui/characterSelection';
import { Carl } from './characters/Carl';
import { RangeEnemy } from './enemies/RangeEnemy';
import { Knife } from './weapons/Knife';
import { Screwdriver } from './weapons/Screwdriver';

export let enemyProjectileArray:Projectile[] = [];
export let projectileArray: Projectile[] = [];

export const weaponArray: BaseWeapon[] = [];

let enemySpawnTimer = 3000; // Accumulator for enemy spawn timing

export const player = new Carl();

global.level = player.level;
// let weapon1 = new Pistol(player.weaponPositions);
let weapon2 = new Smg(player.weaponPositions);
let weapon3 = new Minigun(player.weaponPositions);
// let weapon4 = new Shotgun(player.weaponPositions);
// let weapon5 = new Crossbow(player.weaponPositions);
let weapon6 = new Knife(player.weaponPositions);
let weapon7 = new Screwdriver(player.weaponPositions);

// weaponArray.push(weapon1);
weaponArray.push(weapon2);
weaponArray.push(weapon3);
// weaponArray.push(weapon4);
// weaponArray.push(weapon5);
weaponArray.push(weapon6);
weaponArray.push(weapon7);


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
    enemySpawnTimer += deltaTime;
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
        invulnerability = 0;
        global.hitEffect = true;
        handleHitEffect(player, timestamp);
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
    console.log(enemyArray);
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

function spawnEnemiesBasedOnWave() {
    if (enemySpawnTimer >= 1200 - (global.wave * 175)) {
        let enemyTypes;

        switch(global.wave) {
            case 1:
                // Wave 1: Spawn only melee basic enemies
                enemyTypes = 1;
                break;
            case 2:
                // Wave 2: Spawn melee and ranged enemies
                enemyTypes = 2;
                break;
            case 3:
                // Wave 3: Spawn melee, ranged, and speedy enemies
                enemyTypes = 3;
                break;
            case 4:
                // Wave 4: Spawn melee, ranged, speedy, and big enemies
                enemyTypes = 4;
                break;
            case 5:
                // Wave 5: Spawn all types of enemies and boss (index 4)
                enemyTypes = 4;
                break;
            default:
                // For waves beyond 5, spawn a mix of all enemy types except boss
                enemyTypes = 4;
                break;
        }

        // Generate a random enemy from the available types for the current wave
        let enemyindex = getRandomInt(0, enemyTypes);
        generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), enemyindex);

        if (!global.bossSpawned && global.wave > 4) {
            setTimeout(()=>{
                generateEnemy(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), 4);
            },3000)
            global.bossSpawned = true; // Ensure the boss only spawns once
        }

        enemySpawnTimer = 0; // Reset the timer
    }
}
