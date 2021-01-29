import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JogoComponent } from './jogo-da-velha/board/jogo.component';
import { QuadradoComponent } from './jogo-da-velha/quadrado/quadrado.component';
import { AIService } from './jogo-da-velha/ai.service';

@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    QuadradoComponent    
  ],
  imports: [
    BrowserModule    
  ],
  providers: [AIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
