export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 563;

interface Screen {
    width: number;
    height: number;
}
export const SCREEN: Screen = {
    width: 1280,
    height: 720
};
export const minOffsetX = -450;
export const maxOffsetX = 200;
export const minOffsetY = -320;
export const maxOffsetY = 100;
export const enemyImagePath = '/enemies/melee.png';
export const crossImage = new Image();
crossImage.src = '/spawn_effect/crosssprite.png'