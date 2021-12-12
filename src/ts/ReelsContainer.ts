import { Container, Graphics } from "pixi.js";
import { Reel } from "./Reel";

export class ReelsContainer extends Container{
    private reels: Reel[]=[];
    public reelarray: number[][] =[]
    public init() : number[][]{
        
        const rWidth = 217
        
        const reelRow = 3;
        const startX = 100;
        const startY=75;
        const numReels = 5;
        const rHeight = 178
        
        for(let i =0; i<numReels;i++){
            const reel = new Reel(i,startX+(i*rWidth),startY)
            reel.init(reelRow,rWidth,178)
            this.addChild(reel)
            this.reels.push(reel)
            this.reelarray.push(reel.reeLArray)
        }
        const rMask = new Graphics()
        rMask.drawRect(startX,startY,numReels*rWidth,reelRow*rHeight)
        this.addChild(rMask)
        this.mask = rMask
        return this.reelarray
    }
    public spin(reelArray:number[][]){
       
        this.reelarray = reelArray
        const tempArray:number[][]=[]
        this.reels.forEach((reel:Reel,i:number)=>{
            const x =  Math.floor(Math.random()*151) + 48
            //console.warn("index",i)
            tempArray.push(reel.spin(x,this.reelarray[i]))
            
        });
        this.reelarray = tempArray
        return tempArray
    
    
    
    }
}