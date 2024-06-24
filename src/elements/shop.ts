import { ctx,canvas } from "../constants";
import { global } from "../global";
import { player, weaponArray } from "../game";
import { Pistol } from "../weapons/Pistol";
import { Smg } from "../weapons/Smg";
import { Minigun } from "../weapons/Minigun";
import { Crossbow } from "../weapons/Crossbow";
import { Shotgun } from "../weapons/Shotgun";
import { ShopItem } from "../shopitems/ShopItem";
import { PistolShop } from "../shopitems/PistolShop";
import { SmgShop } from "../shopitems/SmgShop";
import { CrossbowShop } from "../shopitems/CrossbowShop";
import { MinigunShop } from "../shopitems/MinigunShop";
import { ShotgunShop } from "../shopitems/ShotgunShop";
import { Armor } from "../shopitems/Armor";
import { AttackSpeed } from "../shopitems/AttackSpeed";
import { HpRegen } from "../shopitems/HpRegen";
import { MaxHp } from "../shopitems/MaxHp";
import { PercentDamage } from "../shopitems/PercentDamage";
import { Speed } from "../shopitems/Speed";
import { resetWave } from "./reset";

export function handleShop(){
    drawShop();
}
const shopItems = [new PistolShop(), new SmgShop(), new CrossbowShop(), new MinigunShop(), new ShotgunShop()];
const shopUpgrades = [new Armor(), new AttackSpeed, new HpRegen(), new MaxHp(), new PercentDamage(), new Speed()];
let availableShopItems:ShopItem[] = [];

export function openShop() {
    // Randomly select items and upgrades
    availableShopItems = [];
    for (let i = 0; i < 2; i++) {
        const randomItem = shopItems[Math.floor(Math.random() * shopItems.length)];
        availableShopItems.push(randomItem);
    }
    for (let i = 0; i < 2; i++) {
        const randomUpgrade = shopUpgrades[Math.floor(Math.random() * shopUpgrades.length)];
        availableShopItems.push(randomUpgrade);
    }
    global.shopActive = true; // Pause the game for the shop
}

function drawShop() {
    ctx.clearRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);

    // create a linear gradient
    const linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    // add color stops: very light gray at the top to very dark gray at the bottom
    linearGradient.addColorStop(0, '#565656'); 
    linearGradient.addColorStop(1, '#2a2a2a'); 

    // assign the gradient to the fill style
    ctx.fillStyle = linearGradient;

    // fill the canvas with the gradient
    ctx.fillRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);

    ctx.save();

    ctx.fillStyle = 'white';
    ctx.font = '24px "Anybody"';
    ctx.textAlign = 'center';
    ctx.fillText('Shop - Choose an item or upgrade', canvas.width / 2 -global.offsetX, 50-global.offsetY);
    ctx.restore();
    // Calculate starting x position and horizontal spacing between items
    const startX = 100;
    const spacing = 200;

    availableShopItems.forEach((item, index) => {
        const x = startX + index * spacing - global.offsetX;
        const y = 100 - global.offsetY;
        item.draw(x, y);
    });
}

export function handleShopSelection(selection:number) {
    const selectedItem = availableShopItems[selection];
    if (selectedItem) {
        let existingWeapon;

        switch (selectedItem.name) {
            case 'Pistol':
                existingWeapon = weaponArray.find(weapon => weapon instanceof Pistol);
                if (existingWeapon) {
                    existingWeapon.tier += 1;
                } else {
                    let weapon0 = new Pistol(player.weaponPositions);
                    weaponArray.push(weapon0);
                }
                break;
            case 'SMG':
                existingWeapon = weaponArray.find(weapon => weapon instanceof Smg);
                if (existingWeapon) {
                    existingWeapon.tier += 1;
                } else {
                    let weapon1 = new Smg(player.weaponPositions);
                    weaponArray.push(weapon1);
                }
                break;
            case 'Minigun':
                existingWeapon = weaponArray.find(weapon => weapon instanceof Minigun);
                if (existingWeapon) {
                    existingWeapon.tier += 1;
                } else {
                    let weapon2 = new Minigun(player.weaponPositions);
                    weaponArray.push(weapon2);
                }
                break;
            case 'Crossbow':
                existingWeapon = weaponArray.find(weapon => weapon instanceof Crossbow);
                if (existingWeapon) {
                    existingWeapon.tier += 1;
                } else {
                    let weapon3 = new Crossbow(player.weaponPositions);
                    weaponArray.push(weapon3);
                }
                break;
            case 'Shotgun':
                existingWeapon = weaponArray.find(weapon => weapon instanceof Shotgun);
                if (existingWeapon) {
                    existingWeapon.tier += 1;
                } else {
                    let weapon4 = new Shotgun(player.weaponPositions);
                    weaponArray.push(weapon4);
                }
                break;
            case 'Max Hp up':
                player.maxHealth += 5;
                break;
            case 'Damage Up':
                player.damageIncrease += 0.1;
                break;
            case 'Attack Speed Up':
                player.attackSpeed += 20;
                break;
            case 'Armor':
                player.armor += 1;
                break;
            case 'Speed up':
                player.speed += 1;
                break;
            case 'Hp Regeneration':
                break;
        }
    }
    global.levelsGained -= 1;
    if(global.levelsGained <= 0) {
        resetWave();
        global.shopActive = false;      // Resume the game
        
    } 
    else{
        availableShopItems = [];
        openShop();
    }
};

// Add click event listener
canvas.addEventListener('click', function(event) {
    if (global.shopActive) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Calculate starting x position and horizontal spacing between items
        const startX = 100;
        const spacing = 200; // Adjusted spacing to give more room
        const y = 100; // The fixed y position where shop items are drawn

        for (let index = 0; index < availableShopItems.length; index++) {
            const x = startX + index * spacing;
            // check if the mouse click is within the bounds of the shop item
            if (
                mouseX >= x &&
                mouseX <= x + 200 &&
                mouseY >= y &&
                mouseY <= y + 300
            ) {
                handleShopSelection(index);
            }
        }
    }
});

// add mousemove event listener to change cursor style on hover
canvas.addEventListener('mousemove', function(event) {
    if (global.shopActive) {

        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Calculate starting x position and horizontal spacing between items
        const startX = 100;
        const spacing = 200; // Adjusted spacing to give more room
        const y = 100; // The fixed y position where shop items are drawn

        let hover = false;

        for (let index = 0; index < availableShopItems.length; index++) {
            const x = startX + index * spacing;
            // check if the mouse click is within the bounds of the shop item
            if (
                mouseX >= x &&
                mouseX <= x + 200 &&
                mouseY >= y &&
                mouseY <= y + 300
            ) {
                hover = true;
            }
        }

        // Change cursor style based on hover state
        canvas.style.cursor = hover ? 'pointer' : 'default';
    } else {
        canvas.style.cursor = 'default';
    }
});