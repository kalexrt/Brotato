import './style.css'
import { gameLoop } from './game';


window.onload = () => {
    requestAnimationFrame(gameLoop)
}
