export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 563;

export const enemyImagePath = '/enemies/melee.png';
export const crossImage = new Image();
crossImage.src = '/spawn_effect/crosssprite.png'