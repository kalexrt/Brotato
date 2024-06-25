import { global } from "../global";
import { MeleeEnemy } from "../enemies/MeleeEnemy";
import { RangeEnemy } from "../enemies/RangeEnemy";
import { SpeedyEnemy } from "../enemies/SpeedyEnemy";
import { BigeEnemy } from "../enemies/BigEnemy";
import { BossEnemy } from "../enemies/BossEnemy";
import { crosses } from "../entities/Enemy";
import { enemyArray } from "../entities/Enemy";
import { EyeEnemy } from "../enemies/EyeEnemy";
import { HeadEnemy } from "../enemies/HeadEnemy";
import { MouthEnemy } from "../enemies/MouthEnemy";

export function generateEnemy(x:number,y:number,index:number){
    crosses.push({ x, y, expireTime: Date.now() + 1000 });
    setTimeout(() => {
        if (global.gameOver) return;
        let enemy;

        switch (index) {
            case 0:
                enemy = new MeleeEnemy(x, y);
                break;
            case 1:
                enemy = new EyeEnemy(x,y);
                break;
            case 2:
                enemy = new RangeEnemy(x, y);
                break;
            case 3:
                enemy = new HeadEnemy(x,y);
                break;
            case 4:
                enemy = new SpeedyEnemy(x, y);
                break;
            case 5:
                enemy = new MouthEnemy(x,y);
                break;
            case 6:
                enemy = new BigeEnemy(x, y);
                break;
            case 7:
                enemy = new BossEnemy(x, y);
                break;
            default:
                console.error('Unknown enemy type');
                return;
        }

        enemyArray.push(enemy)
      }, 1000);
}