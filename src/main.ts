import './style.css'
import { backgroundMusic } from './constants';
import { gameLoop } from './game';


window.onload = () => {
    backgroundMusic.play();
    requestAnimationFrame(gameLoop)
}
