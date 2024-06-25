import { carlImg } from "../constants";
import { Player } from "../entities/Player";

export class Carl extends Player{
    constructor(){
        super();
        this.image = carlImg;
    }
}