import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quadrado',
  templateUrl: './quadrado.component.html',
  styleUrls: ['../jogo-da-velha/jogo.component.css']
})
export class QuadradoComponent implements OnInit {

  @Output() clicou = new EventEmitter();
  @Input() valor: string;
  @Input() trocarCor: false;
  
  constructor() { }

  ngOnInit(): void {    
  }

  escolherQuadrado(): void {
    this.clicou.emit();
  }
}
