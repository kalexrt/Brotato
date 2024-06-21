export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 563;
export const weaponWidth = 32;
export const weaponHeight = 20;
export const bigWeaponWidth = 50;
export const bigWeaponHeight = 30;
export const bulletWidth = 40;
export const bulletHeight = 15;
export const bulletSpeed = 20;
interface Screen {
    width: number;
    height: number;
}
export const SCREEN: Screen = {
    width: 1280,
    height: 720
};

interface hitEffect{
    active: boolean;
};

export const hitEffect ={
    active : false
};

export const weaponOffset = 12;
export const minOffsetX = -450;
export const maxOffsetX = 200;
export const minOffsetY = -320;
export const maxOffsetY = 100;
export const enemyImagePath = '/enemies/melee.png';
export const crossImage = new Image();
crossImage.src = '/spawn_effect/crosssprite.png'

export const pistolImg = new Image();
pistolImg.src = '/weapons/pistol.png';

export const smgImg = new Image();
smgImg.src = '/weapons/smg.png'

export const minigunImg = new Image();
minigunImg.src = '/weapons/minigun.png'

export const bulletImg = new Image();
bulletImg.src = '/projectile/bullet.png'

export const pistolSound = new Audio();
pistolSound.src = '/projectile/audio/gun.mp3'

export const walkSound = new Audio();
walkSound.src = '/character/audio/walk.mp3'

const material1 = new Image();
const material2 = new Image();
const material3 = new Image();

material1.src = '/material/material1.png'
material2.src = '/material/material2.png'
material3.src = '/material/material3.png'

export const materialPickup = new Audio();
materialPickup.src = '/material/audio/material_pickup.mp3'

export const materialChoices = [material1,material2,material3]

export const materialWidth = 20;
export const materialHeight = 20;