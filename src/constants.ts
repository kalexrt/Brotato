export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
//constants
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 563;
export const weaponWidth = 32;
export const weaponHeight = 20;
export const midWeaponWidth = 45;
export const midWeaponHeight = 18;
export const bigWeaponWidth = 50;
export const bigWeaponHeight = 30;
export const bulletWidth = 40;
export const bulletHeight = 15;
export const bulletSpeed = 20;
export const weaponOffset = 12;
export const minOffsetX = -450;
export const maxOffsetX = 200;
export const minOffsetY = -320;
export const maxOffsetY = 100;
export const materialWidth = 20;
export const materialHeight = 20;
export const playerPickupRange = 50;
export const crateHeight = 40;
export const crateWidth = 40;
export const crateDropChance = 0.04;

export const pauseSet = new Set ();
interface Screen {
    width: number;
    height: number;
}
export const SCREEN: Screen = {
    width: 1280,
    height: 720
};
//default empty values
export const defaultImg = new Image();
export const defaultAudio =  new Audio();

//hiteffect
export const hitImg = new Image();
hitImg.src ='/hit_effect/hit-effect.png'
export const hitSound = new Audio();
hitSound.src ='/hit_effect/audio/damage.mp3'

//background
export const background =  new Image();
background.src = '/background/large_map_image.png';
export const backgroundMusic = new Audio('/background/audio/compressedmusic.mp3');
backgroundMusic.loop = true;

//characters
export const carlImg = new Image();
carlImg.src = '/character/Carl.png';
export const golemImg = new Image();
golemImg.src ='/character/Golem.png';
export const walkSound = new Audio();
walkSound.src = '/character/audio/walk.mp3';
export const levelupSound = new Audio();
levelupSound.src = '/character/audio/levelup.mp3';
levelupSound.volume = 0.9;

//enemy
export const meleeEnemyImg = new Image();
meleeEnemyImg.src = '/enemies/melee.png';
export const rangeEnemyImg = new Image();
rangeEnemyImg.src = '/enemies/ranged.png';
export const speedyEnemyImg = new Image();
speedyEnemyImg.src = '/enemies/speedy.png';
export const bigEnemyImg = new Image();
bigEnemyImg.src = '/enemies/bigboi.png';
export const headEnemyImg = new Image();
headEnemyImg.src = '/enemies/head.png';
export const eyeEnemyImg = new Image();
eyeEnemyImg.src = '/enemies/eye.png';
export const mouthEnemyImg = new Image();
mouthEnemyImg.src = '/enemies/mouth.png';
export const bossEnemyImg = new Image();
bossEnemyImg.src = '/enemies/boss.png';

export const enemyProjectileImg = new Image();
enemyProjectileImg.src ='/projectile/bullet_enemy.png'

//enemy spawn effect
export const crossImage = new Image();
crossImage.src = '/spawn_effect/crosssprite.png'

//weapons
export const pistolImg = new Image();
pistolImg.src = '/weapons/pistol.png';
export const smgImg = new Image();
smgImg.src = '/weapons/smg.png'
export const minigunImg = new Image();
minigunImg.src = '/weapons/minigun.png'
export const shotgunImg = new Image();
shotgunImg.src = '/weapons/shotgun.png'
export const crossbowImg = new Image();
crossbowImg.src = '/weapons/crossbow.png'
export const bulletImg = new Image();
bulletImg.src = '/projectile/bullet.png'
export const knifeImg = new Image();
knifeImg.src ='/weapons/knife.png'
export const screwdriverImg = new Image();
screwdriverImg.src ='/weapons/screwdriver.png'
export const pistolSound = new Audio();
pistolSound.src = '/weapons/audio/pistol.mp3'
export const smgSound = new Audio();
smgSound.src = '/weapons/audio/smg.mp3'
export const minigunSound = new Audio();
minigunSound.src = '/weapons/audio/minigun.mp3'
export const shotgunSound = new Audio();
shotgunSound.src = '/weapons/audio/shotgun.mp3'
export const crossbowSound = new Audio();
crossbowSound.src = '/weapons/audio/crossbow.mp3'

//dropped resources
const material1 = new Image();
const material2 = new Image();
const material3 = new Image();
material1.src = '/material/material1.png'
material2.src = '/material/material2.png'
material3.src = '/material/material3.png'

export const materialPickup = new Audio();
materialPickup.src = '/material/audio/material_pickup.mp3'

export const materialChoices = [material1,material2,material3]

export const crateImg = new Image();
crateImg.src = '/material/crate.png'

//shop
export const shopSound = new Audio();
shopSound.src ='/shop/audio/shop.mp3';
shopSound.volume = 0.8;
export const shopArmorImg = new Image();
shopArmorImg.src = '/shop/armor.png';
export const shopAtckSpeedImg = new Image();
shopAtckSpeedImg.src = '/shop/attack_speed.png';
export const shopCrossbowImg = new Image();
shopCrossbowImg.src = '/shop/crossbow_icon.png';
export const shopHpRegenImg = new Image();
shopHpRegenImg.src = '/shop/hp_regeneration.png';
export const shopHpImg = new Image();
shopHpImg.src = '/shop/max_hp.png';
export const shopMinigunImg = new Image();
shopMinigunImg.src = '/shop/minigun_icon.png';
export const shopPctDamageImg = new Image();
shopPctDamageImg.src = '/shop/percent_damage.png';
export const shopPistolImg = new Image();
shopPistolImg.src = '/shop/pistol_icon.png';
export const shopShotgunImg = new Image();
shopShotgunImg.src = '/shop/shotgun_icon.png';
export const shopSmgImg = new Image();
shopSmgImg.src = '/shop/smg_icon.png';
export const shopSpeedImg = new Image();
shopSpeedImg.src = '/shop/speed.png';
export const shopKnifeImg = new Image();
shopKnifeImg.src = '/shop/knife_icon.png';
export const shopScrewdriverImg = new Image();
shopScrewdriverImg.src ='/shop/screwdriver_icon.png'

// menu
export const menuButtonFocusSound = new Audio();
menuButtonFocusSound.src = '/menu/audio/menubuttonfocus.mp3'
export const menuButtonClickSound = new Audio();
menuButtonClickSound.src = '/menu/audio/menubuttonclick.mp3'
export const menuBackground = new Image();
menuBackground.src ='/menu/mainmenubg.png'
export const menuMusic = new Audio();
menuMusic.src ='/menu/audio/mainmenumusic.mp3'