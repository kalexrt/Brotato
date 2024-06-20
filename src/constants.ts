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