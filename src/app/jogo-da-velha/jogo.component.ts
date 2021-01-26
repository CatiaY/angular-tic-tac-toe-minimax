import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogador?: string;
  vencedor?: string = null;
  jogadorSelecionado: any;
  vencedorSelecionado: any;
  //quadrados = document.getElementsByClassName('quadrado');

  constructor() { }

  ngOnInit(): void {    
    this.jogadorSelecionado = document.getElementById('jogador-selecionado') as HTMLLabelElement;
    this.vencedorSelecionado = document.getElementById('vencedor') as HTMLLabelElement;
    
    this.mudarJogador('X');
  }

  escolherQuadrado(event: Event): void {
    //console.log('clicou no quadrado: ' + event.target.id);    

    if(this.vencedor !== null) 
      return;

    const quadrado = event.target as HTMLDivElement;

    if(quadrado.innerHTML !== '-')
      return;

    quadrado.innerHTML = this.jogador;
    quadrado.style.color = '#000';

    if(this.jogador === 'X') {
      this.jogador = 'O';
    }
    else {
      this.jogador = 'X';      
    }

    this.mudarJogador(this.jogador);
    this.checarVencedor();
  }

  mudarJogador(valor: string): void {
    this.jogador = valor;
    this.jogadorSelecionado.innerHTML = this.jogador;
  }

  checarVencedor(): void {
    var quadrado1 = document.getElementById('1') as HTMLDivElement;
    var quadrado2 = document.getElementById('2') as HTMLDivElement;
    var quadrado3 = document.getElementById('3') as HTMLDivElement;
    var quadrado4 = document.getElementById('4') as HTMLDivElement;
    var quadrado5 = document.getElementById('5') as HTMLDivElement;
    var quadrado6 = document.getElementById('6') as HTMLDivElement;
    var quadrado7 = document.getElementById('7') as HTMLDivElement;
    var quadrado8 = document.getElementById('8') as HTMLDivElement;
    var quadrado9 = document.getElementById('9') as HTMLDivElement;

    if(this.checaSequencia(quadrado1, quadrado2, quadrado3)) {
      this.mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
      this.mudarVencedor(quadrado1);
      return;
    }

    if(this.checaSequencia(quadrado4, quadrado5, quadrado6)) {
      this.mudaCorQuadrado(quadrado4, quadrado5, quadrado6);
      this.mudarVencedor(quadrado4);
      return;
    }

    if(this.checaSequencia(quadrado7, quadrado8, quadrado9)) {
      this.mudaCorQuadrado(quadrado7, quadrado8, quadrado9);
      this.mudarVencedor(quadrado7);
      return;
    }

    if(this.checaSequencia(quadrado1, quadrado4, quadrado7)) {
      this.mudaCorQuadrado(quadrado1, quadrado4, quadrado7);
      this.mudarVencedor(quadrado1);
      return;
    }

    if(this.checaSequencia(quadrado2, quadrado5, quadrado8)) {
      this.mudaCorQuadrado(quadrado2, quadrado5, quadrado8);
      this.mudarVencedor(quadrado2);
      return;
    }

    if(this.checaSequencia(quadrado3, quadrado6, quadrado9)) {
      this.mudaCorQuadrado(quadrado3, quadrado6, quadrado9);
      this.mudarVencedor(quadrado3);
      return;
    }

    if(this.checaSequencia(quadrado1, quadrado5, quadrado9)) {
      this.mudaCorQuadrado(quadrado1, quadrado5, quadrado9);
      this.mudarVencedor(quadrado1);
      return;
    }

    if(this.checaSequencia(quadrado3, quadrado5, quadrado7)) {
      this.mudaCorQuadrado(quadrado3, quadrado5, quadrado7);
      this.mudarVencedor(quadrado3);
      return;
    }
  }

  checaSequencia(quadrado1: HTMLDivElement, quadrado2: HTMLDivElement, quadrado3: HTMLDivElement): boolean {
    var eIgual = false;

    if(quadrado1.innerHTML !== '-' && quadrado1.innerHTML === quadrado2.innerHTML && quadrado1.innerHTML === quadrado3.innerHTML){
      eIgual = true;
    }
    
    return eIgual;
  }


  mudaCorQuadrado(quadrado1: HTMLDivElement, quadrado2: HTMLDivElement, quadrado3: HTMLDivElement) {
    quadrado1.style.background = '#0f0';
    quadrado2.style.background = '#0f0';
    quadrado3.style.background = '#0f0';
  }


  mudarVencedor(quadrado: HTMLDivElement): void {
    this.vencedor = quadrado.innerHTML;
    this.vencedorSelecionado.innerHTML = this.vencedor;
  }


  reiniciar(): void {
    this.vencedor = null;
    this.vencedorSelecionado.innerHTML = '';

    for(let i = 1; i <= 9; i++) {
      let quadrado = document.getElementById(i.toString());
      quadrado.style.background = '#eee';
      quadrado.style.color = '#eee';
      quadrado.innerHTML = '-';
    }

    this.mudarJogador('X');
  }
}