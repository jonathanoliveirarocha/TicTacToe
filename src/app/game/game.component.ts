import { Component, OnInit } from '@angular/core';
import{GameLogic} from '../gamelogic'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic]
})
export class GameComponent  implements OnInit{
  constructor(public game: GameLogic){

  }
  ngOnInit():void{}

  startGame(){
    this.game.currentTurn = 1
    this.game.gameStart()
    const currentPlayer = 'Vez de: Jogador ' + this.game.currentTurn
    const information = document.querySelector('.current-status')
    if (information){
      information.innerHTML = currentPlayer
    }
    
    
  }
  async clickSubfield(subfield:any): Promise<void>{
    const position = subfield.currentTarget.getAttribute('position')
    if ((this.game.gameStatus===1)  && (this.game.gamefield[position]==0) ){
      
      
      
      this.game.setField(position, this.game.currentTurn)
      
      const color =this.game.getPlayerColorClass()
      subfield.currentTarget.classList.add(color)
    

      if(await this.game.checkGameEndWinner()){
        const information = document.querySelector('.current-status')
        if (information){
            information.innerHTML = "O vencedor foi: Jogador " + this.game.currentTurn
        }


      }else if(await this.game.checkGameEndFull()){ 
              const information = document.querySelector('.current-status')
              if (information){
                  information.innerHTML = "Empate"
              }
      }else{
      this.game.changePlayer()
      const currentPlayer = 'Vez de: Jogador ' + this.game.currentTurn
      const information = document.querySelector('.current-status')
      if (information){
        information.innerHTML = currentPlayer
      }
    }
    }
  }

}
