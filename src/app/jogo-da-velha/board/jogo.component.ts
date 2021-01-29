import { Component, OnInit } from '@angular/core';
import { AIService } from '../ai.service';
import { Quadrado } from '../quadrado.model';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  // Jogador = 'X', computador AI = 'O'
  jogador?: string;
  vencedor?: string;
  fimDeJogo: boolean;
  quadrados: Array<Quadrado> = [];
  // Há três modalidades de oponentes: jogador, IAIniciante, IAExpert
  modoJogo = 'jogador';  // Voltar para 'jogador' após testes!!!!!!!!!!!!!!!!!!!
  numJogadas = 0;
    
  constructor(private aiService: AIService) { }

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
    this.jogador = 'X';
    this.vencedor = null;           
    
    for(let i = 0; i < 9; i++) {
      this.quadrados[i] = {valor: '-', trocarCor: false, turnoAI: false};
    }
  }

  //--------------------------------------------------------------------
  escolherQuadrado(quadrado: Quadrado): void {    
    
    if(quadrado.valor !== '-')
      return;

    quadrado.valor = this.jogador;
    
    this.numJogadas++;
    
    if(this.numJogadas >= 5)
        this.checarJogo();
    
    if(this.fimDeJogo)
      return;
    
    this.mudarJogador();     
  }

  //--------------------------------------------------------------------
  mudarJogador(): void {
    if(this.jogador === 'X') {      
      this.jogador = 'O';      
      
      if(this.modoJogo !== 'jogador') {
        // Trava a jogada do usuário enquanto for o turno do computador:
        this.quadrados.forEach(valor => valor.turnoAI = true);                
        // Chama o turno da AI:
        if(this.modoJogo === 'IAIniciante'){
          // Se for iniciante chama o turno com um pequeno delay
          setTimeout(() => {
            this.chamaTurnoOponente();  
          }, 500);
        }
        else {
          this.chamaTurnoOponente();     
        }
      }      
    }
    else {
      this.jogador = 'X';
      if(this.modoJogo !== 'jogador') {
        // Volta para o turno do usuário, reabilitando os quadrados:
        this.quadrados.forEach(valor => valor.turnoAI = false);
      }
    }    
  }


  //--------------------------------------------------------------------
  chamaTurnoOponente(): void {        
    const quadrados = this.quadrados.map(q => q.valor);              
    const jogada = this.aiService.turnoAdversario(quadrados, this.modoJogo);          
    this.escolherQuadrado(this.quadrados[jogada]);                    
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
    
    // Se ninguém ganhou, verifica se deu empate:
    if(this.numJogadas === 9) {
      this.finalizarPartida('', false);      
    }
  }

 
  //--------------------------------------------------------------------
  verificarFimJogo(a: number, b: number, c: number): boolean {
    let ehIgual = false;

    if(this.quadrados[a].valor !== '-' 
      && this.quadrados[a].valor === this.quadrados[b].valor 
      && this.quadrados[a].valor === this.quadrados[c].valor){
        
        this.mudaCorQuadrado(this.quadrados[a], this.quadrados[b], this.quadrados[c]);
        this.finalizarPartida(this.quadrados[a].valor, true);       
        
        ehIgual = true;
    }
    
    return ehIgual;
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
      //this.reiniciarJogo();
    }
  }
}