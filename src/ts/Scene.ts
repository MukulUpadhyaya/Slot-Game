import gsap from "gsap/all";
import { Application, Container,  Point, Sprite, Text, Texture } from "pixi.js";
import { Button } from "./Button";
import { ReelsContainer } from "./ReelsContainer";

import { getTexture } from "./Textures";

export class Scene extends Container{
    public initialized : boolean;
    private center : Point
    private reelarray : number[][]=[]
    private win_box_array:Sprite[] =[]
    private my_score : number =0
    private text : Text;
    private textWon : Text;


    constructor(app:Application,parent:Container ){
        super()
        parent.addChild(this)
        this.initialized=false;
        this.center = new Point(app.view.width/2,app.view.height/2);
        this.text = new Text(  `My Win: ${this,this.my_score}`,{
            fontFamily:'Comic-sans',
            fill:'white',
            fontSize:'30px',
            align : 'center',
        })
        this.text.x = 0
        this.text.y = 0
        this.textWon = new Text(  `You won ${"D"}`,{
            fontFamily:'Comic-sans',
            fill:'yellow',
            fontSize:'50px',
            align : 'center',
        })
        this.textWon.x = app.view.width/2
        this.textWon.y = app.view.height/2
        this.textWon.anchor.set(0.5)
        this.textWon.visible=false
        


    }
    public init(){
        
        
        this.createSprites('gameBG',this.center.x,this.center.y)
        this.createSprites('reelBG',this.center.x,this.center.y)
        this.addChild(this.text)
        const logo = this.createSprites('gameLogo',this.center.x,this.center.y)
        logo.y = logo.height/2
        logo.scale.set(0.5)
        const spin = new Button('spin_normal.png','spin_over.png','spin_down.png','spin_disable.png');
        spin.scale.set(0.5)
        spin.anchor.set(0.5)
        spin.x = this.center.x;
        
        
        spin.y = 2*this.center.y-spin.width;
        this.addChild(spin)
        const reelContainer = new ReelsContainer()
        this.reelarray = reelContainer.init();
        this.addChild(reelContainer)
        
        
        
        
        spin.on('click',()=>{

            spin.enabled=false
            if(this.win_box_array.length!=0){
                for(let i=0;i<this.win_box_array.length;i++){
                    this.removeChild(this.win_box_array[i])

                }
                this.win_box_array=[]
            }
            

        let temparray = reelContainer.spin(this.reelarray)
        //console.log("reelarray",temparray)

        setTimeout(()=>{this.check_for_win(temparray);spin.interactive=true;spin.buttonMode=true},2000)
            //spin.interactive=true
        })
        this.addChild(this.textWon)
        this.initialized =true;
        
    }


private check_for_win(tempArray:number[][]){
    
    let temparray:number[][] = []

    for(let row=0;row<7;row++){
        let temp:number[] =[]
        //
        for (let col =0; col<tempArray.length; col++){
            if(row>=2 && row<5){
                temp.push(tempArray[col][row])
            }
        }
        //console.warn(temp,"hgi4rg4n")
        if(temp.length!=0){
            temparray.push(temp)
        }
    }
    //console.warn("tempo", temparray)
    let make_win =[]
    let make_original_win =[]
    let tr =1
    for (let i=0;i<temparray.length;i++){
        let prev = temparray[i][0]
        let count =1
        let stored_value: string[]=[`${i}-0`]
        let stored_original_value : string[] = [`0-${i+2}`]
        for(let j=1;j<5;j++){
            if(temparray[i][j]==prev){
                count++
                tr = 1
                stored_value.push(`${i}-${j}`)
                stored_original_value.push(`${j}-${i+2}`)
            }
            else{
                if(count>=3){
                    make_win.push(stored_value)
                    make_original_win.push(...stored_original_value)
                }
                stored_value = [`${i}-${j}`]
                stored_original_value = [`${j}-${i+2}`]
                count =1
                tr=0
            }
            if(j ===4 && count>=3 &&  tr){
                make_win.push(stored_value)
                make_original_win.push(...stored_original_value)
            }
            prev = temparray[i][j]
        }
        
    }
    
    //console.log("HUUGU",make_win,make_original_win)
    if(make_original_win.length!=0){
        this.apply_win_box(make_original_win)
        this.my_score+=make_original_win.length*100;
        this.text.text= `My Win: ${this,this.my_score}`
    }
    }
    private apply_win_box(make_original_win:string[]){
        
        const startY = 165
        const startX = 206
        const win_box_height = 178
        const win_box_width = 212
        for(let i =0;i<5;i++){
            for(let j=0; j<7;j++){
                //console.log(`"${i}-${j}"`, make_original_win.includes(`${i}-${j}`) )
                if (make_original_win.includes(`${i}-${j}`) ){
                    const a = this.createSprites('winBox',startX+(i)*(win_box_width+5), startY+(win_box_height*(j-2)))
                    a.width = win_box_width;
                    a.height = win_box_height;
                    this.win_box_array.push(a)
                }
            }
        }
        
        //console.log("winnn",this.win_box_array)
        this.textWon.visible=true
        this.textWon.text = `You Win ${this.win_box_array.length*100} `
        gsap.to(this.textWon,{
            width:1000,
            height:400,
            duration:1,
            ease:'bounceOut',
            onComplete:()=>{
                this.textWon.visible=false
                this.textWon.width=50,
                this.textWon.height= 20}
        })

    }
    private createSprites(textureId:string , x: number,y:number){
        const sprite = new Sprite(getTexture(textureId) as Texture)
        sprite.anchor.set(0.5);
        sprite.position.set(x,y)
        //this.pivot.set(0.5)
        return this.addChild(sprite)

    }
    
    public update(delta?:number){

       if(! this.initialized){
           console.log(delta)
       }
    }
}