import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JogoComponent } from './jogo-da-velha/jogo.component';
import { QuadradoComponent } from './quadrado/quadrado.component';

@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    QuadradoComponent
  ],
  imports: [
    BrowserModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
