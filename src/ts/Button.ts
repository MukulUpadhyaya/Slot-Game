
import { Texture , Sprite } from "pixi.js";
import {  getTexture } from "./Textures";


export class Button extends Sprite{
    private up   : Texture
    private  over   : Texture
    private  down   : Texture
    private disabled : Texture;
    public set enabled(value:boolean){
        this.interactive=value;
        this.buttonMode=value;
        if(!value){
            this.texture = this.disabled
        }
        else{
            this.texture= this.up
        }
    }

    
    
    constructor( up:string,over:string,down:string, disabled: string){
        super(getTexture(up) as Texture);
        this.up = this.texture;
        this.down = getTexture(down) as Texture
        this.over = getTexture(over)as Texture
        this.disabled = getTexture(disabled)as Texture
        this.interactive = true;
        this.buttonMode=true;
        this.on('pointerup', ()=>{
            if(this.interactive){
                this.texture = this.over;
            }else{
                this.texture=this.disabled
            }
        })
        this.on('pointerdown', ()=>{
            this.texture = this.down
        })
        this.on('pointerover', ()=>{
            this.texture = this.over
        })
        this.on('pointerout', ()=>{
            this.texture = this.up
        })

    }
}