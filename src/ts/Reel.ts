import gsap from "gsap";
import { Container } from "pixi.js";
import { ReelSymbol } from "./ReelSymbol";
import { Reels } from "./SymbolCongif";

export class Reel extends Container{
   
    public currentStop = 199;
    private symbols : ReelSymbol[]=[];
    
    public reeLArray : number[]= []

    
    
    constructor(private reelNum: number, x:number,initY:number){
        super();
        this.x = x;
        this.y = initY;

    }
    
    public init(rows: number, symWidth:number,symHeight:number) :void{
        const startY = -symHeight*2
        let reelArray: number[] =[]
        

        for(let i =0;i<rows+4;i++){
            
            const symId = this.getSymbolID(i)
           const symbol = new ReelSymbol(symId);
            symbol.x = symWidth/2
            symbol.y = startY+(i*symHeight)+(symHeight/2)
            this.addChild(symbol);
            this.symbols.push(symbol)
            reelArray.push(symbol.symNum as number)    
        }
        this.reeLArray=(reelArray)
        this.currentStop--    
    }

    private getSymbolID(stop:number){

        const reelValue = Reels[this.reelNum][Math.floor(this.currentStop)-stop]
        return reelValue

    }
    
    public spin(x :number, rLArray : number[]): number[]{
        this.currentStop = x;
        
        gsap.to(this,{

            duration: 0.04,
            repeat:40,

            onRepeat:()=>{

                this.symbols.forEach((symbol: ReelSymbol,i:number)=>{
                    symbol.seticontexture(this.getSymbolID(i))
                    symbol.blur()
                    rLArray.shift()
                    rLArray.push(symbol.symNum as number)

                })
                this.currentStop --
                
            },
            onComplete:()=>{
               this.symbols.forEach((symbol: ReelSymbol)=>{
                    symbol.unBlur();
                })
            },
        })
        return rLArray
    }
   }