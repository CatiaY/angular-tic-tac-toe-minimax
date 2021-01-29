import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quadrado } from '../quadrado.model';

@Component({
  selector: 'app-quadrado',
  templateUrl: './quadrado.component.html',
  styleUrls: ['../board/jogo.component.css']
})
export class QuadradoComponent implements OnInit {

  @Output() clicou = new EventEmitter();
  @Input() quadrado: Quadrado;
  
  constructor() { }

  ngOnInit(): void {    
  }

  escolherQuadrado(): void {
    if(this.quadrado.turnoAI)
      return;
      
    this.clicou.emit();
  }

  obterClasse(): string { 
    if(this.quadrado.valor === '-') {
      return 'quadrado-vazio';
    }

    if(this.quadrado.trocarCor) {
      if(this.quadrado.valor === 'X')
        return 'quadrado-vazio quadrado-ganhou';
      else
        return 'quadrado-vazio quadrado-perdeu';
    }

    return 'quadrado-vazio quadrado-texto';
  }
}
