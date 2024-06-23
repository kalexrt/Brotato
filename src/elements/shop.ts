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

export function handleShop(){
  
    drawShop();
}
const shopItems = [new PistolShop(), new SmgShop(), new CrossbowShop(), new MinigunShop(), new ShotgunShop()];
const shopUpgrades = [new Armor(), new AttackSpeed, new HpRegen(), new MaxHp(), new PercentDamage(), new Speed()];
let availableShopItems:ShopItem[] = [];

export function openShop() {
    // Randomly select items and upgrades
    availableShopItems = [];
    for (let i = 0; i < 3; i++) {
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
    ctx.fillStyle = 'black';
    ctx.fillRect(-global.offsetX, -global.offsetY, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '24px "Anybody"';
    ctx.textAlign = 'center';
    ctx.fillText('Shop - Choose an item or upgrade', canvas.width / 2 -global.offsetX, 50-global.offsetY);

    availableShopItems.forEach((item, index) => {
        const x = (canvas.width / 2) - 150 - global.offsetX; // Adjust as needed
        const y = 150 + index * 100 - global.offsetY;
        item.draw(x, y);
    });

    ctx.fillText('Press 1-5 to choose an item or upgrade', canvas.width / 2 -global.offsetX, canvas.height - 50 - global.offsetY);
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
            case 'Max HP Up':
                player.maxHealth += 10;
                player.currHealth += 10;
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
            case 'Speed':
            player.speed += 1;
            break;
            case 'Hp Regeneration':
                break;
        }
    }
    global.shopActive = false; // Resume the game
};

window.addEventListener('keydown', function(event) {
    if (global.shopActive) {
        if (event.key >= '1' && event.key <= '5') {
            const selection = parseInt(event.key) - 1;
            handleShopSelection(selection);
        }
    }
});