import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quadrado',
  templateUrl: './quadrado.component.html',
  styleUrls: ['../board/jogo.component.css']
})
export class QuadradoComponent implements OnInit {

  @Output() clicou = new EventEmitter();
  @Input() valor: string;
  @Input() trocarCor: boolean;
  
  constructor() { }

  ngOnInit(): void {    
  }

  escolherQuadrado(): void {
    this.clicou.emit();
  }
}
