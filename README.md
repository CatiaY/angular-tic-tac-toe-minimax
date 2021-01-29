# Jogo da Velha (Tic Tac Toe)
Projeto utilizando Typescript e Angular 11 com implementação de inteligência artificial (IA) utilizando três níveis de dificuldade:
* Iniciante: o computador faz jogadas completamente aleatórias
* Intermediário: faz as melhores jogadas apenas 50% das vezes. As demais jogadas são aleatórias.
* Expert: sempre faz as melhores jogadas. IA implementada utilizando o algoritmo MiniMax com Poda Alfa-Beta.

<p>&nbsp;</p>

![Preview](ReadMe/printJogo.JPG)

<p>&nbsp;</p>

O desenvolvimento do projeto base foi feito a partir da atividade "Criando seu próprio jogo da velha com HTML e Javascript", de [
Vitor Ruschoni](https://github.com/ruschoni02/jogo-da-velha), da Digital Innovation One.

A explicação e os algoritmos foram obtidos nos artigos [Building a Tic-Tac-Toe AI with Javascript](https://mostafa-samir.github.io/Tic-Tac-Toe-AI/) e [Minimax Algorithm in Game Theory | Set 3 (Tic-Tac-Toe AI – Finding optimal move)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/).
Melhoramento da IA utilizando o algoritmo poda Alfa-Beta baseado no artigo [Minimax Algorithm in Game Theory | Set 4 (Alpha-Beta Pruning)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/?ref=rp).

<p>&nbsp;</p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
