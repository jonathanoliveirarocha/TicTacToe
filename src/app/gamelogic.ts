import {Status} from './game-status' 

export class GameLogic {
    gamefield: Array<number> = []
    currentTurn = 1
    gameStatus: Status

    winSituationOne: Array<Array<number>>=[
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0],
    
 
        
       
    ]
    winSituationTwo: Array<Array<number>>=[
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0]
       
    ]
    
    public constructor(){
        this.gameStatus = Status.STOP
        this.gamefield = [0,0,0,0,0,0,0,0,0]
    }
    gameStart(){
        this.gamefield = [0,0,0,0,0,0,0,0,0]
        this.gameStatus = Status.START
    }
    
    setField(position:number, value: number):void{
        this.gamefield[position] = value
    }
   getPlayerColorClass():String{
    const ColorClass = (this.currentTurn === 1)?"player-one":"player-two"
    return ColorClass
    }
    changePlayer():void{
        this.currentTurn = (this.currentTurn === 1)? 2 : 1
    }

    

    async checkGameEndWinner(): Promise<boolean>{
        let isWinner = false
        const checkArray = (this.currentTurn === 1)? this.winSituationOne:this.winSituationTwo
        const currentarray = this.gamefield

             

        for(var y=0; y<8;y++){
            var count = 0
            for(var i=0;i<9;i++){
                
                if(currentarray[i] == checkArray[y][i] && currentarray[i]==this.currentTurn ){
                    count += 1
                }
                
            }
            if(count == 3){
                isWinner = true
            }
        }
        

        
        if(isWinner){
            this.gameEnd()
            return true
        }else{
            return false
        }
        
    }

    async checkGameEndFull(): Promise<boolean>{
        let isFull = true
        if (this.gamefield.includes(0)){
            isFull = false
        }
        if(isFull){
            this.gameEnd()
            return true
        }else{
            return false
        }
        
    }
    gameEnd():void{
        this.gameStatus = Status.STOP
        
    }
    



    }

