import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Quadrado } from '../quadrado.model';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogador?: string;
  vencedor?: string;
  fimDeJogo: boolean;
  quadrados: Array<Quadrado> = [];
  modoJogo = 'jogador';
  numJogadas = 0;
  numJogadasAdversario = 0;  

  constructor() { }

  ngOnInit(): void {  
    for(let i = 0; i < 9; i++) {
      this.quadrados.push();
    }  
    this.jogoSetup();    
  }

  //--------------------------------------------------------------------
  jogoSetup(): void {
    
    this.numJogadas = 0;
    this.fimDeJogo = false;
    this.mudarJogador('X');
    this.vencedor = null;
    
    for(let i = 0; i < 9; i++) {
      this.quadrados[i] = {valor: '-', trocarCor: false};
    }
  }

  //--------------------------------------------------------------------
  escolherQuadrado(quadrado: Quadrado): void {    
    
    if(this.fimDeJogo) 
      return;
        
    if(quadrado.valor !== '-')
      return;
    
    quadrado.valor = this.jogador;    

    if(this.jogador === 'X') {
      this.jogador = 'O';
    }
    else {
      this.jogador = 'X';      
    }

    this.numJogadas++;
    this.mudarJogador(this.jogador);

    if(this.numJogadas >= 5)
      this.checarJogo();
  }
 

  //--------------------------------------------------------------------
  mudarJogador(valor: string): void {
    this.jogador = valor;    
  }


  //--------------------------------------------------------------------
  checarJogo(): void {
    
    // Checa linhas:
    if(this.verificarFimJogo(0, 1, 2))
      return;
    if(this.verificarFimJogo(3, 4, 5))
      return;
    if(this.verificarFimJogo(6, 7, 8))
      return;

      // Checa colunas:
    if(this.verificarFimJogo(0, 3, 6))
      return;
    if(this.verificarFimJogo(1, 4, 7))
      return;
    if(this.verificarFimJogo(2, 5, 8))
      return;

    // Checa diagonais:
    if(this.verificarFimJogo(0, 4, 8))
      return;
    if(this.verificarFimJogo(2, 4, 6))
      return;    
      
    if(this.numJogadas == 9) {
      this.finalizarPartida('', false);
      return;
    }
  }

 
  //--------------------------------------------------------------------
  verificarFimJogo(a: number, b: number, c: number): boolean {
    let eIgual = false;

    if(this.quadrados[a].valor !== '-' 
      && this.quadrados[a].valor === this.quadrados[b].valor 
      && this.quadrados[a].valor === this.quadrados[c].valor){
        
        this.mudaCorQuadrado(this.quadrados[a], this.quadrados[b], this.quadrados[c]);
        this.finalizarPartida(this.quadrados[a].valor, true);       
        
        eIgual = true;
    }
    
    return eIgual;
  }


  //--------------------------------------------------------------------
  mudaCorQuadrado(a: Quadrado, b: Quadrado, c: Quadrado) {
    a.trocarCor = true;
    b.trocarCor = true;
    c.trocarCor = true;
  }


  //--------------------------------------------------------------------
  finalizarPartida(vencedor: string, teveCombinacao: boolean): void {
    this.fimDeJogo = true;
    if(teveCombinacao) {
      this.vencedor = 'Vencedor: ' + vencedor + '!';    
    }
    else {
      this.vencedor = 'Empate!'; 
    }
  }


  //--------------------------------------------------------------------
  reiniciarJogo(): void {
    this.jogoSetup();    
  }

  //--------------------------------------------------------------------
  trocarModoJogo(event: Event): void {
    const elementId = (event.target as HTMLButtonElement).id;
    if(elementId !== this.modoJogo) {
      this.modoJogo = elementId;
      this.reiniciarJogo();
    }
  }
}