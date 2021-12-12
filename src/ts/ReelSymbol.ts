import { Sprite, Texture,  } from "pixi.js";
import { getTexture } from "./Textures";
import {BlurFilter} from '@pixi/filter-blur';
import { SymbolIDs } from "./SymbolCongif";

export class  ReelSymbol extends Sprite{
    private normalTexture:Texture|undefined;
    private blurTexture:Texture|undefined;
    private isBlur:boolean;
    public  symbolId:string|undefined;
    public  symNum:number|undefined;
    
    public seticontexture(id:number){
        this.symNum= id;  
        this.symbolId=  SymbolIDs[id] 
        this.normalTexture = getTexture(`${SymbolIDs[id]}.png`) as Texture;
        this.blurTexture = getTexture(`${SymbolIDs[id]}_blur.png`) as Texture
        this.texture = this.isBlur?this.blurTexture:this.normalTexture

        }

    constructor(symId:number){
        super()
        this.isBlur = false;
        
        this.seticontexture(symId)
        this.anchor.set(0.5)
        
        
    }
    
    public blur():void{
        this.isBlur = true
        if(this.blurTexture){
            this.texture = this.blurTexture
        }
        else{
            const blur = new BlurFilter(20,10);

            this.filters= [blur]

        }
    }
    public unBlur():void{
        this.isBlur = false;
        this.texture = this.normalTexture as Texture
        this.filters = null
    }

}