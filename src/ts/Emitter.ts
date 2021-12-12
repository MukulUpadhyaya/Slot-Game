//import { ParticleConstructor } from "pixi-particles";
import particles = require('pixi-particles')
import { BaseTexture, ParticleContainer, Rectangle, Texture } from "pixi.js";
//import {getTexture } from './Texture';
//import PIXI from 'pixi.js';

export class Emitter extends ParticleContainer{
    private pEmitter: particles.Emitter;
    constructor(maxCount:number,props?:any){
        //var texture = PIXI.Texture.from('assets/img/killua.png');
        //console.log(getTexture('sparks'),"33")
        super(maxCount,props);
        const texture1 = this.createTexture('https://cdn-icons-png.flaticon.com/128/2336/2336319.png',2,2,99,99);
        const texture2 = this.createTexture('https://cdn-icons-png.flaticon.com/128/2336/2336319.png',103,86,65,58);
        const texture3 = this.createTexture('https://cdn-icons-png.flaticon.com/128/2336/2336319.png',103,2,85,82);
        const texture4 = this.createTexture('assets/img/pop_anim.png',2,103,99,98);
        const texture5 = this.createTexture('assets/img/pop_anim.png',2,2,99,99);
        const texture6 = this.createTexture('assets/img/pop_anim.png',2,2,99,99);
        //console.log(texture1,getTexture('wheel'),"hfyg***************",texture2,texture3,texture4,texture5,texture6)
        this.pEmitter = new particles.Emitter(this,   ///container is this
            [texture1,texture2,texture3,texture4,texture5,texture6],  {
                
					"alpha": {
						"start": 1,
						"end": 1
					},
					"scale": {
						"start": 0.25,
						"end": 0.5,
						"minimumScaleMultiplier":0.5
					},
					"color": {
						"start": "ffffff",
						"end": "ffffff"
					},
					"speed": {
						"start": 1500,
						"end": 150
					},
					"startRotation": {
						"min": 0,
						"max": 360
					},
					"rotationSpeed": {
						"min": 0,
						"max": 50
					},
					"lifetime": {
						"min": 2,
						"max": 3
					},
					"blendMode": "normal",
					"frequency": 0.016,
					"emitterLifetime": 0,
					"maxParticles": 1000,
					"pos": {
						"x": 0,
						"y": 0
					},
					"addAtBack": false,
					
				},
            )   
    }
    private createTexture(basetexture:any,...frame:number[]){
        const bst = new BaseTexture(basetexture);
        const frameRect = new Rectangle(...frame);
        return new Texture(bst,frameRect)


        
    }
    public start():void{
        this.pEmitter.emit = true;
    }
    public update(delta:number):void{
        this.pEmitter.update(delta*0.001)
    }
}