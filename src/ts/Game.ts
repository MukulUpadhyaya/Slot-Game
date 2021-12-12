import {
  Application, Container
} from 'pixi.js';
import { Emitter } from './Emitter';

import { preLoader } from './PreLoader';
import assets from './assets';
import { Scene } from './Scene';



export class Game {
  private stage: Container;
  private baseScene : Scene
  private emitter : Emitter|undefined

    private readonly app: Application;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = this.app.stage;
      this.baseScene = new Scene(this.app,this.stage)

      preLoader(assets, () => {
        this.isInitialized = true;
        this.baseScene.init();
        this.emitter = new Emitter(5000,{});
            this.emitter.x = app.view.width/2
            this.emitter.y = app.view.height/2
            this.stage.addChild(this.emitter);
            this.emitter.start();
      });
    }

    public update(delta:number):void {
      if (this.isInitialized && this.baseScene.initialized){
        this.baseScene.update(delta)
      }
      if(this.isInitialized && this.emitter){
        this.emitter.update(delta)
      }
    }
}
 